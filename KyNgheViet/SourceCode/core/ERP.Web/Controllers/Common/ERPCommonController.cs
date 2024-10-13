using Common.Utils;
using ERP.Common.Intfs.ERP;
using ERP.Common.Intfs.ERP.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.Common
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ERPCommonController : ControllerBase
    {
        private readonly IERPCommonService ERPCommonService;

        public ERPCommonController(IERPCommonService ERPCommonService)
        {
            this.ERPCommonService = ERPCommonService;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> ERP_Common_Generate_Voucher_No([FromBody]ERPCommon_ENTITY input)
        {
            return await this.ERPCommonService.ERP_Common_Generate_Voucher_No(input);
        }
        [HttpPost]
        public async Task<List<SYS_List_Voucher_ENTITY>> SYS_List_Voucher_Search([FromBody] SYS_List_Voucher_ENTITY input)
        {
            return await this.ERPCommonService.SYS_List_Voucher_Search(input);
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_Language_Translate_Action_By_Type([FromBody] SYS_Language_Translate_ENTITY input)
        {
            return await this.ERPCommonService.SYS_Language_Translate_Action_By_Type(input);
        }
        [HttpPost]
        public async Task<List<SYS_Language_Translate_ENTITY>> SYS_Language_Translate_Search([FromBody] SYS_Language_Translate_ENTITY input)
        {
            return await this.ERPCommonService.SYS_Language_Translate_Search(input);
        }[HttpPost]
        public async Task<List<SYS_Voucher_Year_ENTITY>> SYS_Voucher_Year_Search([FromBody] SYS_Voucher_Year_ENTITY input)
        {
            return await this.ERPCommonService.SYS_Voucher_Year_Search(input);
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_List_Voucher_Block_Book_Update([FromBody] SYS_List_Voucher_ENTITY input)
        {
            input.xml = input.voucher_details.ToXmlFromList2();
            return await this.ERPCommonService.SYS_List_Voucher_Block_Book_Update(input);
        }  
        [HttpPost]
        public async Task<IDictionary<string, object>> ERP_Common_Check_Voucher_Save([FromBody] ERPCommon_ENTITY input)
        {
            return await this.ERPCommonService.ERP_Common_Check_Voucher_Save(input);
        }
    }
}
