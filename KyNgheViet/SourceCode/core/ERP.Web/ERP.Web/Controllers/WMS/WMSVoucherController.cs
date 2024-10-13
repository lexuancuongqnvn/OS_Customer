using Common.Utils;
using ERP.Common.Controllers;
using ERP.Common.Filters;
using ERP.Common.Intfs.ERP;
using ERP.Common.Intfs.ERP.Dto;
using ERP.Common.Shared.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WMS.Intfs.Category;
using WMS.Intfs.Voucher;
using WMS.Intfs.Voucher.Dto;

namespace ERP.Web.Controllers.WMS
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class WMSVoucherController : ControllerBase
    {
        private readonly IWMSVouchercService IWMSVouchercService;
        private readonly IERPCommonService ERPCommonService;
        private readonly ICategoryService ICategoryService;
        public WMSVoucherController(IWMSVouchercService iWMSVouchercService, IERPCommonService eRPCommonService, ICategoryService iCategoryService)
        {
            this.IWMSVouchercService = iWMSVouchercService;
            this.ERPCommonService = eRPCommonService;
            this.ICategoryService = iCategoryService;
        }

        #region I41 Phiếu nhập thành phẩm từ sản xuất
        [HttpPost]
        public async Task<List<I41_M_ENTITY>> I41_M_Search([FromBody] I41_M_ENTITY input)
        {
            try
            {
                var result = await this.IWMSVouchercService.I41_M_Search(input);
                if (!string.IsNullOrEmpty(input.code) && result != null)
                    result[0].i41_D = await this.IWMSVouchercService.I41_D_Search(new I41_D_ENTITY { master_code = input.code, voucher_date = input.voucher_date, voucher_code = input.voucher_code, company_code = result[0].company_code });
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> I41_M_Insert([FromBody] I41_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            string codeLogin = AuthenticateController.appSessionUser.code;
            input.account_code_add = codeLogin;
            input.company_code = AuthenticateController.appSessionUser.company_code;
            input.xml_41d = input.i41_D.ToXmlFromList2();
            var result = await this.IWMSVouchercService.I41_M_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<I41_D_ENTITY>> I41_D_Search([FromBody] I41_D_ENTITY input)
        {
            var result = await this.IWMSVouchercService.I41_D_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> I41_M_Update([FromBody] I41_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            string codeLogin = AuthenticateController.appSessionUser.code;
            input.account_code_add = codeLogin;
            input.account_code_modified = codeLogin;
            input.xml_41d = input.i41_D.ToXmlFromList2();
            var result = await this.IWMSVouchercService.I41_M_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> I41_M_Delete([FromBody] I41_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            string codeLogin = AuthenticateController.appSessionUser.code;
            input.account_code_add = codeLogin;
            input.account_code_modified = codeLogin;
            var result = await this.IWMSVouchercService.I41_M_Delete(input);
            return result;
        }
        #endregion
        #region I42 Phiếu nhập kho
        [HttpPost]
        public async Task<List<I42_M_ENTITY>> I42_M_Search([FromBody] I42_M_ENTITY input)
        {
            try
            {
                var result = await this.IWMSVouchercService.I42_M_Search(input);
                if (!string.IsNullOrEmpty(input.code) && result != null)
                {
                    result[0].i42_D = await this.IWMSVouchercService.I42_D_Search(new I42_D_ENTITY { master_id = input.code, voucher_date = result[0].voucher_date, voucher_code = input.voucher_code, company_code = result[0].company_code });
                    result[0].cat_goods_configurations = await this.ICategoryService.CAT_Goods_Configuration_Search(new CAT_Goods_Configuration_ENTITY { voucher_code = result[0].voucher_code, voucher_no = result[0].voucher_no });
                }    
                    
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> I42_M_Insert([FromBody] I42_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            string codeLogin = AuthenticateController.appSessionUser.code;
            input.account_code_add = codeLogin;
            input.company_code = AuthenticateController.appSessionUser.company_code;
            input.xml_42d = input.i42_D.ToXmlFromList2();
            input.xml_cat_goods_configurations = input.cat_goods_configurations.ToXmlFromList2();
            var result = await this.IWMSVouchercService.I42_M_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<I42_D_ENTITY>> I42_D_Search([FromBody] I42_D_ENTITY input)
        {
            var result = await this.IWMSVouchercService.I42_D_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> I42_M_Update([FromBody] I42_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            string codeLogin = AuthenticateController.appSessionUser.code;
            input.account_code_add = codeLogin;
            input.account_code_modified = codeLogin;
            input.xml_42d = input.i42_D.ToXmlFromList2();
            input.xml_cat_goods_configurations = input.cat_goods_configurations.ToXmlFromList2();
            var result = await this.IWMSVouchercService.I42_M_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> I42_M_Delete([FromBody] I42_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            string codeLogin = AuthenticateController.appSessionUser.code;
            input.account_code_add = codeLogin;
            input.account_code_modified = codeLogin;
            var result = await this.IWMSVouchercService.I42_M_Delete(input);
            return result;
        }
        #endregion
        #region I43 phiếu xuất kho
        [HttpPost]
        public async Task<List<I43_M_ENTITY>> I43_M_Search([FromBody] I43_M_ENTITY input)
        {
            var result = await this.IWMSVouchercService.I43_M_Search(input);
            if (!string.IsNullOrEmpty(input.code))
            {
                result[0].i43_D = await this.IWMSVouchercService.I43_D_Search(new I43_D_ENTITY { master_code = input.code, voucher_date = input.voucher_date, voucher_code = input.voucher_code, company_code = result[0].company_code });
                result[0].cat_goods_configurations = await this.ICategoryService.CAT_Goods_Configuration_Search(new CAT_Goods_Configuration_ENTITY { voucher_code = result[0].voucher_code, voucher_no = result[0].voucher_no });
            }

            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> I43_M_Insert([FromBody] I43_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            string codeLogin = AuthenticateController.appSessionUser.code;
            input.account_code_add = codeLogin;
            input.company_code = AuthenticateController.appSessionUser.company_code;
            input.xml_43d = input.i43_D.ToXmlFromList2();
            input.xml_cat_goods_configurations = input.cat_goods_configurations.ToXmlFromList2();
            var result = await this.IWMSVouchercService.I43_M_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<I43_D_ENTITY>> I43_D_Search([FromBody] I43_D_ENTITY input)
        {
            var result = await this.IWMSVouchercService.I43_D_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> I43_M_Update([FromBody] I43_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            string codeLogin = AuthenticateController.appSessionUser.code;
            input.account_code_add = codeLogin;
            input.account_code_modified = codeLogin;
            input.xml_43d = input.i43_D.ToXmlFromList2();
            input.xml_cat_goods_configurations = input.cat_goods_configurations.ToXmlFromList2();
            var result = await this.IWMSVouchercService.I43_M_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> I43_M_Delete([FromBody] I43_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            string codeLogin = AuthenticateController.appSessionUser.code;
            input.account_code_add = codeLogin;
            input.account_code_modified = codeLogin;
            var result = await this.IWMSVouchercService.I43_M_Delete(input);
            return result;
        }
        #endregion
        #region I44 điều kho
        [HttpPost]
        public async Task<List<I44_M_ENTITY>> I44_M_Search([FromBody] I44_M_ENTITY input)
        {
            var result = await this.IWMSVouchercService.I44_M_Search(input);
            if (!string.IsNullOrEmpty(input.code))
                result[0].i44_D = await this.IWMSVouchercService.I44_D_Search(new I44_D_ENTITY { master_code = input.code, voucher_date = input.voucher_date, voucher_code = input.voucher_code, company_code = result[0].company_code });
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> I44_M_Insert([FromBody] I44_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            string codeLogin = AuthenticateController.appSessionUser.code;
            input.account_code_add = codeLogin;
            input.company_code = AuthenticateController.appSessionUser.company_code;
            input.xml_44d = input.i44_D.ToXmlFromList2();
            var result = await this.IWMSVouchercService.I44_M_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<I44_D_ENTITY>> I44_D_Search([FromBody] I44_D_ENTITY input)
        {
            var result = await this.IWMSVouchercService.I44_D_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> I44_M_Update([FromBody] I44_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
             if (check["status"].ToString() != "0") return check;

            string codeLogin = AuthenticateController.appSessionUser.code;
            input.account_code_add = codeLogin;
            input.account_code_modified = codeLogin;
            input.xml_44d = input.i44_D.ToXmlFromList2();
            var result = await this.IWMSVouchercService.I44_M_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> I44_M_Delete([FromBody] I44_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            string codeLogin = AuthenticateController.appSessionUser.code;
            input.account_code_add = codeLogin;
            input.account_code_modified = codeLogin;
            var result = await this.IWMSVouchercService.I44_M_Delete(input);
            return result;
        }
        #endregion
        #region I45 Phiếu xuất công cụ, dụng cụ LĐ
        [HttpPost]
        public async Task<List<I45_M_ENTITY>> I45_M_Search([FromBody] I45_M_ENTITY input)
        {
            var result = await this.IWMSVouchercService.I45_M_Search(input);
            if (!string.IsNullOrEmpty(input.code))
                result[0].i45_D = await this.IWMSVouchercService.I45_D_Search(new I45_D_ENTITY { master_code = input.code, voucher_date = input.voucher_date, voucher_code = input.voucher_code, company_code = result[0].company_code });
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> I45_M_Insert([FromBody] I45_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            string codeLogin = AuthenticateController.appSessionUser.code;
            input.account_code_add = codeLogin;
            input.company_code = AuthenticateController.appSessionUser.company_code;
            input.xml_45d = input.i45_D.ToXmlFromList2();
            var result = await this.IWMSVouchercService.I45_M_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<I45_D_ENTITY>> I45_D_Search([FromBody] I45_D_ENTITY input)
        {
            var result = await this.IWMSVouchercService.I45_D_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> I45_M_Update([FromBody] I45_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            string codeLogin = AuthenticateController.appSessionUser.code;
            input.account_code_add = codeLogin;
            input.account_code_modified = codeLogin;
            input.xml_45d = input.i45_D.ToXmlFromList2();
            var result = await this.IWMSVouchercService.I45_M_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> I45_M_Delete([FromBody] I45_M_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            string codeLogin = AuthenticateController.appSessionUser.code;
            input.account_code_add = codeLogin;
            input.account_code_modified = codeLogin;
            var result = await this.IWMSVouchercService.I45_M_Delete(input);
            return result;
        }
        #endregion
        #region Báo hỏng công cụ, dụng cụ
        [HttpPost]
        public async Task<List<I45_Damaged_Tools_Equipment_ENTITY>> I45_Damaged_Tools_Equipment_Search([FromBody] I45_Damaged_Tools_Equipment_ENTITY input)
        {
            var result = await this.IWMSVouchercService.I45_Damaged_Tools_Equipment_Search(input);

            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> I45_Damaged_Tools_Equipment_Update([FromBody] I45_Damaged_Tools_Equipment_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            var result = await this.IWMSVouchercService.I45_Damaged_Tools_Equipment_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> I45_Damaged_Tools_Equipment_Insert([FromBody] I45_Damaged_Tools_Equipment_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            var result = await this.IWMSVouchercService.I45_Damaged_Tools_Equipment_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> I45_Damaged_Tools_Equipment_Delete([FromBody] I45_Damaged_Tools_Equipment_ENTITY input)
        {
            var check = await this.ERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
            { voucher_code = input.voucher_code, voucher_date = (DateTime)input.voucher_date, voucher_no = input.voucher_code, voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
            if (check["status"].ToString() != "0") return check;

            var result = await this.IWMSVouchercService.I45_Damaged_Tools_Equipment_Delete(input);
            return result;
        }
        #endregion
    }
}
