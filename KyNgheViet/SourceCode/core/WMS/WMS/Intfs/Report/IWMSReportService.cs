using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WMS.Intfs.Report.Dto;

namespace WMS.Intfs.Report
{
    public interface IWMSReportService
    {
        Task<List<WMS_Report_Inventory_Movement_ENTITY>> WMS_Report_Inventory_Movement(WMS_Report_Inventory_Movement_ENTITY input);
        Task<List<WMS_Report_Inventory_ENTITY>> WMS_Report_Inventory(WMS_Report_Inventory_ENTITY input);
        Task<List<WMS_Report_Inventory_ENTITY>> WMS_Report_Inventory_Have_Serial(WMS_Report_Inventory_ENTITY input);
        Task<List<WMS_Prepaid_Expense_Allocation_ENTITY>> WMS_Prepaid_Expense_Allocation(WMS_Prepaid_Expense_Allocation_ENTITY input);
        Task<List<WMS_Report_Allocation_ENTITY>> WMS_Report_Allocation_Search(WMS_Report_Allocation_ENTITY input);
        Task<List<WMS_Report_I45_ENTITY>> WMS_Report_I45_Search(WMS_Report_I45_ENTITY input);
        Task<List<WMS_Report_I44_ENTITY>> WMS_Report_I44_Search(WMS_Report_I44_ENTITY input);
        Task<List<WMS_Report_I43_ENTITY>> WMS_Report_I43_Search(WMS_Report_I43_ENTITY input);
        Task<List<WMS_Report_I42_ENTITY>> WMS_Report_I42_Search(WMS_Report_I42_ENTITY input);
        Task<List<WMS_Report_I41_ENTITY>> WMS_Report_I41_Search(WMS_Report_I41_ENTITY input);
        Task<IDictionary<string, object>> WMS_Prepaid_Expense_Allocation_Delete(WMS_Prepaid_Expense_Allocation_ENTITY input);
        Task<List<WMS_Report_Goods_Import_ENTITY>> WMS_Report_Goods_Import_Search(WMS_Report_Goods_Import_ENTITY input);
        Task<List<WMS_Report_Inventory_Material_Ledger_ENTITY>> WMS_Report_Inventory_Material_Ledger_Search(WMS_Report_Inventory_Material_Ledger_ENTITY input);
        Task<List<WMS_Report_Inventory_Book_Detail_ENTITY>> WMS_Report_Inventory_Book_Detail_Search(WMS_Report_Inventory_Book_Detail_ENTITY input);
        Task<List<WMS_Report_Inventory_By_Warehouse_ENTITY>> WMS_Report_Inventory_By_Warehouse_Search(WMS_Report_Inventory_By_Warehouse_ENTITY input);
        Task<List<WMS_Report_Inventory_Import_Export_ENTITY>> WMS_Report_Inventory_Import_Export_Search(WMS_Report_Inventory_Import_Export_ENTITY input);
        Task<List<WMS_Report_Inventory_Incoming_Summary_ENTITY>> WMS_Report_Inventory_Incoming_Summary_Search(WMS_Report_Inventory_Incoming_Summary_ENTITY input); 
        Task<List<WMS_Report_Inventory_Issued_Summary_ENTITY>> WMS_Report_Inventory_Issued_Summary_Search(WMS_Report_Inventory_Issued_Summary_ENTITY input);
        Task<List<WMS_Average_Cost_Sheet_ENTITY>> WMS_Calculate_The_Average_Costing_Search(WMS_Average_Cost_Sheet_ENTITY input);
        Task<List<WMS_Costing_Run_Process_ENTITY>> WMS_Calculate_The_Average_Costing_Run_Process_Search(WMS_Costing_Run_Process_ENTITY input);
        Task<List<WMS_Average_Cost_Sheet_ENTITY>> WMS_Calculate_The_Average_Costing_Data_Search(WMS_Average_Cost_Sheet_ENTITY input);
        Task<List<WMS_Average_Cost_Sheet_ENTITY>> WMS_Calculate_The_Average_Costing_DataTable_Search(WMS_Average_Cost_Sheet_ENTITY input);
        Task<List<WMS_Average_Cost_Sheet_ENTITY>> WMS_Calculate_The_Average_Costing_DataTable2_Search(WMS_Average_Cost_Sheet_ENTITY input);
        Task<List<WMS_Average_Cost_Sheet_ENTITY>> WMS_Calculate_The_Average_Costing_DataTable3_Search(WMS_Average_Cost_Sheet_ENTITY input);
        Task<List<WMS_Average_Cost_Sheet_ENTITY>> WMS_Calculate_The_Average_Costing_DataTable4_Search(WMS_Average_Cost_Sheet_ENTITY input);
        Task<List<WMS_Average_Cost_Sheet_ENTITY>> WMS_Calculate_The_Average_Costing_Inventory_Book_Group_Search(WMS_Average_Cost_Sheet_ENTITY input);
        Task<List<WMS_Report_Inventory_Book_Detail_ENTITY>> WMS_Calculate_The_Average_Costing_Inventory_Book_Search(WMS_Average_Cost_Sheet_ENTITY input);
        Task<List<WMS_Costing_Price_ENTITY>> WMS_Costing_Price(WMS_Costing_Price_ENTITY input);
        Task<List<WMS_Costing_Price_ENTITY>> WMS_Specific_Identification_Costing_Search(WMS_Costing_Price_ENTITY input);
        Task<List<WMS_Average_Cost_Sheet_ENTITY>> WMS_Report_Calculate_The_Average_Costing_Search(WMS_Average_Cost_Sheet_ENTITY input);
        Task<List<WMS_Report_Inventory_ENTITY>> WMS_Realtime_Inventory_Search(WMS_Report_Inventory_ENTITY input);
        Task<List<WMS_Report_Inventory_ENTITY>> WMS_Report_Inventory_Realtime_Search(WMS_Report_Inventory_ENTITY input);
        Task<List<WMS_Report_Inventory_ENTITY>> WMS_Report_Inventory_Realtime_Have_Serial_Search(WMS_Report_Inventory_ENTITY input);
        Task<List<WMS_Report_Inventory_ENTITY>> WMS_Realtime_Inventory_Check(WMS_Report_Inventory_Check_ENTITY input);
    }
}
