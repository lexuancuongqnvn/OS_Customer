using HRMS.Intfs.ProjectManagement.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HRMS.Intfs.ProjectManagement
{
    public interface IProjectManagementService
    {
        Task<List<HRM_Project_Management_ENTITY>> HRM_Project_Management_Search(HRM_Project_Management_ENTITY input);
        Task<List<HRM_Project_Management_ENTITY>> HRM_Project_Management_Report_Project_Percent_Search(HRM_Project_Management_ENTITY input);
        Task<List<HRM_Project_Management_ENTITY>> HRM_Project_Management_Search_ByCode(string code);
        Task<IDictionary<string, object>> HRM_Project_Management_Update(HRM_Project_Management_ENTITY input);
        Task<IDictionary<string, object>> HRM_Project_Management_Insert(HRM_Project_Management_ENTITY input);
        Task<IDictionary<string, object>> HRM_Project_Management_Delete(HRM_Project_Management_ENTITY input);

        Task<List<HRM_Project_Management_Task_Comment_ENTITY>> HRM_Project_Management_Task_Comment_Search(HRM_Project_Management_Task_Comment_ENTITY input);
        Task<List<HRM_Project_Management_Task_Comment_ENTITY>> HRM_Project_Management_Task_Comment_Insert(HRM_Project_Management_Task_Comment_ENTITY input);
        Task<List<HRM_Project_Management_Task_ENTITY>> HRM_Project_Management_Task_Search(HRM_Project_Management_Task_ENTITY input);
        Task<IDictionary<string, object>> HRM_Project_Management_Task_Update(HRM_Project_Management_Task_ENTITY input);
        Task<IDictionary<string, object>> HRM_Project_Management_Task_Insert(HRM_Project_Management_Task_ENTITY input);
        Task<IDictionary<string, object>> HRM_Project_Management_Task_Pin(string task_code, bool is_pin,string account_code);
        Task<IDictionary<string, object>> HRM_Project_Management_Task_Delete(HRM_Project_Management_Task_ENTITY input);
        Task<IDictionary<string, object>> HRM_Project_Management_Task_Notification_Update(string code, string type,string user_login,string to_user);

        Task<List<HRM_Project_Management_Task_Status_ENTITY>> HRM_Project_Management_Task_Status_Search();
        Task<List<HRM_Project_Management_Task_Type_ENTITY>> HRM_Project_Management_Task_Type_Search(HRM_Project_Management_Task_Type_ENTITY input);
        Task<IDictionary<string, object>> HRM_Project_Management_Task_Type_Actions(HRM_Project_Management_Task_Type_ENTITY input);
        Task<List<HRM_Project_Management_Task_Level_ENTITY>> HRM_Project_Management_Task_Search_Menu(string level_task);
        Task<List<HRM_Project_Management_Task_Proprity_Level_ENTITY>> HRM_Project_Management_Task_Proprity_Level_Search(HRM_Project_Management_Task_Proprity_Level_ENTITY input);
        Task<IDictionary<string, object>> HRM_Project_Management_Task_Proprity_Level_Actions(HRM_Project_Management_Task_Proprity_Level_ENTITY input);
        Task<List<HRM_Project_Management_Task_History_ENTITY>> HRM_Project_Management_Task_Historys_Search(string filter);
    }
}
