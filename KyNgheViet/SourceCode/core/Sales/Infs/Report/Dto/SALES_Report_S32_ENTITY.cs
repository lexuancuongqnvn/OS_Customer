using System;
using System.Collections.Generic;
using System.Text;

namespace Sales.Infs.Report.Dto
{
    public class SALES_Report_S32_ENTITY
    {
        public DateTime? voucher_date   {get;set;}
        public string code     {get;set;}
        public string voucher_no     {get;set;}
        public string invoice_no     {get;set;}
        public string notes          {get;set;}
        public string customer_code  {get;set;}
        public string name           {get;set;}
        public string debitor_account{get;set;}
        public string goods_code     {get;set;}
        public string goods_symbol { get;set;}
        public string goods_serial { get;set;}
        public string goods_name { get;set;}
        public string unit_code      {get;set;}
        public string unit_name { get;set;}
        public string warehouse_code {get;set;}
        public string warehouse_symbol_out { get;set;}
        public string warehouse_name_out { get;set;}
        public decimal? quantity       {get;set;}
        public decimal? price_fc       {get;set;}
        public decimal? price          {get;set;}
        public decimal? arise_fc       {get;set;}
        public decimal? arise          {get;set;}
        public decimal? tax_fc         {get;set;}
        public decimal? tax            {get;set;}
        public decimal? discount_fc    {get;set;}
        public decimal? discount       {get;set;}
        public decimal? total_money_fc { get;set;}
        public decimal? total_money    {get;set;}
        public decimal? cogs_price     {get;set;}
        public decimal? cogs_money { get; set; }
        public DateTime? voucher_date_start { get; set; }
        public DateTime? voucher_date_end { get; set; }
        public string voucher_code { get; set; }
        public string company_code { get; set; }
        public string warehouse_account { get; set; }
        public string creditor_account { get; set; }
        public string fee_code { get; set; }
        public string department_code { get; set; }
        public string case_code { get; set; }
        public string group_code { get; set; }
        public string serial_no { get; set; }
        public int? language_id { get; set; }
        public int? voucher_year { get; set; }
    }
}
