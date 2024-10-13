using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.System.Intfs.Upload.Dto
{
    public class Upload_ENTITY
    {
        public int? id { get; set; }
        public string path { get; set; }
        public string path_encode { get; set; }
        public string code { get; set; }
        public string fileName { get; set; }
        public string name { get; set; }
        public long? size { get; set; }
        public string tbName { get; set; }
        public string column_key { get; set; }
        public string colName { get; set; }
        public string stored { get; set; }
        public string ref_MasterID { get; set; }
        public string ref_master_code { get; set; }
        public int index { get; set; }
        public int? status { get; set; }
        public string message { get; set; }
        public string description { get; set; }
        public string lastModified { get; set; }
        public string XML_Data { get; set; }
        public string type { get; set; }
        public DateTime? datE_ADD { get; set; }
        public DateTime? datE_EDIT { get; set; }
        public int? accounT_ID { get; set; }
    }
}
