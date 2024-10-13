using Castle.MicroKernel.Registration;
using ERP.System.Shared;
using Microsoft.CodeAnalysis;
using System;
using System.Collections.Generic;
using System.Reflection.Emit;
using System.Security.Principal;
using System.Text;
using System.Xml.Linq;

namespace CASH.Infs.Report.Dto
{
    public class CASH_Disbursement_Journal_ENTITY : IBase_ENTITY
    {
        public string code { get; set; }
        public DateTime? voucher_date { get; set; }
        public DateTime? voucher_date_start { get; set; }
        public DateTime? voucher_date_end { get; set; }
        public string voucher_no { get; set; }
        public string customer_code { get; set; }
        public string customer_name { get; set; }
        public string grandparent { get; set; }
        public string notes { get; set; }
        public string debitor_account { get; set; }
        public string creditor_account { get; set; }
        public decimal? arise { get;set; }
        public decimal? arise_fc { get;set; }
        public int id {  get; set; }
        public int? language_id {  get; set; }
        public string voucher_code {  get; set; }
        public int? voucher_year {  get; set; }
        public string company_code {  get; set; }
        public DateTime? date_add {  get; set; }
        public DateTime? date_modified {  get; set; }
        public string account_code_add {  get; set; }
        public string account_code_modified {  get; set; }
        public string name { get; set; }
        public string name2 { get; set; }
        public string description { get; set; }
        public decimal? exchange_rate { get; set; }
        public string symbol { get; set; }
        public string code_symbol { get; set; }
	    public string account {  get; set; }
        public string type { get; set; }
    }
}
