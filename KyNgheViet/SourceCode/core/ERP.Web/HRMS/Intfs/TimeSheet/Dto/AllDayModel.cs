using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.TimeSheet.Dto
{
    public class AllDayModel
    {
        public string code_work_shift_detail { get; set; }
        public string name_en { get; set; }
        public string name_vn { get; set; }
        public int? day { get; set; }
        public DateTime? date { get; set; }
        public string employee_code { get; set; }
        public Boolean? value { get; set; }
        public string overtime_code { get; set; }
        public string attendance_code { get; set; }
        public string soon_late_request_code { get; set; }
        public string mission_allowance_code { get; set; }
    }
}
