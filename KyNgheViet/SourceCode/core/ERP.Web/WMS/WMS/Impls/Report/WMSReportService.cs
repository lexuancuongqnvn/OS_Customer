using ERP.Common.Controllers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WMS.Intfs.Report;
using WMS.Intfs.Report.Dto;
using WMS.Shared;

namespace WMS.Impls.Report
{
    public class WMSReportService : IWMSReportService
    {
        public async Task<List<WMS_Report_Inventory_Movement_ENTITY>> WMS_Report_Inventory_Movement(WMS_Report_Inventory_Movement_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<WMS_Report_Inventory_Movement_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Report_Inventory_Movement, input);
            return result;
        }
        public async Task<List<WMS_Report_Inventory_ENTITY>> WMS_Report_Inventory(WMS_Report_Inventory_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<WMS_Report_Inventory_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Report_Inventory, input);
            return result;
        }

        public async Task<List<WMS_Prepaid_Expense_Allocation_ENTITY>> WMS_Prepaid_Expense_Allocation(WMS_Prepaid_Expense_Allocation_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<WMS_Prepaid_Expense_Allocation_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Prepaid_Expense_Allocation, input);
            return result;
        }

        public async Task<IDictionary<string, object>> WMS_Prepaid_Expense_Allocation_Delete(WMS_Prepaid_Expense_Allocation_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Prepaid_Expense_Allocation_Delete, input);
            return result;
        }

        public async Task<List<WMS_Report_I45_ENTITY>> WMS_Report_I45_Search(WMS_Report_I45_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<WMS_Report_I45_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Report_I45_Search, input);
            return result;
        }
        public async Task<List<WMS_Report_I44_ENTITY>> WMS_Report_I44_Search(WMS_Report_I44_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<WMS_Report_I44_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Report_I44_Search, input);
            return result;
        }
        public async Task<List<WMS_Report_I43_ENTITY>> WMS_Report_I43_Search(WMS_Report_I43_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<WMS_Report_I43_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Report_I43_Search, input);
            return result;
        }
        public async Task<List<WMS_Report_I42_ENTITY>> WMS_Report_I42_Search(WMS_Report_I42_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<WMS_Report_I42_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Report_I42_Search, input);
            return result;
        } 
        public async Task<List<WMS_Report_I41_ENTITY>> WMS_Report_I41_Search(WMS_Report_I41_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<WMS_Report_I41_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Report_I41_Search, input);
            return result;
        }

        public async Task<List<WMS_Report_Allocation_ENTITY>> WMS_Report_Allocation_Search(WMS_Report_Allocation_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<WMS_Report_Allocation_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Report_Allocation_Search, input);
            return result;
        }
        public async Task<List<WMS_Report_Goods_Import_ENTITY>> WMS_Report_Goods_Import_Search(WMS_Report_Goods_Import_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<WMS_Report_Goods_Import_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Report_Goods_Import_Search, input);
            return result;
        }  
        public async Task<List<WMS_Report_Inventory_Material_Ledger_ENTITY>> WMS_Report_Inventory_Material_Ledger_Search(WMS_Report_Inventory_Material_Ledger_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<WMS_Report_Inventory_Material_Ledger_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Report_Inventory_Material_Ledger_Search, input);
            return result;
        }
        public async Task<List<WMS_Report_Inventory_Book_Detail_ENTITY>> WMS_Report_Inventory_Book_Detail_Search(WMS_Report_Inventory_Book_Detail_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<WMS_Report_Inventory_Book_Detail_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Report_Inventory_Book_Detail_Search, input);
            return result;
        }
        public async Task<List<WMS_Report_Inventory_By_Warehouse_ENTITY>> WMS_Report_Inventory_By_Warehouse_Search(WMS_Report_Inventory_By_Warehouse_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<WMS_Report_Inventory_By_Warehouse_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Report_Inventory_By_Warehouse_Search, input);
            return result;
        }  
        public async Task<List<WMS_Report_Inventory_Import_Export_ENTITY>> WMS_Report_Inventory_Import_Export_Search(WMS_Report_Inventory_Import_Export_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<WMS_Report_Inventory_Import_Export_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Report_Inventory_Import_Export_Search, input);
            return result;
        } 
        public async Task<List<WMS_Report_Inventory_Incoming_Summary_ENTITY>> WMS_Report_Inventory_Incoming_Summary_Search(WMS_Report_Inventory_Incoming_Summary_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<WMS_Report_Inventory_Incoming_Summary_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Report_Inventory_Incoming_Summary_Search, input);
            return result;
        }
        public async Task<List<WMS_Report_Inventory_Issued_Summary_ENTITY>> WMS_Report_Inventory_Issued_Summary_Search(WMS_Report_Inventory_Issued_Summary_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<WMS_Report_Inventory_Issued_Summary_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Report_Inventory_Issued_Summary_Search, input);
            return result;
        }
    }
}
