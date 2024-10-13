using Sales.Infs.Voucher.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sales.Infs.Voucher
{
    public interface ISalesVoucherService
    {
        Task<List<S31_M_ENTITY>> S31_M_Search(S31_M_ENTITY input);
        Task<List<S31_D_ENTITY>> S31_D_Search(S31_D_ENTITY input);
        Task<IDictionary<string, object>> S31_M_Insert(S31_M_ENTITY input);
        Task<IDictionary<string, object>> S31_M_Update(S31_M_ENTITY input);
        Task<IDictionary<string, object>> S31_M_Delete(S31_M_ENTITY input);

        Task<List<S32_M_ENTITY>> S32_M_Search(S32_M_ENTITY input);
        Task<List<S32_D_ENTITY>> S32_D_Search(S32_D_ENTITY input);
        Task<IDictionary<string, object>> S32_M_Insert(S32_M_ENTITY input);
        Task<IDictionary<string, object>> S32_M_Update(S32_M_ENTITY input);
        Task<IDictionary<string, object>> S32_M_Delete(S32_M_ENTITY input);

        Task<List<S32_KIT_ENTITY>> S32_KIT_Search(S32_KIT_ENTITY input);
        Task<IDictionary<string, object>> S32_KIT_Insert(S32_KIT_ENTITY input);
        Task<IDictionary<string, object>> S32_KIT_Update(S32_KIT_ENTITY input);
        Task<IDictionary<string, object>> S32_KIT_Delete(S32_KIT_ENTITY input);

        Task<List<S33_M_ENTITY>> S33_M_Search(S33_M_ENTITY input);
        Task<List<S33_D_ENTITY>> S33_D_Search(S33_D_ENTITY input);
        Task<IDictionary<string, object>> S33_M_Insert(S33_M_ENTITY input);
        Task<IDictionary<string, object>> S33_M_Update(S33_M_ENTITY input);
        Task<IDictionary<string, object>> S33_M_Delete(S33_M_ENTITY input);

        Task<List<S34_M_ENTITY>> S34_M_Search(S34_M_ENTITY input);
        Task<List<S34_D_ENTITY>> S34_D_Search(S34_D_ENTITY input);
        Task<IDictionary<string, object>> S34_M_Insert(S34_M_ENTITY input);
        Task<IDictionary<string, object>> S34_M_Update(S34_M_ENTITY input);
        Task<IDictionary<string, object>> S34_M_Delete(S34_M_ENTITY input);
    }
}
