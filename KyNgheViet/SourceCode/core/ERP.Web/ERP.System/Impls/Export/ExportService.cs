using ERP.Common.Controllers;
using ERP.System.Intfs.Export;
using ERP.System.Intfs.Export.Dto;
using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ERP.System.Impls.Export
{
    public class ExportService : IExportService
    {
        public async Task<IDictionary<string, object>> SYS_Report_Infomation_Delete(SYS_Report_Infomation_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoreProcedure.SYS_Report_Infomation_Delete, input);
            return result;
        }

        public async Task<IDictionary<string, object>> SYS_Report_Infomation_Insert(SYS_Report_Infomation_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoreProcedure.SYS_Report_Infomation_Insert, input);
            return result;
        }

        public async Task<List<SYS_Report_Infomation_ENTITY>> SYS_Report_Infomation_Search(SYS_Report_Infomation_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<SYS_Report_Infomation_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoreProcedure.SYS_Report_Infomation_Search, input);
            return result;
        }
        public async Task<List<SYS_Report_Infomation_Detail_ENTITY>> SYS_Report_Infomation_Detail_Search(SYS_Report_Infomation_Detail_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<SYS_Report_Infomation_Detail_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoreProcedure.SYS_Report_Infomation_Detail_Search, input);
            return result;
        }
        public async Task<IDictionary<string, object>> SYS_Report_Infomation_Update(SYS_Report_Infomation_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoreProcedure.SYS_Report_Infomation_Update, input);
            return result;
        } 
        public async Task<List<SYS_Report_Infomation_Detail_Signature_ENTITY>> SYS_Report_Infomation_Detail_Signature_Search(SYS_Report_Infomation_Detail_Signature_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<SYS_Report_Infomation_Detail_Signature_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoreProcedure.SYS_Report_Infomation_Detail_Signature_Search, input);
            return result;
        }

        public async Task<List<SYS_Report_Infomation_Version_ENTITY>> SYS_Report_Infomation_Version_Search(SYS_Report_Infomation_Version_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<SYS_Report_Infomation_Version_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoreProcedure.SYS_Report_Infomation_Version_Search, input);
            return result;
        }
    }
}
