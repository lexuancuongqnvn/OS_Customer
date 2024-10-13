using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Employee.Dto
{
    public class HRM_Employee_Labour_Contract_Salary_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public string contract_code { get; set; }
        public string name { get; set; }
        public string salary_name { get; set; }
        public decimal? salary { get; set; }
        public string unit { get; set; }

    }
}
