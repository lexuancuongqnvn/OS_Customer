using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Employee.Dto
{
    public class HRM_Employee_Labour_Contract_Salary_Deduction_ENTITY
    {
        public int? id { get; set; }
        public string code { get; set; }
        public string contract_code { get; set; }
        public string name { get; set; }
        public string salary_deduction_name { get; set; }
        public string unit { get; set; }
        public decimal? salary_deduction { get; set; }
        public string salary_deduction_unit { get; set; }
        public string contract_salary_code { get; set; }
        public string contract_salary_name { get; set; }
    }
}
