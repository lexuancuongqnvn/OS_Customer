using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Intfs.Report.Dto
{
    public class WMS_Prepaid_Expense_Allocation_ENTITY:IBase_ENTITY
    {
		public int id { get; set; }
		public string voucher_code { get; set; }
		public string voucher_no { get; set; }
		public string customer_code { get; set; }
		public string customer_name { get; set; }
		public string notes { get; set; }
		public DateTime? voucher_date { get; set; }
		public DateTime? voucher_date_start { get; set; }
		public DateTime? voucher_date_end { get; set; }
		public string  i45_m_code { get; set; }
		public string i45_d_code { get; set; }
		public decimal? quantity { get; set; }
		public int? damaged_quantity { get; set; }
		public int? damaged_quantity_before { get; set; }
		public decimal? arise { get; set; }
		public string debitor_account { get; set; }
		public string expense_account { get; set; }
		public string goods_code { get; set; }
		public string goods_symbol { get; set; }
		public string department_code { get; set; }
		public string fee_code { get; set; }
		public string case_code { get; set; }
		public int? allocation_period { get; set; }
		public int? period_number { get; set; }
		public string allocation { get; set; }
        public int? language_id { get; set; }
        public string code { get; set; }
        public string company_code { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
    }
}
