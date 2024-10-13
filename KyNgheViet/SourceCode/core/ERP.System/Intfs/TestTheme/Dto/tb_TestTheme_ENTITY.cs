using ERP.System.Intfs.Upload.Dto;
using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ERP.System.Intfs.TestTheme.Dto
{
    public class tb_TestTheme_ENTITY : ISYS
    {
        public int id { get; set; }
        public int? col_int { get; set; }
        public string col_char { get; set; }
        public string code { get; set; }
        public string col_LongText { get; set; }
        public Boolean? col_Switch { get; set; }
        public int? col_Select { get; set; }
        public DateTime? col_Date { get; set; }
        public List<Upload_ENTITY> col_Images { get; set; }
        public List<Upload_ENTITY> col_meadia { get; set; }
        public List<Upload_ENTITY> col_multimedia { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy HH:mm}")]
        public DateTime? col_datetime { get; set; }
        public string col_dateranges { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy HH:mm}")]
        public DateTime? col_time { get; set; }
        public string col_Multivalue { get; set; }
        public string col_colorpicker { get; set; }
        public decimal? col_float { get; set; }
        public decimal? col_money { get; set; }
        public string col_Multirow1 { get; set; }
        public string col_Multirow2 { get; set; }
        public string col_Multirow3 { get; set; }
        public string col_content { get; set; }
        public int? col_Rating { get; set; }
        public Boolean? col_IsOnline { get; set; }
        public int? col_Engagement { get; set; }
        public string col_Phone { get; set; }
        public Boolean? col_Checkbox { get; set; }
        public int? col_Autocomplete { get; set; }  
        public string XML_Detail1 { get; set; }
        public string XML_Detail2 { get; set; }
        public string XML_Detail3 { get; set; }
        public List<tb_TestTheme_Sub1_ENTITY> tb_TestTheme_Sub1 { get; set; }
        public List<tb_TestTheme_Sub2_ENTITY> tb_TestTheme_Sub2 { get; set; }
        public List<tb_TestTheme_Sub3_ENTITY> tb_TestTheme_Sub3 { get; set; }

        public bool? APPROVE { get; set; }
        public DateTime? DATE_ADD { get; set; }
        public DateTime? DATE_EDIT { get; set; }
        public int? ACCOUNT_ID { get; set; }
        public string NOTES { get; set; }
        public string DECENTRALIZATION { get; set; }
    }
}
