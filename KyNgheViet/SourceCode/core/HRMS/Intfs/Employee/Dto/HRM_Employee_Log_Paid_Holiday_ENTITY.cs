using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Employee.Dto
{
    public class HRM_Employee_Log_Paid_Holiday_ENTITY
    {
        public int? id { get; set; }
        public string code { get; set; }
        public string request_type { get; set; }
        public string request_code { get; set; }
        public decimal? prev_day { get; set; }
        public decimal? current_day { get; set; }
        public decimal? remaining_day { get; set; }
        public decimal? total_days_off { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_apply { get; set; }
        public DateTime? start_datetime { get; set; }
        public DateTime? end_datetime { get; set; }
        public string employee_code { get; set; }
        public string work_shift_code { get; set; }
        public string type { get; set; }

    }
}
