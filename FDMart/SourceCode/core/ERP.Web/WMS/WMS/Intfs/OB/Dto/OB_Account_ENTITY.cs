using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Intfs.OB.Dto
{
    public class OB_Account_ENTITY:IBase_ENTITY
    {
        public int id { get; set; }
        public string code    { get; set; }
        public string account { get; set; }
        public decimal? creditor_money_fc  { get; set; }
        public decimal? creditor_money  { get; set; }
        public decimal? debitor_money_fc  { get; set; }
        public decimal? debitor_money  { get; set; }
        public string code_fc { get; set; }
        public string department_code { get; set; }
        public string case_code { get; set; }
        public string fee_code { get; set; }
        public string company_code { get; set; }
        public string customer_code { get; set; }
        public string customer_name { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public int? language_id { get; set; }
    }
}
