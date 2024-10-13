using Abp.Extensions;
using Common.Utils;
using ERP.Common.Controllers;
using ERP.Common.Filters;
using ERP.Common.Intfs.ERP;
using ERP.Common.Intfs.ERP.Dto;
using ERP.Common.Shared.Dto;
using ERP.System.Impls.Account;
using ERP.System.Impls.Account.Dto;
using ERP.Warranty.Intfs.Laptop;
using ERP.Warranty.Intfs.Laptop.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Sales.Infs.VAT;
using Sales.Infs.VAT.Dto;
using Sales.Infs.Voucher;
using Sales.Infs.Voucher.Dto;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using WMS.Intfs.Category;
using WMS.Intfs.Report;
using WMS.Intfs.Report.Dto;
using WMS.Intfs.Voucher;
using WMS.Intfs.Voucher.Dto;
using static Stimulsoft.Report.Func;

namespace ERP.Web.Controllers.WMS
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class WMSReportController : ControllerBase
    {
        private readonly IWMSReportService IWMSReportService;
        private readonly IWarrantyService warrantyService;
        private readonly IWMSVouchercService IWMSVouchercService;
        private readonly ICategoryService ICategoryService;
        private readonly ISalesVoucherService ISalesVoucherService;
        private readonly ISaleVATService ISaleVATService;
        private readonly IERPCommonService ERPCommonService;
        private readonly IAccountService AccountService;
        public WMSReportController(IWMSReportService iWMSReportService, IWarrantyService warrantyService, IWMSVouchercService iWMSVouchercService, ICategoryService iCategoryService, ISalesVoucherService iSalesVoucherService, ISaleVATService iSaleVATService, IERPCommonService eRPCommonService, IAccountService AccountService)
        {
            this.IWMSReportService = iWMSReportService;
            this.warrantyService = warrantyService;
            this.IWMSVouchercService = iWMSVouchercService;
            this.ICategoryService = iCategoryService;
            this.ISalesVoucherService = iSalesVoucherService;
            this.ISaleVATService = iSaleVATService;
            this.ERPCommonService = eRPCommonService;
            this.AccountService = AccountService;
        }
        [HttpPost]
        public async Task<List<WMS_Report_Inventory_Movement_ENTITY>> WMS_Report_Inventory_Movement([FromBody] WMS_Report_Inventory_Movement_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_Inventory_Movement(input);
        }
        [HttpPost]
        public async Task<List<WMS_Report_Inventory_ENTITY>> WMS_Report_Inventory([FromBody] WMS_Report_Inventory_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_Inventory(input);
        }
        [HttpPost]
        public async Task<List<WMS_Report_Inventory_ENTITY>> WMS_Report_Inventory_Have_Serial([FromBody] WMS_Report_Inventory_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_Inventory_Have_Serial(input);
        }
        [HttpPost]//Tạo bút toán
        public async Task<List<WMS_Prepaid_Expense_Allocation_ENTITY>> WMS_Prepaid_Expense_Allocation([FromBody] WMS_Prepaid_Expense_Allocation_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Prepaid_Expense_Allocation(input);
        }
        [HttpPost]//Xóa bút toán
        public async Task<IDictionary<string, object>> WMS_Prepaid_Expense_Allocation_Delete([FromBody] WMS_Prepaid_Expense_Allocation_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Prepaid_Expense_Allocation_Delete(input);
        }
        [HttpPost]//Báo cáo phiếu xuất công cụ dụng dụ lao động
        public async Task<List<WMS_Report_I45_ENTITY>> WMS_Report_I45_Search([FromBody] WMS_Report_I45_ENTITY input)
        {
            var result = await this.IWMSReportService.WMS_Report_I45_Search(input);
            return result;
        }
        [HttpPost]//Báo cáo phiếu điều chuyển
        public async Task<List<WMS_Report_I44_ENTITY>> WMS_Report_I44_Search([FromBody] WMS_Report_I44_ENTITY input)
        {
            var result = await this.IWMSReportService.WMS_Report_I44_Search(input);
            return result;
        }
        [HttpPost]//Báo cáo phiếu xuất kho
        public async Task<List<WMS_Report_I43_ENTITY>> WMS_Report_I43_Search([FromBody] WMS_Report_I43_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_I43_Search(input);
        }
        [HttpPost]//Báo cáo phiếu nhập kho
        public async Task<List<WMS_Report_I42_ENTITY>> WMS_Report_I42_Search([FromBody] WMS_Report_I42_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_I42_Search(input);
        }   
        [HttpPost]//Báo cáo phiếu nhập thành phẩm
        public async Task<List<WMS_Report_I41_ENTITY>> WMS_Report_I41_Search([FromBody] WMS_Report_I41_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_I41_Search(input);
        }
        [HttpPost]//Báo cáo chi tiết phân phổ công cụ dụng cụ
        public async Task<List<WMS_Report_Allocation_ENTITY>> WMS_Report_Allocation_Search([FromBody] WMS_Report_Allocation_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_Allocation_Search(input);
        }
        [HttpPost]//Báo cáo hàng nhập kho
        public async Task<List<WMS_Report_Goods_Import_ENTITY>> WMS_Report_Goods_Import_Search([FromBody] WMS_Report_Goods_Import_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_Goods_Import_Search(input);
        } 
        [HttpPost]//Báo cáo thẻ kho vật tư
        public async Task<List<WMS_Report_Inventory_Material_Ledger_ENTITY>> WMS_Report_Inventory_Material_Ledger_Search([FromBody] WMS_Report_Inventory_Material_Ledger_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_Inventory_Material_Ledger_Search(input);
        }   
        [HttpPost]//Sổ chi tiết vật tư
        public async Task<List<WMS_Report_Inventory_Book_Detail_ENTITY>> WMS_Report_Inventory_Book_Detail_Search([FromBody] WMS_Report_Inventory_Book_Detail_ENTITY input)
        {
            var result = await this.IWMSReportService.WMS_Report_Inventory_Book_Detail_Search(input);
            return result;
        } 
        [HttpPost]//báo cáo hàng tồn theo kho
        public async Task<List<WMS_Report_Inventory_By_Warehouse_ENTITY>> WMS_Report_Inventory_By_Warehouse_Search([FromBody] WMS_Report_Inventory_By_Warehouse_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_Inventory_By_Warehouse_Search(input);
        } 
        [HttpPost]//báo cáo nhập xuất tồn
        public async Task<List<WMS_Report_Inventory_Import_Export_ENTITY>> WMS_Report_Inventory_Import_Export_Search([FromBody] WMS_Report_Inventory_Import_Export_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_Inventory_Import_Export_Search(input);
        }
        [HttpPost]//Báo cáo tổng hợp hàng nhập kho
        public async Task<List<WMS_Report_Inventory_Incoming_Summary_ENTITY>> WMS_Report_Inventory_Incoming_Summary_Search([FromBody] WMS_Report_Inventory_Incoming_Summary_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_Inventory_Incoming_Summary_Search(input);
        } 
        [HttpPost]//Báo cáo tổng hợp hàng xuất kho
        public async Task<List<WMS_Report_Inventory_Issued_Summary_ENTITY>> WMS_Report_Inventory_Issued_Summary_Search([FromBody] WMS_Report_Inventory_Issued_Summary_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_Inventory_Issued_Summary_Search(input);
        }
        [HttpPost]//Tính giá bình quân vật tư
        public async Task<List<WMS_Average_Cost_Sheet_ENTITY>> WMS_Calculate_The_Average_Costing_Search([FromBody] WMS_Average_Cost_Sheet_ENTITY input)
        {
            if (input.inventory_valuation_method == 2 && input.is_costing == true)
            {
                string company_code = AuthenticateController.appSessionUser.company_code;
                string codeLogin = AuthenticateController.appSessionUser.code;
                var listEmployee = await this.AccountService.SYS_Account_Info_Search(new SYS_Account_Infomation { code = codeLogin });

                for (int i = (int)input.from_month; i <= input.to_month; i++)
                {
                    input.from_month = i;
                    input.to_month = i;
                    var ListVoucherGroup = await this.IWMSReportService.WMS_Calculate_The_Average_Costing_Inventory_Book_Group_Search(input);
                    var InventoryBooks = await this.IWMSReportService.WMS_Calculate_The_Average_Costing_Inventory_Book_Search(input);
                    var InventoryBooksGroupMaster = new List<WMS_Report_Inventory_Book_Detail_ENTITY>();
                    var listI43 = new List<WMS_Report_Inventory_Book_Detail_ENTITY>();
                    foreach (var item in InventoryBooks)
                    {
                        if (item.voucher_code == "PXK")
                        {
                            if (listI43.FindAll(inv => inv.voucher_master_code == item.voucher_master_code).Count == 0)
                                listI43.Add(item);
                        }   
                        else if (InventoryBooksGroupMaster.FindAll(inv => inv.voucher_master_code == item.voucher_master_code).Count == 0)
                            InventoryBooksGroupMaster.Add(item);
                    }
                    //#region Phiếu điều chuyển
                    //foreach (var item in InventoryBooksGroupMaster)
                    //{
                    //    switch (item.voucher_code)
                    //    {
                    //        case "PDC"://PDC   I44$M Phiếu điều chuyển
                    //            var i44Voucher = await this.IWMSVouchercService.I44_M_Search(new I44_M_ENTITY
                    //            {
                    //                voucher_code = item.voucher_code,
                    //                company_code = company_code,
                    //                code = item.voucher_master_code,
                    //            });
                    //            if (!string.IsNullOrEmpty(item.voucher_master_code))
                    //            {
                    //                i44Voucher[0].i44_D = await this.IWMSVouchercService.I44_D_Search(new I44_D_ENTITY { master_code = i44Voucher[0].code, voucher_date = i44Voucher[0].voucher_date, voucher_code = i44Voucher[0].voucher_code, company_code = i44Voucher[0].company_code });
                    //            }
                    //            i44Voucher[0].is_costing = true;
                    //            i44Voucher[0].account_code_add = codeLogin;
                    //            i44Voucher[0].account_code_modified = codeLogin;
                    //            i44Voucher[0].xml_44d = i44Voucher[0].i44_D.ToXmlFromList2();
                    //            var c = await this.IWMSVouchercService.I44_M_Update(i44Voucher[0]);

                    //            break;
                    //    }
                    //}

                    //#endregion
                    //foreach (var item in listI43)
                    //{
                    //    switch (item.voucher_code)
                    //    {
                    //        case "PXK"://PXT 
                    //            var i43Voucher = await this.IWMSVouchercService.I43_M_Search(new I43_M_ENTITY
                    //            {
                    //                voucher_code = item.voucher_code,
                    //                company_code = company_code,
                    //                code = item.voucher_master_code,
                    //            });
                    //            if (i43Voucher != null && i43Voucher.Count >0 && !string.IsNullOrEmpty(item.voucher_master_code))
                    //            {
                    //                i43Voucher[0].i43_D = await this.IWMSVouchercService.I43_D_Search(new I43_D_ENTITY { master_code = i43Voucher[0].code, voucher_date = i43Voucher[0].voucher_date, voucher_code = i43Voucher[0].voucher_code, company_code = i43Voucher[0].company_code });
                    //                i43Voucher[0].cat_goods_configurations = await this.ICategoryService.CAT_Goods_Configuration_Search(new CAT_Goods_Configuration_ENTITY { voucher_code = i43Voucher[0].voucher_code, voucher_no = i43Voucher[0].voucher_no });

                    //                i43Voucher[0].is_costing = true;
                    //                i43Voucher[0].account_code_add = codeLogin;
                    //                i43Voucher[0].account_code_modified = codeLogin;
                    //                i43Voucher[0].xml_43d = i43Voucher[0].i43_D.ToXmlFromList2();
                    //                i43Voucher[0].xml_cat_goods_configurations = i43Voucher[0].cat_goods_configurations.ToXmlFromList2();
                    //                _ = await this.IWMSVouchercService.I43_M_Update(i43Voucher[0]);
                    //            }
                    //            break;
                    //    }
                    //}

                    #region Tập hợp hóa đơn bán hàng >> Tạo phiếu xuất >> nhập thành phấm tự động
                    string table = i.ToString("00") + AuthenticateController.appSessionUser.voucher_year.ToString("00");
                    DataTable S32M = ManagementController.GetDataTable("S32M", @"
                        IF OBJECT_ID('tempdb..#s32M') IS NOT NULL DROP TABLE #s32M
                        select  ROW_NUMBER() OVER(ORDER BY voucher_date ASC) AS row_num,cast('' as varchar(5000))voucher_detail_code,* into #s32M 
                        from(
                        select warehouse_code,goods_code,MAX(master_code)master_code,count(goods_code)quantity,max(goods_name)goods_name,max(unit_code)unit_code from s32$D" + table + @" 
                            where master_code in(select code from s32$M" + table + @" where voucher_date in( select voucher_date from s32$M" + table + @" group by voucher_date))  group by warehouse_code,goods_code
                        ) a inner join s32$M" + table + @" b on a.master_code = b.code
                        order by voucher_date

                        declare @no int = 1
                        while(@no <= (select max(row_num) from #s32M))
                        begin
	                        declare @goods_code varchar(50), @warehouse_code varchar(50), @master_code varchar(50)
	                        select top 1 @goods_code = goods_code, @warehouse_code=warehouse_code, @master_code = code from #s32M where row_num = @no

	                        DECLARE @voucher_detail_code VARCHAR(8000) =''
	                        SELECT @voucher_detail_code = COALESCE(@voucher_detail_code + ';', '') + code 
	                        FROM s32$D"+ table + @"  where  goods_code = @goods_code and warehouse_code=@warehouse_code --and master_code = @master_code
	
	                        update #s32M set voucher_detail_code = @voucher_detail_code where row_num = @no

	                        set @no = @no +1
                        end

                        select a.*,b.warehouse_account,b.name,name2 from #s32M a
                        left join CAT_Goods b on a.goods_code = b.code and a.company_code = b.company_code order by voucher_date asc");
                    foreach (DataRow item in S32M.Rows)
                    {
                        string voucher_date = DateTime.Parse(item["voucher_date"].ToString()).ToString("yyyy-MM-dd");
                        string warehouse_code = item["warehouse_code"].ToString();
                        string goods_code = item["goods_code"].ToString();
                        #region phiếu xuất kho đi sản xuất 
                        //1.Kiểm tra đã tồn tại chưa ?
                        DataTable I43M = ManagementController.GetDataTable("I43M", @"select a.*,goods_code,warehouse_code from i43$M" + table + @" a
                            left join i43$D" + table + @" b on a.code = b.master_code and a.company_code = b.company_code 
                            where a.voucher_date = '" + voucher_date + @"' and a.profession_code = 'PXKSXTD' and b.warehouse_code = '"+ warehouse_code + @"' and b.goods_code = '"+ goods_code + @"'");
                        DataTable I41M = ManagementController.GetDataTable("I41M", @"select a.*,goods_code,warehouse_code from i41$M" + table + @" a
                            left join i41$D" + table + @" b on a.code = b.master_code and a.company_code = b.company_code 
                            where a.voucher_date = '" + voucher_date + @"' and a.profession_code = 'NSXTD' and b.warehouse_code = '"+ warehouse_code + @"' and b.goods_code = '"+ goods_code + @"'");
                        //2.nếu đã tồn tại thì xóa
                        if (I43M.Rows.Count > 0)
                        {
                            _ = await this.IWMSVouchercService.I43_M_Delete(new I43_M_ENTITY
                            {
                                account_code_add = codeLogin,
                                account_code_modified = codeLogin,
                                code = I43M.Rows[0]["code"].ToString(),
                                voucher_date = DateTime.Parse(item["voucher_date"].ToString()),
                                company_code = company_code,
                                is_costing = true
                            });
                        }

                        if (I41M.Rows.Count > 0)
                        {
                            _ = await this.IWMSVouchercService.I41_M_Delete(new I41_M_ENTITY
                            {
                                account_code_add = codeLogin,
                                account_code_modified = codeLogin,
                                code = I41M.Rows[0]["code"].ToString(),
                                voucher_date = DateTime.Parse(item["voucher_date"].ToString()),
                                company_code = company_code,
                                is_costing = true
                            });
                        }
                        #endregion
                    }
                    //foreach (DataRow item in S32M.Rows)
                    //{
                    //    string voucher_date = DateTime.Parse(item["voucher_date"].ToString()).ToString("yyyy-MM-dd");
                    //    #region phiếu xuất kho đi sản xuất 
                       
                    //    var voucherNo = await this.ERPCommonService.ERP_Common_Generate_Voucher_No(new ERPCommon_ENTITY
                    //    {
                    //        voucher_code = "PXK",
                    //        voucher_date = DateTime.Parse(item["voucher_date"].ToString()),
                    //        company_code = AuthenticateController.appSessionUser.company_code
                    //    });
                    //    var inputI43M = new I43_M_ENTITY();
                    //    inputI43M.i43_D = new List<I43_D_ENTITY>();
                    //    inputI43M.cat_goods_configurations = new List<CAT_Goods_Configuration_ENTITY>();

                    //    inputI43M.account_code_add = codeLogin;
                    //    inputI43M.company_code = AuthenticateController.appSessionUser.company_code;
                    //    inputI43M.voucher_code = "PXK";
                    //    inputI43M.voucher_date = DateTime.Parse(item["voucher_date"].ToString());
                    //    inputI43M.voucher_no = voucherNo["result"].ToString();
                    //    inputI43M.s32_detail_code = item["voucher_detail_code"].ToString();
                    //    inputI43M.customer_code = listEmployee[0].employee_code;
                    //    inputI43M.customer_name = listEmployee[0].LAST_NAME + " " + listEmployee[0].FIRST_NAME;
                    //    inputI43M.address = "";
                    //    inputI43M.profession_code = "PXKSXTD";
                    //    inputI43M.notes = "Xuất kho vật tư để sản xuất (Tự động)";
                    //    inputI43M.code_fc = item["code_fc"].ToString();
                    //    inputI43M.exchange_rate = decimal.Parse(item["exchange_rate"].ToString());

                    //    inputI43M.i43_D.Add(new I43_D_ENTITY
                    //    {
                    //        goods_code = item["goods_code"].ToString(),
                    //        goods_name = item["goods_name"].ToString(),
                    //        company_code = company_code,
                    //        unit_code = item["unit_code"].ToString(),
                    //        warehouse_code = item["warehouse_code"].ToString(),
                    //        quantity = decimal.Parse(item["quantity"].ToString()),
                    //        price = 0,
                    //        price_fc = 0,
                    //        arise = 0,
                    //        arise_fc = 0,
                    //        creditor_account = item["warehouse_account"].ToString(),
                    //        debitor_account = "154",
                    //        department_code = ""
                    //    });

                    //    inputI43M.xml_43d = inputI43M.i43_D.ToXmlFromList2();
                    //    inputI43M.xml_cat_goods_configurations = inputI43M.cat_goods_configurations.ToXmlFromList2();
                    //    var resultI43M = await this.IWMSVouchercService.I43_M_Insert(inputI43M);

                    //    #endregion
                    //    #region phiếu nhập kho thành phẩm
                        
                    //    //3.tạo mới phiếu nhập tự động
                    //    voucherNo = await this.ERPCommonService.ERP_Common_Generate_Voucher_No(new ERPCommon_ENTITY
                    //    {
                    //        voucher_code = "NSX",
                    //        voucher_date = DateTime.Parse(item["voucher_date"].ToString()),
                    //        company_code = AuthenticateController.appSessionUser.company_code
                    //    });

                    //    //3.tạo mới phiếu nhập tự động
                    //    var inputI41M = new I41_M_ENTITY();
                    //    inputI41M.i41_D = new List<I41_D_ENTITY>();
                    //    decimal price = decimal.Parse(resultI43M["price"].ToString());
                    //    decimal quantity = decimal.Parse(item["quantity"].ToString());

                    //    inputI41M.account_code_add = codeLogin;
                    //    inputI41M.company_code = AuthenticateController.appSessionUser.company_code;
                    //    inputI41M.voucher_code = "NSX";
                    //    inputI41M.voucher_date = DateTime.Parse(item["voucher_date"].ToString());
                    //    inputI41M.voucher_no = voucherNo["result"].ToString();
                    //    inputI41M.customer_code = listEmployee[0].employee_code;
                    //    inputI41M.customer_name = listEmployee[0].LAST_NAME + " " + listEmployee[0].FIRST_NAME;
                    //    inputI41M.address = "";
                    //    inputI41M.total_money = price * quantity;
                    //    inputI41M.total_money_fc = price * quantity * (decimal.Parse(item["exchange_rate"].ToString()) != 1? decimal.Parse(item["exchange_rate"].ToString()):0);
                    //    inputI41M.profession_code = "NSXTD";
                    //    inputI41M.notes = "Nhập kho thành phẩm (tự động)";
                    //    inputI41M.code_fc = item["code_fc"].ToString();
                    //    inputI41M.exchange_rate = decimal.Parse(item["exchange_rate"].ToString());


                    //    inputI41M.i41_D.Add(new I41_D_ENTITY
                    //    {
                    //        goods_code = item["goods_code"].ToString(),
                    //        goods_name = item["goods_name"].ToString(),
                    //        company_code = company_code,
                    //        unit_code = item["unit_code"].ToString(),
                    //        warehouse_code = item["warehouse_code"].ToString(),
                    //        quantity = quantity,
                    //        price = price,
                    //        price_fc = price* (decimal.Parse(item["exchange_rate"].ToString()) != 1 ? decimal.Parse(item["exchange_rate"].ToString()) : 0),
                    //        arise = price* quantity,
                    //        arise_fc = price * quantity * (decimal.Parse(item["exchange_rate"].ToString()) != 1 ? decimal.Parse(item["exchange_rate"].ToString()) : 0),
                    //        creditor_account = "154",
                    //        debitor_account = item["warehouse_account"].ToString(),
                    //        department_code = ""
                    //    });
                    //    inputI41M.xml_41d = inputI41M.i41_D.ToXmlFromList2();
                    //    _ = await this.IWMSVouchercService.I41_M_Insert(inputI41M);
                    //    #endregion
                    //}
                    
                    #endregion
                    
                    foreach (var item in InventoryBooksGroupMaster)
                    {
                        decimal price = 0;
                        switch (item.voucher_code)
                        {
                            case "PDC"://PDC   I44$M Phiếu điều chuyển
                                var i44Voucher = await this.IWMSVouchercService.I44_M_Search(new I44_M_ENTITY
                                {
                                    voucher_code = item.voucher_code,
                                    company_code = company_code,
                                    code = item.voucher_master_code,
                                });
                                if (!string.IsNullOrEmpty(item.voucher_master_code))
                                {
                                    i44Voucher[0].i44_D = await this.IWMSVouchercService.I44_D_Search(new I44_D_ENTITY { master_code = i44Voucher[0].code, voucher_date = i44Voucher[0].voucher_date, voucher_code = i44Voucher[0].voucher_code, company_code = i44Voucher[0].company_code });
                                }
                                //foreach (var item1 in i44Voucher[0].i44_D)
                                //{
                                //    var costing = await this.IWMSReportService.WMS_Costing_Price(new WMS_Costing_Price_ENTITY
                                //    {
                                //        voucher_detail_code = item.voucher_detail_code,
                                //        from_date = DateTime.Parse(((DateTime)item.voucher_date).ToString("yyyy-MM-dd")),
                                //        to_date = item.voucher_date,
                                //        warehouse_code = i44Voucher[0].warehouse_out_code,
                                //        goods_code = item.goods_code,
                                //        quantity_export = item1.quantity,
                                //        company_code = company_code
                                //    });
                                //    if (costing != null && costing.Count > 0) price = (decimal)costing[0].price;
                                //    item1.price = price;
                                //    item1.price_fc = price * i44Voucher[0].exchange_rate;
                                //    item1.arise = price;
                                //    item1.arise_fc = price * i44Voucher[0].exchange_rate;
                                //    item1.conversion_factor = 1;
                                //    item1.conversion_price = price;
                                //    item1.conversion_quantity = 1;
                                //}

                                i44Voucher[0].is_costing = true;
                                i44Voucher[0].account_code_add = codeLogin;
                                i44Voucher[0].account_code_modified = codeLogin;
                                i44Voucher[0].xml_44d = i44Voucher[0].i44_D.ToXmlFromList2();
                                var c = await this.IWMSVouchercService.I44_M_Update(i44Voucher[0]);

                                break;
                            case "HTL"://HTL   S33$M Phiếu giảm giá, hàng bán trả lại
                                var s33Voucher = await this.ISalesVoucherService.S33_M_Search(new S33_M_ENTITY
                                {
                                    voucher_code = item.voucher_code,
                                    company_code = company_code,
                                    code = item.voucher_master_code,
                                });
                                if (!string.IsNullOrEmpty(item.voucher_master_code))
                                {
                                    s33Voucher[0].s33_D = await this.ISalesVoucherService.S33_D_Search(new S33_D_ENTITY { master_code = s33Voucher[0].code, voucher_date = s33Voucher[0].voucher_date });
                                    s33Voucher[0].accounting_VAT_Outputs = await this.ISaleVATService.Accounting_VAT_Output_Search(new Accounting_VAT_Output_ENTITY { voucher_master_code = s33Voucher[0].code, voucher_code = s33Voucher[0].voucher_code });
                                }
                                //foreach (var item1 in s33Voucher[0].s33_D)
                                //{
                                //    var costing = await this.IWMSReportService.WMS_Specific_Identification_Costing_Search(new WMS_Costing_Price_ENTITY
                                //    {
                                //        voucher_detail_code = item.voucher_detail_code,
                                //        from_date = DateTime.Parse(((DateTime)item.voucher_date).ToString("yyyy-MM-dd")),
                                //        to_date = item.voucher_date,
                                //        warehouse_code = item.warehouse_code,
                                //        goods_code = item.goods_code,
                                //        quantity_export = item.quantity_x,
                                //        company_code = company_code
                                //    });
                                //    if (costing != null && costing.Count > 0) price = (decimal)costing[0].price;
                                //    item1.cogs_price = price;
                                //    item1.cogs_money = price;
                                //    item1.conversion_factor = 1;
                                //    item1.conversion_price = price;
                                //    item1.conversion_quantity = 1;
                                //}

                                s33Voucher[0].xml_33d = s33Voucher[0].s33_D.ToXmlFromList2();
                                s33Voucher[0].xml_vat_out = s33Voucher[0].accounting_VAT_Outputs.ToXmlFromList2();
                                s33Voucher[0].is_costing = true;
                                _ = await this.ISalesVoucherService.S33_M_Update(s33Voucher[0]);
                                break;
                            case "PNM"://PNM   P22$M Phiếu mua hàng kiêm phiếu nhập

                                break;
                            case "PNH"://PNH I42$M Phiếu nhập kho

                                break;
                            case "HDB"://HDB   S32$M Hóa đơn bán
                                var s32Voucher = await this.ISalesVoucherService.S32_M_Search(new S32_M_ENTITY
                                {
                                    voucher_code = item.voucher_code,
                                    company_code = company_code,
                                    code = item.voucher_master_code,
                                });
                                if (!string.IsNullOrEmpty(item.voucher_master_code))
                                {
                                    s32Voucher[0].s32_D = await this.ISalesVoucherService.S32_D_Search(new S32_D_ENTITY { master_code = s32Voucher[0].code, voucher_date = s32Voucher[0].voucher_date, voucher_code = s32Voucher[0].voucher_code });
                                    s32Voucher[0].accounting_VAT_Outputs = await this.ISaleVATService.Accounting_VAT_Output_Search(new Accounting_VAT_Output_ENTITY { voucher_master_code = s32Voucher[0].code, voucher_code = s32Voucher[0].voucher_code });
                                    s32Voucher[0].s32_KIT = await this.ISalesVoucherService.S32_KIT_Search(new S32_KIT_ENTITY { master_code = s32Voucher[0].code });
                                    s32Voucher[0].cat_goods_configurations = await this.ICategoryService.CAT_Goods_Configuration_Search(new CAT_Goods_Configuration_ENTITY { voucher_code = s32Voucher[0].voucher_code, voucher_no = s32Voucher[0].voucher_no });
                                }
                                //foreach (var item1 in s32Voucher[0].s32_D)
                                //{
                                //    var costing = await this.IWMSReportService.WMS_Costing_Price(new WMS_Costing_Price_ENTITY
                                //    {
                                //        voucher_detail_code = item.voucher_detail_code,
                                //        from_date = DateTime.Parse(((DateTime)item.voucher_date).ToString("yyyy-MM-dd")),
                                //        to_date = item.voucher_date,
                                //        warehouse_code = item.warehouse_code,
                                //        goods_code = item.goods_code,
                                //        quantity_export = item.quantity_x,
                                //        company_code = company_code
                                //    });
                                //    if (costing != null && costing.Count > 0) price = (decimal)costing[0].price;
                                //    item1.cogs_price = price;
                                //    item1.cogs_money = price;
                                //    item1.conversion_factor = 1;
                                //    item1.conversion_price = price;
                                //    item1.conversion_quantity = 1;
                                //}
                                s32Voucher[0].is_costing = true;
                                s32Voucher[0].xml_32d = s32Voucher[0].s32_D.ToXmlFromList2();
                                s32Voucher[0].xml_vat_out = s32Voucher[0].accounting_VAT_Outputs.ToXmlFromList2();
                                s32Voucher[0].xml_32_kit = s32Voucher[0].s32_KIT.ToXmlFromList2();
                                s32Voucher[0].xml_cat_goods_configurations = s32Voucher[0].cat_goods_configurations.ToXmlFromList2();

                                var c32 = await this.ISalesVoucherService.S32_M_Update(s32Voucher[0]);
                                break;
                            case "PXT"://PXT 
                                var i43Voucher = await this.IWMSVouchercService.I43_M_Search(new I43_M_ENTITY
                                {
                                    voucher_code = item.voucher_code,
                                    company_code = company_code,
                                    code = item.voucher_master_code,
                                });
                                if (!string.IsNullOrEmpty(item.voucher_master_code))
                                {
                                    i43Voucher[0].i43_D = await this.IWMSVouchercService.I43_D_Search(new I43_D_ENTITY { master_code = i43Voucher[0].code, voucher_date = i43Voucher[0].voucher_date, voucher_code = i43Voucher[0].voucher_code, company_code = i43Voucher[0].company_code });
                                    i43Voucher[0].cat_goods_configurations = await this.ICategoryService.CAT_Goods_Configuration_Search(new CAT_Goods_Configuration_ENTITY { voucher_code = i43Voucher[0].voucher_code, voucher_no = i43Voucher[0].voucher_no });
                                }
                                //foreach (var item1 in i43Voucher[0].i43_D)
                                //{
                                //    var costing = await this.IWMSReportService.WMS_Costing_Price(new WMS_Costing_Price_ENTITY
                                //    {
                                //        voucher_detail_code = item.voucher_detail_code,
                                //        from_date = DateTime.Parse(((DateTime)item.voucher_date).ToString("yyyy-MM-dd")),
                                //        to_date = item.voucher_date,
                                //        warehouse_code = item.warehouse_code,
                                //        goods_code = item.goods_code,
                                //        quantity_export = item.quantity_x,
                                //        company_code = company_code
                                //    });
                                //    if (costing != null && costing.Count > 0) price = (decimal)costing[0].price;
                                //    item1.price = price;
                                //    item1.price_fc = price * i43Voucher[0].exchange_rate;
                                //    item1.arise = price;
                                //    item1.arise_fc = price * i43Voucher[0].exchange_rate;
                                //    item1.conversion_factor = 1;
                                //    item1.conversion_price = price;
                                //    item1.conversion_quantity = 1;
                                //}
                                i43Voucher[0].is_costing = true;
                                i43Voucher[0].account_code_add = codeLogin;
                                i43Voucher[0].account_code_modified = codeLogin;
                                i43Voucher[0].xml_43d = i43Voucher[0].i43_D.ToXmlFromList2();
                                i43Voucher[0].xml_cat_goods_configurations = i43Voucher[0].cat_goods_configurations.ToXmlFromList2();
                                _ = await this.IWMSVouchercService.I43_M_Update(i43Voucher[0]);

                                break;
                        }
                    }
                }
            }
            return await this.IWMSReportService.WMS_Calculate_The_Average_Costing_Search(input);
        }
        [HttpPost]//Tính giá bình quân vật tư v2
        public async Task<List<WMS_Average_Cost_Sheet_ENTITY>> WMS_Calculate_The_Average_Costing_V2_Search([FromBody] WMS_Average_Cost_Sheet_ENTITY input)
        {
            if (input.inventory_valuation_method == 2 && input.is_costing == true)
            {
                string company_code = AuthenticateController.appSessionUser.company_code;
                string codeLogin = AuthenticateController.appSessionUser.code;
                int voucher_year = AuthenticateController.appSessionUser.voucher_year;

                for (int i = (int)input.from_month; i <= input.to_month; i++)
                {
                   _ = await this.IWMSReportService.WMS_Calculate_The_Average_Costing_Run_Process_Search(new WMS_Costing_Run_Process_ENTITY
                   {
                       account_code_modified = codeLogin,
                       company_code = company_code,
                       date_modified = DateTime.Now,
                       month = i,   
                       voucher_year = voucher_year
                   });
                }
            }
            return await this.IWMSReportService.WMS_Calculate_The_Average_Costing_Search(input);
        }

        [HttpPost]//Tính giá bình quân vật tư 2
        public async Task<List<WMS_Average_Cost_Sheet_ENTITY>> WMS_Calculate_The_Average_Costing_Data_Search([FromBody] WMS_Average_Cost_Sheet_ENTITY input)
        {
             return await this.IWMSReportService.WMS_Calculate_The_Average_Costing_Data_Search(input);
        }
        [HttpPost]//Báo cáo bảng giá bình quân vật tư
        public async Task<List<WMS_Average_Cost_Sheet_ENTITY>> WMS_Report_Calculate_The_Average_Costing_Search([FromBody] WMS_Average_Cost_Sheet_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_Calculate_The_Average_Costing_Search(input);
        }
        [HttpPost]//Lookup tồn kho tức thời
        public async Task<List<WMS_Report_Inventory_ENTITY>> WMS_Realtime_Inventory_Search([FromBody] WMS_Report_Inventory_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Realtime_Inventory_Search(input);
        } 
        [HttpPost]//Báo cáo tồn kho tức thời
        public async Task<List<WMS_Report_Inventory_ENTITY>> WMS_Report_Inventory_Realtime_Search([FromBody] WMS_Report_Inventory_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_Inventory_Realtime_Search(input);
        }     
        [HttpPost]//Báo cáo tồn kho tức thời
        public async Task<List<WMS_Report_Inventory_ENTITY>> WMS_Report_Inventory_Realtime_Have_Serial_Search([FromBody] WMS_Report_Inventory_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_Inventory_Realtime_Have_Serial_Search(input);
        } 
        [HttpPost]//Báo cáo tồn kho tức thời theo mã công việc
        public async Task<List<WMS_Report_Inventory_ENTITY>> WMS_Realtime_Inventory_Check([FromBody] WMS_Report_Inventory_Check_ENTITY input)
        {
            List<Warranty_Laptop_ENTITY> laptopInfo = await this.warrantyService.Warranty_Laptop_Search(new Warranty_Laptop_ENTITY()
            {
                task_code = input.tasck_code
            });
            input.goods_symbol = laptopInfo[0].goods_symbol;
            var result = await this.IWMSReportService.WMS_Realtime_Inventory_Check(input);
            return result;
        }
    }
}
