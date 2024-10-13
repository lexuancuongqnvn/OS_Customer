using Common.Utils;
using ERP.Common.App_Data.Log;
using ERP.Common.Controllers;
using ERP.Common.Filters;
using ERP.Models;
using ERP.System.Intfs.Upload;
using ERP.System.Intfs.Upload.Dto;
using ERP.System.Shared;
using ERP.Web.Controllers.Recognition;
using ERP.Web.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Process.Models;
using RestSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Processing;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;



namespace ERP.Web.Controllers.Upload
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class FileManagerController : ControllerBase
    {
        public static readonly string AppDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
        private static List<FileRecord> fileDB = new List<FileRecord>();
        private readonly IWebHostEnvironment _env;

        public FileManagerController(IWebHostEnvironment env)
        {
            _env = env;
        }
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<FileRecord> PostFile([FromForm] FileModel model)
        {
            try
            {
                List<Upload_ENTITY> SaveDB = new List<Upload_ENTITY>();
                if (model.Type == 1)
                {
                    FileRecord record = new FileRecord();
                    Upload_ENTITY upload_ENTITY = new Upload_ENTITY();
                    upload_ENTITY.tbName = model.tbName;
                    upload_ENTITY.colName = model.colName;
                    for (int i = 0; i < model.MyFile.Length; i++)
                    {
                        Upload_ENTITY _v = await SaveFile(model.MyFile[i], model, upload_ENTITY);
                        if (record.Path != null) record.Path += ";"; record.Path += Request.Scheme +"://"+ Request.HttpContext.Request.Host + _v.path.Replace("\\","/");
                    }
                    return record;
                }
                else if (model.Type == 2)
                {
                    for (int i = 0; i < model.listFiles.Length; i++)
                    {
                        Upload_ENTITY v = JsonConvert.DeserializeObject<Upload_ENTITY>(model.listFiles[i]);
                        if (v.id > 0)
                        {
                            SaveDB.Add(v);
                        }
                        else
                        {
                            Upload_ENTITY _v = await SaveFile(model.MyFile[v.index], model, v);
                            SaveDB.Add(_v);
                        }
                    }
                    Upload_ENTITY param = new Upload_ENTITY();
                    param.XML_Data = SaveDB.ToXmlFromList();
                    var result = await ManagementController.GetDataFromStoredProcedure<Upload_ENTITY>(CommonStoreProcedure.SYS_Upload_Save, param);
                }else if(model.MyFile != null)
                {
                    FileRecord record = new FileRecord();
                    Upload_ENTITY upload_ENTITY = new Upload_ENTITY();
                    upload_ENTITY.tbName = model.tbName;
                    upload_ENTITY.colName = model.colName;
                    for (int i = 0; i < model.MyFile.Length; i++)
                    {
                        Upload_ENTITY _v = await SaveFile(model.MyFile[i], model, upload_ENTITY);
                        if (record.Path != null) record.Path += ";"; 
                        record.Path += Request.Scheme + "://" + Request.HttpContext.Request.Host + _v.path.Replace("\\", "/");
                    }
                    return record;
                }
                //List<Upload_ENTITY> files = await SYS_Upload_Save(param);
                return null;
            }
            catch (Exception ex)
            {
                List<FileRecord> file = new List<FileRecord>();
                file[0].Status = 500;
                file[0].Message = ex.Message;
                DirAppend.Main(ex.Message);
                return null;
            }
        }
        
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<FileRecord> PostFileNoHosting([FromForm] FileModel model)
        {
            try
            {
                List<Upload_ENTITY> SaveDB = new List<Upload_ENTITY>();
                if (model.Type == 1)
                {
                    FileRecord record = new FileRecord();
                    record.Id = 0;
                    Upload_ENTITY upload_ENTITY = new Upload_ENTITY();
                    upload_ENTITY.tbName = model.tbName;
                    upload_ENTITY.colName = model.colName;
                    for (int i = 0; i < model.MyFile.Length; i++)
                    {
                        Upload_ENTITY _v = await SaveFile(model.MyFile[i], model, upload_ENTITY);
                        if (record.Path != null) record.Path += ";"; record.Path +=_v.path.Replace("\\", "/");
                    }
                    return record;
                }
                else if (model.Type == 2)
                {
                    for (int i = 0; i < model.listFiles.Length; i++)
                    {
                        Upload_ENTITY v = JsonConvert.DeserializeObject<Upload_ENTITY>(model.listFiles[i]);
                        if (v.id > 0)
                        {
                            SaveDB.Add(v);
                        }
                        else
                        {
                            Upload_ENTITY _v = await SaveFile(model.MyFile[v.index], model, v);
                            SaveDB.Add(_v);
                        }
                    }
                    Upload_ENTITY param = new Upload_ENTITY();
                    param.XML_Data = SaveDB.ToXmlFromList();
                    var result = await ManagementController.GetDataFromStoredProcedure<Upload_ENTITY>(CommonStoreProcedure.SYS_Upload_Save, param);
                }

                //List<Upload_ENTITY> files = await SYS_Upload_Save(param);
                return null;
            }
            catch (Exception ex)
            {
                List<FileRecord> file = new List<FileRecord>();
                file[0].Status = 500;
                file[0].Message = ex.Message;
                DirAppend.Main(ex.Message);
                return null;
            }
        }
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<FileRecord> PostFile_v2([FromForm] FileModel model)
        {
            try
            {
                model.Type = 2;
                List<Upload_ENTITY> SaveDB = new List<Upload_ENTITY>();
                FileRecord record = new FileRecord();
                for (int i = 0; i < model.MyFile.Length; i++)
                {
                    if (model.MyFile[i] != null)
                    {
                        FileRecord file = new FileRecord();
                        Upload_ENTITY upload_ENTITY = new Upload_ENTITY();
                        upload_ENTITY.tbName = model.tbName;
                        upload_ENTITY.colName = model.colName;
                        string pathfolder = AppDirectory, Filepath = "\\UploadFiles\\" + upload_ENTITY.tbName + "\\" + upload_ENTITY.colName;
                        pathfolder += Filepath;
                        if (!Directory.Exists(pathfolder))
                            Directory.CreateDirectory(pathfolder);

                        var fileName = model.MyFile[i].FileName.Replace("." + model.MyFile[i].FileName.Split('.')[model.MyFile[i].FileName.Split('.').Length - 1], "") + "_" + DateTime.Now.Ticks.ToString() + Path.GetExtension(model.MyFile[i].FileName);
                        var path = Path.Combine(pathfolder, fileName);
                        file.FilePath = path;
                        file.FullPath = path;
                        file.Path = Path.Combine(Filepath, fileName);
                        file.FileName = fileName;
                        file.Size = model.MyFile[i].Length;
                        file.FileFormat = Path.GetExtension(model.MyFile[i].FileName);
                        file.ContentType = model.MyFile[i].ContentType;

                        using (var stream = new FileStream(path, FileMode.Create))
                        {
                            await model.MyFile[i].CopyToAsync(stream);
                        }
                        upload_ENTITY.path = file.Path;
                        upload_ENTITY.path_encode = ManagementController.EncryptString(file.Path);
                        upload_ENTITY.fileName = file.FileName;
                        upload_ENTITY.size = file.Size;
                        upload_ENTITY.name = model.MyFile[i].FileName;
                        upload_ENTITY.description = file.Description;
                        SaveDB.Add(upload_ENTITY);
                    }
                }

                Upload_ENTITY param = new Upload_ENTITY();
                param.XML_Data = SaveDB.ToXmlFromList();
                param.ref_master_code = model.ref_master_code;
                var result = await ManagementController.GetDataFromStoredProcedure<Upload_ENTITY>(model.stored, param);
                //List<Upload_ENTITY> files = await SYS_Upload_Save(param);
                FileRecord fileRecord = new FileRecord();
                try
                {
                    fileRecord.Status = result[0].status;
                    fileRecord.Message = result[0].message;
                    fileRecord.Ref_Master_str = result[0].ref_MasterID;
                    fileRecord.Description = result[0].description;
                }
                catch (Exception ex) {
                    fileRecord.Status = 500;
                    fileRecord.Message = ex.Message;
                }
                return fileRecord;
            }
            catch (Exception ex)
            {
                List<FileRecord> file = new List<FileRecord>();
                file[0].Status = 500;
                file[0].Message = ex.Message;
                DirAppend.Main(ex.Message);
                return null;
            }
        }
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<FileRecord> PostFile_v3([FromForm] FileModel model)
        {
            try
            {
                model.Type = 2;
                List<Upload_ENTITY> SaveDB = new List<Upload_ENTITY>();
                FileRecord record = new FileRecord();
                if(model.MyFile != null)
                    for (int i = 0; i < model.MyFile.Length; i++)
                    {
                        if (model.MyFile[i] != null)
                        {
                            FileRecord file = new FileRecord();
                            Upload_ENTITY upload_ENTITY = new Upload_ENTITY();
                            upload_ENTITY.tbName = model.tbName;
                            upload_ENTITY.colName = model.colName;
                            string pathfolder = AppDirectory, Filepath = "\\UploadFiles\\" + upload_ENTITY.tbName + "\\" + upload_ENTITY.colName;
                            pathfolder += Filepath;
                            if (!Directory.Exists(pathfolder))
                                Directory.CreateDirectory(pathfolder);

                            var fileName = model.MyFile[i].FileName.Replace("." + model.MyFile[i].FileName.Split('.')[model.MyFile[i].FileName.Split('.').Length - 1], "") + "_" + DateTime.Now.Ticks.ToString() + Path.GetExtension(model.MyFile[i].FileName);
                            var path = Path.Combine(pathfolder, fileName);
                            file.FilePath = path;
                            file.FullPath = path;
                            file.Path = Path.Combine(Filepath, fileName);
                            file.FileName = fileName;
                            file.Size = model.MyFile[i].Length;
                            file.FileFormat = Path.GetExtension(model.MyFile[i].FileName);
                            file.ContentType = model.MyFile[i].ContentType;

                            using (var stream = new FileStream(path, FileMode.Create))
                            {
                                await model.MyFile[i].CopyToAsync(stream);
                            }
                            upload_ENTITY.id = -1;
                            upload_ENTITY.tbName = model.tbName;
                            upload_ENTITY.colName = model.colName;
                            upload_ENTITY.ref_MasterID = model.ref_master_code;
                            upload_ENTITY.path = file.Path;
                            upload_ENTITY.path_encode = ManagementController.EncryptString(file.Path);
                            upload_ENTITY.fileName = file.FileName;
                            upload_ENTITY.size = file.Size;
                            upload_ENTITY.name = model.MyFile[i].FileName;
                            upload_ENTITY.description = file.Description;
                            SaveDB.Add(upload_ENTITY);
                        }
                    }

                Upload_ENTITY param = new Upload_ENTITY();
                param.XML_Data = SaveDB.ToXmlFromList();
                param.ref_master_code = model.ref_master_code;
                var result = await ManagementController.GetDataFromStoredProcedure<Upload_ENTITY>(model.stored, param);
                //List<Upload_ENTITY> files = await SYS_Upload_Save(param);
                FileRecord fileRecord = new FileRecord();
                try
                {
                    fileRecord.Status = result[0].status;
                    fileRecord.Message = result[0].message;
                    fileRecord.Ref_Master_str = result[0].ref_MasterID;
                    fileRecord.Description = result[0].description;
                }
                catch (Exception ex)
                {
                    fileRecord.Status = 500;
                    fileRecord.Message = ex.Message;
                }
                return fileRecord;
            }
            catch (Exception ex)
            {
                List<FileRecord> file = new List<FileRecord>();
                file[0].Status = 500;
                file[0].Message = ex.Message;
                DirAppend.Main(ex.Message);
                return null;
            }
        }
        [HttpPost]
        public async Task<string> ConvertBase64ToImageLink([FromBody] FileRecord model)
        {
            string path =  "\\FaceAI\\CheckInOut\\Temp\\";
            string name = model.code + ".jpg";
            //bool check = SaveBase64ToImage(model.base64, AppDirectory + path, name);
            try
            {
                bool is_android = false;
                if(!string.IsNullOrEmpty(model.Message)==true)
                    if(model.Message.ToUpper() == "ANDROID") is_android = true;

                bool checkresize = resizeImage(model.base64, new Size(255, 256), FileManagerController.AppDirectory + path, name,100000,is_android);
                if (checkresize)
                {
                    //await RequestForStart(model.code);
                    return path.Replace("\\", "/") + name;
                }
            }
            catch (Exception ex)
            {
            }
            return "";
        }
        [HttpGet]
        //[Consumes("multipart/form-data")]
        public FileStreamResult DownloadByPath(string filePath)
        {
            filePath = filePath.Replace('\\','/'); 
            string filename = filePath.Split('/')[filePath.Split('/').Length - 1];
            string filepath = string.Concat(Directory.GetCurrentDirectory(), "\\wwwroot", filePath.Replace("\\" + filename, "")).Replace('\\', '/');
            string fullName = Path.Combine(filepath, filename);
            return File(new FileStream(filepath, FileMode.Open), "application/pdf", filename);
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<Boolean> RequestForStart(string emplyee_code)
        {
            try
            {
                string host = Request.Scheme + "://" + Request.HttpContext.Request.Host;
                var client = new RestClient("https://ai.erp.osoft.vn/verify");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                if (!string.IsNullOrEmpty(emplyee_code))
                {
                    emplyee_code = "face-template";
                }
                request.AddHeader("Content-Type", "application/json");
                var body = @"{""img1_path"":"""+ host + @"/FaceAI/EmployeeTraining/" + emplyee_code + @"/" + emplyee_code + @"-Left.jpg"", " + "\n" +
                @" ""img2_path"": """ + host + @"/FaceAI/CheckInOut/Temp/" + emplyee_code + @".jpg""," + "\n" +
                @"  ""model_name"": ""SFace""" + "\n" +
                @"  }";
                request.AddParameter("application/json", body, ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
          
                return true;
            }
            catch 
            {
                return false;
            }
           
           
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        private async Task<List<FileRecord>> SaveFileAsync(IFormFile[] Files, FileModel fileModel)
        {
            List<FileRecord> reslt = new List<FileRecord>();
            for (int i = 0; i< Files.Length; i++)
            {
                FileRecord file = new FileRecord();
                IFormFile myFile = Files[i];
                if (myFile != null)
                {
                    string pathfolder = AppDirectory, Filepath = "\\UploadFiles\\" + fileModel.tbName + "\\" + fileModel.colName;
                    pathfolder += Filepath;
                    if (!Directory.Exists(pathfolder))
                        Directory.CreateDirectory(pathfolder);

                    var fileName = myFile.FileName.Replace("." + myFile.FileName.Split('.')[myFile.FileName.Split('.').Length - 1], "") + "_" + DateTime.Now.Ticks.ToString() + Path.GetExtension(myFile.FileName);
                    var path = Path.Combine(pathfolder, fileName);
                    file.FilePath = path;
                    file.Id = -1;
                    file.FullPath = path;
                    file.Path = Path.Combine(Filepath, fileName);
                    file.FileName = fileName;
                    file.Size = myFile.Length;
                    file.FileFormat = Path.GetExtension(myFile.FileName);
                    file.ContentType = myFile.ContentType;

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await myFile.CopyToAsync(stream);
                    }
                    reslt.Add(file);
                }
            }
            return reslt;
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        private async Task<Upload_ENTITY> SaveFile(IFormFile myFile, FileModel fileModel, Upload_ENTITY f)
        {
            FileRecord file = new FileRecord();
            if (myFile != null)
            {
                string pathfolder = AppDirectory, Filepath = "\\UploadFiles\\" + f.tbName + "\\" + f.colName;
                pathfolder += Filepath;
                if (!Directory.Exists(pathfolder))
                    Directory.CreateDirectory(pathfolder);

                var fileName = myFile.FileName.Replace("." + myFile.FileName.Split('.')[myFile.FileName.Split('.').Length - 1], "") + "_" + DateTime.Now.Ticks.ToString() + Path.GetExtension(myFile.FileName);
                var path = Path.Combine(pathfolder, fileName);
                file.FilePath = path;
                file.FullPath = path;
                file.Path = Path.Combine(Filepath, fileName);
                file.FileName = fileName;
                file.Size = myFile.Length;
                file.FileFormat = Path.GetExtension(myFile.FileName);
                file.ContentType = myFile.ContentType;

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await myFile.CopyToAsync(stream);
                }
                f.path = file.Path;
                f.fileName = file.FileName;
                f.size = file.Size;
                f.name = myFile.FileName;
                f.description = file.Description;
            }
            return f;
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        private async Task<List<Upload_ENTITY>> SaveFile(IFormFile myFile, FileModel fileModel, Upload_ENTITY f,List<Upload_ENTITY> listFiles)
        {
            FileRecord file = new FileRecord();
            if (myFile != null)
            {
                string pathfolder = AppDirectory, Filepath = "\\UploadFiles\\" + f.tbName + "\\" + f.colName;
                pathfolder += Filepath;
                if (!Directory.Exists(pathfolder))
                    Directory.CreateDirectory(pathfolder);

                var fileName = myFile.FileName.Replace("." + myFile.FileName.Split('.')[myFile.FileName.Split('.').Length - 1], "") + "_" + DateTime.Now.Ticks.ToString() + Path.GetExtension(myFile.FileName);
                var path = Path.Combine(pathfolder, fileName);
                file.FilePath = path;
                file.FullPath = path;
                file.Path = Path.Combine(Filepath, fileName);
                file.FileName = fileName;
                file.Size = myFile.Length;
                file.FileFormat = Path.GetExtension(myFile.FileName);
                file.ContentType = myFile.ContentType;

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await myFile.CopyToAsync(stream);
                }
                f.path = file.Path;
                f.fileName = file.FileName;
                f.size = file.Size;
                f.name = myFile.FileName;
                f.description = file.Description;
            }
            listFiles.Add(f);
            return listFiles;
        }

        public static async Task<Upload_ENTITY> SaveFile(IFormFile myFile)
        {
            FileRecord file = new FileRecord();
            Upload_ENTITY f = new Upload_ENTITY();
            if (myFile != null)
            {
                string pathfolder = AppDirectory, Filepath = "\\UploadFiles\\" + f.tbName + "\\" + f.colName;
                pathfolder += Filepath;
                if (!Directory.Exists(pathfolder))
                    Directory.CreateDirectory(pathfolder);

                var fileName = myFile.FileName.Replace("." + myFile.FileName.Split('.')[myFile.FileName.Split('.').Length - 1], "") + "_" + DateTime.Now.Ticks.ToString() + Path.GetExtension(myFile.FileName);
                var path = Path.Combine(pathfolder, fileName);
                file.FilePath = path;
                file.FullPath = path;
                file.Path = Path.Combine(Filepath, fileName);
                file.FileName = fileName;
                file.Size = myFile.Length;
                file.FileFormat = Path.GetExtension(myFile.FileName);
                file.ContentType = myFile.ContentType;

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await myFile.CopyToAsync(stream);
                }
                f.path = file.Path;
                f.fileName = file.FileName;
                f.size = file.Size;
                f.description = file.Description;
            }
            return f;
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public static void SaveFile(byte[] files,string path,string filename)
        {
            if (filename != null && filename.Length > 0 && files != null)
            {
                string p = path + filename;
                if (!Directory.Exists(Path.GetDirectoryName(path)))
                    Directory.CreateDirectory(Path.GetDirectoryName(path));

                using (var stream = new FileStream(p, FileMode.Create))
                {
                    stream.Write(files, 0, files.Length);
                    stream.Close();
                }
            }
        } 
        [ApiExplorerSettings(IgnoreApi = true)]
        private void SaveToDB(FileRecord record)
        {
            if (record == null)
                throw new ArgumentNullException($"{nameof(record)}");

            FileData fileData = new FileData();
            fileData.FilePath = record.FilePath;
            fileData.FileName = record.FileName;
            fileData.FileExtension = record.FileFormat;
            fileData.MimeType = record.ContentType;
 
            //dBContext.FileData.Add(fileData);
            //dBContext.SaveChanges();
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public List<FileRecord> GetAllFiles()
        {
            //getting data from inmemory obj
            //return fileDB;
            //getting data from SQL DB
            //return dBContext.FileData.Select(n => new FileRecord
            //{
            //    Id = n.Id,
            //    ContentType = n.MimeType,
            //    FileFormat = n.FileExtension,
            //    FileName = n.FileName,
            //    FilePath = n.FilePath
            //}).ToList();
            return null;
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<IActionResult> DownloadFile(int id)
        {
            if (!Directory.Exists(AppDirectory))
                Directory.CreateDirectory(AppDirectory);

            //getting file from inmemory obj
            //var file = fileDB?.Where(n => n.Id == id).FirstOrDefault();
            //getting file from DB
            //var file = dBContext.FileData.Where(n => n.Id == id).FirstOrDefault();

            var path = Path.Combine(AppDirectory, "");

            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            var contentType = "APPLICATION/octet-stream";
            var fileName = Path.GetFileName(path);

            return File(memory, contentType, fileName);
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public static bool SaveBase64ToImage(string base64,string path,string name)
        {
            try
            {
                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);
                byte[] bytes = Convert.FromBase64String(base64);
                Image image;
                using (MemoryStream ms = new MemoryStream(bytes))
                {
                    image = Image.FromStream(ms);
                    image.Save(path+ name);
                    ms.Dispose();
                }
                return true;
            }catch (Exception ex)
            {
                return false;
            }
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public static Image ConvertBase64ToImage(string base64)
        {
            try
            {
                byte[] bytes = Convert.FromBase64String(base64);
                using (MemoryStream ms = new MemoryStream(bytes))
                {
                    return Image.FromStream(ms);
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public static bool SaveImage(Image image, string path, string name)
        {
            try
            {
                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);
                using (var stream = new FileStream(path+ name, FileMode.Create))
                {
                    image.Save(stream, ImageFormat.Jpeg);
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public static Image Base64StringImage(string base64String, int width, int height)
        {
            // Convert Base64 String to byte[]
            byte[] imageBytes = Convert.FromBase64String(base64String);
            MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length);
            // Convert byte[] to Image
            ms.Write(imageBytes, 0, imageBytes.Length);
            Image image = Image.FromStream(ms, true);
            var destRect = new Rectangle(0, 0, width, height);
            var destImage = new Bitmap(width, height);
            destImage.SetResolution(image.HorizontalResolution, image.VerticalResolution);
            using (var graphics = Graphics.FromImage(destImage))
            {
                graphics.CompositingMode = CompositingMode.SourceCopy;
                graphics.CompositingQuality = CompositingQuality.HighQuality;
                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphics.SmoothingMode = SmoothingMode.HighQuality;
                graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;
                using (var wrapMode = new ImageAttributes())
                {
                    wrapMode.SetWrapMode(WrapMode.TileFlipXY);
                    graphics.DrawImage(image, destRect, 0, 0, image.Width,
                    image.Height, GraphicsUnit.Pixel, wrapMode);
                }
            }
            return (Image)destImage;
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public static bool resizeImage(Image imgToResize, Size size,string path, string name,bool is_android = false)
        {
            try
            {
                if (is_android == true) imgToResize.RotateFlip(RotateFlipType.Rotate90FlipY);
                else imgToResize.RotateFlip(RotateFlipType.Rotate90FlipNone);

                //Get the image current width  
                int sourceWidth = imgToResize.Width;
                //Get the image current height  
                int sourceHeight = imgToResize.Height;
                float nPercent = 0;
                float nPercentW = 0;
                float nPercentH = 0;
                //Calulate  width with new desired size  
                nPercentW = ((float)size.Width / (float)sourceWidth);
                //Calculate height with new desired size  
                nPercentH = ((float)size.Height / (float)sourceHeight);
                if (nPercentH < nPercentW)
                    nPercent = nPercentH;
                else
                    nPercent = nPercentW;
                //New Width  
                int destWidth = (int)(sourceWidth * nPercent);
                //New Height  
                int destHeight = (int)(sourceHeight * nPercent);
                Bitmap b = new Bitmap(destWidth, destHeight);
                Graphics g = Graphics.FromImage((Image)b);
                g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                // Draw image with new width and height  
                g.DrawImage(imgToResize, 0, 0, destWidth, destHeight);
                g.Dispose();
                SaveImage((Image)b, path, "_re"+name);
                return true;
            }
            catch { return false; }
        }
        public static bool resizeImage(string base64, Size size, string path, string name,double maxLength, bool is_android)
        {
            try
            {
                base64 = base64.Replace("data:image/jpeg;base64,", "");
                //if (is_android == true)
                //{
                //    SaveBase64ToImage(base64, path, name);
                //    return true;
                //}
                byte[] imageBytes = Convert.FromBase64String(base64);
                Image imgToResize;
                //DirAppend.Main(name + " : " + base64);
                using (var ms = new MemoryStream(imageBytes))
                {
                    imgToResize = Image.FromStream(ms);

                    // Rotate image based on width and height comparison
                    if (imgToResize.Width >= imgToResize.Height)
                    {
                        if(is_android == true)
                            imgToResize.RotateFlip(RotateFlipType.Rotate90FlipY);
                        else
                            imgToResize.RotateFlip(RotateFlipType.Rotate90FlipNone);
                    }

                    double fileSizeKB = ms.Length / 1024; // or some other data container

                    // Get the image current width and height
                    int sourceWidth = imgToResize.Width;
                    int sourceHeight = imgToResize.Height;

                    // Calculate the scaling factor
                    float nPercentW = ((float)size.Width / (float)sourceWidth);
                    float nPercentH = ((float)size.Height / (float)sourceHeight);
                    float nPercent = Math.Min(nPercentW, nPercentH);
                    
                    // Calculate the new dimensions
                    int destWidth = (int)(sourceWidth * nPercent);
                    int destHeight = (int)(sourceHeight * nPercent);
                    
                    // Create a new bitmap with the desired dimensions
                    Bitmap b = new Bitmap(destWidth, destHeight);
                    // Preserve the original image's orientation metadata
                  
                    // Perform the resizing
                    using (Graphics g = Graphics.FromImage(b))
                    {
                        g.SmoothingMode = SmoothingMode.AntiAlias;
                        g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                        g.PixelOffsetMode = PixelOffsetMode.HighQuality;

                        g.DrawImage(imgToResize, 0, 0, destWidth, destHeight);
                    }
                    //string fullPath = Path.Combine(path, name);
                    //b.Save(fullPath, ImageFormat.Jpeg);
                    // Save the resized image
                    SaveImage(b, path, name);
                }

                return true;
            }
            catch (Exception ex)
            {
                DirAppend.Main(ex.Message);
                return false;
            }
        }
        public static byte[] ResizeImage(byte[] imageData, int newWidth, int newHeight)
        {
            using (var stream = new MemoryStream(imageData))
            using (var image = Image.FromStream(stream))
            using (var resizedImage = new Bitmap(newWidth, newHeight))
            using (var graphics = Graphics.FromImage(resizedImage))
            {
                // Preserve the original image's orientation metadata
                foreach (var property in image.PropertyItems)
                {
                    resizedImage.SetPropertyItem(property);
                }

                graphics.DrawImage(image, 0, 0, newWidth, newHeight);
                using (var output = new MemoryStream())
                {
                    resizedImage.Save(output, image.RawFormat);
                    return output.ToArray();
                }
            }
        }
        public static string GetImageBase64(string path)
        {
            using (Image image = Image.FromFile(path))
            {
                using (MemoryStream m = new MemoryStream())
                {
                    image.Save(m, image.RawFormat);
                    byte[] imageBytes = m.ToArray();

                    // Convert byte[] to Base64 String
                    string base64String = Convert.ToBase64String(imageBytes);
                    return base64String;
                }
            }
        }
        public static string GetImageTypeBase64(string path)
        {
            using (Image image = Image.FromFile(path))
            {
                using (MemoryStream m = new MemoryStream())
                {
                    image.Save(m, image.RawFormat);
                    byte[] imageBytes = m.ToArray();

                    // Convert byte[] to Base64 String
                    string base64Content = Convert.ToBase64String(imageBytes);

                    
                    return "data:image/"+ path.Split(".")[path.Split(".").Length - 1] + ";base64," + base64Content;
                }
            }
        }
        public static string GetImageTypeBase64OnHosting(string path)
        {
            path = AppDirectory + path;
            using (Image image = Image.FromFile(path))
            {
                using (MemoryStream m = new MemoryStream())
                {
                    image.Save(m, image.RawFormat);
                    byte[] imageBytes = m.ToArray();

                    // Convert byte[] to Base64 String
                    string base64Content = Convert.ToBase64String(imageBytes);


                    return "data:image/" + path.Split(".")[path.Split(".").Length - 1] + ";base64," + base64Content;
                }
            }
        }
        public static async Task DeleteFile(string path)
        {
            FileInfo fileInfo = new FileInfo(path);
            try
            {
                fileInfo.Delete();
            }
            catch (Exception ex) { }
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public bool CheckFileExists(string filePath)
        {
            string webRootPath = _env.WebRootPath;
            string dirPath = Path.Combine(webRootPath, filePath);

            if (Directory.Exists(dirPath))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
