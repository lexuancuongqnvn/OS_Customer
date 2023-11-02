using ERP.Common.Controllers;
using HRMS.Intfs.WorkingTime;
using HRMS.Intfs.WorkingTime.Dto;
using HRMS.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HRMS.Impls.WorkingTime
{
    public class HRM_WorkingTimeService : IHRM_WorkingTimeService
    {
        public async Task<List<HRM_Project_Management_Task_WorkTime_Detail_ENTITY>> HRM_Project_Management_Task_WorkTime_Detail_Search(HRM_Project_Management_Task_WorkTime_Detail_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_Project_Management_Task_WorkTime_Detail_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Task_WorkTime_Detail_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Project_Management_Task_WorkTime_Insert(HRM_Project_Management_Task_WorkTime_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Task_WorkTime_Insert, input);
            return result;
        }
        public async Task<IDictionary<string, object>> HRM_Project_Management_Task_WorkTime_Update(HRM_Project_Management_Task_WorkTime_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Task_WorkTime_Update, input);
            return result;
        }

        public async Task<List<HRM_Project_Management_Task_WorkTime_ENTITY>> HRM_Project_Management_Task_WorkTime_Search(HRM_Project_Management_Task_WorkTime_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_Project_Management_Task_WorkTime_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Task_WorkTime_Search, input);
            return result;
        }
        public async Task<List<HRM_Project_Management_Task_WorkTime_Detail_ENTITY>> HRM_Project_Management_Task_WorkTime_Bycode(string account_code,string code)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_Project_Management_Task_WorkTime_Detail_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Task_WorkTime_Bycode, new { account_code= account_code, code = code });
            return result;
        }
        public async Task<List<HRM_WorkingTime_ENTITY>> HRM_WorkingTime_Search(HRM_WorkingTime_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_WorkingTime_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_WorkingTime_Search, input);
            return result;
        }

        public async Task<List<HRM_Project_Management_Task_WorkTime_Status_ENTITY>> HRM_Project_Management_Task_WorkTime_Status_Search(HRM_Project_Management_Task_WorkTime_Status_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_Project_Management_Task_WorkTime_Status_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Task_WorkTime_Status_Search, input);
            return result;
        }

        public async Task<List<HRM_Report_Employee_Management_Task_WorkTime_ENTITY>> HRM_Report_Employee_Management_Task_WorkTime_Search(HRM_Report_Employee_Management_Task_WorkTime_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_Report_Employee_Management_Task_WorkTime_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Report_Employee_Management_Task_WorkTime_Search, input);
            return result;
        }
    }
}
