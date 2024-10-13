using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sales.Infs.Category.Dto
{
    public class CAT_Warranty_Certificate_ENTITY: IBase_ENTITY
    {
        public int id { get; set; }
        public string code    { get; set; }
        public string symbol { get; set; }
        public string voucher_no { get; set; }
        public DateTime? voucher_date { get; set; }
        public string customer_name { get; set; }
        public string address { get; set; }
        public string phone { get; set; }
        public string goods_code { get; set; }
        public string description { get; set; }
        public string serial { get; set; }
        public string notes { get; set; }
        public int? tem_no { get; set; }
        public int? document_no { get; set; }
        public int? warranty { get; set; }
        public DateTime? expiration_date { get; set; }
        public string account_code_add    { get; set; }
        public string account_code_modified { get; set; }
        public bool? approve { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public int? account_id { get; set; }
        public string decentralization { get; set; }
        public int? language_id { get; set; }
        public string company_code { get; set; }
        public string voucher_code { get; set; }
        public int? voucher_year { get; set; }
    }
}
