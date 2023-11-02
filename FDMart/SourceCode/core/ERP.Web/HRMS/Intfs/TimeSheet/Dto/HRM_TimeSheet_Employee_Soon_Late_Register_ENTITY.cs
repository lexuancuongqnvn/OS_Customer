using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.TimeSheet.Dto
{
    public class HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY
    {
        public int ID { get; set; }
        public string code  {get; set; }
        public DateTime? request_date { get; set; }
        public string request_date_f { get; set; }
        public DateTime? start_datetime { get; set; }
        public string start_datetime_f { get; set; }
        public string start_datetime_f_en { get; set; }
        public DateTime? end_datetime { get; set; }
        public string end_datetime_f { get; set; }
        public string end_datetime_f_en { get; set; }
        public string for_day_in_week { get; set; }
        public string for_day_in_week_f { get; set; }
        public string for_work_shift { get; set; }
        public string for_work_shift_name { get; set; }
        public string reason { get; set; }
        public string checker { get; set; }
        public string checker_name { get; set; }
        public string follower { get; set; }
        public string follower_name { get; set; }
        public string type { get; set; }
        public string notes { get; set; }
        public string approve_status { get; set; }
        public string approve_status_name { get; set; } 
        public string approve_status_html { get; set; } 
        public string approve_note { get; set; }
        public string request_account { get; set; }
        public string request_account_name { get; set; }
        public string login_account { get; set; }
        public string move_to_account { get; set; }
        public string moving { get; set; }
        public string type_request { get; set; }
        public string type_request_name { get; set; }
        public string class_name { get; set; }
        public decimal? time_request { get; set; }
    }
}
