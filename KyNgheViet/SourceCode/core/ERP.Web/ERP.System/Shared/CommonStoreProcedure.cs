using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.System.Shared
{
    public class CommonStoreProcedure
    {
        //Login
        public const string SYS_Account_Infomation_CheckLogin = "SYS_Account_Infomation_CheckLogin";
        public const string SYS_Account_Search = "SYS_Account_Search";
        public const string SYS_Account_Group_Search = "SYS_Account_Group_Search";
        public const string SYS_Account_Info_Search = "SYS_Account_Info_Search";
        public const string SYS_Account_Infomation_Delete = "SYS_Account_Infomation_Delete";
        public const string SYS_Account_Register = "SYS_Account_Register";
        public const string SYS_Account_Info_Search_byUser = "SYS_Account_Info_Search_byUser";
        public const string SYS_Account_Infomation_Update = "SYS_Account_Infomation_Update";
        public const string SYS_Account_Infomation_ForgotPassword_Inserst = "SYS_Account_Infomation_ForgotPassword_Inserst";
        public const string SYS_Account_Infomation_Register = "SYS_Account_Infomation_Register";
        public const string SYS_Account_Infomation_Register_Confirm = "SYS_Account_Infomation_Register_Confirm";
        public const string SYS_Account_Group_Actions = "SYS_Account_Group_Actions";
        public const string SYS_Account_Infomation_Insert = "SYS_Account_Infomation_Insert";
        public const string SYS_Account_Infomation_UpdatePassword = "SYS_Account_Infomation_UpdatePassword";
        public const string SYS_Account_Info_Permission_Search = "SYS_Account_Info_Permission_Search";

        //Menu
        public const string SYS_Menu_Delete = "SYS_Menu_Delete";
        public const string SYS_Menu_Inserst = "SYS_Menu_Inserst";
        public const string SYS_Menu_Search = "SYS_Menu_Search";
        public const string RequestManagement_Search = "RequestManagement_Search";
        public const string RequestManagement_History = "RequestManagement_History";
        public const string SYS_Menu_Detail_Search = "SYS_Menu_Detail_Search";
        public const string SYS_Menu_Search_byID = "SYS_Menu_Search_byID";
        public const string SYS_Menu_Update = "SYS_Menu_Update";
        public const string SYS_Menu_Permission_Search = "SYS_Menu_Permission_Search";
        public const string SYS_Menu_Permission_Detail_Search = "SYS_Menu_Permission_Detail_Search";
        public const string SYS_Menu_Permission_Update = "SYS_Menu_Permission_Update";
        public const string SYS_Menu_Sub_Pin = "SYS_Menu_Sub_Pin";

        //GenrowTable
        public const string SYS_GenRowTable_Search = "SYS_GenRowTable_Search";
        public const string SYS_GenRowTable_Root_Search = "SYS_GenRowTable_Root_Search";
        public const string SYS_GenRowTable_Detail_Search = "SYS_GenRowTable_Detail_Search";
        public const string SYS_GenRowTable_Detail_V2_Search = "SYS_GenRowTable_Detail_V2_Search";
        public const string SYS_GenRowTable_Detail_Root_Search = "SYS_GenRowTable_Detail_Root_Search";
        public const string SYS_GenRowTable_Opption_Search = "SYS_GenRowTable_Opption_Search";
        public const string SYS_GenRowTable_Delete_ListID = "SYS_GenRowTable_Delete_ListID";
        public const string SYS_GenRowTable_Update_Detail = "SYS_GenRowTable_Update_Detail";
        public const string SYS_GenRowTable_Opption_v2_Search = "SYS_GenRowTable_Opption_v2_Search";
        public const string SYS_GenRowTable_Opption_Action_By_Type = "SYS_GenRowTable_Opption_Action_By_Type";
        public const string SYS_GenRowTable_Insert = "SYS_GenRowTable_Insert";
        public const string SYS_GenRowTable_Update = "SYS_GenRowTable_Update";

        public const string SYS_Generate_Table_Voucher = "SYS_Generate_Table_Voucher";

        public const string SYS_Column_Info_Search = "SYS_Column_Info_Search";
        public const string SYS_Column_Info_Action_By_Type = "SYS_Column_Info_Action_By_Type";

        //Upload
        public const string SYS_Upload_Save = "SYS_Upload_Save";
        public const string SYS_Upload_Get = "SYS_Upload_Get";
        public const string SYS_Upload_Search = "SYS_Upload_Search";

        //TestTheme
        public const string TestTheme_Search = "TestTheme_Search";
        public const string TestTheme_Search_byID = "TestTheme_Search_byID";
        public const string TestTheme_Update = "TestTheme_Update";
        public const string TestTheme_Insert = "TestTheme_Insert";
        public const string TestTheme_Del = "TestTheme_Del";

        //Acction
        public const string Acction_Search = "Acction_Search";
        public const string Acction_V3_Search = "Acction_V3_Search";
        public const string Acction_Search_byTableName = "Acction_Search_byTableName";
        public const string Acction_Delete_ListID = "Acction_Delete_ListID";
        public const string Acction_Autorenew = "Acction_Autorenew";
        public const string Acction_Update = "Acction_Update";
        public const string Acction_Update_v2 = "Acction_Update_v2";
        public const string Action_Permission_Search = "Action_Permission_Search";
        public const string Action_Permission_Update = "Action_Permission_Update";

        //Department
        public const string Department_Actions = "Department_Actions";
        public const string Department_Search = "Department_Search";
        public const string Department_Title_Search = "Department_Title_Search";
        public const string Department_Position_Actions = "Department_Position_Actions";

        //List app
        public const string SYS_List_App_Actions = "SYS_List_App_Actions";
        public const string SYS_List_App_Search = "SYS_List_App_Search";
        public const string SYS_List_Company_Search = "SYS_List_Company_Search";
        public const string SYS_Color_Acctions = "SYS_Color_Acctions";
        public const string SYS_List_App_Group_Actions = "SYS_List_App_Group_Actions";
        public const string SYS_List_App_Group_Search = "SYS_List_App_Group_Search";

        public const string SYS_Alter_Table_Voucher = "SYS_Alter_Table_Voucher";
        
        public const string SYS_Report_Infomation_Insert = "SYS_Report_Infomation_Insert";
        public const string SYS_Report_Infomation_Update = "SYS_Report_Infomation_Update";
        public const string SYS_Report_Infomation_Delete = "SYS_Report_Infomation_Delete";
        public const string SYS_Report_Infomation_Search = "SYS_Report_Infomation_Search";
        public const string SYS_Report_Infomation_Version_Search = "SYS_Report_Infomation_Version_Search";
        public const string SYS_Report_Infomation_Detail_Search = "SYS_Report_Infomation_Detail_Search";
        public const string SYS_Report_Infomation_Detail_Signature_Search = "SYS_Report_Infomation_Detail_Signature_Search";

    }
}
