using ERP.Common.Controllers;
using Sales.Infs.VAT;
using Sales.Infs.VAT.Dto;
using Sales.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sales.Impls.VAT
{
    public class SaleVATService : ISaleVATService
    {
        public async Task<IDictionary<string, object>> Accounting_VAT_Input_Delete(Accounting_VAT_Input_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.Accounting_VAT_Input_Delete, input);
            return result;
        }

        public async Task<IDictionary<string, object>> Accounting_VAT_Input_Insert(Accounting_VAT_Input_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.Accounting_VAT_Input_Insert, input);
            return result;
        }

        public async Task<List<Accounting_VAT_Input_ENTITY>> Accounting_VAT_Input_Search(Accounting_VAT_Input_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<Accounting_VAT_Input_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.Accounting_VAT_Input_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> Accounting_VAT_Input_Update(Accounting_VAT_Input_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.Accounting_VAT_Input_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> Accounting_VAT_Output_Delete(Accounting_VAT_Output_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.Accounting_VAT_Output_Delete, input);
            return result;
        }

        public async Task<IDictionary<string, object>> Accounting_VAT_Output_Insert(Accounting_VAT_Output_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.Accounting_VAT_Output_Insert, input);
            return result;
        }

        public async Task<List<Accounting_VAT_Output_ENTITY>> Accounting_VAT_Output_Search(Accounting_VAT_Output_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<Accounting_VAT_Output_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.Accounting_VAT_Output_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> Accounting_VAT_Output_Update(Accounting_VAT_Output_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.Accounting_VAT_Output_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> CAT_Tax_Delete(CAT_Tax_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Tax_Delete, input);
            return result;
        }

        public async Task<IDictionary<string, object>> CAT_Tax_Insert(CAT_Tax_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Tax_Insert, input);
            return result;
        }

        public async Task<List<CAT_Tax_ENTITY>> CAT_Tax_Search(CAT_Tax_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CAT_Tax_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Tax_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> CAT_Tax_Update(CAT_Tax_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Tax_Update, input);
            return result;
        }
    }
}
