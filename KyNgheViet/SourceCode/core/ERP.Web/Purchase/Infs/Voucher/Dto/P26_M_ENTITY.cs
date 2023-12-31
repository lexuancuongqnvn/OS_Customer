﻿using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Purchase.Infs.Voucher.Dto
{
    public class P26_M_ENTITY : IBase_ENTITY
    {
        public int id { get; set; }
        public string code    {get;set;}
        public DateTime? voucher_date { get; set; }
        public string voucher_code {get;set;}
        public string voucher_no {get;set;}
        public string customer_code {get;set;}
        public string customer_name {get;set;}
        public string address {get;set;}
        public string grandparent {get;set;}
        public string description {get;set;}
        public string code_fc {get;set;}
        public decimal? exchange_rate {get;set;}
        public string creditor_account {get;set;}
        public decimal? total_money_fc {get;set;}
        public decimal? total_money {get;set;}
        public string exchange_rate_difference_account {get;set;}
        public decimal? exchange_rate_difference_money {get;set;}
        public string exchange_rate_difference_account1 {get;set;}
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add {get;set;}
        public string account_code_modified {get;set;}
        public int? language_id {get;set;}
        public string company_code {get;set;}
        public string xml_26d { get;set;}
        public bool? is_tax { get; set; }
        public List<P26_D_ENTITY> p26_D { get;set;}

    }
}
