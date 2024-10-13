using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.ProjectManagement.Dto
{
    public class HRM_Project_Management_Task_Proprity_Level_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public string name { get; set; }
        public string department_code { get; set; }
        public string department_name { get; set; }
        public string type { get; set; }
    }
}
