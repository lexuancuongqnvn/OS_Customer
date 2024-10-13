using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Purchase.Infs.Voucher.Dto
{
    public class P25_D_ENTITY:IBase_ENTITY
    {
        public int id { get; set; }
        public string code   {get;set;}
        public string master_code{get;set;}
        public string voucher_22_m_code{get;set;}
        public string voucher_22_d_code{get;set;}
        public decimal? money_goods {get;set;}
        public decimal? arise_fc {get;set;}
        public decimal? arise {get;set;}
        public string debitor_account{get;set;}
        public string fee_code{get;set;}
        public string case_code{get;set;}
        public string department_code{get;set;}
        public string notes { get; set; }
        public string construction_id{get;set;}
        public string company_code{get;set;}
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add{get;set;}
        public string account_code_modified{get;set;}

        public DateTime? voucher_date { get; set; }
        public string voucher_code { get; set; }
        public string goods_code { get; set; }
        public string goods_name { get; set; }
        public string voucher_no { get; set; }
        public int? language_id { get; set; }
        public int? voucher_year { get; set; }
    }
}
