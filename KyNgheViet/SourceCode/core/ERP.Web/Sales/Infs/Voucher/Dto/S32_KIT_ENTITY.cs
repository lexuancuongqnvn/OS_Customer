using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sales.Infs.Voucher.Dto
{
    public class S32_KIT_ENTITY: IBase_ENTITY
    {
        public int id { get; set; }
        public string code { get; set; }
        public string master_code { get; set; }
        public string kit_code { get; set; }
        public string kit_name { get; set; }
        public string unit_code { get; set; }
        public decimal? quantity { get; set; }
        public decimal? price_fc { get; set; }
        public decimal? price { get; set; }
        public decimal? arise_fc { get; set; }
        public decimal? arise { get; set; }
        public decimal? discount { get; set; }
        public decimal? discount_fc { get; set; }
        public string revenue_account { get; set; }
        public string construction_id { get; set; }
        public string department_code { get; set; }
        public string fee_code { get; set; }
        public string case_code { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public bool? approve { get; set; }
        public int? account_id { get; set; }
        public string notes { get; set; }
        public string decentralization { get; set; }
        public int? language_id { get; set; }
        public string company_code { get; set; }
        public string voucher_code { get; set; }
        public int? voucher_year { get; set; }
    }
}
