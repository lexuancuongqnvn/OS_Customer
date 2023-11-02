using ERP.System.Intfs.Export.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ERP.System.Intfs.Export
{
    public interface IExportService
    {
        Task<IDictionary<string, object>> SYS_Report_Infomation_Update(SYS_Report_Infomation_ENTITY input);
        Task<IDictionary<string, object>> SYS_Report_Infomation_Insert(SYS_Report_Infomation_ENTITY input);
        Task<IDictionary<string, object>> SYS_Report_Infomation_Delete(SYS_Report_Infomation_ENTITY input);
        Task<List<SYS_Report_Infomation_ENTITY>> SYS_Report_Infomation_Search(SYS_Report_Infomation_ENTITY input);
        Task<List<SYS_Report_Infomation_Version_ENTITY>> SYS_Report_Infomation_Version_Search(SYS_Report_Infomation_Version_ENTITY input);
        Task<List<SYS_Report_Infomation_Detail_ENTITY>> SYS_Report_Infomation_Detail_Search(SYS_Report_Infomation_Detail_ENTITY input);
        Task<List<SYS_Report_Infomation_Detail_Signature_ENTITY>> SYS_Report_Infomation_Detail_Signature_Search(SYS_Report_Infomation_Detail_Signature_ENTITY input);
    }
}
