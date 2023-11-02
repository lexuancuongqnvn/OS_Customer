using Purchase.Infs.Voucher.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Purchase.Infs.Voucher
{
    public interface IPurchaseVoucherService
    {
        Task<List<P21_M_ENTITY>> P21_M_Search(P21_M_ENTITY input);
        Task<List<P21_D_ENTITY>> P21_D_Search(P21_D_ENTITY input);
        Task<IDictionary<string, object>> P21_M_Insert(P21_M_ENTITY input);
        Task<IDictionary<string, object>> P21_M_Update(P21_M_ENTITY input);
        Task<IDictionary<string, object>> P21_M_Delete(P21_M_ENTITY input);

        Task<List<P22_D_ENTITY>> P22_D_Search(P22_D_ENTITY input);
        Task<List<P22_M_ENTITY>> P22_M_Search(P22_M_ENTITY input);
        Task<IDictionary<string, object>> P22_M_Insert(P22_M_ENTITY input);
        Task<IDictionary<string, object>> P22_M_Update(P22_M_ENTITY input);
        Task<IDictionary<string, object>> P22_M_Delete(P22_M_ENTITY input);

        Task<List<P23_D_ENTITY>> P23_D_Search(P23_D_ENTITY input);
        Task<List<P23_M_ENTITY>> P23_M_Search(P23_M_ENTITY input);
        Task<IDictionary<string, object>> P23_M_Insert(P23_M_ENTITY input);
        Task<IDictionary<string, object>> P23_M_Update(P23_M_ENTITY input);
        Task<IDictionary<string, object>> P23_M_Delete(P23_M_ENTITY input);

        Task<List<P24_M_ENTITY>> P24_M_Search(P24_M_ENTITY input);
        Task<List<P24_D_ENTITY>> P24_D_Search(P24_D_ENTITY input);
        Task<IDictionary<string, object>> P24_M_Insert(P24_M_ENTITY input);
        Task<IDictionary<string, object>> P24_M_Update(P24_M_ENTITY input);
        Task<IDictionary<string, object>> P24_M_Delete(P24_M_ENTITY input);

        Task<List<P25_M_ENTITY>> P25_M_Search(P25_M_ENTITY input);
        Task<List<P25_D_ENTITY>> P25_D_Search(P25_D_ENTITY input);
        Task<IDictionary<string, object>> P25_M_Insert(P25_M_ENTITY input);
        Task<IDictionary<string, object>> P25_M_Update(P25_M_ENTITY input);
        Task<IDictionary<string, object>> P25_M_Delete(P25_M_ENTITY input);

        Task<List<P26_M_ENTITY>> P26_M_Search(P26_M_ENTITY input);
        Task<List<P26_D_ENTITY>> P26_D_Search(P26_D_ENTITY input);
        Task<IDictionary<string, object>> P26_M_Insert(P26_M_ENTITY input);
        Task<IDictionary<string, object>> P26_M_Update(P26_M_ENTITY input);
        Task<IDictionary<string, object>> P26_M_Delete(P26_M_ENTITY input);

    }
}
