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
            if(result != null && !string.IsNullOrEmpty(input.code))
            {
                var pr = new HRM_Branch_Detail_ENTITY();
                pr.code = input.code;
                result[0].hRM_Branch_Details = await HRM_BranchService.HRM_Branch_Detail_Search(pr);
            }
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Branch_Actions([FromBody] HRM_Branch_ENTITY input)
        {
            foreach(var item in input.hRM_Branch_Details)
            {
                switch (item.apply_name)
                {
                    case "monday":
                        input.is_mo = item.is_apply;
                        input.from_mo = item.start_time;
                        input.to_mo = item.end_time;
                        break;
                    case "tuesday":
                        input.is_tu = item.is_apply;
                        input.from_tu = item.start_time;
                        input.to_tu = item.end_time;
                        break;
                    case "wednesday":
                        input.is_we = item.is_apply;
                        input.from_we = item.start_time;
                        input.to_we = item.end_time;
                        break;
                    case "thursday":
                        input.is_th = item.is_apply;
                        input.from_th = item.start_time;
                        input.to_th = item.end_time;
                        break;
                    case "friday":
                        input.is_fr = item.is_apply;
                        input.from_fr = item.start_time;
                        input.to_fr = item.end_time;
                        break;
                    case "saturday":
                        input.is_sa = item.is_apply;
                        input.from_sa = item.start_time;
                        input.to_sa = item.end_time;
                        break;
                    case "sunday":
                        input.is_su = item.is_apply;
                        input.from_su = item.start_time;
                        input.to_su = item.end_time;
                        break;
                }
            }
            var result = await HRM_BranchService.HRM_Branch_Actions(input);
            return result;
        }
    }
}
