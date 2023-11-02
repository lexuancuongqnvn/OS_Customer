using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WMS.Intfs.Voucher.Dto;

namespace WMS.Intfs.Voucher
{
    public interface IWMSVouchercService
    {
        Task<List<I41_M_ENTITY>> I41_M_Search(I41_M_ENTITY input);
        Task<List<I41_D_ENTITY>> I41_D_Search(I41_D_ENTITY input);
        Task<IDictionary<string, object>> I41_M_Insert(I41_M_ENTITY input);
        Task<IDictionary<string, object>> I41_M_Update(I41_M_ENTITY input);
        Task<IDictionary<string, object>> I41_M_Delete(I41_M_ENTITY input);

        Task<List<I42_M_ENTITY>> I42_M_Search(I42_M_ENTITY input);
        Task<List<I42_D_ENTITY>> I42_D_Search(I42_D_ENTITY input);
        Task<IDictionary<string, object>> I42_M_Insert(I42_M_ENTITY input);
        Task<IDictionary<string, object>> I42_M_Update(I42_M_ENTITY input);
        Task<IDictionary<string, object>> I42_M_Delete(I42_M_ENTITY input);

        Task<List<I43_M_ENTITY>> I43_M_Search(I43_M_ENTITY input);
        Task<List<I43_D_ENTITY>> I43_D_Search(I43_D_ENTITY input);
        Task<IDictionary<string, object>> I43_M_Insert(I43_M_ENTITY input);
        Task<IDictionary<string, object>> I43_M_Update(I43_M_ENTITY input);
        Task<IDictionary<string, object>> I43_M_Delete(I43_M_ENTITY input);

        Task<List<I44_M_ENTITY>> I44_M_Search(I44_M_ENTITY input);
        Task<List<I44_D_ENTITY>> I44_D_Search(I44_D_ENTITY input);
        Task<IDictionary<string, object>> I44_M_Insert(I44_M_ENTITY input);
        Task<IDictionary<string, object>> I44_M_Update(I44_M_ENTITY input);
        Task<IDictionary<string, object>> I44_M_Delete(I44_M_ENTITY input);

        Task<List<I45_M_ENTITY>> I45_M_Search(I45_M_ENTITY input);
        Task<List<I45_D_ENTITY>> I45_D_Search(I45_D_ENTITY input);
        Task<IDictionary<string, object>> I45_M_Insert(I45_M_ENTITY input);
        Task<IDictionary<string, object>> I45_M_Update(I45_M_ENTITY input);
        Task<IDictionary<string, object>> I45_M_Delete(I45_M_ENTITY input);

        Task<List<I45_Damaged_Tools_Equipment_ENTITY>> I45_Damaged_Tools_Equipment_Search(I45_Damaged_Tools_Equipment_ENTITY input);
        Task<IDictionary<string, object>> I45_Damaged_Tools_Equipment_Update(I45_Damaged_Tools_Equipment_ENTITY input);
        Task<IDictionary<string, object>> I45_Damaged_Tools_Equipment_Insert(I45_Damaged_Tools_Equipment_ENTITY input);
        Task<IDictionary<string, object>> I45_Damaged_Tools_Equipment_Delete(I45_Damaged_Tools_Equipment_ENTITY input);
    }
}
