using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.System.Intfs.Common.Dto
{
    public class SYS_Alter_Table_Voucher_ENTITY
    {
		public string qr { get; set; }
		public string voucher_code { get; set; }
		public string company_code { get; set; }
		public int? voucher_year { get; set; }
		public string starts_with_d { get; set; }
		public string starts_with_m { get; set; }
	}
}
