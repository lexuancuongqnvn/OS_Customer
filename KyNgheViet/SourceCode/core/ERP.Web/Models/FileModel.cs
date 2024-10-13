using ERP.System.Intfs.Upload.Dto;
using ERP.Web.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ERP.Models
{
    public class InsertFile { public int id { get; set; } public IFormFile MyFile { get; set; } }
    public class FileModel
    {
        [DataType(DataType.Upload)]
        public IFormFile[] MyFile { get; set; }
        public string Base64 { get; set; }
        public InsertFile[] insertFile { get; set; }
        public string AltText { get; set; }
        public string Message { get; set; }
        public int? Status { get; set; }
        public int? Type { get; set; }
        public string[] listFiles { get; set; }
        public File_ENTITY[] File_List { get; set; }
        public Upload_ENTITY[] List_data { get; set; }
        
        public string employee_code { get; set; }
        public string Description { get; set; }
        public string tbName { get; set; }
        public string colName { get; set; }
        public string stored { get; set; }
        public int Id { get; set; }
        public string Path { get; set; }
        public int? Size { get; set; }
        public int? Ref_MasterID { get; set; }
        public string ref_master_code { get; set; }

    }
}
