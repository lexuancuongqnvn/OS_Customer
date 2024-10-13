using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Consolidation.Infs.Voucher.Dto
{
    public class Carry_Forward_Execute_ENTITY:IBase_ENTITY
    {
        public int? num_row { get; set; }
        public int id { get; set; }
        public int? month_start { get; set; }
        public int? month_end { get; set; }
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
        public string classify { get; set; }
        public string company_code { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public decimal? arise { get;set; }
        public int? language_id { get; set; }
        public int? voucher_year { get; set; }
    }
}
