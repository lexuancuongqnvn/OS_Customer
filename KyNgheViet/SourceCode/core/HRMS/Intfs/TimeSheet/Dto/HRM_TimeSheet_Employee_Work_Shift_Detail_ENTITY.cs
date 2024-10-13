using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.TimeSheet.Dto
{
    public class HRM_TimeSheet_Employee_Work_Shift_Detail_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public DateTime? work_date { get; set; }
        public string work_shift_code { get; set; }
        public string employee_code { get; set; }
        public string employee_name { get; set; }
        public string overtime_code { get; set; }
        public string attendance_code { get; set; }
        public string soon_late_request_code { get; set; }
        public string mission_allowance_code { get; set; }
        public string master_code { get; set; }
        public string master_name { get; set; }
        public DateTime? dates { get; set; }
        public Boolean? is_valid { get; set; }
        public int? day { get; set; }
        public string dates_name { get; set; }
        public string type { get; set; }

        public string title { get; set; }
        public string class_name { get; set; }
        public string url { get; set; }

        public string day_in_week { get; set; }
        public DateTime? start_time { get; set; }
        public string start_time_f { get; set; }
        public DateTime? end_time { get; set; }
        public string end_time_f { get; set; }
        public decimal? total_time { get; set; }
        public string work_shift_name { get; set; }
        public bool? is_auto_clone { get; set; }
    }
}
