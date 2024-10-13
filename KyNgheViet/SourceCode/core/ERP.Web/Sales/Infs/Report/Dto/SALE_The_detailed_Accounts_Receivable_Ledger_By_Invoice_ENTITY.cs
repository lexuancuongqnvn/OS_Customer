using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sales.Infs.Report.Dto
{
    public class SALE_The_detailed_Accounts_Receivable_Ledger_By_Invoice_ENTITY:IBase_ENTITY
    {
        public DateTime? voucher_date_start {  get; set; }
        public DateTime? voucher_date_end {  get; set; }
        public DateTime? voucher_date {  get; set; }
        public string voucher_no                   {  get; set; }
        public string voucher_no_mt                   {  get; set; }
        public string invoice_no                   {  get; set; }
        public string customer_code                {  get; set; }
        public string customer_name                 {  get; set; }
        public DateTime? payment_date                 {  get; set; }
        public string description                  {  get; set; }
        public string debitor_account              {  get; set; }
        public string code_fc                     {  get; set; }
        public string code_fc_mt {  get; set; }
        public string code_symbol                     {  get; set; }
        public string code_symbol_mt                     {  get; set; }
        public decimal? exchange_rate                {  get; set; }
        public decimal? exchange_rate_mt {  get; set; }
        public decimal? total_money                  {  get; set; }
        public decimal? total_money_fc               {  get; set; }
        public decimal? remaining_asset_fc           {  get; set; }
        public decimal? remaining_asset              {  get; set; }
        public int? payment_deadline             {  get; set; }
        public decimal? payment_fc                   {  get; set; }
        public decimal? payment                      {  get; set; }
        public decimal? remaining_exchange_rate     {  get; set; }
        public string case_code                 {  get; set; }
        public string department_code         {  get; set; }
        public string fee_code                 {  get; set; }
        public string master_code                   {  get; set; }
        public int id {get;set;}
        public int? language_id {get;set;}
        public string voucher_code {get;set;}
        public int? voucher_year {get;set;}
        public string code {get;set;}
        public string company_code {get;set;}
        public DateTime? date_add {get;set;}
        public DateTime? date_modified {get;set;}
        public DateTime? voucher_date_mt     { get;set;}
        public string account {get;set;}
        public string account_code_add {get;set;}
        public string account_code_modified {get;set;}

    }
}
