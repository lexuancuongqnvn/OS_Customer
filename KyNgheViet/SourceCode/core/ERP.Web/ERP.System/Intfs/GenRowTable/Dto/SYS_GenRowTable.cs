using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ERP.System.Intfs.GenRowTable.Dto
{
    public class SYS_GenRowTable
    {
        public int ID { get; set; }
        public string CODE { get; set; }
        public string TABLE_NAME { get; set; }
        public int? userID { get; set; }
        public int? indexRow { get; set; }
        public string NAME_VN { get; set; }
        public string NAME_EN { get; set; }
        public string NAME { get; set; }
        public Boolean? ACTIVE { get; set; }
        public int? ID_DT { get; set; }
        public int? DISPLAY_STATUS { get; set; }
        public string CODE_DT { get; set; }
        public string COLUMN_NAME { get; set; }
        public string NAME_VN_DT { get; set; }
        public string NAME_EN_DT { get; set; }
        public string FATHER { get; set; }
        public string DECENTRALIZATION_DT { get; set; }
        public Boolean? ACTIVE_DT { get; set; }
        public Boolean? ALLOW_EDIT { get; set; }
        public string DECENTRALIZATION { get; set; }
        public DateTime? DATE_ADD { get; set; }
        public DateTime? DATE_EDIT { get; set; }
        public int? ACCOUNT_ID { get; set; }
        public string NOTES { get; set; }
        public string XML_Detail { get; set; }
        public bool? APPROVE { get; set; }
        public bool? EXPORT_PDF { get; set; }
        public bool? EXPORT_EXCEL { get; set; }
        public bool? IS_REPORT { get; set; }
        public string MENU_CODE { get; set; }
        public string TYPE { get; set; }
        public string FORM { get; set; }
        public int? TYPE_ID { get; set; }
        public List<SYS_GenRowTable_Detail> SYS_GenRowTable_Detail { get; set; }
    }
}
