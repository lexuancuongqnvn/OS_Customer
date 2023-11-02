using Common.Utils;
using ERP.Common.Filters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Purchase.Infs.Voucher;
using Purchase.Infs.Voucher.Dto;
using Sales.Infs.VAT;
using Sales.Infs.VAT.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.Purchase
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class PurchaseVoucherController : ControllerBase
    {
        private readonly IPurchaseVoucherService IPurchaseVoucherService;
        private readonly ISaleVATService ISaleVATService;
        public PurchaseVoucherController(IPurchaseVoucherService iPurchaseVoucherService, ISaleVATService iSaleVATService)
        {
            this.IPurchaseVoucherService = iPurchaseVoucherService;
            this.ISaleVATService = iSaleVATService;
        }
        #region Hóa đơn mua dịch vụ
        [HttpPost]
        public async Task<List<P21_M_ENTITY>> P21_M_Search([FromBody] P21_M_ENTITY input)
        {
            var result = await this.IPurchaseVoucherService.P21_M_Search(input);
            if (result != null && result.Count > 0 && !string.IsNullOrEmpty(input.code))
            {
                result[0].p21_D = await this.IPurchaseVoucherService.P21_D_Search(new P21_D_ENTITY {  master_code = input.code, voucher_date = input.voucher_date,voucher_code=input.voucher_code });
                result[0].accounting_vat_inputs = await this.ISaleVATService.Accounting_VAT_Input_Search(new Accounting_VAT_Input_ENTITY { voucher_master_code = input.code,voucher_code=input.voucher_code });
            }
            return result;
        }
        [HttpPost]
        public async Task<List<P21_D_ENTITY>> P21_D_Search([FromBody] P21_D_ENTITY input)
        {
            var result = await this.IPurchaseVoucherService.P21_D_Search(input);

            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> P21_M_Insert([FromBody] P21_M_ENTITY input)
        {
            input.xml_21d = input.p21_D.ToXmlFromList2();
            input.xml_vat_in = input.accounting_vat_inputs.ToXmlFromList2();

            var result = await this.IPurchaseVoucherService.P21_M_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> P21_M_Update([FromBody] P21_M_ENTITY input)
        {
            input.xml_21d = input.p21_D.ToXmlFromList2();
            input.xml_vat_in = input.accounting_vat_inputs.ToXmlFromList2();

            var result = await this.IPurchaseVoucherService.P21_M_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> P21_M_Delete([FromBody] P21_M_ENTITY input)
        {
            var result = await this.IPurchaseVoucherService.P21_M_Delete(input);
            return result;
        }
        #endregion
        #region Hóa đơn mua hàng kiêm phiếu nhập kho
        [HttpPost]
        public async Task<List<P22_D_ENTITY>> P22_D_Search([FromBody]P22_D_ENTITY input)
        {
            var result = await this.IPurchaseVoucherService.P22_D_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<P22_M_ENTITY>> P22_M_Search([FromBody] P22_M_ENTITY input)
        {
            var result = await this.IPurchaseVoucherService.P22_M_Search(input);
            if (result != null && result.Count > 0 && !string.IsNullOrEmpty(input.code))
            {
                result[0].p22_D = await this.IPurchaseVoucherService.P22_D_Search(new P22_D_ENTITY { master_code = input.code,voucher_code=input.voucher_code,voucher_date=input.voucher_date});
                result[0].accounting_vat_inputs = await this.ISaleVATService.Accounting_VAT_Input_Search(new Accounting_VAT_Input_ENTITY { voucher_master_code = input.code, voucher_code = input.voucher_code });
            }
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> P22_M_Delete([FromBody] P22_M_ENTITY input)
        {
            var result = await this.IPurchaseVoucherService.P22_M_Delete(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> P22_M_Insert([FromBody] P22_M_ENTITY input)
        {
            input.xml_22d = input.p22_D.ToXmlFromList2();
            input.xml_vat_in = input.accounting_vat_inputs.ToXmlFromList2();
            var result = await this.IPurchaseVoucherService.P22_M_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> P22_M_Update([FromBody] P22_M_ENTITY input)
        {
            input.xml_22d = input.p22_D.ToXmlFromList2();
            input.xml_vat_in = input.accounting_vat_inputs.ToXmlFromList2();
            var result = await this.IPurchaseVoucherService.P22_M_Update(input);
            return result;
        }
        #endregion
        #region nhập khẩu kiêm phiếu nhập kho
        [HttpPost]
        public async Task<List<P23_D_ENTITY>> P23_D_Search([FromBody] P23_D_ENTITY input)
        {
            var result = await this.IPurchaseVoucherService.P23_D_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<P23_M_ENTITY>> P23_M_Search([FromBody] P23_M_ENTITY input)
        {
            var result = await this.IPurchaseVoucherService.P23_M_Search(input);
            if (result != null && result.Count > 0 && !string.IsNullOrEmpty(input.code))
            {
                result[0].p23_D = await this.IPurchaseVoucherService.P23_D_Search(new P23_D_ENTITY { master_code = input.code, voucher_code = input.voucher_code, voucher_date = input.voucher_date });
                result[0].accounting_vat_inputs = await this.ISaleVATService.Accounting_VAT_Input_Search(new Accounting_VAT_Input_ENTITY { voucher_master_code = input.code, voucher_code = input.voucher_code });
            }
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> P23_M_Delete([FromBody] P23_M_ENTITY input)
        {
            var result = await this.IPurchaseVoucherService.P23_M_Delete(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> P23_M_Insert([FromBody] P23_M_ENTITY input)
        {
            input.xml_23d = input.p23_D.ToXmlFromList2();
            input.xml_vat_in = input.accounting_vat_inputs.ToXmlFromList2();
            var result = await this.IPurchaseVoucherService.P23_M_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> P23_M_Update([FromBody] P23_M_ENTITY input)
        {
            input.xml_23d = input.p23_D.ToXmlFromList2();
            input.xml_vat_in = input.accounting_vat_inputs.ToXmlFromList2();
            var result = await this.IPurchaseVoucherService.P23_M_Update(input);
            return result;
        }
        #endregion
        #region chứng từ trả hàng kiêm phiếu xuất
        [HttpPost]
        public async Task<List<P24_M_ENTITY>> P24_M_Search([FromBody] P24_M_ENTITY input)
        {
            var result = await this.IPurchaseVoucherService.P24_M_Search(input);
            if (result != null && result.Count > 0 && !string.IsNullOrEmpty(input.code))
            {
                result[0].p24_D = await this.IPurchaseVoucherService.P24_D_Search(new P24_D_ENTITY {  master_code = input.code, voucher_date = input.voucher_date,voucher_code=input.voucher_code });
                result[0].accounting_vat_inputs = await this.ISaleVATService.Accounting_VAT_Input_Search(new Accounting_VAT_Input_ENTITY { voucher_master_code = input.code, voucher_code = input.voucher_code });
            }
            return result;
        }
        [HttpPost]
        public async Task<List<P24_D_ENTITY>> P24_D_Search([FromBody] P24_D_ENTITY input)
        {
            var result = await this.IPurchaseVoucherService.P24_D_Search(input);

            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> P24_M_Insert([FromBody] P24_M_ENTITY input)
        {
            input.xml_24d = input.p24_D.ToXmlFromList2();
            input.xml_vat_in = input.accounting_vat_inputs.ToXmlFromList2();

            var result = await this.IPurchaseVoucherService.P24_M_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> P24_M_Update([FromBody] P24_M_ENTITY input)
        {
            input.xml_24d = input.p24_D.ToXmlFromList2();
            input.xml_vat_in = input.accounting_vat_inputs.ToXmlFromList2();

            var result = await this.IPurchaseVoucherService.P24_M_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> P24_M_Delete([FromBody] P24_M_ENTITY input)
        {
            var result = await this.IPurchaseVoucherService.P24_M_Delete(input);
            return result;
        }
        #endregion
        #region chứng từ chi phí mua hàng
        [HttpPost]
        public async Task<List<P25_M_ENTITY>> P25_M_Search([FromBody] P25_M_ENTITY input)
        {
            var result = await this.IPurchaseVoucherService.P25_M_Search(input);
            if (result != null && result.Count > 0 && !string.IsNullOrEmpty(input.code))
            {
                result[0].p25_D = await this.IPurchaseVoucherService.P25_D_Search(new P25_D_ENTITY {  master_code = input.code, voucher_date = input.voucher_date,voucher_code=input.voucher_code });
                result[0].accounting_vat_inputs = await this.ISaleVATService.Accounting_VAT_Input_Search(new Accounting_VAT_Input_ENTITY { voucher_master_code = input.code, voucher_code = input.voucher_code });
            }
            return result;
        }
        [HttpPost]
        public async Task<List<P25_D_ENTITY>> P25_D_Search([FromBody] P25_D_ENTITY input)
        {
            var result = await this.IPurchaseVoucherService.P25_D_Search(input);

            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> P25_M_Insert([FromBody] P25_M_ENTITY input)
        {
            input.xml_25d = input.p25_D.ToXmlFromList2();
            input.xml_vat_in = input.accounting_vat_inputs.ToXmlFromList2();

            var result = await this.IPurchaseVoucherService.P25_M_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> P25_M_Update([FromBody] P25_M_ENTITY input)
        {
            input.xml_25d = input.p25_D.ToXmlFromList2();
            input.xml_vat_in = input.accounting_vat_inputs.ToXmlFromList2();

            var result = await this.IPurchaseVoucherService.P25_M_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> P25_M_Delete([FromBody] P25_M_ENTITY input)
        {
            var result = await this.IPurchaseVoucherService.P25_M_Delete(input);
            return result;
        }
        #endregion
        #region Chứng từ thanh toán theo hóa đơn
        [HttpPost]
        public async Task<List<P26_M_ENTITY>> P26_M_Search([FromBody] P26_M_ENTITY input)
        {
            var result = await this.IPurchaseVoucherService.P26_M_Search(input);
            if (result != null && result.Count > 0 && !string.IsNullOrEmpty(input.code))
            {
                result[0].p26_D = await this.IPurchaseVoucherService.P26_D_Search(new P26_D_ENTITY {  master_code = input.code, voucher_date = input.voucher_date,voucher_code=input.voucher_code });
            }
            return result;
        }
        [HttpPost]
        public async Task<List<P26_D_ENTITY>> P26_D_Search([FromBody] P26_D_ENTITY input)
        {
            var result = await this.IPurchaseVoucherService.P26_D_Search(input);

            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> P26_M_Insert([FromBody] P26_M_ENTITY input)
        {
            input.xml_26d = input.p26_D.ToXmlFromList2();

            var result = await this.IPurchaseVoucherService.P26_M_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> P26_M_Update([FromBody] P26_M_ENTITY input)
        {
            input.xml_26d = input.p26_D.ToXmlFromList2();

            var result = await this.IPurchaseVoucherService.P26_M_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> P26_M_Delete([FromBody] P26_M_ENTITY input)
        {
            var result = await this.IPurchaseVoucherService.P26_M_Delete(input);
            return result;
        }

        #endregion
    }
}
