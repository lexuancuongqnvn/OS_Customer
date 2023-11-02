using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Intfs.Report.Dto
{
    public class WMS_Report_I45_ENTITY : IBase_ENTITY
    {
        public string code { get; set; }
        public int? numerical_order {get;set;}
        public string voucher_code {get;set;}
        public DateTime? voucher_date {get;set;}
        public DateTime? voucher_date_start {get;set;}
        public DateTime? voucher_date_end {get;set;}
        public string voucher_no   {get;set;}
        public string customer_code {get;set;}
        public string customer_name {get;set;}
        public string address {get;set;}
        public string profession_code {get;set;}
        public string notes {get;set;}
        public string code_fc {get;set;}
        public decimal? exchange_rate {get;set;}
        public decimal? total_money_fc {get;set;}
        public decimal? total_money  {get;set;}
        public decimal? total_money_start {get;set;}
        public decimal? total_money_end  {get;set;}
        public bool? is_in_progress {get;set;}
        public bool? is_cost_allocation    {get;set;}
        public DateTime? date_add     {get;set;}
        public DateTime? date_modified {get;set;}
        public string account_code_add {get;set;}
        public string account_code_modified {get;set;} 
        public string master_code  {get;set;}
        public string goods_code   {get;set;}
        public string goods_name   {get;set;}
        public string unit_code    {get;set;}
        public string warehouse_code {get;set;}
        public decimal? quantity     {get;set;}
        public decimal? price_fc     {get;set;}
        public decimal? price {get;set;}
        public decimal? arise_fc     {get;set;}
        public decimal? arise {get;set;}
        public int? allocation_period     {get;set;}
        public int? period_number {get;set;}
        public string creditor_account {get;set;}
        public string debitor_account {get;set;}
        public string expense_account {get;set;}
        public string fee_code     {get;set;}
        public string case_code    {get;set;}
        public string department_code {get;set;}
        public string goods_code1  {get;set;}
        public string construction_id {get;set;}
        public decimal? conversion_factor     {get;set;}
        public decimal? conversion_quantity   {get;set;}
        public decimal? conversion_price {get;set;}
        public string name {get;set;}
        public int id { get; set; }
        public int? language_id { get; set; }
        public string company_code { get; set; }
    }
}
