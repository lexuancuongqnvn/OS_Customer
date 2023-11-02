using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sales.Infs.Category.Dto
{
    public class CAT_Contract_ENTITY: IBase_ENTITY
    {
        public int id { get; set; }
        public string code    { get; set; }
        public string symbol { get; set; }
        public string master_code { get; set; }
        public string name { get; set; }
        public string name1 { get; set; }
        public string name2 { get; set; }
        public string notes { get; set; }
        public string voucher_master_code { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public bool? approve { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public int? account_id { get; set; }
        public string decentralization { get; set; }
        public string type { get; set; }
        public int? language_id { get; set; }
        public string company_code { get; set; }
    }
}
