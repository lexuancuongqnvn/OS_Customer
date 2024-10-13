using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sales.Infs.Category.Dto
{
    public class CAT_Customer_ENTITY : IBase_ENTITY
    {
        public string code { get; set; }
        public string name { get; set; }
        public string name2 { get; set; }
        public string address { get; set; }
        public string partner { get; set; }
        public string tax_code { get; set; }
        public string phone_number { get; set; }
        public string mobile { get; set; }
        public string email { get; set; }
        public string fax { get; set; }
        public string bank_number { get; set; }
        public string bank_name { get; set; }
        public bool? is_supplier  { get; set; }
        public bool? is_customer  { get; set; }
        public bool? is_employee { get; set; }
        public string group1 { get; set; }
        public string group2 { get; set; }
        public string group3 { get; set; }
        public string group1_name { get; set; }
        public string group2_name { get; set; }
        public string group3_name { get; set; }
        public int? payment_term { get; set; }
        public decimal? debt_code { get; set; }
        public string employee_code { get; set; }
        public bool? is_active { get; set; }
        public string notes { get; set; }
        public decimal? interest_rate { get; set; }
        public bool? approve { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public int? account_id { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public string decentralization { get; set; }
        public int id { get; set; }
        public int? language_id { get; set; }
        public string company_code { get; set; }
        public string voucher_code { get; set; }
        public int? voucher_year { get; set; }
    }
}
