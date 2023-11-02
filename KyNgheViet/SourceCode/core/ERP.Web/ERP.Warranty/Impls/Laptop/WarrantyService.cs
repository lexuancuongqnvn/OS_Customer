
using ERP.Common.Controllers;
using ERP.Warranty.Intfs.Laptop;
using ERP.Warranty.Intfs.Laptop.Dto;
using ERP.Warranty.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Warranty.Impls.Laptop
{
    public class WarrantyService : IWarrantyService
    {
        public async Task<List<Warranty_Laptop_ENTITY>> Warranty_Laptop_History_Search(Warranty_Laptop_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<Warranty_Laptop_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoreProcedure.Warranty_Laptop_History_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> Warranty_Laptop_Inserst(Warranty_Laptop_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoreProcedure.Warranty_Laptop_Insert, input);
            return result;
        }

        public async Task<List<Warranty_Laptop_Log_Update_ENTITY>> Warranty_Laptop_Log_Update_Search(Warranty_Laptop_Log_Update_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<Warranty_Laptop_Log_Update_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoreProcedure.Warranty_Laptop_Log_Update_Search, input);
            return result;
        }

        public async Task<List<Warranty_Laptop_Print_History_ENTITY>> Warranty_Laptop_Print_History_Search(Warranty_Laptop_Print_History_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<Warranty_Laptop_Print_History_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoreProcedure.Warranty_Laptop_Print_History_Search, input);
            return result;
        }

        public async Task<List<Warranty_Laptop_ENTITY>> Warranty_Laptop_Search(Warranty_Laptop_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<Warranty_Laptop_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoreProcedure.Warranty_Laptop_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> Warranty_Laptop_Update(Warranty_Laptop_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoreProcedure.Warranty_Laptop_Update, input);
            return result;
        }
    }
}
