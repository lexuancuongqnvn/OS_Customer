using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Employee.Dto
{
    public class HRM_Employee_Report_Salary_ENTITY
    {
        public string path { get; set; }
        public DateTime? start_datetime { get; set; }
        public DateTime? end_datetime { get; set; }
        public int? status { get; set; }
        public string message { get; set; }
        public List<HRM_Employee_Report_Salary_Employee_ENTITY> list_salary_employees { get; set; }
    }
}
