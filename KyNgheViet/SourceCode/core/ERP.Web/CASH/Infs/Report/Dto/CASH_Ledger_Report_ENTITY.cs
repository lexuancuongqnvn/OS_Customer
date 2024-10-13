using Castle.MicroKernel.Registration;
using ERP.System.Shared;
using Microsoft.CodeAnalysis;
using System;
using System.Collections.Generic;
using System.Reflection.Emit;
using System.Text;
using System.Xml.Linq;

namespace CASH.Infs.Report.Dto
{
    public class CASH_Ledger_Report_ENTITY : IBase_ENTITY
    {
        public int id { get; set; }	
		public string code { get; set; }
        public string company_code { get; set; }
        public string name { get; set; }
        public string name2 { get; set; }
        public decimal? exchange_rate { get; set; }
        public string symbol { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? voucher_date_start { get; set; }
        public DateTime? voucher_date_end { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public string customer_code { get; set; }
        public string debitor_account { get; set; }
        public string creditor_account { get; set; }
        public int? voucher_year { get; set; }
        public string voucher_code { get; set; }
        public string type { get; set; }
        public int? id_mt { get; set; }
        public string code_mt { get; set; }
        public DateTime? voucher_date { get; set; }
        public string voucher_no { get; set; }
        public string customer_code_mt { get; set; }
        public string customer_name { get; set; }
        public string address { get; set; }
        public string grandparent { get; set; }
        public string profession_code { get; set; }
        public string description { get; set; }
        public string code_fc { get; set; }
        public decimal? arise_fc { get; set; }
        public decimal? arise { get; set; }
        public int? id_dt { get; set; }
        public string code_dt { get; set; }
        public string master_code { get; set; }
        public string description_dt { get; set; }
        public string customer_code_dt { get; set; }
        public string customer_name_dt { get; set; }
        public decimal? arise_fc_dt { get; set; }
        public decimal? arise_dt { get; set; }
        public decimal? credit_money { get; set; }
        public decimal? credit_money_fc { get; set; }
        public string creditor_account_dt { get; set; }
        public string account { get; set; }
        public string fee_code { get; set; }
        public string case_code { get; set; }
        public string department_code { get; set; }
        public string goods_code { get; set; }
        public string construction_id { get; set; }
        public int? language_id { get; set; }
        public string code_symbol { get; set; }
        public decimal? arise_debit { get; set; }
        public decimal? arise_credit { get; set; }
        public decimal? debitor_money { get; set; }
        public decimal? arise_debit_fc { get; set; }
        public decimal? arise_credit_fc { get; set; }
        public decimal? debitor_money_fc { get; set; }
    }
}
