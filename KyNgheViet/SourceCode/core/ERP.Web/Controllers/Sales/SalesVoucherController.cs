using Common.Utils;
using ERP.Common.Controllers;
using ERP.Common.Filters;
using ERP.Common.Intfs.ERP;
using ERP.Common.Intfs.ERP.Dto;
using ERP.Common.Shared.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sales.Infs.VAT;
using Sales.Infs.VAT.Dto;
using Sales.Infs.Voucher;
using Sales.Infs.Voucher.Dto;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WMS.Intfs.Category;

namespace ERP.Web.Controllers.Sales
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class SalesVoucherController : ControllerBase
    {
        private readonly ISalesVoucherService ISalesVoucherService;
        private readonly ISaleVATService ISaleVATService;
        private readonly IERPCommonService ERPCommonService;
        private readonly ICategoryService ICategoryService;
        public SalesVoucherController(ISalesVoucherService iSalesVoucherService, ISaleVATService iSaleVATService, IERPCommonService eRPCommonService, ICategoryService iCategoryService)
        {
            this.ISalesVoucherService = iSalesVoucherService;
            this.ISaleVATService = iSaleVATService;
            this.ERPCommonService = eRPCommonService;
            this.ICategoryService = iCategoryService;
        }
        #region S31 Hóa đơn dịch vụ
        [HttpPost]
        public async Task<List<S31_M_ENTITY>> S31_M_Search([FromBody] S31_M_ENTITY input)
        {
            var result = await this.ISalesVoucherService.S31_M_Search(input);
            if (result != null && result.Count > 0 && !string.IsNullOrEmpty(input.code))
            {
                result[0].s31_D = await this.ISalesVoucherService.S31_D_Search(new S31_D_ENTITY { master_code = input.code, voucher_date = result[0].voucher_date ,voucher_code= result[0].voucher_code});
                result[0].accounting_VAT_Outputs = await this.ISaleVATService.Accounting_VAT_Output_Search(new Accounting_VAT_Output_ENTITY { voucher_master_code = input.code, voucher_code = input.voucher_code });
            }
            return result;
        }
        [HttpPost]
        public async Task<List<S31_D_ENTITY>> S31_D_Search([FromBody] S31_D_ENTITY input)
        {
            var result = await this.ISalesVoucherService.S31_D_Search(input);

            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> S31_M_Insert([FromBody] S31_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            {
                voucher_code = input.voucher_code,
                voucher_date = (DateTime)input.voucher_date,
                voucher_no = input.voucher_code,
                voucher_year = AuthenticateController.appSessionUser.voucher_year,
                language_id = AuthenticateController.appSessionUser.language_id
            });
            if (check["status"].ToString() != "0") return check;

            input.xml_31d = input.s31_D.ToXmlFromList2();
            input.xml_vat_out = input.accounting_VAT_Outputs.ToXmlFromList2();

            var result = await this.ISalesVoucherService.S31_M_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> S31_M_Update([FromBody] S31_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            {
                voucher_code = input.voucher_code,
                voucher_date = (DateTime)input.voucher_date,
                voucher_no = input.voucher_code,
                voucher_year = AuthenticateController.appSessionUser.voucher_year,
                language_id = AuthenticateController.appSessionUser.language_id
            });
            if (check["status"].ToString() != "0") return check;

            input.xml_31d = input.s31_D.ToXmlFromList2();
            input.xml_vat_out = input.accounting_VAT_Outputs.ToXmlFromList2();

            var result = await this.ISalesVoucherService.S31_M_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> S31_M_Delete([FromBody] S31_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            {
                voucher_code = input.voucher_code,
                voucher_date = (DateTime)input.voucher_date,
                voucher_no = input.voucher_code,
                voucher_year = AuthenticateController.appSessionUser.voucher_year,
                language_id = AuthenticateController.appSessionUser.language_id
            });
            if (check["status"].ToString() != "0") return check;
            var result = await this.ISalesVoucherService.S31_M_Delete(input);
            return result;
        }
        #endregion

        #region S32 Hóa đơn bán hàng
        [HttpPost]
        public async Task<List<S32_M_ENTITY>> S32_M_Search([FromBody]S32_M_ENTITY input)
        {
            var result = await this.ISalesVoucherService.S32_M_Search(input);
            if (result != null && result.Count > 0 && !string.IsNullOrEmpty(input.code))
            {
                result[0].s32_D = await this.ISalesVoucherService.S32_D_Search(new S32_D_ENTITY { master_code = input.code, voucher_date= result[0].voucher_date,voucher_code= result[0].voucher_code });
                result[0].accounting_VAT_Outputs = await this.ISaleVATService.Accounting_VAT_Output_Search(new Accounting_VAT_Output_ENTITY{ voucher_master_code = input.code, voucher_code = input.voucher_code });
                result[0].s32_KIT = await this.ISalesVoucherService.S32_KIT_Search(new S32_KIT_ENTITY { master_code = input.code });
                result[0].cat_goods_configurations = await this.ICategoryService.CAT_Goods_Configuration_Search(new CAT_Goods_Configuration_ENTITY { voucher_code = result[0].voucher_code,voucher_no = result[0].voucher_no });
                //if(result[0].s32_D != null)
                //{
                //    foreach (var item in result[0].s32_D)
                //    {
                //        if(!string.IsNullOrEmpty(item.serial_no))
                //            item.cat_goods_configurations = await this.ICategoryService.CAT_Goods_Configuration_Search_By_Goods(new CAT_Goods_Configuration_ENTITY { voucher_code = result[0].voucher_code,goods_code=item.goods_code,serial=item.serial_no });
                //    }
                //}
            }
            return result;
        }
        [HttpPost]
        public async Task<List<S32_D_ENTITY>> S32_D_Search([FromBody] S32_D_ENTITY input)
        {
            var result = await this.ISalesVoucherService.S32_D_Search(input);
            //if (result != null)
            //{
            //    foreach (var item in result)
            //    {
            //        if (!string.IsNullOrEmpty(item.serial_no))
            //            item.cat_goods_configurations = await this.ICategoryService.CAT_Goods_Configuration_Search_By_Goods(new CAT_Goods_Configuration_ENTITY { voucher_code = result[0].voucher_code, goods_code = item.goods_code, serial = item.serial_no });
            //    }
            //}
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> S32_M_Insert([FromBody] S32_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY 
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            input.xml_32d = input.s32_D.ToXmlFromList2();
            input.xml_vat_out = input.accounting_VAT_Outputs.ToXmlFromList2();
            input.xml_32_kit = input.s32_KIT.ToXmlFromList2();
            input.xml_cat_goods_configurations = input.cat_goods_configurations.ToXmlFromList2();

            var result = await this.ISalesVoucherService.S32_M_Insert(input);
           
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> S32_M_Update([FromBody] S32_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            input.xml_32d = input.s32_D.ToXmlFromList2();
            input.xml_vat_out = input.accounting_VAT_Outputs.ToXmlFromList2();
            input.xml_32_kit = input.s32_KIT.ToXmlFromList2();
            input.xml_cat_goods_configurations = input.cat_goods_configurations.ToXmlFromList2();

            var result = await this.ISalesVoucherService.S32_M_Update(input);

            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> S32_M_Delete([FromBody] S32_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            var result = await this.ISalesVoucherService.S32_M_Delete(input);
            return result;
        }
        #endregion
        
        #region S33 Hóa đơn giảm giá. hàng bán trả lại
        [HttpPost]
        public async Task<List<S33_M_ENTITY>> S33_M_Search([FromBody] S33_M_ENTITY input)
        {
            var result = await this.ISalesVoucherService.S33_M_Search(input);
            if (result != null && result.Count > 0 && !string.IsNullOrEmpty(input.code))
            {
                result[0].s33_D = await this.ISalesVoucherService.S33_D_Search(new S33_D_ENTITY { master_code = input.code, voucher_date = input.voucher_date });
                result[0].accounting_VAT_Outputs = await this.ISaleVATService.Accounting_VAT_Output_Search(new Accounting_VAT_Output_ENTITY { voucher_master_code = input.code, voucher_code = input.voucher_code });
            }
            return result;
        }
        [HttpPost]
        public async Task<List<S33_D_ENTITY>> S33_D_Search([FromBody] S33_D_ENTITY input)
        {
            var result = await this.ISalesVoucherService.S33_D_Search(input);

            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> S33_M_Insert([FromBody] S33_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            input.xml_33d = input.s33_D.ToXmlFromList2();
            input.xml_vat_out = input.accounting_VAT_Outputs.ToXmlFromList2();

            var result = await this.ISalesVoucherService.S33_M_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> S33_M_Update([FromBody] S33_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            //if (check["status"].ToString() != "0") return check;

            input.xml_33d = input.s33_D.ToXmlFromList2();
            input.xml_vat_out = input.accounting_VAT_Outputs.ToXmlFromList2();

            var result = await this.ISalesVoucherService.S33_M_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> S33_M_Delete([FromBody] S33_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            var result = await this.ISalesVoucherService.S33_M_Delete(input);
            return result;
        }
        #endregion

        #region S34 phiếu thu công nợ theo hóa đơn
        [HttpPost]
        public async Task<List<S34_M_ENTITY>> S34_M_Search([FromBody] S34_M_ENTITY input)
        {
            var result = await this.ISalesVoucherService.S34_M_Search(input);
            if (result != null && result.Count > 0 && !string.IsNullOrEmpty(input.code))
            {
                result[0].s34_D = await this.ISalesVoucherService.S34_D_Search(new S34_D_ENTITY { master_code = input.code, voucher_date = result[0].voucher_date,voucher_code= result[0].voucher_code });
            }
            return result;
        }
        [HttpPost]
        public async Task<List<S34_D_ENTITY>> S34_D_Search([FromBody] S34_D_ENTITY input)
        {
            var result = await this.ISalesVoucherService.S34_D_Search(input);

            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> S34_M_Insert([FromBody] S34_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            input.xml_34d = input.s34_D.ToXmlFromList2();

            var result = await this.ISalesVoucherService.S34_M_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> S34_M_Update([FromBody] S34_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            input.xml_34d = input.s34_D.ToXmlFromList2();

            var result = await this.ISalesVoucherService.S34_M_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> S34_M_Delete([FromBody] S34_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            var result = await this.ISalesVoucherService.S34_M_Delete(input);
            return result;
        }
        #endregion

    }
}
