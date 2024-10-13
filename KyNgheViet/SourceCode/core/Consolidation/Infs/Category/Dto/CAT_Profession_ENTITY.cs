using System;
using System.Collections.Generic;
using System.Text;

namespace Consolidation.Infs.Category.Dto
{
    public class CAT_Profession_ENTITY
    {
        public int id { get; set; }
        public string code { get; set; }
        public string notes { get; set; }
        public string voucher_code { get; set; }
        public string account1 { get; set; }
        public string balance_account1 { get; set; }
        public string account2 { get; set; }
        public string balance_account2 { get; set; }
        public string account3 { get; set; }
        public string balance_account3 { get; set; }
        public string company_code { get; set; }
        public int? language_id { get; set; }
        public int? voucher_year { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }

    }
}
