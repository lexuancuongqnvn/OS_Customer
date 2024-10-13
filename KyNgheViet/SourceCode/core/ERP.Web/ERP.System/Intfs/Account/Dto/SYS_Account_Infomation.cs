using ERP.System.Shared;
using SignalR.Intfs.HubClient.Dto;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP.System.Impls.Account.Dto
{
    public class SYS_Account_Infomation : ISYS
    {
        public int ID { get; set; }
        public int? ACCOUNT_ID { get; set; }
        public int? ACCOUNT_GROUP { get; set; }
        public string ACCOUNT_GROUP_NAME { get; set; }
        public DateTime? DATE_ADD { get; set; }
        public DateTime? DATE_EDIT { get; set; }
        public string LOG { get; set; }
        public string NOTES { get; set; }
        public string FATHER { get; set; }
        public string USER_NAME { get; set; }
        public string PASSWORD { get; set; }
        public string PASSWORD_F { get; set; }
        public string code { get; set; }
        public string code_employee { get; set; }
        public string DECENTRALIZATION { get; set; }
        public Boolean? ACTIVE { get; set; }
        public string allow_approve_worktime { get; set; }
        public string AVARTA { get; set;  }
        public string LAST_NAME { get; set;  }
        public string FIRST_NAME { get; set;  }
        public bool? APPROVE { get; set; }
        public string MOBILE_NUMBER { get; set; }
        public string ADDRESS { get; set; }
        public string ADDRESS_CURRENT { get; set; }
        public string ID_CARD { get; set; }
        public DateTime? BIRTHDAY { get; set; }
        public string BIRTHDAY_F { get; set; }
        public string POSITION { get; set; }
        public string POSITION_NAME { get; set; }
        public string EMAIL { get; set; }
        public string EDUCATION { get; set; }
        public string COUNTRY { get; set; }
        public string CITY { get; set; }
        public string EXPERIENCE { get; set; }
        public string ADDITIONAL_DETAILS { get; set; }
        public string DEPARTMENT_CODE { get; set; }
        public string DEPARTMENT_NAME { get; set; }

        public int? chat_id { get; set; }
        public int? new_message { get; set; }
        public string chat_name { get; set; }
        public string title { get; set; }
        public string body { get; set; }
        public string to { get; set; }
        public string from { get; set; }
        public ArrayList arr_to { get; set; }
        public string image_url { get; set; }
        public string user_create { get; set; }
        public string tag { get; set; }
        public string type { get; set; }
        public string list_user { get; set; }
        public string chat_review { get; set; }
        public string my_avt { get; set; }
        public string client_avt { get; set; }
        public string group_avt { get; set; }
        public string user_login { get; set; }
        public string XML { get; set; }
        public DateTime? chat_time { get; set; }
        public string chat_time_f { get; set; }
        public string employee_code { get; set; }
        public Boolean? is_view { get; set; }
    }
}