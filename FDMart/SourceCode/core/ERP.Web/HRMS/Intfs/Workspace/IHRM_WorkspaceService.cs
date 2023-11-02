using HRMS.Intfs.Workspace.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HRMS.Intfs.Workspace
{
    public interface IHRM_WorkspaceService
    {
        Task<IDictionary<string, object>> HRM_Workspace_Insert(HRM_Workspace_Master_ENTITY input);
        Task<IDictionary<string, object>> HRM_Workspace_Update(HRM_Workspace_Master_ENTITY input);
        Task<IDictionary<string, object>> HRM_Workspace_Comment_Update(HRM_Workspace_Comment_ENTITY input);
        Task<IDictionary<string, object>> HRM_Workspace_Comment_Insert(HRM_Workspace_Comment_ENTITY input);
        Task<IDictionary<string, object>> HRM_Workspace_Delete(string id);
        Task<List<HRM_Workspace_ENTITY>> HRM_Workspace_Search(HRM_Workspace_ENTITY input);
        Task<List<HRM_Workspace_Master_ENTITY>> HRM_Workspace_Master_Search(HRM_Workspace_Master_ENTITY input);
        Task<IDictionary<string, object>> HRM_Workspace_Search_ByID(int id);
        Task<IDictionary<string, object>> HRM_Workspace_Comment_ByCode_Calendar(string code);
        Task<IDictionary<string, object>> HRM_Workspace_Timesheet_Search_By_IDCalendar(string code_master, string idCalendar,int top);
        Task<IDictionary<string, object>> HRM_Workspace_Update_Timesheet(HRM_Workspace_ENTITY input);
    }
}
