using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Employee.Dto
{
    public class HRM_Employee_Report_Salary_Employee_ENTITY
    {
        public int? account_id { get; set; }
        public string branch_code { get; set; }
        public string branch_name { get; set; }
        public string code { get; set; }
        public string department_name { get; set; }
        public decimal? hour_working { get; set; }
        public int? id { get; set; }
        public string is_info { get; set; }
        public string name { get; set; }
        public decimal? persent_working { get; set; }
        public decimal? sum_standard { get; set; }
        public decimal? total_work_day_minus { get; set; }
        public decimal? total_salary { get; set; }
        public string work_shifts { get; set; }

        public bool? is_use { get; set; }
        public decimal? sum_salary_by_work_day { get; set; }
        public decimal? sum_work_day_practical { get; set; }
    }
}
