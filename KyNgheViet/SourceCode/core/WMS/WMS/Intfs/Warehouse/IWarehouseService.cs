using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WMS.Intfs.Voucher.Dto;
using WMS.Intfs.Warehouse.Dto;

namespace WMS.Intfs.Warehouse
{
    public interface IWarehouseService
    {
        Task<IDictionary<string, object>> WMS_Warehouse_Goods_Receipt_Insert(WMS_Warehouse_Goods_Receipt_ENTITY input);
        Task<IDictionary<string, object>> WMS_Warehouse_Goods_Receipt_Update(WMS_Warehouse_Goods_Receipt_ENTITY input);
        Task<IDictionary<string, object>> WMS_Warehouse_Goods_Receipt_Delete(string code);
        Task<List<WMS_Warehouse_Goods_Receipt_ENTITY>> WMS_Warehouse_Goods_Receipt_Bycode(string code,string type);
        Task<List<WMS_Warehouse_Goods_Receipt_Detail_ENTITY>> WMS_Warehouse_Goods_Receipt_Detail_Bycode(string code,string type);
        Task<List<WMS_Warehouse_Goods_Receipt_ENTITY>> WMS_Warehouse_Goods_Receipt_Search(WMS_Warehouse_Goods_Receipt_ENTITY input);

        Task<IDictionary<string, object>> WMS_Warehouse_Goods_Issue_Insert(WMS_Warehouse_Goods_Issue_ENTITY input);
        Task<IDictionary<string, object>> WMS_Warehouse_Goods_Issue_Update(WMS_Warehouse_Goods_Issue_ENTITY input);
        Task<IDictionary<string, object>> WMS_Warehouse_Goods_Issue_Delete(string code);
        Task<List<WMS_Warehouse_Goods_Issue_ENTITY>> WMS_Warehouse_Goods_Issue_Bycode(string code);
        Task<List<WMS_Warehouse_Goods_Issue_ENTITY>> WMS_Warehouse_Goods_Issue_Search(WMS_Warehouse_Goods_Issue_ENTITY input);

        Task<List<WMS_Warehouse_Goods_Receipt_Delivery_Partner_ENTITY>> WMS_Warehouse_Goods_Receipt_Delivery_Partner_Search(WMS_Warehouse_Goods_Receipt_Delivery_Partner_ENTITY input);
        Task<IDictionary<string, object>> WMS_Warehouse_Goods_Receipt_Delivery_Partner_Insert(WMS_Warehouse_Goods_Receipt_Delivery_Partner_ENTITY input);
        Task<IDictionary<string, object>> WMS_Warehouse_Goods_Receipt_Delivery_Partner_Update(WMS_Warehouse_Goods_Receipt_Delivery_Partner_ENTITY input);
        Task<IDictionary<string, object>> WMS_Warehouse_Goods_Receipt_Delivery_Partner_Delete(string code);
        Task<List<WMS_Warehouse_Goods_Receipt_Delivery_Partner_ENTITY>> WMS_Warehouse_Goods_Receipt_Delivery_Partner_Bycode(string code);

        Task<List<WMS_Warehouse_ENTITY>> WMS_Warehouse_Search(WMS_Warehouse_ENTITY input);
        Task<IDictionary<string, object>> WMS_Warehouse_Insert(WMS_Warehouse_ENTITY input);
        Task<IDictionary<string, object>> WMS_Warehouse_Update(WMS_Warehouse_ENTITY input);
        Task<IDictionary<string, object>> WMS_Warehouse_Delete(string code);
        Task<List<WMS_Warehouse_ENTITY>> WMS_Warehouse_Bycode(string code);

        Task<List<WMS_Warehouse_Goods_Receipt_Delivery_Partner_Type_ENTITY>> WMS_Warehouse_Goods_Receipt_Delivery_Partner_Type_Search(WMS_Warehouse_Goods_Receipt_Delivery_Partner_Type_ENTITY input);
        Task<IDictionary<string, object>> WMS_Warehouse_Goods_Receipt_Delivery_Partner_Type_Insert(WMS_Warehouse_Goods_Issue_ENTITY input);
        
        Task<List<WMS_Warehouse_SKU_ENTITY>> WMS_Warehouse_SKU_Search(WMS_Warehouse_SKU_ENTITY input);
        Task<IDictionary<string, object>> WMS_Warehouse_SKU_Actions(WMS_Warehouse_SKU_ENTITY input);

    }
}
