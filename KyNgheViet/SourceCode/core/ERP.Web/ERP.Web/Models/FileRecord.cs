using ERP.System.Shared;
using HRMS.Intfs.Employee.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ERP.Models
{
    public class FileRecord 
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
        public long? Size { get; set; }
        public string tbName { get; set; }
        public string colName { get; set; }
        public bool? approve { get ; set ; }
        public DateTime? date_add { get ; set ; }
        public DateTime? date_edit { get ; set ; }
        public int? account_id { get ; set ; }
        public string notes { get ; set ; }
        public string decentralization { get ; set ; }
        public string base64 { get; set; }
        public string code { get; set; }
        public string token { get; set; }
        public string employee_code { get; set; }
        public int? dif { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
    }
}
