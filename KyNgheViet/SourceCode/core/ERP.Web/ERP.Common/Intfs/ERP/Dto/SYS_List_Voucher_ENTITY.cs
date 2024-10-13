using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.Common.Intfs.ERP.Dto
{
    public class SYS_List_Voucher_Detail_ENTITY
    {
        public int id { get; set; }
        public string code { get; set; }
        public DateTime? block_to_date { get; set; }
        public string block_to_date_str { get; set; }
        public string  module_code { get; set; }
        public string  module_name { get; set; }
        public string voucher_code { get; set; }
        public string voucher_name { get; set; }
        public string company_code { get; set; }
        public string company_name { get; set; }
    }

    public class SYS_List_Voucher_ENTITY
    {
        public int id { get; set; }
        public int? identity_curent { get; set; }
        public int? block_type { get; set; }
        public string code { get; set; }
        public string voucher_code { get; set; }
        public string voucher_name { get; set; }
        public string name { get; set; }
        public string company_code { get; set; }
        public string company_name { get; set; }
        public string format { get; set; }
        public string starts_with_m { get; set; }
        public string starts_with_d { get; set; }
        public string key_table { get; set; }
        public string col_voucher_date { get; set; }
        public DateTime? start_voucher_date { get; set; }
        public bool? is_gen_by_date { get; set; }
        public DateTime? block_to_date { get; set; }
        public string block_to_date_str { get; set; }
        public string module_code { get; set; }
        public string module_name { get; set; }
        public string xml { get; set; }
        public int? language_id { get; set; }
        public bool? is_block_auto { get; set; }
        public int? per_day { get; set; }
        public List<SYS_List_Voucher_Detail_ENTITY> voucher_details { get; set; }
    }
}
