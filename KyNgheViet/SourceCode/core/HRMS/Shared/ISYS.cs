using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Shared
{
    public interface ISYS
    {
        public string code { get; set; }
        Boolean? APPROVE { get; set; }
        DateTime? DATE_ADD { get; set; }
        DateTime? DATE_EDIT { get; set; }
        int? ACCOUNT_ID { get; set; }
        string NOTES { get; set; }
        string DECENTRALIZATION { get; set; }
    }
}
