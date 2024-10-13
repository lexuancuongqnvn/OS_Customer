using Common.Utils;
using ERP.Common.Filters;
using HRMS.Intfs.WorkingTime;
using HRMS.Intfs.WorkingTime.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.HRMS.WorkingTime
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class HRM_WorkingTimeController : ControllerBase
    {
        private readonly IHRM_WorkingTimeService HRM_WorkingTimeService;

        public HRM_WorkingTimeController(IHRM_WorkingTimeService HRM_WorkingTimeService)
        {
            this.HRM_WorkingTimeService = HRM_WorkingTimeService;
        }
        [HttpGet]
        public async Task<List<HRM_WorkingTime_ENTITY>> HRM_WorkingTime_Search([FromBody] HRM_WorkingTime_ENTITY input)
        {
            var result = await HRM_WorkingTimeService.HRM_WorkingTime_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Project_Management_Task_WorkTime_Detail_ENTITY>> HRM_Project_Management_Task_WorkTime_Detail_Search([FromBody] HRM_Project_Management_Task_WorkTime_Detail_ENTITY input)
        {
            var result = await HRM_WorkingTimeService.HRM_Project_Management_Task_WorkTime_Detail_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Project_Management_Task_WorkTime_ENTITY>> HRM_Project_Management_Task_WorkTime_Search([FromBody] HRM_Project_Management_Task_WorkTime_ENTITY input)
        {
            var result = await HRM_WorkingTimeService.HRM_Project_Management_Task_WorkTime_Search(input);
            return result;
        }
        [HttpGet]
        public async Task<List<HRM_Project_Management_Task_WorkTime_Status_ENTITY>> HRM_Project_Management_Task_WorkTime_Status_Search([FromBody] HRM_Project_Management_Task_WorkTime_Status_ENTITY input)
        {
            var result = await HRM_WorkingTimeService.HRM_Project_Management_Task_WorkTime_Status_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Project_Management_Task_WorkTime_Insert([FromBody] HRM_Project_Management_Task_WorkTime_ENTITY input)
        {
            var result = await HRM_WorkingTimeService.HRM_Project_Management_Task_WorkTime_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Project_Management_Task_WorkTime_Update([FromBody] HRM_Project_Management_Task_WorkTime_ENTITY input)
        {
            input.xml = input.hRM_Project_Management_Task_WorkTime_Details.ToXmlFromList();
            var result = await HRM_WorkingTimeService.HRM_Project_Management_Task_WorkTime_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Project_Management_Task_WorkTime_ENTITY>> HRM_Project_Management_Task_WorkTime_Bycode(string account_code, string code)
        {
            HRM_Project_Management_Task_WorkTime_ENTITY pr = new HRM_Project_Management_Task_WorkTime_ENTITY();
            pr.code = code;
            pr.employee_code = account_code;
            var result = await HRM_WorkingTimeService.HRM_Project_Management_Task_WorkTime_Search(pr);
            result[0].hRM_Project_Management_Task_WorkTime_Details = await HRM_WorkingTimeService.HRM_Project_Management_Task_WorkTime_Bycode(account_code, code);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Report_Employee_Management_Task_WorkTime_ENTITY>> HRM_Report_Employee_Management_Task_WorkTime_Search([FromBody] HRM_Report_Employee_Management_Task_WorkTime_ENTITY input)
        {
            var result = await HRM_WorkingTimeService.HRM_Report_Employee_Management_Task_WorkTime_Search(input);
            return result;
        }
    }
}
