using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.ProjectManagement.Dto
{
    public class HRM_Project_Management_Task_ENTITY
    {
        public int ID { get; set; } 
        public string id_referent { get; set; } 
        public string key_referent { get; set; } 
        public string code { get; set; }
        public string name { get; set; }
        public string create_user { get; set; }
        public string account_code { get; set; }
        public string executor { get; set; }
        public int? top { get; set; }
        public int? progress_task { get; set; }
        public int? total_task { get; set; }
        public int? menbers { get; set; }
        public int? amf { get; set; }
        public string task_content { get; set; }
        public DateTime? start_date { get; set; }
        public DateTime? stop_date { get; set; }
        public DateTime date_add { get; set; }
        public string status { get; set; }
        public decimal? percent_done { get; set; }
        public string percent_done_f { get; set; }
        public decimal? project_progress { get; set; }
        public decimal? advancing { get; set; }
        public decimal? delay { get; set; }
        public string project_code { get; set; }
        public string create_user_name { get; set; }
        public string executor_name { get; set; }
        public string project_name { get; set; }
        public string status_name { get; set; }
        public string start_date_f { get; set; }
        public string stop_date_f { get; set; }
        public string files { get; set; }
        public string type { get; set; }
        public string type_code { get; set; }
        public string type_name { get; set; }
        public string in_task { get; set; }
        public string in_task_name { get; set; }
        public string topic_code { get; set; }
        public string topic_name { get; set; }
        public string department_code { get; set; }
        public DateTime? end_date { get; set; }
        public string end_date_f { get; set; }
        public string priority_level { get; set; }
        public string priority_level_name { get; set; }
        public string followers { get; set; }
        public string department_followers { get; set; }
        public float? hour_done { get; set; }
        public int? remind { get; set; }
        public int? remind_messenger { get; set; }
        public Boolean? important { get; set; }
        public Boolean? is_expiry_task { get; set; }
        public Boolean? is_pin { get; set; }
        public string icon_pin { get; set; }
        public DateTime? date_pin { get; set; }
        public string expiry_task_name { get; set; }
        public string important_c { get; set; }
        public string logtime_description { get; set; }
        public string order_by_date_add { get; set; }
        public string date_add_f { get; set; }
        public int? drop_index { get; set; }
        public List<HRM_Project_Management_Task_Comment_ENTITY> hRM_Project_Management_Task_Comments { get; set; }
        public List<HRM_Project_Management_Task_Level_ENTITY> hRM_Project_Management_Task_Levels { get; set; }
        public List<HRM_Project_Management_Task_History_ENTITY> hRM_Project_Management_Task_Historys { get; set; }
    }
}
