using ERP.Common.App_Data.Log;
using ERP.Common.Controllers;
using ERP.Models;
using ERP.Web.Controllers.Upload;
using ERP.Web.Models;
using HRMS.Intfs.Employee.Dto;
using KMeansProject;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.Recognition
{
    [Route("api/[controller]/[action]")]
    [ApiController]
   
    public class FaceAPIController : ControllerBase
    {
        public readonly IMemoryCache memoryCache;
        private Bitmap bmpSearchImage;
        private Bitmap bmpSearchImageProcessed;
        private List<Color> _centroidColor;

        public FaceAPIController(IMemoryCache memoryCache)
        {
            this.memoryCache = memoryCache;
        }
        [HttpPost]
        public async Task<HRM_Employee_Check_In_Out_ENTITY> PostFaceCheckInImage([FromBody] HRM_Employee_Check_In_Out_ENTITY model)
        {
            try
            {
                HRM_Employee_Check_In_Out_ENTITY record = new HRM_Employee_Check_In_Out_ENTITY();
                string path = FileManagerController.AppDirectory + "\\FaceAI\\CheckInOut\\" + DateTime.Now.ToString("dd-MM-yyyy") + "\\";
                string name = model.employee_code + "-" + Guid.NewGuid() + ".jpg";
                bool check = FileManagerController.SaveBase64ToImage(model.base64, path, name);
                record.path = "";
                record.path += Request.Scheme + "://" + Request.HttpContext.Request.Host + path.Replace("\\", "/") + name;
                record.status = 0;
                return record;
            }
            catch (Exception ex)
            {
                List<HRM_Employee_Check_In_Out_ENTITY> file = new List<HRM_Employee_Check_In_Out_ENTITY>();
                file[0].status = 500;
                file[0].message = ex.Message;
                return null;
            }
        }
        [HttpPost]
        public async Task<List<HRM_Employee_Check_In_Out_ENTITY>> HRM_Employee_Ready_Check_In_Out([FromBody] HRM_Employee_Check_In_Out_ENTITY input)
        {
            List<HRM_Employee_Check_In_Out_ENTITY> result = new List<HRM_Employee_Check_In_Out_ENTITY>();
            DataTable list_account = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "Accout", "select * from SYS_Account_Infomation where code is not null and code <> ''");
            foreach(DataRow item in list_account.Rows)
            {
                HRM_Employee_Check_In_Out_ENTITY t = new HRM_Employee_Check_In_Out_ENTITY();
                t.employee_code = item["code"].ToString();
                t.username = item["USER_NAME"].ToString();
                if (GetBitmapCache(item["code"].ToString()) != null) t.is_ready_checkin = true;
                else t.is_ready_checkin = false;
                result.Add(t);
            }    

            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Employee_Check_In_Out_ENTITY>> HRM_Employee_Setup_Ready_Check_In_Out([FromBody] HRM_Employee_Check_In_Out_ENTITY input)
        {
            List<Color> centroidColor = new List<Color>();

            centroidColor.Add(Color.FromArgb(255, 255, 184, 113));
            centroidColor.Add(Color.FromArgb(255, 255, 255, 255));
            centroidColor.Add(Color.FromArgb(255, 42, 42, 42));
            centroidColor.Add(Color.FromArgb(255, 0, 255, 255));
            centroidColor.Add(Color.FromArgb(255, 224, 224, 224));
            if (!string.IsNullOrEmpty(input.employee_code))
            {
                await ProcessImage(new ImageSearchAlgorithm(), centroidColor, input.employee_code);
            }
            else
            {
                DataTable list_account = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "Accout", "select * from SYS_Account_Infomation where code is not null and code <> ''");
                foreach (DataRow item in list_account.Rows)
                    await ProcessImage(new ImageSearchAlgorithm(), centroidColor, input.employee_code);
                
            }

            return await HRM_Employee_Ready_Check_In_Out(input);
        }
        [HttpPost]
        public async Task<HRM_Employee_Check_In_Out_ENTITY> HRM_Employee_Check_In_Out_Save_Setting([FromBody] HRM_Employee_Check_In_Out_ENTITY input)
        {
            HRM_Employee_Check_In_Out_Image_Training_ENTITY trainings = new HRM_Employee_Check_In_Out_Image_Training_ENTITY();
            try
            {
                for(int i = 0; i < 4; i++)
                {
                    string path = "\\FaceAI\\EmployeeTraining\\" + input.employee_code + "\\";
                    string name = input.employee_code;
                    string base64 = input.code;
                    if(i==0)
                    {
                        name += "-Left.jpg";
                        trainings.left = path + name;
                        if(input.hRM_Employee_Check_In_Out_Image_Trainings.face_info_left != null)
                        {
                            trainings.face_info_left = new FaceInfo();
                            trainings.face_info_left.age = input.hRM_Employee_Check_In_Out_Image_Trainings.face_info_left.age;
                            trainings.face_info_left.gender = input.hRM_Employee_Check_In_Out_Image_Trainings.face_info_left.gender;
                            trainings.face_info_left.gender_probability = input.hRM_Employee_Check_In_Out_Image_Trainings.face_info_left.gender_probability;
                        }
                        base64 = input.hRM_Employee_Check_In_Out_Image_Trainings.left;
                    }
                    else if(i==1)
                    {
                        name += "-Right.jpg";
                        trainings.right = path + name;
                        if (input.hRM_Employee_Check_In_Out_Image_Trainings.face_info_right != null)
                        {
                            trainings.face_info_right = new FaceInfo();
                            trainings.face_info_right.age = input.hRM_Employee_Check_In_Out_Image_Trainings.face_info_right.age;
                            trainings.face_info_right.gender = input.hRM_Employee_Check_In_Out_Image_Trainings.face_info_right.gender;
                            trainings.face_info_right.gender_probability = input.hRM_Employee_Check_In_Out_Image_Trainings.face_info_right.gender_probability;
                        }
                        base64 = input.hRM_Employee_Check_In_Out_Image_Trainings.right;
                    }
                    else if (i == 2)
                    {
                        name += "-Top.jpg";
                        trainings.top = path + name;
                        if (input.hRM_Employee_Check_In_Out_Image_Trainings.face_info_top != null)
                        {
                            trainings.face_info_top = new FaceInfo();
                            trainings.face_info_top.age = input.hRM_Employee_Check_In_Out_Image_Trainings.face_info_top.age;
                            trainings.face_info_top.gender = input.hRM_Employee_Check_In_Out_Image_Trainings.face_info_top.gender;
                            trainings.face_info_top.gender_probability = input.hRM_Employee_Check_In_Out_Image_Trainings.face_info_top.gender_probability;
                        }
                        base64 = input.hRM_Employee_Check_In_Out_Image_Trainings.top;
                    }
                    else if (i==3)
                    {
                        name += "-Bottom.jpg";
                        trainings.bottom = path + name;
                        if (input.hRM_Employee_Check_In_Out_Image_Trainings.face_info_bottom != null)
                        {
                            trainings.face_info_bottom = new FaceInfo();
                            trainings.face_info_bottom.age = input.hRM_Employee_Check_In_Out_Image_Trainings.face_info_bottom.age;
                            trainings.face_info_bottom.gender = input.hRM_Employee_Check_In_Out_Image_Trainings.face_info_bottom.gender;
                            trainings.face_info_bottom.gender_probability = input.hRM_Employee_Check_In_Out_Image_Trainings.face_info_bottom.gender_probability;
                        }
                            
                        base64 = input.hRM_Employee_Check_In_Out_Image_Trainings.bottom;
                    }
                    else if (i == 4)
                    {
                        name += "-Center.jpg";
                        trainings.center = path + name;
                        base64 = input.hRM_Employee_Check_In_Out_Image_Trainings.center;
                    }

                    FileInfo file = new FileInfo(FileManagerController.AppDirectory + path + name);
                    if (file.Exists)
                    {
                        try
                        {
                            file.Delete();
                        }
                        catch (Exception ex)
                        {
                            string[] fileArray = Directory.GetFiles(FileManagerController.AppDirectory + path);
                            path += fileArray.Length;
                            if (!Directory.Exists(path))
                                Directory.CreateDirectory(path);
                        }
                    }
                    
                    bool check = FileManagerController.SaveBase64ToImage(base64.Replace("data:image/jpeg;base64,", ""), FileManagerController.AppDirectory+ path, name);
                }
                try
                {
                    if(trainings.face_info_left == null || trainings.face_info_right == null || trainings.face_info_top == null || trainings.face_info_bottom == null)
                    {
                        trainings.face_info_left = new FaceInfo();
                        trainings.face_info_right = new FaceInfo();
                        trainings.face_info_top = new FaceInfo();
                        trainings.face_info_bottom = new FaceInfo();
                    }
                    string qr = @"EXEC [dbo].[HRM_Employee_Check_In_Out_Face_Training_Insert]
		                        @p_employee_code = N'" + input.employee_code + @"',
		                        @p_img_left = N'" + trainings.left + @"',
		                        @p_img_right = N'" + trainings.right + @"',
		                        @p_img_top = N'" + trainings.top + @"',
		                        @p_img_bottom = N'" + trainings.bottom + @"',
		                        @p_img_left_age = 0,
		                        @p_img_left_gender = N'',
		                        @p_img_right_age = 0,
		                        @p_img_right_gender = N'',
		                        @p_img_top_age =0,
		                        @p_img_top_gender = N'',
		                        @p_img_bottom_age = 0,
		                        @p_img_bottom_gender = N'',
		                        @p_img_left_gender_probability = 0,
		                        @p_img_right_gender_probability = 0,
		                        @p_img_top_gender_probability = 0,
		                        @p_img_bottom_gender_probability = 0";
                    bool is_training = ManagementController.ExecuteNonQuery(ConnectController.GetConnectStringByKey("HRM"), qr);
                    if (is_training)
                        input.status = 0;
                    else
                        input.status = 1;
                }
                catch { }
                
                input.message = "status is "+ input.status;
                return input;
            }
            catch {
                return input;
            }
        }
        [HttpPost]
        public async Task<HRM_Employee_Check_In_Out_ENTITY> HRM_Employee_Check_In_Out_Save_Setting_v2([FromBody] HRM_Employee_Check_In_Out_ENTITY input)
        {
            HRM_Employee_Check_In_Out_Image_Training_ENTITY trainings = new HRM_Employee_Check_In_Out_Image_Training_ENTITY();
            try
            {
                for (int i = 0; i < 4; i++)
                {
                    string path = "\\FaceAI\\EmployeeTraining\\" + input.employee_code + "\\";
                    string name = input.employee_code;
                    string base64 = input.code;
                    if (i == 0)
                    {
                        name += "-Left.jpg";
                        trainings.left = path + name;
                        base64 = input.hRM_Employee_Check_In_Out_Image_Trainings.left;
                    }
                    else if (i == 1)
                    {
                        name += "-Right.jpg";
                        trainings.right = path + name;
                        base64 = input.hRM_Employee_Check_In_Out_Image_Trainings.right;
                    }
                    else if (i == 2)
                    {
                        name += "-Top.jpg";
                        trainings.top = path + name;
                        base64 = input.hRM_Employee_Check_In_Out_Image_Trainings.top;
                    }
                    else if (i == 3)
                    {
                        name += "-Bottom.jpg";
                        trainings.bottom = path + name;
                        base64 = input.hRM_Employee_Check_In_Out_Image_Trainings.bottom;
                    }
                    else if (i == 4)
                    {
                        name += "-Center.jpg";
                        trainings.center = path + name;
                        base64 = input.hRM_Employee_Check_In_Out_Image_Trainings.center;
                    }

                    FileInfo file = new FileInfo(FileManagerController.AppDirectory + path + name);
                    if (file.Exists)
                    {
                        try
                        {
                            file.Delete();
                        }
                        catch (Exception ex)
                        {
                            string[] fileArray = Directory.GetFiles(FileManagerController.AppDirectory + path);
                            path += fileArray.Length;
                            if (!Directory.Exists(path))
                                Directory.CreateDirectory(path);
                        }
                    }
                    //DirAppend.Main(name +" : " + base64);
                    //bool check = FileManagerController.SaveBase64ToImage(base64.Replace("data:image/jpeg;base64,", ""), FileManagerController.AppDirectory + path, name);
                    bool is_android = false;
                    if(!string.IsNullOrEmpty(input.machine_id))
                        if (input.machine_id.ToUpper() == "ANDROID") is_android = true;
                    bool checkresize = FileManagerController.resizeImage(base64, new Size(255, 256), FileManagerController.AppDirectory + path, name, 100000,is_android);

                }
                string qr = @"EXEC [dbo].[HRM_Employee_Check_In_Out_Face_Training_Insert]
		                        @p_employee_code = N'" + input.employee_code + @"',
		                        @p_img_left = N'" + trainings.left + @"',
		                        @p_img_right = N'" + trainings.right + @"',
		                        @p_img_top = N'" + trainings.top + @"',
		                        @p_img_bottom = N'" + trainings.bottom + @"'";
                bool is_training = ManagementController.ExecuteNonQuery(ConnectController.GetConnectStringByKey("HRM"), qr);
                if (is_training)
                    input.status = 0;
                else
                    input.status = 1;
                input.message = "status is " + input.status;
                return input;
            }
            catch
            {
                return input;
            }
        }

        [HttpPost]
        public async Task<HRM_Employee_Check_In_Out_ENTITY> HRM_Employee_Check_In_Out([FromBody] HRM_Employee_Check_In_Out_ENTITY input)
        {
            string path = FileManagerController.AppDirectory + "\\FaceAI\\CheckInOut\\" + DateTime.Now.ToString("dd-MM-yyyy") + "\\";
            FileInfo file = new FileInfo(path+ input.employee_code + ".jpg");
            if (file.Exists)
            {
                try
                {
                    file.Delete();
                }catch(Exception ex) {
                    string[] fileArray = Directory.GetFiles(FileManagerController.AppDirectory + path);
                    path += fileArray.Length;
                    if (!Directory.Exists(path))
                        Directory.CreateDirectory(path);
                }
            }
            Image img = FileManagerController.Base64StringImage(input.base64.Replace("data:image/jpeg;base64,", ""), 255, 255);
            FileManagerController.SaveImage(img, path, input.employee_code + ".jpg");

            ImageSearchAlgorithm _algorithm = new ImageSearchAlgorithm();
            string[] _fileArray = null; 
            List<string> fileList = new List<string>();
            List<Color> centroidColor = new List<Color>();
            
            centroidColor.Add(Color.FromArgb(255, 255, 184, 113));
            centroidColor.Add(Color.FromArgb(255, 255, 255, 255));
            centroidColor.Add(Color.FromArgb(255, 42, 42, 42));
            centroidColor.Add(Color.FromArgb(255, 0, 255, 255));
            centroidColor.Add(Color.FromArgb(255, 224, 224, 224));
            //check cache
            if (GetBitmapCache(input.employee_code) == null)
            {
                await ProcessImage(_algorithm, centroidColor, input.employee_code);
            }
            KMeans _kmeans = GetKMeansCache(input.employee_code);
            LoadFolder(ref _fileArray,ref fileList, path.Replace(FileManagerController.AppDirectory,""));
            List<KeyValuePair<string, double>>  result = await SearchImageList(_algorithm, centroidColor, _kmeans, input.employee_code);
            input.result_checkin = result[0].Value;
            if (result[0].Value > 70)
            {
                input.status_checkin = 0;
                input.message_checkin = "Chấm công thành công ";
            }
            else
            {
                input.status_checkin = 1;
                input.message_checkin = "Di chuyển khuôn mặt ";
            }
            return input;
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public void LoadColorImage()
        {
            _centroidColor = new List<Color>();
            _centroidColor.Add(Color.FromArgb(255, 255, 184, 113));
            _centroidColor.Add(Color.FromArgb(255, 255, 255, 255));
            _centroidColor.Add(Color.FromArgb(255, 42, 42, 42));
            _centroidColor.Add(Color.FromArgb(255, 0, 255, 255));
            _centroidColor.Add(Color.FromArgb(255, 224, 224, 224));
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task ProcessImage(ImageSearchAlgorithm _algorithm, List<Color> centroidColor, string employee_code = "employee_code")
        {
            Bitmap bmpSearchImage = new Bitmap(FileManagerController.AppDirectory+ "\\FaceAI\\EmployeeFace\\256x256\\" + employee_code+".jpg");

            KMeans _kmeans = null;
            _algorithm.RunAlgorithm(bmpSearchImage,ref _kmeans, centroidColor.Count);
            bmpSearchImageProcessed =await _algorithm.ProcessImage(bmpSearchImage, centroidColor, _kmeans);
            SetBitmapCache(employee_code, bmpSearchImageProcessed);
            SetKMeansCache(employee_code, _kmeans);
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<List<KeyValuePair<string, double>>> SearchImageList(ImageSearchAlgorithm _algorithm, List<Color> centroidColor, KMeans _kmeans, string employee_code = "employee_code")
        {
            string[] _fileArray = null;
            List<string> fileList = new List<string>();
            LoadFolder(ref _fileArray, ref fileList, "\\FaceAI\\CheckInOut\\" + DateTime.Now.ToString("dd-MM-yyyy") + "\\");
            SearchImage _searchImage = new SearchImage(_algorithm);
            List<KeyValuePair<string, double>>  similarityList =await _searchImage.SortBySimilarity(GetBitmapCache(employee_code), _fileArray, centroidColor, _kmeans);
            string text = "";
            List<string> tempList = new List<string>();
            foreach (var imagePath in similarityList)
                tempList.Add(imagePath.Key);
            _fileArray = tempList.ToArray();
            foreach (var imagePath in _fileArray)
                fileList.Add(Path.GetFileNameWithoutExtension(imagePath));

            return similarityList;
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public void LoadFolder(ref string[] _fileArray,ref List<string> fileList,string path=  "\\FaceAI\\EmployeeTraining\\")
        {
             _fileArray = Directory.GetFiles(FileManagerController.AppDirectory + path, "*.jpg");
            fileList = new List<string>();
            foreach (string image in _fileArray)
                fileList.Add(Path.GetFileNameWithoutExtension(image));
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult GetCache(string key)
        {
            string value = string.Empty;
            memoryCache.TryGetValue(key, out value);
            return Ok(value);
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult SetCache(CacheRequest data)
        {
            var cacheExpiryOptions = new MemoryCacheEntryOptions
            {
                AbsoluteExpiration = DateTime.Now.AddMinutes(5),
                Priority = CacheItemPriority.High,
                SlidingExpiration = TimeSpan.FromMinutes(2),
                Size = 1024,
            };
            memoryCache.Set(data.key, data.value, cacheExpiryOptions);
            return Ok();
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public class CacheRequest
        {
            public string key { get; set; }
            public string value { get; set; }
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public Bitmap GetBitmapCache(string key)
        {
            Bitmap value = null;
            memoryCache.TryGetValue(key+ "Bitmap", out value);
            return value;
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public void RemoveBitmapCache(string key)
        {
            memoryCache.Remove(key + "Bitmap");
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public void SetBitmapCache(string key,Bitmap data)
        {
            var cacheExpiryOptions = new MemoryCacheEntryOptions
            {
                AbsoluteExpiration = DateTime.Now.AddYears(1),
                Priority = CacheItemPriority.High,
                SlidingExpiration = TimeSpan.FromDays(365),
                Size = 1024,
            };
            memoryCache.Set(key+ "Bitmap", data, cacheExpiryOptions);
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public KMeans GetKMeansCache(string key)
        {
            KMeans value = null;
            memoryCache.TryGetValue(key + "KMeans", out value);
            return value;
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public void RemoveKMeansCache(string key)
        {
            memoryCache.Remove(key + "KMeans");
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public void SetKMeansCache(string key, KMeans data)
        {
            var cacheExpiryOptions = new MemoryCacheEntryOptions
            {
                AbsoluteExpiration = DateTime.Now.AddYears(1),
                Priority = CacheItemPriority.High,
                SlidingExpiration = TimeSpan.FromDays(365),
                Size = 1024,
            };
            memoryCache.Set(key+ "KMeans", data, cacheExpiryOptions);
        }

    }
}
