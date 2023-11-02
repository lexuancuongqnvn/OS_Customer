using ERP.Common.Controllers;
using HRMS.Intfs.ProjectManagement;
using HRMS.Intfs.ProjectManagement.Dto;
using HRMS.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HRMS.Impls.ProjectManagement
{
    public class ProjectManagementService : IProjectManagementService
    {
        public async Task<IDictionary<string, object>> HRM_Project_Management_Delete(HRM_Project_Management_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Delete, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Project_Management_Insert(HRM_Project_Management_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Insert, input);
            return result;
        }

        public async Task<List<HRM_Project_Management_ENTITY>> HRM_Project_Management_Search(HRM_Project_Management_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_Project_Management_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Search, input);
            return result;
        }

        public async Task<List<HRM_Project_Management_ENTITY>> HRM_Project_Management_Search_ByCode(string code)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_Project_Management_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Search_ByCode, new { code = code });
            return result;
        }

        public async Task<List<HRM_Project_Management_Task_Comment_ENTITY>> HRM_Project_Management_Task_Comment_Insert(HRM_Project_Management_Task_Comment_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_Project_Management_Task_Comment_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Task_Comment_Insert, input);
            return result;
        }

        public async Task<List<HRM_Project_Management_Task_Comment_ENTITY>> HRM_Project_Management_Task_Comment_Search(HRM_Project_Management_Task_Comment_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_Project_Management_Task_Comment_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Task_Comment_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Project_Management_Task_Delete(HRM_Project_Management_Task_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Task_Delete, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Project_Management_Task_Insert(HRM_Project_Management_Task_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Task_Insert, input);
            return result;
        }

        public async Task<List<HRM_Project_Management_Task_ENTITY>> HRM_Project_Management_Task_Search(HRM_Project_Management_Task_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_Project_Management_Task_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Task_Search, input);
            return result;
        }

        public async Task<List<HRM_Project_Management_Task_Status_ENTITY>> HRM_Project_Management_Task_Status_Search()
        {
            HRM_Project_Management_Task_Status_ENTITY input = new HRM_Project_Management_Task_Status_ENTITY();
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_Project_Management_Task_Status_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Task_Status_Search, input);
            return result;
        }

        public async Task<List<HRM_Project_Management_Task_Type_ENTITY>> HRM_Project_Management_Task_Type_Search(HRM_Project_Management_Task_Type_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_Project_Management_Task_Type_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Task_Type_Search, input);
            return result;
        }
        public async Task<List<HRM_Project_Management_Task_Proprity_Level_ENTITY>> HRM_Project_Management_Task_Proprity_Level_Search(HRM_Project_Management_Task_Proprity_Level_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_Project_Management_Task_Proprity_Level_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Task_Proprity_Level_Search, input);
            return result;
        }
        public async Task<IDictionary<string, object>> HRM_Project_Management_Task_Update(HRM_Project_Management_Task_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Task_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Project_Management_Update(HRM_Project_Management_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Update, input);
            return result;
        }

        public async Task<List<HRM_Project_Management_Task_Level_ENTITY>> HRM_Project_Management_Task_Search_Menu(string level_task)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_Project_Management_Task_Level_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Task_Search_Menu, new { level_task = level_task });
            return result;
        }

        public async Task<List<HRM_Project_Management_Task_History_ENTITY>> HRM_Project_Management_Task_Historys_Search(string filter)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_Project_Management_Task_History_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Task_Historys_Search, new { filter = filter });
            return result;
        }

        public async Task<List<HRM_Project_Management_ENTITY>> HRM_Project_Management_Report_Project_Percent_Search(HRM_Project_Management_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_Project_Management_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Report_Project_Percent_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Project_Management_Task_Type_Actions(HRM_Project_Management_Task_Type_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Task_Type_Actions, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Project_Management_Task_Proprity_Level_Actions(HRM_Project_Management_Task_Proprity_Level_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Task_Proprity_Level_Actions, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Project_Management_Task_Notification_Update(string code, string type,string user_login, string to_user)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Task_Notification_Update, new {code = code,type=type, user_login = user_login, to_user= to_user });
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Project_Management_Task_Pin(string task_code, bool is_pin, string account_code)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Task_Pin, new { task_code = task_code, is_pin = is_pin, account_code = account_code });
            return result;
        }
    }
}
