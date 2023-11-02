using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.ProjectManagement.Dto
{
    public class HRM_Project_Management_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public int? done_task { get; set; }
        public int? top { get; set; }
        public int? progress_task { get; set; }
        public int? total_task { get; set; }
        public decimal? project_progress { get; set; }
        public int? menbers { get; set; }
        public int? amf { get; set; }
        public string _done { get; set; }
        public string _inprogress { get; set; }
        public string _new { get; set; }
        public string _total { get; set; }
        public float? inprogress_percent { get; set; }
        public float? new_percent { get; set; }
        public float? done_percent { get; set; }
        public int? done_i{ get; set; }
        public int? inprogress_i { get; set; }
        public int? new_i { get; set; }
        public int? total_i { get; set; }
        public DateTime? start_date { get; set; }
        public string start_date_f { get; set; }
        public DateTime? stop_date { get; set; }
        public string stop_date_f { get; set; }
        public decimal? advancing { get; set; }
        public decimal? delay { get; set; }
        public string  department_code { get; set; }
        public string project_code { get; set; }
        public string account_code { get; set; }

        public List<HRM_Project_Management_Task_ENTITY> Project_Management_Tasks { get; set; }
        public string XML { get; set; }


    }
}
