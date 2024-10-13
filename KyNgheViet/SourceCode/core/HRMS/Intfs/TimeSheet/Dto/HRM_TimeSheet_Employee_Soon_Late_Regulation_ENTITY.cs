using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.TimeSheet.Dto
{
    public class HRM_TimeSheet_Employee_Soon_Late_Regulation_ENTITY
    {
        public int id { get;set;}
        public int? times { get;set;}
        public string code { get; set; }
        public string type { get; set; }
        public decimal? minute { get; set; }
        public decimal? work_day_minus { get; set; }
        public string branch_code { get; set; }
        public string xml { get; set; }
    }
}
