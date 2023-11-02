using HRMS.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.TimeSheet.Dto
{
    public class HRM_TimeSheet_ENTITY : ISYS
    {
        public int? ID { get; set; }
        public decimal? ConstHour { get; set; }
        public decimal? HourStartMonth { get; set; }
        public int? Employee_ID { get; set; }
        public string employee_code { get; set; }
        public string company_code { get; set; }
        public string Title { get; set; }
        public string host { get; set; }
        public int? Start { get; set; }
        public int? Allday { get; set; }
        public int? Type_ID { get; set; }
        public string ClassName { get; set; }
        public List<HRM_TimeSheet_Detail_ENTITY> hRM_TimeSheet_Details { get; set; }
        public string code { get; set; }
        public string department { get; set; }
        public bool? APPROVE { get; set; }
        public DateTime? DATE_ADD { get; set; }
        public DateTime? DATE_EDIT { get; set; }
        public DateTime start_date { get; set; }
        public DateTime end_date { get; set; }
        public int? ACCOUNT_ID { get; set; }
        public string NOTES { get; set; }
        public string html { get; set; }
        public string base64 { get; set; }
        public string DECENTRALIZATION { get; set; }
        public Base64FormattingOptions check_image_face { get; set; }
    }
}
