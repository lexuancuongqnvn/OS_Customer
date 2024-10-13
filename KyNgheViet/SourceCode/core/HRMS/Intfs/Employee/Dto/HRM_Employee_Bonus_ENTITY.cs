using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Employee.Dto
{
    public class HRM_Employee_Bonus_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public string name { get; set; }
        public string employee_code { get; set; }
        public string bobus_code { get; set; }
        public DateTime? bobus_date { get; set; }
        public string type { get; set; }
        public decimal? value { get; set; }
    }
}
