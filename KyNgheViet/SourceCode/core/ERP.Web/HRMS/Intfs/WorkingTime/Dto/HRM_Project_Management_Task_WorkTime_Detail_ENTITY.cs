using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.WorkingTime.Dto
{
    public class HRM_Project_Management_Task_WorkTime_Detail_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public string project_name { get; set; }
        public string project_code { get; set; }
        public string task_code { get; set; }
        public string task_name { get; set; }
        public string send_approve { get; set; }
        public string account_send { get; set; }
        public string work_time_code { get; set; }
        public string logtime_description { get; set; }
        public string mo_log { get; set; }
        public string tu_log { get; set; }
        public string we_log { get; set; }
        public string th_log { get; set; }
        public string fr_log { get; set; }
        public string sa_log { get; set; }
        public string su_log { get; set; }
        public float? mo { get; set; }
        public float? tu { get; set; }
        public float? we { get; set; }
        public float? th { get; set; }
        public float? fr { get; set; }
        public float? sa { get; set; }
        public float? su { get; set; }
        public float? total { get; set; }

    }
}
