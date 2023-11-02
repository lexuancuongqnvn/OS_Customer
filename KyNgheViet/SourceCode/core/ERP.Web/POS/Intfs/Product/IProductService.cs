using POS.Intfs.Product.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS.Intfs.Product
{
    public interface IProductService
    {
        Task<List<POS_Product_ENTITY>> POS_Product_Search(POS_Product_ENTITY input);
        Task<IDictionary<string, object>> POS_Product_Update(POS_Product_ENTITY input);
        Task<IDictionary<string, object>> POS_Product_Insert(POS_Product_ENTITY input);
        Task<IDictionary<string, object>> POS_Product_Delete(string code);
        Task<IDictionary<string, object>> POS_Product_Color_Actions(POS_Product_Color_ENTITY input);
        Task<IDictionary<string, object>> POS_Product_Group_Actions(POS_Product_Group_ENTITY input);
        Task<IDictionary<string, object>> POS_Product_Size_Actions(POS_Product_Size_ENTITY input);
        Task<IDictionary<string, object>> POS_Product_Unit_Actions(POS_Product_Unit_ENTITY input);
        Task<IDictionary<string, object>> POS_Product_Gift_Actions(POS_Product_Gift_ENTITY input);
        Task<List<POS_Product_Group_ENTITY>> POS_Product_Group_Search(POS_Product_Group_ENTITY input);
        Task<List<POS_Product_Color_ENTITY>> POS_Product_Color_Search(POS_Product_Color_ENTITY input);
        Task<List<POS_Product_Size_ENTITY>> POS_Product_Size_Search(POS_Product_Size_ENTITY input);
        Task<List<POS_Product_Unit_ENTITY>> POS_Product_Unit_Search(POS_Product_Unit_ENTITY input);
        Task<List<POS_Product_Gift_ENTITY>> POS_Product_Gift_Search(POS_Product_Gift_ENTITY input);
    }
}
