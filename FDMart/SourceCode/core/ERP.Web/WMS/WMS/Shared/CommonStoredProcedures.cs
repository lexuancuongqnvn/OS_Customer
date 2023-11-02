using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Shared
{
    public class CommonStoredProcedures
    {
        public const string WMS_Warehouse_Goods_Receipt_Insert = "WMS_Warehouse_Goods_Receipt_Insert";
        public const string WMS_Warehouse_Goods_Receipt_Delivery_Partner_Search = "WMS_Warehouse_Goods_Receipt_Delivery_Partner_Search";
        public const string WMS_Warehouse_Goods_Receipt_Delivery_Partner_Insert = "WMS_Warehouse_Goods_Receipt_Delivery_Partner_Insert";
        public const string WMS_Warehouse_Goods_Receipt_Delivery_Partner_Delete = "WMS_Warehouse_Goods_Receipt_Delivery_Partner_Delete";
        public const string WMS_Warehouse_Goods_Receipt_Delivery_Partner_Update = "WMS_Warehouse_Goods_Receipt_Delivery_Partner_Update";
        public const string WMS_Warehouse_Goods_Receipt_Delivery_Partner_Bycode = "WMS_Warehouse_Goods_Receipt_Delivery_Partner_Bycode";
        public const string WMS_Warehouse_Goods_Receipt_Delivery_Partner_Type_Search = "WMS_Warehouse_Goods_Receipt_Delivery_Partner_Type_Search";
        public const string WMS_Warehouse_Goods_Receipt_Delivery_Partner_Type_Insert = "WMS_Warehouse_Goods_Receipt_Delivery_Partner_Type_Insert";
        public const string WMS_Warehouse_Goods_Receipt_Update = "WMS_Warehouse_Goods_Receipt_Update";
        public const string WMS_Warehouse_Goods_Receipt_Delete = "WMS_Warehouse_Goods_Receipt_Delete";
        public const string WMS_Warehouse_Goods_Receipt_Bycode = "WMS_Warehouse_Goods_Receipt_Bycode";
        public const string WMS_Warehouse_Goods_Receipt_Search = "WMS_Warehouse_Goods_Receipt_Search";
        public const string WMS_Warehouse_Goods_Issue_Insert = "WMS_Warehouse_Goods_Issue_Insert";
        public const string WMS_Warehouse_Goods_Issue_Update = "WMS_Warehouse_Goods_Issue_Update";
        public const string WMS_Warehouse_Goods_Issue_Delete = "WMS_Warehouse_Goods_Issue_Delete";
        public const string WMS_Warehouse_Goods_Issue_Bycode = "WMS_Warehouse_Goods_Issue_Bycode";
        public const string WMS_Warehouse_Goods_Issue_Search = "WMS_Warehouse_Goods_Issue_Search";
        public const string WMS_Warehouse_Insert = "WMS_Warehouse_Insert";
        public const string WMS_Warehouse_Update = "WMS_Warehouse_Update";
        public const string WMS_Warehouse_Delete = "WMS_Warehouse_Delete";
        public const string WMS_Warehouse_Bycode = "WMS_Warehouse_Bycode";
        public const string WMS_Warehouse_Search = "WMS_Warehouse_Search";
        public const string WMS_Warehouse_SKU_Actions = "WMS_Warehouse_SKU_Actions";
        public const string WMS_Warehouse_SKU_Search = "WMS_Warehouse_SKU_Search";
        //Category 25/07/2023
        public const string CAT_Goods_Delete = "CAT_Goods_Delete";
        public const string CAT_Goods_Search = "CAT_Goods_Search";
        public const string CAT_Goods_Insert = "CAT_Goods_Insert";
        public const string CAT_Goods_Update = "CAT_Goods_Update";        
        
        public const string CAT_Goods_Unit_Conversion_Factor_Delete = "CAT_Goods_Unit_Conversion_Factor_Delete";
        public const string CAT_Goods_Unit_Conversion_Factor_Search = "CAT_Goods_Unit_Conversion_Factor_Search";
        public const string CAT_Goods_Unit_Conversion_Factor_Insert = "CAT_Goods_Unit_Conversion_Factor_Insert";
        public const string CAT_Goods_Unit_Conversion_Factor_Update = "CAT_Goods_Unit_Conversion_Factor_Update";

        public const string CAT_Warehouse_Search = "CAT_Warehouse_Search";
        public const string CAT_Warehouse_Action_By_Type = "CAT_Warehouse_Action_By_Type";

        public const string CAT_Goods_Unit_Action_By_Type = "CAT_Goods_Unit_Action_By_Type";
        public const string CAT_Goods_Unit_Search = "CAT_Goods_Unit_Search";

        public const string CAT_Goods_Group_Action_By_Type = "CAT_Goods_Group_Action_By_Type";
        public const string CAT_Goods_Group_Search = "CAT_Goods_Group_Search";

        public const string OB_Goods_Delete = "OB_Goods_Delete";
        public const string OB_Goods_Insert = "OB_Goods_Insert";
        public const string OB_Goods_Search = "OB_Goods_Search";
        public const string OB_Goods_Update = "OB_Goods_Update";

        public const string OB_Account_Delete = "OB_Account_Delete";
        public const string OB_Account_Insert = "OB_Account_Insert";
        public const string OB_Account_Search = "OB_Account_Search";
        public const string OB_Account_Update = "OB_Account_Update";

        public const string OB_Input_Output_Inventory_Delete = "OB_Input_Output_Inventory_Delete";
        public const string OB_Input_Output_Inventory_Insert = "OB_Input_Output_Inventory_Insert";
        public const string OB_Input_Output_Inventory_Search = "OB_Input_Output_Inventory_Search";
        public const string OB_Input_Output_Inventory_Update = "OB_Input_Output_Inventory_Update";

        public const string I41_M_Search = "I41_M_Search";
        public const string I41_D_Search = "I41_D_Search";
        public const string I41_M_Insert = "I41_M_Insert";
        public const string I41_M_Update = "I41_M_Update";
        public const string I41_M_Delete = "I41_M_Delete";

        public const string I42_M_Search = "I42_M_Search";
        public const string I42_D_Search = "I42_D_Search";
        public const string I42_M_Insert = "I42_M_Insert";
        public const string I42_M_Update = "I42_M_Update";
        public const string I42_M_Delete = "I42_M_Delete";

        public const string I43_M_Search = "I43_M_Search";
        public const string I43_D_Search = "I43_D_Search";
        public const string I43_M_Insert = "I43_M_Insert";
        public const string I43_M_Update = "I43_M_Update";
        public const string I43_M_Delete = "I43_M_Delete";

        public const string I44_M_Search = "I44_M_Search";
        public const string I44_D_Search = "I44_D_Search";
        public const string I44_M_Insert = "I44_M_Insert";
        public const string I44_M_Update = "I44_M_Update";
        public const string I44_M_Delete = "I44_M_Delete";

        public const string I45_M_Search = "I45_M_Search";
        public const string I45_D_Search = "I45_D_Search";
        public const string I45_M_Insert = "I45_M_Insert";
        public const string I45_M_Update = "I45_M_Update";
        public const string I45_M_Delete = "I45_M_Delete";

        public const string I45_Damaged_Tools_Equipment_Search = "I45_Damaged_Tools_Equipment_Search";
        public const string I45_Damaged_Tools_Equipment_Insert = "I45_Damaged_Tools_Equipment_Insert";
        public const string I45_Damaged_Tools_Equipment_Update = "I45_Damaged_Tools_Equipment_Update";
        public const string I45_Damaged_Tools_Equipment_Delete = "I45_Damaged_Tools_Equipment_Delete";

        public const string WMS_Prepaid_Expense_Allocation = "WMS_Prepaid_Expense_Allocation";
        public const string WMS_Prepaid_Expense_Allocation_Delete = "WMS_Prepaid_Expense_Allocation_Delete";
        public const string WMS_Report_Allocation_Search = "WMS_Report_Allocation_Search";

        public const string WMS_Report_Inventory_Movement = "WMS_Report_Inventory_Movement";
        public const string WMS_Report_Inventory = "WMS_Report_Inventory";
        public const string WMS_Report_I41_Search = "WMS_Report_I41_Search";
        public const string WMS_Report_I42_Search = "WMS_Report_I42_Search";
        public const string WMS_Report_I43_Search = "WMS_Report_I43_Search";
        public const string WMS_Report_I44_Search = "WMS_Report_I44_Search";
        public const string WMS_Report_I45_Search = "WMS_Report_I45_Search";
        public const string WMS_Report_Goods_Import_Search = "WMS_Report_Goods_Import_Search";
        public const string WMS_Report_Inventory_Material_Ledger_Search = "WMS_Report_Inventory_Material_Ledger_Search";
        public const string WMS_Report_Inventory_Book_Detail_Search = "WMS_Report_Inventory_Book_Detail_Search";
        public const string WMS_Report_Inventory_By_Warehouse_Search = "WMS_Report_Inventory_By_Warehouse_Search";
        public const string WMS_Report_Inventory_Import_Export_Search = "WMS_Report_Inventory_Import_Export_Search";
        public const string WMS_Report_Inventory_Incoming_Summary_Search = "WMS_Report_Inventory_Incoming_Summary_Search";
        public const string WMS_Report_Inventory_Issued_Summary_Search = "WMS_Report_Inventory_Issued_Summary_Search";
    }
}
