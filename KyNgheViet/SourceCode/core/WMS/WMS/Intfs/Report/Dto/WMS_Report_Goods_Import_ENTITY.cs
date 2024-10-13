using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Intfs.Report.Dto
{
    public class WMS_Report_Goods_Import_ENTITY:IBase_ENTITY
    {
        public DateTime? voucher_date { get; set; }
        public DateTime? voucher_date_start { get; set; }
        public DateTime? voucher_date_end { get; set; }
        public string voucher_code    {get;set;}
        public string voucher_no      {get;set;}
        public string customer_code   {get;set;}
        public string description     {get;set;}
        public string warehouse_code  {get;set;}
        public decimal? total_money     {get;set;}
        public string goods_code      {get;set;}
        public decimal? quantity        {get;set;}
        public decimal? price_fc        {get;set;}
        public decimal? arise_fc        {get;set;}
        public decimal? price           {get;set;}
        public decimal? arise           {get;set;}
        public string case_code       {get;set;}
        public string customer_name   {get;set;}
        public string goods_name      {get;set;}
        public string goods_unit_name {get;set;}
        public string group_code      {get;set;}
        public string group_name      {get;set;}
        public string case_name       {get;set;}
        public string goods_symbol    {get;set;}
        public string warehouse_symbol{get;set;}    
        public string customer_symbol {get;set;}
        public int id { get; set; }
        public int? language_id { get; set; }
        public string code { get; set; }
        public string company_code { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public int? voucher_year { get; set; }
    }
}
