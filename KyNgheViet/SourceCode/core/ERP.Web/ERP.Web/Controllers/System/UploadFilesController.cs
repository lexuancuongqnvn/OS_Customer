using Common.Utils;
using ERP.Common.Filters;
using ERP.System.Intfs.Upload;
using ERP.System.Intfs.Upload.Dto;
using Microsoft.AspNetCore.Mvc;
using Process.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.System
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    
    public class UploadFilesController : Controller
    {
        private IUploadService UploadService;

        public UploadFilesController(IUploadService uploadService)
        {
            this.UploadService = uploadService;
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public async Task<List<Upload_ENTITY>> SYS_Upload_Get([FromBody]Upload_ENTITY input)
        {
            var result = await UploadService.SYS_Upload_Get(input);
            return result;
        }
        [HttpPost]
        public async Task<List<Upload_ENTITY>> SYS_Upload_Save([FromBody] List<Upload_ENTITY> input)
        {
            Upload_ENTITY upload_ENTITY = new Upload_ENTITY();
            upload_ENTITY.XML_Data = input.ToXmlFromList();
            upload_ENTITY.type = "update";
            var result = await UploadService.SYS_Upload_Save(upload_ENTITY);
            return result;
        }
        [HttpPost]
        public async Task<List<Upload_ENTITY>> SYS_Upload_Search([FromBody]Upload_ENTITY input)
        {
            var result = await UploadService.SYS_Upload_Search(input);
            return result;
        }
    }
}
