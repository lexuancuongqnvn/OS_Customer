using ERP.Common.Controllers;
using ERP.Common.Intfs.ERP;
using ERP.Common.Intfs.ERP.Dto;
using ERP.Common.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Common.Impls.ERP
{
    public class ERPCommonService : IERPCommonService
    {
        public async Task<IDictionary<string, object>> ERP_Common_Generate_Voucher_No(ERPCommon_ENTITY input)
        {
            if(input.voucher_date == null) return new Dictionary<string, object>{
                { "status" ,1 },
                { "message","voucher date invalid." }
            };
            var voucherFormat = await SYS_List_Voucher_Search(new SYS_List_Voucher_ENTITY { company_code = input.company_code,voucher_code=input.voucher_code});
            if (voucherFormat != null && voucherFormat.Count > 0)
            {
                string result = "";
                string format = voucherFormat[0].format;

                result = format.Replace("[dd]", input.voucher_date.ToString("dd")).Replace("[MM]", input.voucher_date.ToString("MM")).Replace("[yy]", input.voucher_date.ToString("yy")).Replace("[yyyy]", input.voucher_date.ToString("yyyy"));

                if (result.IndexOf("[{") >= 0)
                {
                    int indexOpen = result.IndexOf("[{");
                    int indexClose = result.IndexOf("}]");
                    int nextNo = 1;
                    if (voucherFormat[0].identity_curent > 0) nextNo = (int)voucherFormat[0].identity_curent + 1;

                    switch (indexClose - indexOpen - 2)
                    {
                        case 1:
                            result = result.Replace("[{#}]", string.Format("{0:0}", nextNo));
                            break;
                        case 2:
                            result = result.Replace("[{##}]", string.Format("{0:00}", nextNo));
                            break;
                        case 3:
                            result = result.Replace("[{###}]", string.Format("{0:000}", nextNo));
                            break;
                        case 4:
                            result = result.Replace("[{####}]", string.Format("{0:0000}", nextNo));
                            break;
                        case 5:
                            result = result.Replace("[{#####}]", string.Format("{0:00000}", nextNo));
                            break;
                        case 6:
                            result = result.Replace("[{######}]", string.Format("{0:000000}", nextNo));
                            break;
                        case 7:
                            result = result.Replace("[{#######}]", string.Format("{0:0000000}", nextNo));
                            break;
                        case 8:
                            result = result.Replace("[{########}]", string.Format("{0:00000000}", nextNo));
                            break;
                        case 9:
                            result = result.Replace("[{#########}]", string.Format("{0:000000000}", nextNo));
                            break;
                        case 10:
                            result = result.Replace("[{##########}]", string.Format("{0:0000000000}", nextNo));
                            break;
                        case 11:
                            result = result.Replace("[{###########}]", string.Format("{0:00000000000}", nextNo));
                            break;
                        case 12:
                            result = result.Replace("[{############}]", string.Format("{0:000000000000}", nextNo));
                            break;
                        case 13:
                            result = result.Replace("[{#############}]", string.Format("{0:0000000000000}", nextNo));
                            break;
                        case 14:
                            result = result.Replace("[{##############}]", string.Format("{0:00000000000000}", nextNo));
                            break;
                        case 15:
                            result = result.Replace("[{###############}]", string.Format("{0:000000000000000}", nextNo));
                            break;
                        case 16:
                            result = result.Replace("[{################}]", string.Format("{0:0000000000000000}", nextNo));
                            break;
                        case 17:
                            result = result.Replace("[{#################}]", string.Format("{0:00000000000000000}", nextNo));
                            break;
                    }

                }

                return new Dictionary<string, object>{
                    { "status" ,0 },
                    { "message","OK." },
                    { "result",result }
                 }; 
            }
            else return new Dictionary<string, object>{
                    { "status" ,0 },
                    { "message","Voucher code invalid" }
                 };
        }

        public async Task<IDictionary<string, object>> SYS_Language_Translate_Action_By_Type(SYS_Language_Translate_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.SYS_Language_Translate_Action_By_Type, input);
            return result;
        }

        public async Task<List<SYS_Language_Translate_ENTITY>> SYS_Language_Translate_Search(SYS_Language_Translate_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<SYS_Language_Translate_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.SYS_Language_Translate_Search, input);
            return result;
        }

        public async Task<List<SYS_List_Voucher_ENTITY>> SYS_List_Voucher_Search(SYS_List_Voucher_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<SYS_List_Voucher_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.SYS_List_Voucher_Search, input);
            return result;
        }
        public async Task<List<SYS_Voucher_Year_ENTITY>> SYS_Voucher_Year_Search(SYS_Voucher_Year_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<SYS_Voucher_Year_ENTITY>(ConnectController.GetConnectStringByKey("ID"), CommonStoredProcedule.SYS_Voucher_Year_Search, input);
            return result;
        }
        public async Task<IDictionary<string, object>> SYS_List_Voucher_Block_Book_Update(SYS_List_Voucher_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.SYS_List_Voucher_Block_Book_Update, input);
            return result;
        }
    }
}
