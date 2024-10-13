using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ERP.System.Shared
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
    public interface ISystem
    {
        public string code { get; set; }
        public Boolean? approve { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public int? account_id { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public string notes { get; set; }
        public string decentralization { get; set; }
        //public HRM_Employee_ENTITY hrm_employee_info { get; set; }
    }
}
