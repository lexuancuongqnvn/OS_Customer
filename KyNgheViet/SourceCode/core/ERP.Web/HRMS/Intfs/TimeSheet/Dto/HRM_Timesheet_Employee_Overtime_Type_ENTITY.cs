using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.TimeSheet.Dto
{
    public class HRM_Timesheet_Employee_Overtime_Type_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public Double? from_time { get; set; }
        public Double? to_time { get; set; }
        public Double? multiplier { get; set; }
        public string name { get; set; }


    }
}
