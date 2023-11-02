using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.TimeSheet.Dto
{
    public class HRM_TimeSheet_Employee_Soon_Late_Register_Detail_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public string master_code { get; set; }
        public string for_work_shift { get; set; }
        public string for_day_in_week { get; set; }
        public decimal? time_request { get; set; }

    }
}
