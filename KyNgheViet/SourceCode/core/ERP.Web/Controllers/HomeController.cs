using ERP.System.Intfs.Common;
using ERP.System.Intfs.Common.Dto;
using ERP.Web.Controllers.Upload;
using ERP.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace ERP.Web.Controllers
{

    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ISYSCommonService iCommonService;
        public HomeController(ILogger<HomeController> logger, ISYSCommonService iCommonService)
        {
            _logger = logger;
            this.iCommonService = iCommonService;
        }

        public IActionResult Index()
        {
            return Redirect("swagger");
        }
        public ActionResult HomeListCompany()
        {
            var result = this.iCommonService.SYS_List_Company_Search(new SYS_List_Company_ENTITY());
            return Json(result);
        }
        public IActionResult Privacy()
        {
            return View();
        }
        public IActionResult reCallFaceVerify(string emplyee_code = "")
        {
            string host = "https://api.erp.osoft.vn";
            //string host = Request.Scheme + "://" + Request.HttpContext.Request.Host;
            var client = new RestClient("https://ai.erp.osoft.vn/verify");
            client.Timeout = -1;
            var request = new RestRequest(Method.POST);
            if (string.IsNullOrEmpty(emplyee_code))
            {
                emplyee_code = "face-template";
            }
            request.AddHeader("Content-Type", "application/json");
            var body = @"{""img1_path"":""" + host + @"/FaceAI/EmployeeTraining/" + emplyee_code + @"/" + emplyee_code + @"-Left.jpg"", " + "\n" +
            @" ""img2_path"": """ + host + @"/FaceAI/CheckInOut/Temp/" + emplyee_code + @".jpg""," + "\n" +
            @"  ""model_name"": ""SFace""" + "\n" +
            @"  }";
            request.AddParameter("application/json", body, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            ViewBag.content = response.Content;
            return View();
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
