using Common.Utils;
using Consolidation.Infs.Voucher;
using Consolidation.Infs.Voucher.Dto;
using ERP.Common.Controllers;
using ERP.Common.Filters;
using ERP.Common.Intfs.ERP;
using ERP.Common.Intfs.ERP.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sales.Infs.VAT;
using Sales.Infs.VAT.Dto;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.Consolidation
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class ConsolidationVoucherController : ControllerBase
    {
        private readonly IConsolidationVoucherService IConsolidationVoucherService;
        private readonly ISaleVATService ISaleVATService;
        private readonly IERPCommonService ERPCommonService;

        public ConsolidationVoucherController(IConsolidationVoucherService iConsolidationVoucherService, ISaleVATService iSaleVATService, IERPCommonService eRPCommonService)
        {
            this.IConsolidationVoucherService = iConsolidationVoucherService;
            this.ISaleVATService = iSaleVATService;
            this.ERPCommonService = eRPCommonService;
        }
        #region Phiếu kế toán
        [HttpPost]
        public async Task<List<C51_M_ENTITY>> C51_M_Search([FromBody]C51_M_ENTITY input)
        {
            var result = await this.IConsolidationVoucherService.C51_M_Search(input);
            if (!string.IsNullOrEmpty(input.code) && result != null)
            {
                result[0].c51_D = await this.IConsolidationVoucherService.C51_D_Search(new C51_D_ENTITY { voucher_code = result[0].voucher_code,voucher_year = result[0].voucher_year,master_code= result[0].code});
                result[0].accounting_vat_inputs = await this.ISaleVATService.Accounting_VAT_Input_Search(new Accounting_VAT_Input_ENTITY { voucher_master_code = result[0].code, voucher_code = result[0].voucher_code });
            }
            return result;
        }
        [HttpPost]
        public async Task<List<C51_D_ENTITY>> C51_D_Search([FromBody] C51_D_ENTITY input)
        {
            var result = await this.IConsolidationVoucherService.C51_D_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> C51_M_Insert([FromBody] C51_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            input.xml_51d = input.c51_D.ToXmlFromList2();
            input.xml_vat_in = input.accounting_vat_inputs.ToXmlFromList2();
            var result = await this.IConsolidationVoucherService.C51_M_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> C51_M_Update([FromBody] C51_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            input.xml_51d = input.c51_D.ToXmlFromList2();
            input.xml_vat_in = input.accounting_vat_inputs.ToXmlFromList2();
            var result = await this.IConsolidationVoucherService.C51_M_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> C51_M_Delete([FromBody] C51_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            var result = await this.IConsolidationVoucherService.C51_M_Delete(input);
            return result;
        }

        #endregion
        [HttpPost]//Kết chuyển cuối kỳ
        public async Task<List<Carry_Forward_Execute_ENTITY>> Carry_Forward_Execute([FromBody] Carry_Forward_Execute_ENTITY input)
        {
            var result = await this.IConsolidationVoucherService.Carry_Forward_Execute(input);
            return result;
        }        
        [HttpPost]//Xóa Kết chuyển cuối kỳ
        public async Task<IDictionary<string, object>> Carry_Forward_Delete_Executed([FromBody] Carry_Forward_Execute_ENTITY input)
        {
            var result = await this.IConsolidationVoucherService.Carry_Forward_Delete_Executed(input);
            return result;
        }
    }
}
