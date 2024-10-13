using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.TimeSheet.Dto
{
    public class HRM_Report_Attendance_ENTITY
    {
        public DateTime? from_date { get; set; }
        public DateTime? to_date { get; set; }
        public string table_employees { get; set; }
        public string table_day { get; set; }
        public string table_attendance { get; set; }
        public string table_soon_late { get; set; }
        public string table_overtime { get; set; }
        public string mission_allowance { get; set; }
        public string table_update_timkeeping { get; set; }
        public string table_holiday { get; set; }
        public string table_checkin_out_soon_late { get; set; }
        public string user_login { get; set; }
        public string labour_contract_salary { get; set; }
        public string employee_labour_contract_appendix { get; set; }
        public string table_check_in_out_soon_late_regulation { get; set; }
        public string table_check_in_out_soon_late_detail { get; set; }
    }
}
