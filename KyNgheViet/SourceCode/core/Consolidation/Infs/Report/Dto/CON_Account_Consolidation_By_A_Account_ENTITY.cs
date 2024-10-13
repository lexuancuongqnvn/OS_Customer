using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Consolidation.Infs.Report.Dto
{
    public class CON_Account_Consolidation_By_A_Account_ENTITY:IBase_ENTITY
    {
        
        public string debitor_account {get;set;}
        public string account_name    {get;set;}
        public decimal? arise_debit   {get;set;}
        public decimal? arise_credit { get; set; }
        public int id  { get; set; }
        public int? language_id  { get; set; }
        public string voucher_code  { get; set; }
        public int? voucher_year  { get; set; }
        public string code  { get; set; }
        public string company_code  { get; set; }
        public DateTime? date_add  { get; set; }
        public DateTime? date_modified  { get; set; }
        public DateTime? voucher_date { get; set; }
        public DateTime? voucher_date_start { get; set; }
        public DateTime? voucher_date_end { get; set; }
        public string account  { get; set; }
        public string account_code_add  { get; set; }
        public string account_code_modified  { get; set; }
    }
}
