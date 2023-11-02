using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.System.Intfs.Department.Dto
{
    public class Department_ENTITY
    {
        public int ID { get; set; } 
        public string code { get; set; }
        public string name { get; set; }
        public string notes { get; set; }
        public string type { get; set; }
        public string allow_approve_worktime { get; set; }
        public string allow_approve_worktime_name { get; set; }
        public string authorize_approve_worktime { get; set; }
        public string xml { get; set; }
        public List<Department_Position_ENTITY> department_Positions { get; set; }
        public List<Department_Title_ENTITY> department_Titles { get; set; }
    }
}
