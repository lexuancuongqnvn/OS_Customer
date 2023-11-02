using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Employee.Dto
{
    public class HRM_Employee_Evaluate_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public string employee_code { get; set; }
        public string evaluate_person_code { get; set; }
        public string classification { get; set; }
        public string type { get; set; }
        public decimal? values { get; set; }
        public DateTime? evaluate_date { get; set; }
    }
}
