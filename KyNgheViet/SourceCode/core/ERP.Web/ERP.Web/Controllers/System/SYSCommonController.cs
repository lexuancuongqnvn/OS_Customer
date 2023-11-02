using ERP.Common.Filters;
using ERP.Common.Models;
using ERP.System.Intfs.Common;
using ERP.System.Intfs.Common.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.System
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class SYSCommonController : ControllerBase
    {
        private readonly ISYSCommonService iCommonService;

        public SYSCommonController(ISYSCommonService iCommonService)
        {
            this.iCommonService = iCommonService;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_List_App_Actions([FromBody] SYS_List_App_ENTITY input)
        {
            var result = await this.iCommonService.SYS_List_App_Actions(input);
            return result;
        }
        [HttpPost]
        public async Task<List<SYS_List_App_ENTITY>> SYS_List_App_Search([FromBody] SYS_List_App_ENTITY input)
        {
            var result = await this.iCommonService.SYS_List_App_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<SYS_List_Company_ENTITY>> SYS_List_Company_Search([FromBody] SYS_List_Company_ENTITY input)
        {
            var result = await this.iCommonService.SYS_List_Company_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<Colors>> SYS_Color_Acctions([FromBody] Colors input)
        {
            var result = await this.iCommonService.SYS_Color_Acctions(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_Alter_Table_Voucher([FromBody] SYS_Alter_Table_Voucher_ENTITY input)
        {
            var result = await this.iCommonService.SYS_Alter_Table_Voucher(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_List_App_Group_Actions([FromBody] SYS_List_App_Group_ENTITY input)
        {
            var result = await this.iCommonService.SYS_List_App_Group_Actions(input);
            return result;
        }
        [HttpPost]
        public async Task<List<SYS_List_App_Group_ENTITY>> SYS_List_App_Group_Search([FromBody] SYS_List_App_Group_ENTITY input)
        {
            var result = await this.iCommonService.SYS_List_App_Group_Search(input);
            return result;
        }
    }
}
