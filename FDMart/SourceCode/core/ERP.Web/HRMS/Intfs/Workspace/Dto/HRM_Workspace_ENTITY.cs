using HRMS.Intfs.TimeSheet.Dto;
using HRMS.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Xml.Serialization;

namespace HRMS.Intfs.Workspace.Dto
{
    public class HRM_Workspace_ENTITY : ISYS
    {
        public int? id { get; set; }
        public string key { get; set; }
        public string title { get; set; }
        public DateTime? start { get; set; }
        public bool? allDay { get; set; }
        public string wkName { get; set; }
        public decimal? wkHour { get; set; }
        public string className { get; set; }
        public string idCalendar { get; set; }
        public string idEmployee { get; set; }
        public string idWorkingTime { get; set; }
        public string description { get; set; }
        public string master_id { get; set; }
        public decimal? percent_done { get; set; }
        public decimal? constHour { get; set; }
        public HRM_TimeSheet_ENTITY hRM_TimeSheet_ENTITY { get; set; }
        public List<HRM_Workspace_Comment_ENTITY> hrm_workspace_comment { get; set; }
        public string html_comment { get; set; }
        public string color { get; set; }
        public int? total_comment_load { get; set; }
        public string xml_comment { get; set; }
        public string code { get; set; }
        public bool? APPROVE { get; set; }
        public DateTime? DATE_ADD { get; set; }
        public DateTime? DATE_EDIT { get; set; }
        public int? ACCOUNT_ID { get; set; }
        public string NOTES { get; set; }
        public string DECENTRALIZATION { get; set; }
        
    }
}
