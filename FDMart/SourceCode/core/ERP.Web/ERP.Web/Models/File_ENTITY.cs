using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ERP.Web.Models
{
    public class File_ENTITY
    {
        public int id { get; set; }
        public string path { get; set; }
        public string Code { get; set; }
        public string fileName { get; set; }
        public long size { get; set; }
        public string tbName { get; set; }
        public string colName { get; set; }
        public int? ref_MasterID { get; set; }
        public int index { get; set; }
        public string description { get; set; }
        public string lastModified { get; set; }
        public DateTime? datE_ADD { get; set; }
        public DateTime? datE_EDIT { get; set; }
        public int? accounT_ID { get; set; }
    }
}
