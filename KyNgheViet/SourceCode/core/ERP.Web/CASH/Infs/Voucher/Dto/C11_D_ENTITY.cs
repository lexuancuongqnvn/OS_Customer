using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace CASH.Infs.Voucher.Dto
{
    public class C11_D_ENTITY : IBase_ENTITY
    {
        public int id  {  set; get; } 
        public string code    { get; set; }
        public string master_code { get; set; }
        public string description { get; set; }
        public string customer_code { get; set; }
        public string customer_name { get; set; }
        public decimal? arise_fc { get; set; }
        public decimal? arise { get; set; }
        public string creditor_account { get; set; }
        public string fee_code { get; set; }
        public string case_code { get; set; }
        public string department_code { get; set; }
        public string goods_code { get; set; }
        public string construction_id { get; set; }
        public DateTime? voucher_date { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public string company_code { get; set; }
        public int? language_id { get; set; }
        public string voucher_code { get; set; }
        public int? voucher_year { get; set; }
    }
}
