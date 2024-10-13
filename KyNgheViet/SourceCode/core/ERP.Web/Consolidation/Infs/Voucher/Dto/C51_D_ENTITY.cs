using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Consolidation.Infs.Voucher.Dto
{
    public class C51_D_ENTITY:IBase_ENTITY
    {
        public int id { get; set; }
        public int? voucher_year { get; set; }
        public string code    { get; set; }
        public string company_code { get; set; }
        public string voucher_code { get; set; }
        public string master_code { get; set; }
        public string customer_code { get; set; }
        public string customer_name { get; set; }
        public string description { get; set; }
        public string fee_code { get; set; }
        public string case_code { get; set; }
        public string department_code { get; set; }
        public string goods_code { get; set; }
        public string goods_name { get; set; }
        public string goods_symbol { get; set; }
        public string serial_no { get; set; }
        public string construction_id { get; set; }
        public string debitor_account { get; set; }
        public string creditor_account { get; set; }
        public decimal? arise { get; set; }
        public decimal? arise_fc { get; set; }
        public decimal? tax_money { get; set; }
        public DateTime? date_add { get; set; }
        public string date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public int? language_id{ get; set; }
        DateTime? IBase_ENTITY.date_modified{ get; set; }
    }
}
