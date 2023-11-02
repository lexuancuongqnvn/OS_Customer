using ERP.Common.Controllers;
using HRMS.Intfs.Workspace;
using HRMS.Intfs.Workspace.Dto;
using HRMS.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HRMS.Impls.Workspace
{
    public class HRM_WorkspaceService : IHRM_WorkspaceService
    {
        public async Task<IDictionary<string, object>> HRM_Workspace_Comment_ByCode_Calendar(string code)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Workspace_Comment_ByCode_Calendar, new { idCalendar = code });
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Workspace_Comment_Insert(HRM_Workspace_Comment_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Workspace_Comment_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Workspace_Comment_Update(HRM_Workspace_Comment_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Workspace_Comment_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Workspace_Delete(string code)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Workspace_Delete, new { code = code });
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Workspace_Insert(HRM_Workspace_Master_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Workspace_Insert, input);
            return result;
        }

        public async Task<List<HRM_Workspace_Master_ENTITY>> HRM_Workspace_Master_Search(HRM_Workspace_Master_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_Workspace_Master_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Workspace_Master_Search, input);
            return result;
        }

        public async Task<List<HRM_Workspace_ENTITY>> HRM_Workspace_Search(HRM_Workspace_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_Workspace_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Workspace_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Workspace_Search_ByID(int id)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Workspace_Search_ByID, new {id=id});
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Workspace_Timesheet_Search_By_IDCalendar(string code_master,string idCalendar, int top)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Workspace_Timesheet_Search_By_IDCalendar, new {
                code_master= code_master,
                idCalendar = idCalendar
            });
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Workspace_Update(HRM_Workspace_Master_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Workspace_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Workspace_Update_Timesheet(HRM_Workspace_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Workspace_Update_Timesheet, input);
            return result;
        }
    }
}
