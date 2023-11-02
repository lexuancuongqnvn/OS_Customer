using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.ProjectManagement.Dto
{
    public class HRM_Project_Management_Report_Project_Percent_ENTITY
    {
        public List<HRM_Project_Management_Report_Project_Percent_Detail_ENTITY> hRM_Project_Management_Report_Project_Percent_Details { get; set; }
        public List<HRM_Project_Management_ENTITY> hRM_Project_Managements { get; set; }
        public ArrayList arr_data_department_by_project { get; set; } 
        public ArrayList arr_data_department_type { get; set; } 
        public ArrayList arr_data_table_department_type { get; set; } 
        public ArrayList arr_data_progress_in_week { get; set; } 
        public string account_code { get; set; } 
    }
}
