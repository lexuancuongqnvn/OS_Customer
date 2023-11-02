using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.System.Intfs.Export.Dto
{
    public class SYS_Report_Infomation_Version_ENTITY
    {
        public int id { get; set; }
        public string code { get; set; }
        public string master_code { get; set; }
        public string name { get; set; }
        public string version { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }

        public int? language_id { get; set; }
    }
}
