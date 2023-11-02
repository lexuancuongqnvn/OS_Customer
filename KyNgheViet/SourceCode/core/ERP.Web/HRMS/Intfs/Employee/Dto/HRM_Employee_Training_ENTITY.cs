using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Employee.Dto
{
    public class HRM_Employee_Training_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public string employee_code { get; set; }
        public string type { get; set; }
        public string form { get; set; }
        public string name { get; set; }
        public DateTime? training_date { get; set; }
        public decimal? tuition { get; set; }
        public string training_contract_code { get; set; }
        public string training_from { get; set; }
    }
}
