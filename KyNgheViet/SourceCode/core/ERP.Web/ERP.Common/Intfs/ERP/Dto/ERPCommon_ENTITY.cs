using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.Common.Intfs.ERP.Dto
{
    public class ERPCommon_ENTITY
    {
        public string company_code { get; set; }
        public string account_code { get; set; }
        public string voucher_code { get; set; }
        public string voucher_no { get; set; }
        public DateTime voucher_date { get; set; }
    }
}
