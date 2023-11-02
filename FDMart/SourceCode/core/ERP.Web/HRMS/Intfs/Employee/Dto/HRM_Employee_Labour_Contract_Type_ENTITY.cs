using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Employee.Dto
{
    public class HRM_Employee_Labour_Contract_Type_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public string name { get; set; }
        public bool? is_check_in_out { get; set; }
    }
}
