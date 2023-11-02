using HRMS.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Workspace.Dto
{
    public class HRM_Workspace_Comment_Files_ENTITY : ISYS
    {
        public int id { get; set; }
        public string comment_code { get; set; }
        public string url_file { get; set; }
        public string name { get; set; }
        public string path { get; set; }
        public float? size { get; set; }
        public string description { get; set; }
        public DateTime? DATE_ADD { get; set; }
        public DateTime? DATE_EDIT { get; set; }
        public string fileName { get; set; }
        public string type_file { get; set; }
        public long? length { get; set; }
        public string code { get; set; }
        public bool? APPROVE { get; set; }
        public int? ACCOUNT_ID { get; set; }
        public string NOTES { get; set; }
        public string DECENTRALIZATION { get; set; }
    }
}
