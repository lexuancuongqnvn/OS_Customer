using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.WorkingTime.Dto
{
    public class HRM_Project_Management_Task_WorkTime_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public string employee_code { get; set; }
        public string employee_name { get; set; }
        public string leader_code { get; set; }
        public string leader_name { get; set; }        
        public string authorize_approve_worktime { get; set; }
        public string authorize_approve_worktime_name { get; set; }
        public int? month { get; set; }
        public int? year { get; set; }
        public float? total_hour { get; set; }
        public DateTime? start_date { get; set; }
        public string start_date_f { get; set; }
        public string account_approve { get; set; }
        public string status { get; set; }
        public string status_name { get; set; }
        public string account_code { get; set; }
        public string type { get; set; }
        public string xml { get; set; }
        public List<HRM_Project_Management_Task_WorkTime_Detail_ENTITY> hRM_Project_Management_Task_WorkTime_Details { get; set; }

    }
}
