using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Purchase.Infs.Voucher.Dto
{
    public class P26_D_ENTITY:IBase_ENTITY
    {
        public int id { get; set; }
        public DateTime? voucher_date { get; set; }
        public string voucher_code { get; set; }
        public string voucher_no { get; set; }
        public string code   {get;set;}
        public string master_code{get;set;}
        public string debitor_account{get;set;}
        public string code_fc{get;set;}
        public decimal? invoice_exchange_rate{get;set;}
        public decimal? payment_required_fc{get;set;}
        public decimal? payment_required{get;set;}
        public decimal? payment_fc{get;set;}
        public decimal? payment{get;set;}
        public decimal? remaining_asset_acquisition_money_fc{get;set;}
        public decimal? remaining_asset_acquisition_money{get;set;}
        public decimal? remaining_exchange_rate{get;set;}
        public string voucher_21_m_code{get;set;}
        public string invoice_no { get; set; }
        public string case_code{get;set;}
        public string department_code{get;set;}
        public string fee_code{get;set;}
        public string construction_id{get;set;}
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add{get;set;}
        public string account_code_modified{get;set;}
        public int? language_id {get;set;}
        public string company_code {get;set;}
        public int? voucher_year { get; set; }
    }
}
