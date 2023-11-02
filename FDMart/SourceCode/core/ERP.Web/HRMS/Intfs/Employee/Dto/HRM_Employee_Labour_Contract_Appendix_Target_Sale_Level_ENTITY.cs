using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Employee.Dto
{
    public class HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public string target_code { get; set; }
        public int? target_min { get; set; }
        public int? target_max { get; set; }
        public decimal? target_money { get; set; }
        public int? percent_for_orther { get; set; }
        public string list_department_code { get; set; }
        public string list_not_allow_employee_code { get; set; }
        public string list_employee_code { get; set; }
        public string contract_code { get; set; }
    }
}
