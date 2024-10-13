using DocumentFormat.OpenXml.Spreadsheet;
using ERP.Web.Controllers.Upload;
using HRMS.Impls.Employee;
using HRMS.Intfs.Employee;
using HRMS.Intfs.Employee.Dto;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using PuppeteerSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

//using Microsoft.Web.WebView2.Core;
//using Microsoft.Web.WebView2.WinForms;

namespace ERP.Web.Controllers.Recognition
{
    public class FaceRecognitionController : Controller
    {
        private readonly IEmployeeService employeeService;

        public FaceRecognitionController(IEmployeeService employeeService)
        {
            this.employeeService = employeeService;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public async Task GetUsersData([FromBody] HRM_Employee_Check_In_Out_ENTITY input)
        {
            using (var client = new HttpClient())
            {
                var uri = new Uri("https://localhost:44390/FaceRecognition/Recognition");
                var response = client.GetAsync(uri).GetAwaiter().GetResult();
                if (response.IsSuccessStatusCode)
                {
                    var responseContent = response.Content;
                    string result = responseContent.ReadAsStringAsync().GetAwaiter().GetResult();
                }
            }
        }
        [HttpPost]
        public async Task<IActionResult> PostResultRecognition([FromBody] FaceInfo input)
        {
            string url = "https://api.erp.osoft.vn/FaceRecognition/CheckInOutRecognition?employee_code=B1510724-BFD1-4A12-A8DC-E5F2292100E2&dif=50&setting=0";
            string result = await ExecuteJavaScriptOnWebPage(url, "updateResult()");
            return Ok(result);
        }
        public async Task<string> ExecuteJavaScriptOnWebPage(string url, string script)
        {
            try
            {
                var launchOptions = new LaunchOptions
                {
                    Headless = true,
                    ExecutablePath = "/FaceRecognition/CheckInOutRecognition?employee_code=B1510724-BFD1-4A12-A8DC-E5F2292100E2&dif=50&setting=0e"
                };
                using (var browser = await Puppeteer.LaunchAsync(launchOptions))
                {
                    using (var page = await browser.NewPageAsync())
                    {
                        await page.GoToAsync(url);
                        var result = await page.EvaluateExpressionAsync<string>(script);
                        return result;
                    }
                }
                
            }catch(Exception ex)
            {
                return null;
            }
        }
        [HttpPost]
        public async Task<IActionResult> InvokeAsyncFunction()
        {
            //string url = "https://example.com";
            //string jsFunction = "getSomeDataAsync"; // Replace with the name of your async function

            //string result = await GetValueFromWebPage(Request.Scheme + "://" + Request.Host.Value, "B1510724-BFD1-4A12-A8DC-E5F2292100E2", 100);
            using (var httpClient = new HttpClient())
            {
                HttpResponseMessage response = await httpClient.GetAsync("https://localhost:44390/FaceRecognition/CheckInOutRecognition?employee_code=B1510724-BFD1-4A12-A8DC-E5F2292100E2&dif=50&setting=0");
                Thread.Sleep(10000);
                if (response.IsSuccessStatusCode)
                {
                    string responseData = await response.Content.ReadAsStringAsync();
                    return Ok(responseData);
                }
                else
                {
                    // Handle the error if the request was not successful
                    throw new Exception($"Request failed with status code {response.StatusCode}");
                }
            }
            return Ok("OK");
        }
        public static async Task<string> GetValueFromWebPage(string domain, string employee_code,int dif)
        {
            try
            {
                var launchOptions = new LaunchOptions { Headless = true };
                await new BrowserFetcher().DownloadAsync(BrowserFetcher.DefaultChromiumRevision);
                var newid = Guid.NewGuid();
                //string url = "https://justadudewhohacks.github.io/face-api.js/face_expression_recognition/";
                string url = domain + "/FaceRecognition/CheckInOutRecognition?employee_code="+ employee_code + "&dif="+ dif + "&setting=0";

                using (var browser = await Puppeteer.LaunchAsync(launchOptions))
                using (var page = await browser.NewPageAsync())
                {

                    //await page.GoToAsync(url);
                    await page.GoToAsync(url, new NavigationOptions { WaitUntil = new[] { WaitUntilNavigation.Networkidle0 } });
                    //return "OK";
                    // Append a cache-busting parameter to the URL
                    //var cacheBusterUrl = $"{url}?_={DateTimeOffset.Now.ToUnixTimeMilliseconds()}";

                    //await page.GoToAsync(cacheBusterUrl);

                    // Wait for the results page to load and display the results.
                    var inputSelector = ".value-distance";
                    await page.WaitForSelectorAsync(inputSelector); // Wait for the input element to appear

                    await page.ExposeFunctionAsync("onInputChange", async () =>
                    {
                        // Retrieve the input value and resolve the promise
                        var inputValue = await page.EvaluateExpressionAsync<string>("document.querySelector('" + inputSelector + "').value");
                        return inputValue;
                    });

                    await page.EvaluateExpressionAsync("document.querySelector('" + inputSelector + "').addEventListener('change', () => onInputChange())");

                    var inputValue = await page.EvaluateFunctionAsync<string>("() => new Promise(resolve => { window.onInputChange().then(resolve); })");

                    return inputValue;
                }
            }catch(Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost]
        public async Task<string> GetBase64CheckInTemp(string employee_code)
        {
            string filePath = FileManagerController.AppDirectory + "\\FaceAI\\CheckInOut\\Temp\\" + employee_code + ".jpg";
            string base64 = "data:image/jpeg;base64," + FileManagerController.GetImageBase64(filePath);
            return base64;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Employee_Check_In_Out_Face_Training_Update([FromBody] FaceInfoFaceTrainingUpdate input)
        {
            return await employeeService.HRM_Employee_Check_In_Out_Face_Training_Update(input);
        }
        public async Task<IActionResult> CheckInOutRecognition(string employee_code,int dif,int setting=0)
        {
            HRM_Employee_Check_In_Out_ENTITY input = new HRM_Employee_Check_In_Out_ENTITY();
            input.employee_code = employee_code;
           
            var pr = new HRM_Employee_Check_In_Out_Image_Training_ENTITY();
            pr.employee_code = input.employee_code;
            List<HRM_Employee_Check_In_Out_Image_Training_ENTITY> list_img_trainings = await employeeService.HRM_Employee_Check_In_Out_Face_Training_Search(pr);
            if (list_img_trainings != null && list_img_trainings.Count > 0)
            {
                input.hRM_Employee_Check_In_Out_Image_Trainings = list_img_trainings[0];
                ViewBag.age = input.hRM_Employee_Check_In_Out_Image_Trainings.min_age.ToString().Replace(",",".");
                ViewBag.gender = input.hRM_Employee_Check_In_Out_Image_Trainings.gender;
            }
            else 
            {
                input.hRM_Employee_Check_In_Out_Image_Trainings = new HRM_Employee_Check_In_Out_Image_Training_ENTITY();
                ViewBag.age = 0;
                ViewBag.gender = "";
            }

            input.status = 0;
            input.message = "Success";

            for (int i = 0; i < 4; i++)
            {
                string path = "\\FaceAI\\EmployeeTraining\\" + input.employee_code + "\\";
                string name = input.employee_code;

                if (i == 0)
                {
                    name += "-Left.jpg";
                    input.hRM_Employee_Check_In_Out_Image_Trainings.left = Request.Scheme + "://" + Request.HttpContext.Request.Host + path.Replace("\\", "/") + name;
                    input.hRM_Employee_Check_In_Out_Image_Trainings.left_base64 = "data:image/jpeg;base64," + FileManagerController.GetImageBase64(FileManagerController.AppDirectory + path + name);
                }
                if (i == 1)
                {
                    name += "-Right.jpg";
                    input.hRM_Employee_Check_In_Out_Image_Trainings.right = Request.Scheme + "://" + Request.HttpContext.Request.Host + path.Replace("\\", "/") + name;
                    input.hRM_Employee_Check_In_Out_Image_Trainings.right_base64 = "data:image/jpeg;base64," + FileManagerController.GetImageBase64(FileManagerController.AppDirectory + path + name);
                }
                if (i == 2)
                {
                    name += "-Top.jpg";
                    input.hRM_Employee_Check_In_Out_Image_Trainings.top = Request.Scheme + "://" + Request.HttpContext.Request.Host + path.Replace("\\", "/") + name;
                    input.hRM_Employee_Check_In_Out_Image_Trainings.top_base64 = "data:image/jpeg;base64," + FileManagerController.GetImageBase64(FileManagerController.AppDirectory + path + name);
                }
                if (i == 3)
                {
                    name += "-Bottom.jpg";
                    input.hRM_Employee_Check_In_Out_Image_Trainings.bottom = Request.Scheme + "://" + Request.HttpContext.Request.Host + path.Replace("\\", "/") + name;
                    input.hRM_Employee_Check_In_Out_Image_Trainings.bottom_base64 = "data:image/jpeg;base64," + FileManagerController.GetImageBase64(FileManagerController.AppDirectory + path + name);
                }
                if (i == 4)
                {
                    name += "-Center.jpg";
                    input.hRM_Employee_Check_In_Out_Image_Trainings.center = Request.Scheme + "://" + Request.HttpContext.Request.Host + path.Replace("\\", "/") + name;
                    input.hRM_Employee_Check_In_Out_Image_Trainings.center_base64 = "data:image/jpeg;base64," + FileManagerController.GetImageBase64(FileManagerController.AppDirectory + path + name);
                }
                FileInfo file = new FileInfo(FileManagerController.AppDirectory + path + name);
                if (!file.Exists)
                {
                    input.status = 1;
                    input.message = "Face training Not found";
                }
            }
            if (input.type == "CHECKIN-ON-APP" && !string.IsNullOrEmpty(input.link_image))
            {
                try
                {
                    input.base64 = "data:image/jpeg;base64," + FileManagerController.GetImageBase64(FileManagerController.AppDirectory + input.link_image.Replace("/", "\\"));
                }
                catch { }
            }
            //if (setting != 1)
            //{
            //    ViewBag.myFace = "data:image/jpeg;base64," + FileManagerController.GetImageBase64(filePath);
            //    await FileManagerController.DeleteFile(filePath);
            //}
            ViewBag.Customers = input;
            if (dif == null) dif = 1;
            ViewBag.dif = dif;
            ViewBag.setting = setting;

            return View();
        }
        
    }
}
