using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.TimeSheet.Dto
{
    public class HRM_TimeSheet_Attendance_Type_Off_ENTITY
    {
        public int? ID { get; set; }
        public string code { get; set; }
        public string name { get; set; }
        public Boolean? is_salary { get; set; }
        public string is_salary_name { get; set; }
    }
}
