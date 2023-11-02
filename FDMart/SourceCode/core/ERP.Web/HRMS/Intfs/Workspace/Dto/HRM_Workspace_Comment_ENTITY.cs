using HRMS.Shared;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Workspace.Dto
{
    public class HRM_Workspace_Comment_ENTITY:ISYS
    {
        public int id { get; set; }
        public string key_calendar { get; set; }
        public string code { get; set; }
        public string content { get; set; }
        public string account_create { get; set; }
        public string xml_image { get; set; }
        public decimal? percent_done { get; set; }
        public List<HRM_Workspace_Comment_Image_ENTITY> hrm_workspace_comment_images { get; set; }      
        public List<HRM_Workspace_Comment_Files_ENTITY> hRM_Workspace_Comment_Files { get; set; }      
        public bool? APPROVE { get; set; }
        public DateTime? DATE_ADD { get; set; }
        public DateTime? DATE_EDIT { get; set; }
        public int? ACCOUNT_ID { get; set; }
        public string NOTES { get; set; }
        public string DECENTRALIZATION { get; set; }
    }
}
