using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.ProjectManagement.Dto
{
    public class HRM_Project_Management_Task_Comment_ENTITY
    {
        public int ID { get; set; } 
        public int user_add { get; set; }
        public string code { get; set; }
        public string user_avartar { get; set; }
        public string user_name { get; set; }
        public DateTime? date_add { get; set; }
        public string date_add_f { get; set; }
        public string content { get; set; }
        public string attach_files { get; set; }
        public string task_code { get; set; }

        public int? status { get; set; }
        public string message { get; set; }
    }
}
