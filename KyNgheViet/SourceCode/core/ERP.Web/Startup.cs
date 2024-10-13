using CASH.Impls.Category;
using CASH.Impls.Report;
using CASH.Impls.Voucher;
using CASH.Infs.Category;
using CASH.Infs.Report;
using CASH.Infs.Voucher;
using Consolidation.Impls.Category;
using Consolidation.Impls.Report;
using Consolidation.Impls.Voucher;
using Consolidation.Infs.Category;
using Consolidation.Infs.Report;
using Consolidation.Infs.Voucher;
using ERP.Common.Controllers;
using ERP.Common.Impls.ERP;
using ERP.Common.Intfs.ERP;
using ERP.Common.TokenAuthentication;
using ERP.System.Impls.Account;
using ERP.System.Impls.Account.Dto;
using ERP.System.Impls.Acction;
using ERP.System.Impls.Common;
using ERP.System.Impls.Department;
using ERP.System.Impls.Export;
using ERP.System.Impls.Mail;
using ERP.System.Impls.Menu;
using ERP.System.Impls.Reference;
using ERP.System.Impls.Shared.GenRowTable;
using ERP.System.Impls.TestTheme;
using ERP.System.Impls.Upload;
using ERP.System.Intfs.Acction;
using ERP.System.Intfs.Common;
using ERP.System.Intfs.Department;
using ERP.System.Intfs.Export;
using ERP.System.Intfs.GenRowTable;
using ERP.System.Intfs.Mail;
using ERP.System.Intfs.Menu;
using ERP.System.Intfs.Reference;
using ERP.System.Intfs.TestTheme;
using ERP.System.Intfs.Upload;
using ERP.Warranty.Impls.Laptop;
using ERP.Warranty.Intfs.Laptop;
using ERP.Web.Controllers.Export.Excel;
using ERP.Web.Controllers.Recognition;
using ERP.Web.Controllers.System;
using ERP.Web.System.Dto;
using HRMS.Impls.Branch;
using HRMS.Impls.Employee;
using HRMS.Impls.Notification;
using HRMS.Impls.ProjectManagement;
using HRMS.Impls.TimeSheet;
using HRMS.Impls.WorkingTime;
using HRMS.Impls.Workspace;
using HRMS.Intfs.Branch;
using HRMS.Intfs.Employee;
using HRMS.Intfs.Notification;
using HRMS.Intfs.ProjectManagement;
using HRMS.Intfs.TimeSheet;
using HRMS.Intfs.WorkingTime;
using HRMS.Intfs.Workspace;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Purchase.Impls.Report;
using Purchase.Impls.Voucher;
using Purchase.Infs.Report;
using Purchase.Infs.Voucher;
using Sales.Impls.Category;
using Sales.Impls.Report;
using Sales.Impls.VAT;
using Sales.Impls.Voucher;
using Sales.Infs.Category;
using Sales.Infs.Report;
using Sales.Infs.VAT;
using Sales.Infs.Voucher;
using SignalR.Impls.HubClient;
using SignalR.Impls.Notification;
using SignalR.Intfs.HubClient;
using SignalR.Intfs.Notification;
using System;
using System.Collections.Generic;
using WMS.Impls.Category;
using WMS.Impls.OB;
using WMS.Impls.Report;
using WMS.Impls.Voucher;
using WMS.Impls.Warehouse;
using WMS.Intfs.Category;
using WMS.Intfs.OB;
using WMS.Intfs.Report;
using WMS.Intfs.Voucher;
using WMS.Intfs.Warehouse;

namespace ERP.Web
{
    public class Startup
    {
        public IConfiguration Configuration { get; set; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
       
        public static string ConnectString = "";

        public static string IDConnectString = "";

        public static string KeySession = "";

        
        public static Dictionary<string, SYS_Account_Group> lisUser = new Dictionary<string, SYS_Account_Group>();
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.AddMemoryCache();
            services.AddControllers()
                .ConfigureApiBehaviorOptions(options =>
                {
                    options.SuppressConsumesConstraintForFormFileParameters = true;
                    options.SuppressInferBindingSourcesForParameters = true;
                    options.SuppressModelStateInvalidFilter = true;
                    options.SuppressMapClientErrors = true;
                });
            ConnectString = Configuration.GetConnectionString("DBConnection");
            if (!string.IsNullOrEmpty(Configuration.GetConnectionString("DBConnection")))
                ConnectController.lisConectString.Add("ERP", Configuration.GetConnectionString("DBConnection"));
            if (!string.IsNullOrEmpty(Configuration.GetConnectionString("DBIDConnection")))
                ConnectController.lisConectString.Add("ID", Configuration.GetConnectionString("DBIDConnection"));
            if (!string.IsNullOrEmpty(Configuration.GetConnectionString("HRMConnection")))
                ConnectController.lisConectString.Add("HRM", Configuration.GetConnectionString("HRMConnection"));
            if (!string.IsNullOrEmpty(Configuration.GetConnectionString("POSConnection")))
                ConnectController.lisConectString.Add("POS", Configuration.GetConnectionString("POSConnection"));
            if (!string.IsNullOrEmpty(Configuration.GetConnectionString("WMSConnection")))
                ConnectController.lisConectString.Add("WMS", Configuration.GetConnectionString("WMSConnection"));
            if (!string.IsNullOrEmpty(Configuration.GetConnectionString("SIGNALRConnection")))
                ConnectController.lisConectString.Add("SIGNALR", Configuration.GetConnectionString("SIGNALRConnection"));
            if (!string.IsNullOrEmpty(Configuration.GetConnectionString("UPLOADConnection")))
                ConnectController.lisConectString.Add("UPLOAD", Configuration.GetConnectionString("UPLOADConnection"));
            if (!string.IsNullOrEmpty(Configuration.GetConnectionString("AllowedHosts")))
                foreach (string item in Configuration.GetConnectionString("AllowedHosts").ToString().Split(';'))
                    AuthenticateController.list_host_allow_request.Add(item);


            services.AddSingleton<ITokenManager, TokenManager>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddScoped<ISYS_MenuService, SYS_MenuService>();
            services.AddScoped<IGenRowTableService, GenRowTableService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IAcctionService, AcctionService>();
            services.AddScoped<ITestThemeService, TestThemeService>();
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<IReferenceService, ReferenceService>();
            services.AddTransient<ISendMailService, SendMailService>();
            services.AddTransient<IHRM_WorkingTimeService, HRM_WorkingTimeService>();
            services.AddTransient<IHRM_BranchService, HRM_BranchService>(); 
            services.AddTransient<IHRM_TimeSheetService,HRM_TimeSheetService>(); 
            services.AddTransient<IHRM_WorkspaceService,HRM_WorkspaceService>();
            services.AddTransient<IProjectManagementService, ProjectManagementService>();
            services.AddTransient<IUploadService, UploadService>();
            services.AddTransient<IHubClient, BroadcastHub> ();
            services.AddTransient<IDepartmentService, DepartmentService>();
            services.AddTransient<INotificationServiceHRM, NotificationHRMService>();
            services.AddTransient<ISYSCommonService, SYSCommonService>();
            services.AddTransient<IWarrantyService, WarrantyService>();
            services.AddTransient<INotificationService, NotificationService>();
            services.AddTransient<ISalesCategoryService,SalesCategoryService> ();
            services.AddTransient<ISalesVoucherService,SalesVoucherService> ();
            services.AddTransient<ISaleVATService, SaleVATService> ();
            services.AddTransient<ISaleReportService,SaleReportService> ();

            services.AddTransient<ICashCategoryService,CashCategoryService> ();

            services.AddTransient<IWarehouseService, WarehouseService>();
            services.AddTransient<ICategoryService, CategoryService>();
            services.AddTransient<IOBWMSService, OBWMSService>();
            services.AddTransient<IWMSVouchercService, WMSVouchercService>();
            services.AddTransient<IWMSReportService, WMSReportService> ();

            services.AddTransient<IERPCommonService,ERPCommonService>();
            services.AddTransient<IExportService, ExportService>();

            services.AddTransient<IConsolidationVoucherService,ConsolidationVoucherService>();

            services.AddTransient<IPurchaseVoucherService, PurchaseVoucherService>();
            services.AddTransient<IConsolidationCategoryService, ConsolidationCategoryService>();

            services.AddTransient<ICashVoucherService, CashVoucherService>();
            services.AddTransient<ICashReportService, CashReportService>();

            services.AddTransient<IPurchaseReportService, PurchaseReportService>();
            services.AddTransient<IConsolidationReport, ConsolidationReport>();

            services.AddScoped<ExportAPIController>();

            services.AddScoped<EmailController>();
            services.AddScoped<FaceAPIController>();
            services.AddDistributedMemoryCache();           // Đăng ký dịch vụ lưu cache trong bộ nhớ (Session sẽ sử dụng nó)
            services.AddDistributedSqlServerCache((option) =>
            {
                option.ConnectionString = ConnectString;
                option.SchemaName = "dbo";
                option.TableName = "Session";
            });
            services.AddSession(cfg => {                 // Đăng ký dịch vụ Session
                cfg.Cookie.Name = "vietdb";             // Đặt tên Session - tên này sử dụng ở Browser (Cookie)
                cfg.IdleTimeout = new TimeSpan(0, 60, 0);    // Thời gian tồn tại của Session
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v2", new OpenApiInfo { Title = "Core", Version = "Core v1_0_0_15072021" });
            });
            services.AddCors();
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllHeaders",
                    builder => builder.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .SetIsOriginAllowed(origin => true) // allow any origin
                           );
            });
            //services.AddCors(c =>
            //{
            //    c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin());
            //});
            services.AddOptions();                                         // Kích hoạt Options
            var mailsettings = Configuration.GetSection("MailSettings");  // đọc config
            services.Configure<MailSettings>(mailsettings);                // đăng ký để Inject
            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            //app.UseStaticFiles(new StaticFileOptions
            //{
            //    FileProvider = new PhysicalFileProvider(
            //    Path.Combine(env.ContentRootPath, "Content")),
            //    RequestPath = "/Content"
            //});
            app.UseRouting();
            //app.UseCors("AllowAllHeaders");
            // global cors policy

            app.UseCors(x => x
                .SetIsOriginAllowed(origin => true)
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
            //app.UseCors(options => options.AllowAnyOrigin());

            app.UseSession();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapGet("/testmail", async context => {

                    // Lấy dịch vụ sendmailservice
                    var sendmailservice = context.RequestServices.GetService<ISendMailService>();

                    MailContent content = new MailContent
                    {
                        To = "lexuancuongqnvn@gmail.com",
                        Subject = "Kiểm tra thử",
                        Body = "<p><strong>Xin chào lexuancuongqnvn</strong></p>"
                    };

                    await sendmailservice.SendMail(content);
                    await context.Response.WriteAsync("Send mail");
                });
                endpoints.MapHub<ERP.Web.Models.BroadcastHub>("/notify");
                endpoints.MapHub<ChatHub>("/chatHub");
                endpoints.MapHub<NotificationHub>("/notificationHub");
            });
            //app.Use(async (ctx, next) =>
            //{
            //    ctx.Request.Scheme = "https";
            //    ctx.Request.Host = new HostString("https://erp.crirosoft.vn");
            //    ctx.Request.Host = new HostString("https://www.erp.crirosoft.vn");

            //    await next();
            //});
            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v2/swagger.json", "core API 05082021");
            }
            );
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers(); 
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Login}/{action=Index}");
                //endpoints.MapGet("/swagger/index.html", async (context) => {

                //    int? countLogin = context.Session.GetInt32("countLogin");
                //    //string username = "";
                //    //       username = context.Session.GetString("username");
                //    //string byGroup = "";
                //    //       byGroup = context.Session.GetString("byGroup");
                //    //string decentralization = "";
                //    //       decentralization = context.Session.GetString("decentralization");

                //    if (countLogin == null)
                //    {
                //        countLogin = 0;
                //    }
                //    countLogin++;

                //    context.Session.SetInt32("countLogin", (int)countLogin);
                //    //context.Session.SetString("username", username);
                //    //context.Session.SetString("byGroup", byGroup);
                //    //context.Session.SetString("decentralization", decentralization);
                //});

            });
            var builder = new ConfigurationBuilder()
             .SetBasePath(env.ContentRootPath)
             .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
             .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
             .AddEnvironmentVariables();

            Configuration = builder.Build();

        }
    }
}
