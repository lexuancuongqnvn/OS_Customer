using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Intfs.Report.Dto
{
    public class WMS_Report_Inventory_Book_Detail_ENTITY:IBase_ENTITY
    {
        public string goods_name          {get;set;}
        public string goods_symbol        {get;set;}
        public string goods_serial        {get;set;}
        public DateTime? voucher_date { get; set; }
        public DateTime? voucher_date_start { get; set; }
        public DateTime? voucher_date_end { get; set; }
        public string voucher_code        {get;set;}
        public string warehouse_code { get;set;}
        public string voucher_detail_code { get;set;}
        public string voucher_master_code {get;set;}
        public string voucher_no          {get;set;}
        public string customer_name       {get;set;}
        public string description         {get;set;}
        public decimal? price               {get;set;}
        public string goods_code          {get;set;}
        public decimal? quantity            {get;set;}
        public decimal? quantity_x { get;set;}
        public decimal? price_import        {get;set;}
        public string quantity_export     {get;set;}
        public decimal? price_export        {get;set;}
        public int? stt                 {get;set;}
        public int id {get;set;}
        public int? language_id {get;set;}
        public string code {get;set;}
        public string company_code {get;set;}
        public DateTime? date_add {get;set;}
        public DateTime? date_modified {get;set;}
        public string account_code_add {get;set;}
        public string account_code_modified {get;set;}
        public int? voucher_year { get; set; }
    }
}
