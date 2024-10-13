using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Consolidation.Infs.Category.Dto
{
    public class CAT_Account_ENTITY:IBase_ENTITY
    {
        public int id { get; set; }
        public string account { get; set; }
        public string master_account { get; set; }
        public string account_name { get; set; }
        public string account_name2 { get; set; }
        public Boolean? is_debt { get; set; }
        public Boolean? is_ledger { get; set; }
        public Boolean? is_remind { get; set; }
        public string code { get; set; }
        public string company_code { get; set; }
        public int? language_id { get; set; }
        public string voucher_code { get; set; }
        public int? voucher_year { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
    }
}
