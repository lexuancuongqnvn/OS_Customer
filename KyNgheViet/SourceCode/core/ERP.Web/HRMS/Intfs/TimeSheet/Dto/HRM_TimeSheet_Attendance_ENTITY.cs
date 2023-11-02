using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.TimeSheet.Dto
{
    public class HRM_TimeSheet_Attendance_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public string checker_code { get; set; }
        public string checker_name { get; set; }
        public string employee_code { get; set; }
        public string employee_name { get; set; }
        public string position_code { get; set; }
        public string position_name { get; set; }
        public string branch_code { get; set; }
        public string branch_name { get; set; }
        public string department_code { get; set; }
        public string department_name { get; set; }
        public DateTime? start_datetime { get; set; }
        public string start_datetime_f { get; set; }
        public string start_datetime_f_en { get; set; }
        public DateTime? end_datetime { get; set; }
        public string end_datetime_f { get; set; }
        public string create_datetime_f { get; set; }
        public string end_datetime_f_en { get; set; }
        public string type_off_code { get; set; }
        public string type_off_name { get; set; }
        public string type_off_name_title { get; set; }
        public string employee_code_replace { get; set; }
        public string employee_name_replace { get; set; }
        public string phone_number { get; set; }
        public string user_code_approve { get; set; }
        public string user_name_approve { get; set; }
        public string status_code { get; set; }
        public string status_name { get; set; }
        public string notes { get; set; }
        public string reason { get; set; }
        public decimal? max_day_number { get; set; }
        public decimal? total_days_off { get; set; }
        public DateTime? request_date { get; set; }
        public string request_date_f { get; set; }
        public string follower { get; set; }
        public string approve_status { get; set; }
        public string approve_status_name { get; set; }
        public string request_account { get; set; }
        public string request_account_name { get; set; }
        public string class_name { get; set; }
        public string approve_status_html { get; set; }
        public string work_shift_code { get; set; }
        public string work_shift_name { get; set; }
        public string login_account { get; set; }
        public string moving { get; set; }
        public string type { get; set; }
        public decimal? day_number { get; set; }

    }
}
