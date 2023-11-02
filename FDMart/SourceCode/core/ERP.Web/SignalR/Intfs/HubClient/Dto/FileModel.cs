using System;
using System.Collections.Generic;
using System.Text;

namespace SignalR.Intfs.HubClient.Dto
{
    public class FileModel
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string FileFormat { get; set; }
        public string FilePath { get; set; }
        public string FullPath { get; set; }
        public string ContentType { get; set; }
        public string AltText { get; set; }
        public string Description { get; set; }
        public string Message { get; set; }
        public string Path { get; set; }
        public int? Ref_MasterID { get; set; }
        public string Ref_Master_str { get; set; }
        public int? Status { get; set; }
        public long Size { get; set; }
        public string tbName { get; set; }
        public string colName { get; set; }
        public bool? APPROVE { get; set; }
        public DateTime? DATE_ADD { get; set; }
        public DateTime? DATE_EDIT { get; set; }
        public int? ACCOUNT_ID { get; set; }
        public string NOTES { get; set; }
        public string DECENTRALIZATION { get; set; }
        public string code { get; set; }
    }
}
