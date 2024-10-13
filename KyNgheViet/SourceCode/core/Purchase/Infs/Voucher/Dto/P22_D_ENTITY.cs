﻿using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Purchase.Infs.Voucher.Dto
{
    public class P22_D_ENTITY:IBase_ENTITY
    {
        public int id { get; set; }
        public string code     { get; set; }
        public DateTime? voucher_date     { get; set; }
        public string voucher_code { get; set; }
        public string master_code  { get; set; }
        public string goods_code  { get; set; }
        public string unit_code  { get; set; }
        public string warehouse_code  { get; set; }
        public string debitor_account  { get; set; }
        public decimal? quantity { get; set; }
        public decimal? price_fc { get; set; }
        public decimal? price { get; set; }
        public decimal? arise_fc { get; set; }
        public decimal? arise { get; set; }
        public decimal? cost_fc { get; set; }
        public decimal? cost { get; set; }
        public string fee_code  { get; set; }
        public string case_code  { get; set; }
        public string department_code  { get; set; }
        public decimal? cost_arise_fc { get; set; }
        public decimal? cost_arise { get; set; }
        public decimal? goods_money { get; set; }
        public string goods_name { get; set; }
        public string construction_id  { get; set; }
        public string group_code  { get; set; }
        public int? standard_code { get; set; }
        public int? brand { get; set; }
        public string series_no   { get; set; }
        public DateTime? expiration_date { get; set; }
        public int? warranty_term { get; set; }
        public decimal? inventory   { get; set; }
        public int? lot { get; set; }
        public decimal? conversion_factor   { get; set; }
        public decimal? conversion_quantity { get; set; }
        public decimal? conversion_price { get; set; }
        public DateTime? warranty_date { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add  { get; set; }
        public string account_code_modified  { get; set; }
        public string company_code { get; set; }
        public int? language_id { get; set; }
        public int? voucher_year { get; set; }
        public string notes { get; set; }
    }
}
