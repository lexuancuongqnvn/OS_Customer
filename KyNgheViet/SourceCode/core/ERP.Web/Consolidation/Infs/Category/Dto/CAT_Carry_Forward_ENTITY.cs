using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Consolidation.Infs.Category.Dto
{
    public class CAT_Carry_Forward_ENTITY : IBase_ENTITY
    {
        public int id { get; set; }
        public string code { get; set; }
        public string voucher_code { get; set; }
        public string source_account { get; set; }
        public string arrive_account { get; set; }
        public bool? department_code { get; set; }
        public bool? case_code { get; set; }
        public bool? fee_code { get; set; }
        public string description { get; set; }
        public int? carry_forward_order { get; set; }
        public bool? goods_code { get; set; }
        public bool? contruction_code { get; set; }
        public int? carry_forward_type { get; set; }
        public string carry_forward_type_name { get; set; }
        public string classify { get; set; }
        public string classify_name { get; set; }
        public string company_code { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public int? language_id { get; set; }
        public int? voucher_year { get; set; }
    }
}
