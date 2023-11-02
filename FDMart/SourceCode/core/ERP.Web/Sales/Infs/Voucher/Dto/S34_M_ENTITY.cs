using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sales.Infs.Voucher.Dto
{
    public class S34_M_ENTITY : IBase_ENTITY
    {
       public int id { get; set; }
       public string code    { get; set; }
       public DateTime? voucher_date { get; set; }
       public string voucher_code { get; set; }
       public string voucher_no { get; set; }
       public int? voucher_year { get; set; }
       public string customer_code { get; set; }
       public string customer_name { get; set; }
       public string address { get; set; }
       public string grandparent { get; set; }
       public string description { get; set; }
       public string code_fc { get; set; }
       public decimal? exchange_rate{ get; set; }
       public string debitor_account { get; set; }
       public string remaining_exchange_rate_account { get; set; }
       public string remaining_exchange_rate_account1 { get; set; }
       public decimal? total_money_fc { get; set; }
       public decimal? total_money { get; set; }
       public decimal? total_remaining_exchange_rate{ get; set; }
       public string company_code { get; set; }
       public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
       public string account_code_modified { get; set; }
        public string xml_34d { get; set; }
        public List<S34_D_ENTITY> s34_D { get; set; }
        public int? language_id { get; set; }
        public bool? is_tax { get; set; }
    }
}
