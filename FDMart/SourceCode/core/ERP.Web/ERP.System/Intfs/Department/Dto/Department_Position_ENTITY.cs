using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.System.Intfs.Department.Dto
{
    public class Department_Position_ENTITY
    {
        public int ID { get; set; } 
        public string code { get; set; }
        public string name { get; set; }
        public string name_f { get; set; }
        public string notes { get; set; }
        public string description { get; set; }
        public int? level { get; set; }
        public Boolean? allow_approve_worktime { get; set; }
        public string department_code { get; set; }
        public string type { get; set; }
    }
}
