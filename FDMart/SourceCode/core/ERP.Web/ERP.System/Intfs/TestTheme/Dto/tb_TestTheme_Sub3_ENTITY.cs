using ERP.System.Intfs.Upload.Dto;
using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;

namespace ERP.System.Intfs.TestTheme.Dto
{
    [XmlType("tb_TestTheme_Sub3")]
    public class tb_TestTheme_Sub3_ENTITY : ISYS
    {
        public int ID { get; set; }
        public int? col_int { get; set; }
        public string col_char { get; set; }
        public string code { get; set; }
        public string col_LongText { get; set; }
        public Boolean? col_Switch { get; set; }
        public DateTime? col_Date { get; set; }
        public List<Upload_ENTITY> col_Images { get; set; }
        public List<Upload_ENTITY> col_meadia { get; set; }
        public List<Upload_ENTITY> col_multimedia { get; set; }
        public DateTime? col_datetime { get; set; }
        public string col_dateranges { get; set; }
        public DateTime? col_time { get; set; }
        public string col_Multivalue { get; set; }
        public string col_colorpicker { get; set; }
        public decimal? col_float { get; set; }
        public decimal? col_money { get; set; }
        public string col_content { get; set; }
        public int? col_Rating { get; set; }
        public Boolean? col_IsOnline { get; set; }
        public int? col_Engagement { get; set; }
        public string col_Phone { get; set; }
        public Boolean? col_Checkbox { get; set; }
        public int? Father { get; set; }

        public bool? APPROVE { get; set; }
        public DateTime? DATE_ADD { get; set; }
        public DateTime? DATE_EDIT { get; set; }
        public int? ACCOUNT_ID { get; set; }
        public string NOTES { get; set; }
        public string DECENTRALIZATION { get; set; }
    }
}
