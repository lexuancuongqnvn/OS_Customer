using HRMS.Intfs.WorkingTime.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HRMS.Intfs.WorkingTime
{
    public interface IHRM_WorkingTimeService
    {
        Task<List<HRM_WorkingTime_ENTITY>> HRM_WorkingTime_Search(HRM_WorkingTime_ENTITY input);
        Task<List<HRM_Project_Management_Task_WorkTime_ENTITY>> HRM_Project_Management_Task_WorkTime_Search(HRM_Project_Management_Task_WorkTime_ENTITY input);
        Task<List<HRM_Project_Management_Task_WorkTime_Status_ENTITY>> HRM_Project_Management_Task_WorkTime_Status_Search(HRM_Project_Management_Task_WorkTime_Status_ENTITY input);
        Task<List<HRM_Project_Management_Task_WorkTime_Detail_ENTITY>> HRM_Project_Management_Task_WorkTime_Bycode(string account_code, string code);
        Task<IDictionary<string, object>> HRM_Project_Management_Task_WorkTime_Insert(HRM_Project_Management_Task_WorkTime_ENTITY input);
        Task<IDictionary<string, object>> HRM_Project_Management_Task_WorkTime_Update(HRM_Project_Management_Task_WorkTime_ENTITY input);
        Task<List<HRM_Project_Management_Task_WorkTime_Detail_ENTITY>> HRM_Project_Management_Task_WorkTime_Detail_Search(HRM_Project_Management_Task_WorkTime_Detail_ENTITY input);
        Task<List<HRM_Report_Employee_Management_Task_WorkTime_ENTITY>> HRM_Report_Employee_Management_Task_WorkTime_Search(HRM_Report_Employee_Management_Task_WorkTime_ENTITY input);
    }
}
