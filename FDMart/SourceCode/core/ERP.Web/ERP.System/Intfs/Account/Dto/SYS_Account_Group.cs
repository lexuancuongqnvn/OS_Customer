using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP.System.Impls.Account.Dto
{
    public class SYS_Account_Group : ISYS
    {
        public int ID { get; set; }
        public int? ACCOUNT_ID { get; set; }
        public DateTime? DATE_ADD { get; set;}
        public DateTime? DATE_EDIT { get; set;}
        public string LOG { get; set; }
        public string NOTES { get; set; }
        public string NAME { get; set; }
        public string LISTACCOUNT { get; set; }
        public List<SYS_Account_Group> SYS_Account_Infomation { get; set; }
        public string code { get; set; }
        public string TYPE { get; set; }
        public string DECENTRALIZATION { get; set; }
        public string DEPARTMENT_CODE { get; set; }
        public string DEPARTMENT_NAME { get; set; }
        public bool? APPROVE { get; set; }
    }
}