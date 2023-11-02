using ERP.Common.Filters;
using HRMS.Intfs.Branch;
using HRMS.Intfs.Branch.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.HRMS.Branch
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class HRM_BranchController : ControllerBase
    {
        private readonly IHRM_BranchService HRM_BranchService;

        public HRM_BranchController(IHRM_BranchService HRM_BranchService)
        {
            this.HRM_BranchService = HRM_BranchService;
        }
        [HttpPost]
        public async Task<List<HRM_Branch_ENTITY>> HRM_Branch_Search([FromBody] HRM_Branch_ENTITY input)
        {
            var result = await HRM_BranchService.HRM_Branch_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Branch_Actions([FromBody] HRM_Branch_ENTITY input)
        {
            var result = await HRM_BranchService.HRM_Branch_Actions(input);
            return result;
        }
    }
}
