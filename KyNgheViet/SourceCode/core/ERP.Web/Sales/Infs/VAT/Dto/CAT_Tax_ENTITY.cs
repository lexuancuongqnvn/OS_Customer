using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sales.Infs.VAT.Dto
{
    public class CAT_Tax_ENTITY: IBase_ENTITY
    {
        public string code { get; set; }
        public string name { get; set; }
        public string name2 { get; set; }
        public decimal? tax { get; set; }
        public string tax_account { get; set; }
        public string tax_account2 { get; set; }
        public bool? approve { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public int? account_id { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public string notes { get; set; }
        public string symbol { get; set; }
        public string decentralization { get; set; }
        public int id { get; set; }
        public int? language_id { get; set; }
        public string company_code { get; set; }
        public string type { get; set; }
    }
}
