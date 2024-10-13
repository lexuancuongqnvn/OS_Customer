using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ERP.System.Intfs.GenRowTable.Dto
{
    public class SYS_GenRowTable_Detail
    {
        public int ID { get; set; }
        public int? DISPLAY_STATUS { get; set; }
        public string CODE { get; set; }
        public int? indexRow { get; set; }
        public string COLUMN_NAME { get; set; }
        public string DISPLAY_CONDITIONS { get; set; }
        public string FORMAT { get; set; }
        public string dx_format { get; set; }
        public int? userID { get; set; }
        public int? POSSION { get; set; }
        public string NAME_VN { get; set; }
        public string NAME_EN { get; set; }
        public string NAME { get; set; }
        public int? TYPE_ID { get; set; }
        public int? WIDTH { get; set; }
        public int? MIN { get; set; }
        public int? MAX { get; set; }
        public string CLASS_INSERT { get; set; }
        public string REFERENCE { get; set; }
        public string TABLE_NAME { get; set; }
        public string FATHER { get; set; }
        public string DECENTRALIZATION { get; set; }
        public string STORED_PROCEDURES { get; set; }
        public Boolean? ACTIVE { get; set; }
        public Boolean? IS_HIDDEN { get; set; }
        public Boolean? SHOW_REFERENCE { get; set; }
        public Boolean? DISPLAY_LIST { get; set; }
        public Boolean? DISPLAY_EDIT { get; set; }
        public Boolean? DISABLE_EDIT { get; set; }
        public Boolean? REQUIRED { get; set; }

        public Boolean? ALLOW_EDIT { get; set; }
        public Boolean? ALLOW_SEARCH { get; set; }
        public DateTime? DATE_ADD { get; set; }
        public DateTime? DATE_EDIT { get; set; }
        public int? ACCOUNT_ID { get; set; }
        public string NOTES { get; set; }
        public bool? APPROVE { get; set; }

        public int? COLSPAN { get; set; }
        public int? TYPEGROUP { get; set; }
        public string TYPEONGIRDVIEW { get; set; }
        public string TYPEONGIRDEDIT { get; set; }
        public string EDITORTYPE { get; set; }
        public object EDITOROPTIONS { get; set; }
        public int? GROUP { get; set; }
        public string GROUP_NAME { get; set; }
        public string LIST_GROUP { get; set; }
        public string TABS { get; set; }
        public string VALUEEXPR { get; set; }
        public string DISPLAYEXPR { get; set; }
        public string DROP_DOWN_TABLE { get; set; }
        public string FORM { get; set; }
        public string DEFAULT_VALUE { get; set; }
        public string QUERY_GET_MASTER { get; set; }
        public string TAB_LEVEL { get; set; }
        public bool? IS_FIXED { get; set; }
        public bool? IS_GROUP { get; set; }
        public int? INDEX_GROUP { get; set; }
        public string summaryType_GROUP { get; set; }
        public string valueFormat { get; set; }
        public bool? showInGroupFooter_GROUP { get; set; }
        public bool? alignByColumn_GROUP { get; set; }
        public bool? disabled_arised { get; set; }
        public int? DROP_DOWN_WIDTH { get; set; }
    }
}
