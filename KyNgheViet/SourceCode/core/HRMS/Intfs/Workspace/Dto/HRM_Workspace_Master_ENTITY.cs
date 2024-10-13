using HRMS.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Workspace.Dto
{
    public class HRM_Workspace_Master_ENTITY:ISYS
    {
        public string key { get; set; } 
        public List<HRM_Workspace_ENTITY> hRM_Workspace { get; set; }
        public string XML_Workspace { get; set; }
        public string name { get; set; }
        public string code { get; set; }
        public string type { get; set; }
        public int? check_in { get; set; }
        public int? check_out { get; set; }
        public int? timesheet_early { get; set; }
        public int? late_timesheet { get; set; }
        public int? day_off { get; set; }
        public int? indexRow { get; set; }
        public bool? APPROVE { get; set; }
        public DateTime? data_month { get; set; }
        public DateTime? DATE_ADD { get; set; }
        public DateTime? DATE_EDIT { get; set; }
        public int? ACCOUNT_ID { get; set; }
        public string NOTES { get; set; }
        public string DECENTRALIZATION { get; set; }
    }
}
