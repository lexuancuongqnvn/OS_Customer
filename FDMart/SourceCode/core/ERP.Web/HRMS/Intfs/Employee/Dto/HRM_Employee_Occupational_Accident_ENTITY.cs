using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Employee.Dto
{
    public class HRM_Employee_Occupational_Accident_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public string employee_code { get; set; }
        public string status { get; set; }
        public string reason { get; set; }
        public string benefit_mode { get; set; }
        public int? values { get; set; }
        public string description { get; set; }
        public decimal? Labor_decline { get; set; }
        public DateTime? accident_date { get; set; }
    }
}
