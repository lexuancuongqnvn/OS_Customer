﻿using ERP.System.Shared;
using HRMS.Intfs.Employee.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Intfs.Voucher.Dto
{
    public class I42_D_ENTITY : IBase_ENTITY
    {
        public int id { get; set; }
        public string master_id { get; set; }
        public string voucher_code { get; set; }
        public string goods_code { get; set; }
        public string unit_code { get; set; }
        public string warehouse_code { get; set; }
        public decimal? quantity { get; set; }
        public decimal? price_fc { get; set; }
        public decimal? price { get; set; }
        public decimal? arise_fc { get; set; }
        public decimal? arise { get; set; }
        public string creditor_account { get; set; }
        public string debitor_account { get; set; }
        public string fee_code { get; set; }
        public string vv_code { get; set; }
        public string department_code { get; set; }
        public int? numerical_order { get; set; }
        public string construction_id { get; set; }
        public string goods_name { get; set; }
        public decimal? conversion_factor { get; set; }
        public decimal? conversion_quantity { get; set; }
        public decimal? conversion_price { get; set; }
        public DateTime? voucher_date { get; set; }
        public string code { get; set; }
        public bool? approve { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public int? account_id { get; set; }
        public string notes { get; set; }
        public string decentralization { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public int? language_id { get; set; }
        public string company_code { get; set; }
    }
}
