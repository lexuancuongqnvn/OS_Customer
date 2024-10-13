using HRMS.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Workspace.Dto
{
    public class HRM_Workspace_Comment_Image_ENTITY:ISYS
    {
        public int id { get; set; }
        public string comment_code { get; set; }
        public string image_base64 { get; set; }
        public string name { get; set; }
        public int? length { get; set; }
        public string code { get; set; }
        public bool? APPROVE { get; set; }
        public DateTime? DATE_ADD { get; set; }
        public DateTime? DATE_EDIT { get; set; }
        public int? ACCOUNT_ID { get; set; }
        public string NOTES { get; set; }
        public string DECENTRALIZATION { get; set; }
    }
}
