using HRMS.Intfs.Employee.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.TimeSheet.Dto
{
    public class HRM_TimeSheet_Employee_Work_Shift_ENTITY
    {
        public int ID { get; set; } 
        public string code { get; set; }
        public string name { get; set; }
        public int? in_month { get; set; }
        public int? in_year { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? work_date { get; set; }
        public string work_date_f { get; set; }
        public string create_account { get; set; }
        public string login_user { get; set; }
        public string create_name { get; set; }
        public string type { get; set; }
        public string title { get; set; }
        public bool? is_auto_clone { get; set; }
        public string xml { get; set; }
        public List<HRM_Employee_ENTITY> hRM_Employees { get; set; }
        public List<HRM_TimeSheet_Employee_Work_Shift_Detail_ENTITY> HRM_TimeSheet_Employee_Work_Shift_Details { get; set; }   

    }
}
