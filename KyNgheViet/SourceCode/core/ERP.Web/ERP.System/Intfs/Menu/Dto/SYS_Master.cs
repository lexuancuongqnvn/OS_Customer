using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP.System.Intfs.Menu.Dto
{
    public class SYS_Master : ISYS
    {
        public string code { get; set; }
        public int Status { get; set; }
        public string Message { get; set; }
        public string DECENTRALIZATION { get; set; }
        public DateTime? DATE_ADD { get; set; }
        public DateTime? DATE_EDIT { get; set; }
        public int? ACCOUNT_ID { get; set; }
        public string NOTES { get; set; }
        public bool? APPROVE { get; set; }
    }
}