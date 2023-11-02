using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.System.Shared
{
    public interface IBase_ENTITY
    {
        public int id { get; set; }
        public int? language_id { get; set; }
        public string code { get; set; }
        public string company_code { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
    }
}
