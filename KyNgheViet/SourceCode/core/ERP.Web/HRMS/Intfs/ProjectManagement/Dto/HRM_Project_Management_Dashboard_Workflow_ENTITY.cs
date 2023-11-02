using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.ProjectManagement.Dto
{
    public class HRM_Project_Management_Dashboard_Workflow_ENTITY
    {
        public string account_code { get; set; }
        public int? total_project { get; set; }
        public int? total_task { get; set; }
        public int? total_task_inprogress { get; set; }
        public int? total_task_expiry_task { get; set; }
        public List<HRM_Project_Management_ENTITY> list_projects { get; set; }
        public HRM_Project_Management_Task_Week_ENTITY task_week { get; set; }
        public HRM_Project_Management_Task_Month_ENTITY task_month { get; set; }
        public HRM_Project_Management_Task_Day_ENTITY task_day { get; set; }
        public HRM_Project_Management_Task_Department_ENTITY task_department{ get; set; }
        public HRM_Project_Management_Task_Department_Pie_ENTITY task_department_pie { get; set; }
    }
}
