using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.System.Intfs.GenRowTable.Dto
{
    public class SYS_Column_Info_ENTITY:IBase_ENTITY
    {
        public int id { get; set; }
        public string table_name { get; set; }
        public string table_name_old { get; set; }
        public string column_name { get; set; }
        public string name { get; set; }
        public string acronym { get; set; }
        public string notes { get; set; }
        public int? language_id { get; set; }
        public string code { get; set; }
        public string company_code { get; set; }
        public string type { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
    }
}
