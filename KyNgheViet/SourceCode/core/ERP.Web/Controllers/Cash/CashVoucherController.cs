using CASH.Infs.Voucher;
using CASH.Infs.Voucher.Dto;
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

namespace ERP.Web.Controllers.Cash
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class CashVoucherController : ControllerBase
    {
        private readonly ICashVoucherService CashVoucherService;
        private readonly IERPCommonService ERPCommonService;
        private readonly ISaleVATService SaleVATService;

        public CashVoucherController(ICashVoucherService cashVoucherService, IERPCommonService eRPCommonService, ISaleVATService saleVATService)
        {
            this.CashVoucherService = cashVoucherService;
            this.ERPCommonService = eRPCommonService;
            SaleVATService = saleVATService;
        }
        #region Phiếu thu
        [HttpPost]
        public async Task<List<C11_M_ENTITY>> C11_M_Search([FromBody] C11_M_ENTITY input)
        {
            var result = await this.CashVoucherService.C11_M_Search(input);
            if (!string.IsNullOrEmpty(input.code) && result != null)
            {
                result[0].c11_d = await this.CashVoucherService.C11_D_Search(new C11_D_ENTITY { voucher_code = input.voucher_code, voucher_year = input.voucher_year, master_code = input.code });
            }
            return result;
        }
        [HttpPost]
        public async Task<List<C11_D_ENTITY>> C11_D_Search([FromBody] C11_D_ENTITY input)
        {
            var result = await this.CashVoucherService.C11_D_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> C11_M_Insert([FromBody] C11_M_ENTITY input)
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

            input.xml_11d = input.c11_d.ToXmlFromList2();
            var result = await this.CashVoucherService.C11_M_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> C11_M_Update([FromBody] C11_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            input.xml_11d = input.c11_d.ToXmlFromList2();
            var result = await this.CashVoucherService.C11_M_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> C11_M_Delete([FromBody] C11_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            var result = await this.CashVoucherService.C11_M_Delete(input);
            return result;
        }

        #endregion
        #region Phiếu chi
        [HttpPost]
        public async Task<List<C12_M_ENTITY>> C12_M_Search([FromBody] C12_M_ENTITY input)
        {
            var result = await this.CashVoucherService.C12_M_Search(input);
            if (!string.IsNullOrEmpty(input.code) && result != null)
            {
                result[0].c12_d = await this.CashVoucherService.C12_D_Search(new C12_D_ENTITY { voucher_code = input.voucher_code, voucher_year = input.voucher_year, master_code = input.code });
                result[0].accounting_vat_inputs = await this.SaleVATService.Accounting_VAT_Input_Search(new Accounting_VAT_Input_ENTITY { voucher_master_code = input.code, voucher_code = input.voucher_code });
            }
            return result;
        }
        [HttpPost]
        public async Task<List<C12_D_ENTITY>> C12_D_Search([FromBody] C12_D_ENTITY input)
        {
            var result = await this.CashVoucherService.C12_D_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> C12_M_Insert([FromBody] C12_M_ENTITY input)
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

            input.xml_12d = input.c12_d.ToXmlFromList2();
            input.xml_vat_in = input.accounting_vat_inputs.ToXmlFromList2();
            var result = await this.CashVoucherService.C12_M_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> C12_M_Update([FromBody] C12_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            input.xml_12d = input.c12_d.ToXmlFromList2();
            input.xml_vat_in = input.accounting_vat_inputs.ToXmlFromList2();
            var result = await this.CashVoucherService.C12_M_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> C12_M_Delete([FromBody] C12_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            var result = await this.CashVoucherService.C12_M_Delete(input);
            return result;
        }

        #endregion
        #region Phiếu báo có
        [HttpPost]
        public async Task<List<C15_M_ENTITY>> C15_M_Search([FromBody] C15_M_ENTITY input)
        {
            var result = await this.CashVoucherService.C15_M_Search(input);
            if (!string.IsNullOrEmpty(input.code) && result != null)
            {
                result[0].c15_d = await this.CashVoucherService.C15_D_Search(new C15_D_ENTITY { voucher_code = input.voucher_code, voucher_year = input.voucher_year, master_code = input.code });
            }
            return result;
        }
        [HttpPost]
        public async Task<List<C15_D_ENTITY>> C15_D_Search([FromBody] C15_D_ENTITY input)
        {
            var result = await this.CashVoucherService.C15_D_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> C15_M_Insert([FromBody] C15_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            input.xml_15d = input.c15_d.ToXmlFromList2();
            var result = await this.CashVoucherService.C15_M_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> C15_M_Update([FromBody] C15_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            input.xml_15d = input.c15_d.ToXmlFromList2();
            var result = await this.CashVoucherService.C15_M_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> C15_M_Delete([FromBody] C15_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            var result = await this.CashVoucherService.C15_M_Delete(input);
            return result;
        }

        #endregion
        #region Phiếu báo nợ
        [HttpPost]
        public async Task<List<C16_M_ENTITY>> C16_M_Search([FromBody] C16_M_ENTITY input)
        {
            var result = await this.CashVoucherService.C16_M_Search(input);
            if (!string.IsNullOrEmpty(input.code) && result != null)
            {
                result[0].c16_d = await this.CashVoucherService.C16_D_Search(new C16_D_ENTITY { voucher_code = input.voucher_code, voucher_year = input.voucher_year, master_code = input.code });
                result[0].accounting_vat_inputs = await this.SaleVATService.Accounting_VAT_Input_Search(new Accounting_VAT_Input_ENTITY { voucher_master_code = input.code, voucher_code = input.voucher_code });
            }
            return result;
        }
        [HttpPost]
        public async Task<List<C16_D_ENTITY>> C16_D_Search([FromBody] C16_D_ENTITY input)
        {
            var result = await this.CashVoucherService.C16_D_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> C16_M_Insert([FromBody] C16_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            input.xml_16d = input.c16_d.ToXmlFromList2();
            input.xml_vat_in = input.accounting_vat_inputs.ToXmlFromList2();
            var result = await this.CashVoucherService.C16_M_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> C16_M_Update([FromBody] C16_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            input.xml_16d = input.c16_d.ToXmlFromList2();
            input.xml_vat_in = input.accounting_vat_inputs.ToXmlFromList2();
            var result = await this.CashVoucherService.C16_M_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> C16_M_Delete([FromBody] C16_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            var result = await this.CashVoucherService.C16_M_Delete(input);
            return result;
        }

        #endregion
    }
}
