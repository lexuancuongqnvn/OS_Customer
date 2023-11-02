using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Employee.Dto
{
    public class HRM_Employee_Discipline_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public string employee_code { get; set; }
        public string discipline_code { get; set; }
        public DateTime? discipline_date { get; set; }
        public DateTime? end_discipline_date { get; set; }
        public DateTime? start_discipline_date { get; set; }
        public string type { get; set; }
        public string reason { get; set; }
        public decimal? value { get; set; }
    }
}
