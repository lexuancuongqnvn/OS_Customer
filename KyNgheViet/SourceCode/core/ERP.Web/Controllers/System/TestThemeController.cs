using Common.Utils;
using ERP.Common.Controllers;
using ERP.Common.Filters;
using ERP.System.Intfs.TestTheme;
using ERP.System.Intfs.TestTheme.Dto;
using ERP.System.Intfs.Upload;
using ERP.System.Intfs.Upload.Dto;
using ERP.System.Shared;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.System
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class TestThemeController : ControllerBase
    {
        private readonly ITestThemeService TestThemeRepository;

        public TestThemeController(ITestThemeService testThemeRepository)
        {
            this.TestThemeRepository = testThemeRepository;
        }
        [HttpPost]
        public async Task<tb_TestTheme_ENTITY> TestTheme_Search_byID(string code)
        {
            var result = await TestThemeRepository.TestTheme_Search_byID(code);
            List<Upload_ENTITY> param = new List<Upload_ENTITY>();
            var t = new Upload_ENTITY();
            t.tbName = "tb_TestTheme";
            t.ref_MasterID = code;
            param.Add(t);
            t.XML_Data = param.ToXmlFromList();
            List<Upload_ENTITY> listFiles = await ManagementController.GetDataFromStoredProcedure<Upload_ENTITY>(CommonStoreProcedure.SYS_Upload_Get, t);

            foreach (var item in listFiles)
            {
                if (result.col_Images == null) result.col_Images = new List<Upload_ENTITY>();
                if (result.col_meadia == null) result.col_meadia = new List<Upload_ENTITY>();
                if (result.col_multimedia == null) result.col_multimedia = new List<Upload_ENTITY>();
                if (item.colName.ToUpper() == "col_Images".ToUpper())
                    result.col_Images.Add(item);
                if (item.colName.ToUpper() == "col_meadia".ToUpper())
                    result.col_meadia.Add(item);
                if (item.colName.ToUpper() == "col_multimedia".ToUpper())
                    result.col_multimedia.Add(item);
            }
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> TestTheme_Update([FromBody]tb_TestTheme_ENTITY input)
        {
            input.XML_Detail1 = input.tb_TestTheme_Sub1.ToXmlFromList();
            input.XML_Detail2 = input.tb_TestTheme_Sub2.ToXmlFromList();
            input.XML_Detail3 = input.tb_TestTheme_Sub3.ToXmlFromList();
            var result = await TestThemeRepository.TestTheme_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> TestTheme_Insert([FromBody]tb_TestTheme_ENTITY input)
        {
            input.XML_Detail1 = input.tb_TestTheme_Sub1.ToXmlFromList();
            input.XML_Detail2 = input.tb_TestTheme_Sub2.ToXmlFromList();
            input.XML_Detail3 = input.tb_TestTheme_Sub3.ToXmlFromList();
            var result = await TestThemeRepository.TestTheme_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<tb_TestTheme_ENTITY>> TestTheme_Search([FromBody] tb_TestTheme_ENTITY input)
        {
            var result = await TestThemeRepository.TestTheme_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> TestTheme_Del(string code)
        {
            var result = await TestThemeRepository.TestTheme_Del(code);
            return result;
        }
    }
}
