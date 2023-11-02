using Abp.Application.Services.Dto;
using ERP.Common.Controllers;
using ERP.Common.Filters;
using ERP.System.Impls.Account;
using ERP.System.Impls.Account.Dto;
using ERP.System.Intfs.Account.Dto;
using ERP.System.Intfs.Mail;
using ERP.System.Intfs.Mail.Dto;
using ERP.Web.System.Dto;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Timers;

namespace ERP.Web.Controllers.System
{
    [Route("api/[controller]/[action]")]
    //[EnableCors("AllowAllHeaders")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService IAccountService;
        private readonly ISendMailService ISendMailService;
        private static Timer aTimer;
        //Startup.lisUser.Remove(key);
        public AccountController(IAccountService iAccountService, ISendMailService sendMailService)
        {
            this.IAccountService = iAccountService;
            this.ISendMailService = sendMailService;
        }
        [HttpPost]
        [TokenAuthenticationFilter]
        public async Task<IDictionary<string, object>> SYS_Account_Infomation_CheckLogin(string USER_NAME, string PASSWORD)
        {
            var result = await IAccountService.SYS_Account_Infomation_CheckLogin(USER_NAME, PASSWORD);
            //SetTimer();
            return result;
        }
        [HttpPost]
        [TokenAuthenticationFilter]
        public async Task<IDictionary<string, object>> SYS_Account_Search([FromBody] SYS_Account_Group input)
        {
            var result = await IAccountService.SYS_Account_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_Account_Infomation_Delete(string USER_NAME, int ACCOUNT_ID)
        {
            var result = await IAccountService.SYS_Account_Infomation_Delete(USER_NAME, ACCOUNT_ID);
            return result;
        }
        [HttpPost]
        public async Task<List<SYS_Account_Group>> SYS_Account_Group_Search([FromBody] SYS_Account_Group input)
        {
            var result = await IAccountService.SYS_Account_Group_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<SYS_Account_Infomation>> SYS_Account_Info_Search([FromBody] SYS_Account_Infomation input)
        {
            var result = await IAccountService.SYS_Account_Info_Search(input);
            if (!string.IsNullOrEmpty(input.code))
            {
                result[0].PASSWORD_F = ManagementController.DecryptString(result[0].PASSWORD);
            }

            return result;
        }

        [HttpPost]
        public async Task<SYS_Account_Infomation> SYS_Account_Info_Search_byUser(string username)
        {
            var result = await IAccountService.SYS_Account_Info_Search_byUser(username);
            return result[0];
        } 
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_Account_Infomation_UpdatePassword(string email, int code, string password, string passwordNew, string passwordNew_Confirm)
        {
            var result = await IAccountService.SYS_Account_Infomation_UpdatePassword(email,code, password, passwordNew,passwordNew_Confirm);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_Account_Infomation_Update([FromBody]SYS_Account_Infomation input)
        {
            input.PASSWORD = ManagementController.EncryptString(input.PASSWORD_F);
            var result = await IAccountService.SYS_Account_Infomation_Update(input);
            return result;
        }
        [HttpPost]
        public IDictionary<string, object> SYS_Account_Infomation_Language_Update(string username,string laguage)
        {
            string qr = "UPDATE SYS_Account_Infomation SET LANGUAGE_ID ="+laguage+ " WHERE USER_NAME = '"+username+"'";
            ManagementController.ExecuteNonQuery(ConnectController.GetConnectStringByKey("ID"), qr);
            IDictionary<string, object> result = new Dictionary<string, object>();
            result.Add("SYS_Account_Infomation", new { StatusCode = 0, message = "Cập nhật ngôn ngữ thành công" });
            return result;
        }
        [HttpPost]
        public async Task<List<RequestManagement_ENTITY>> RequestManagement_Search(string username)
        {
            var result = await IAccountService.RequestManagement_Search(username);
            return result;
        } 
        [HttpPost]
        public async Task<List<RequestManagement_ENTITY>> RequestManagement_History([FromBody]string username)
        {
            var result = await IAccountService.RequestManagement_History(username);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_Account_Infomation_ForgotPassword_Inserst([FromBody] Mail_ENTITY input)
        {

            Random generator = new Random();
            int code = generator.Next(100000, 999999);
            var result = await IAccountService.SYS_Account_Infomation_ForgotPassword_Inserst(input.email.Trim(), code);
            var status = ((object[])result.Values)[0];
            if(status.ToString() == "0")
            {
                MailContent content = new MailContent
                {
                    To = input.email,
                    Subject = "Xác nhận mật khẩu",
                    Body = @"<div style=""background-color:#ffffff;font-size:16px;color:#333333;font-family:'Segoe UI',Arial,sans-serif;width:100%;height:100%;Margin:0px;padding:0px"">
                            <center style=""width:100%;table-layout:fixed;background-color:#ffffff"">
                                <div style=""max-width:600px;Margin:0 auto"">
                                    <table align=""center"" width=""100%"" bgcolor=""#ffffff"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:#ffffff;width:100%;max-width:600px;margin:0px auto;padding:0px;border-collapse:collapse;border-spacing:0;border:0 none"">
                                        <tbody>
                                            <tr>
                                                <td align=""center"" width=""100%"" bgcolor=""#ffffff"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:#ffffff;width:100%;Margin:0px;padding:0px 30px;border-collapse:collapse;border-spacing:0;border:0 none"">
                                                    <table align=""center"" width=""100%"" bgcolor=""#ffffff"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:#ffffff;width:100%;Margin:0px;padding:0px;border-collapse:collapse;border-spacing:0;border:0 none"">
                                                        <tbody>
                                                            <tr>
                                                                <td align=""left"" width=""100%"" bgcolor=""#ffffff"" cellspacing=""0"" border=""0"" style=""background-color:#ffffff;width:100%;Margin:0px;padding:0px;border-collapse:collapse;border-spacing:0;border:0 none"">
                                                                    <p style=""height:30px;Margin:0px;padding:0px;font-size:1px;line-height:1px"">
                                                                        &nbsp;</p>

                                                                    <a href=""http://crirosoft.vn"" target=""_blank"" data-saferedirecturl=""http://api.erp.crirosoft.vn/UploadFiles/logo/logo.png"">Criro Soft</a>
                                                                    <p style=""height:40px;Margin:0px;padding:0px;font-size:1px;line-height:1px"">
                                                                        &nbsp;</p>
                                                                    <h3 style=""font-family:'Segoe UI','Avenir Next','Open Sans','Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:24px;color:#333333;padding:0px;margin:0px 0px 10px 0px"">
                                                                        <strong>Hello Criro Soft,</strong></h3>
                                                                    <p style=""font-family:'Segoe UI','Avenir Next','Open Sans','Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:24px;color:#333333;padding:0px;margin:0px 0px 10px 0px"">
                                                                        Thank you for registering with CriroSoft.<br>

                                                                        <p style=""height:30px;Margin:0px;padding:0px;font-size:1px;line-height:1px"">
                                                                            &nbsp;</p>
                                                                        <p style=""font-family:'Consolas','Monaco','Menlo','Bitstream Vera Sans Mono','Courier New',Courier,monospace;font-size:20px;line-height:28px;color:#333333;padding:0px;margin:0px 0px 10px 0px"">
                                                                            " + code + @"</p>
                                                                        <p style=""height:40px;Margin:0px;padding:0px;font-size:1px;line-height:1px"">
                                                                            &nbsp;</p>
                                                                        <p style=""font-family:'Segoe UI','Avenir Next','Open Sans','Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:22px;color:#5c6a70;padding:0px;Margin:0px"">
                                                                            After confirming your email address, you will receive only important messages from CriroSoft, notifications about the status of the account and new special offers.<br> Thank you for choosing CriroSoft!</p>
                                                                        <p style=""height:40px;Margin:0px;padding:0px;font-size:1px;line-height:1px"">
                                                                            &nbsp;</p>
                                                                        <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td height=""1"" style=""background:none;border:solid 1px #d6e3e3;border-width:1px 0 0 0;height:1px;width:100%;margin:0px 0px 0px 0px;font-size:0px;line-height:0px"">
                                                                                        &nbsp;</td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <p style=""height:30px;Margin:0px;padding:0px;font-size:1px;line-height:1px"">
                                                                            &nbsp;</p>
                                                                        <p style=""font-family:'Segoe UI','Avenir Next','Open Sans','Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:24px;color:#333333;padding:0px;margin:0px 0px 10px 0px"">
                                                                            Best regards, CriroSoft Team</p>
                                                                        <p style=""height:20px;Margin:0px;padding:0px;font-size:1px;line-height:1px"">
                                                                            &nbsp;</p>
                                                                        <p style=""font-family:'Segoe UI','Avenir Next','Open Sans','Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:22px;color:#5c6a70;padding:0px;margin:0px 0px 30px 0px"">
                                                                            You recieved this email because you are a client of CriroSoft.</p>
                                                                        <p style=""font-size:0px;line-height:40px;padding:0px;margin:0px"">
                                                                            &nbsp;
                                                                        </p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </center>
                            <div class=""yj6qo""></div>
                            <div class=""adL"">
                            </div>
                        </div>"
                };
                await ISendMailService.SendMail(content);
            }
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_Account_Register([FromBody]SYS_Account_Infomation input)
        {
            Random generator = new Random();
            int code = generator.Next(100000, 999999);
            var result = await IAccountService.SYS_Account_Infomation_Register(input.EMAIL, code);
            var status = ((object[])result.Values)[0];
            if(status.ToString() == "0")
            {
                MailContent content = new MailContent
                {
                    To = input.EMAIL,
                    Subject = "Xác Minh tài khoản",
                    Body = "<p><strong>Mã xác nhận của bạn là: " + code + "</strong></p>"
                };
                await ISendMailService.SendMail(content);
            }
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_Account_Group_Actions([FromBody] SYS_Account_Group input)
        {
            var result = await IAccountService.SYS_Account_Group_Actions(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_Account_Infomation_Insert([FromBody] SYS_Account_Infomation input)
        {
            var result = await IAccountService.SYS_Account_Infomation_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_Account_Infomation_Register_Confirm([FromBody]SYS_Account_Infomation input)
        {
            input.PASSWORD = ManagementController.EncryptString(input.PASSWORD); 
            var result = await IAccountService.SYS_Account_Infomation_Register_Confirm(input);
            return result;
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public void SetUserOnline(string key, SYS_Account_Group value)
        {
            if (!Startup.lisUser.ContainsKey(key))
            {

            }
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public SYS_Account_Group GetUserOnline(string key)
        {
            if (Startup.lisUser.ContainsKey(key))
            {
                return Startup.lisUser[key];
            }
            return null;
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public void RefreshUserOnline()
        {
            DataTable dtUser = ManagementController.GetDataTable("vw_SYS_Account", "select * from vw_SYS_Account where [ACTIVE] = 1");
            string userName = "";
            foreach (DataRow row in dtUser.Rows)
            {
                userName = row["USER_NAME"].ToString();
                string val = HttpContext.Session.GetString(userName);
            }
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        private void SetTimer()
        {
            // Create a timer with a two second interval.
            aTimer = new Timer(3 * 1000);
            // Hook up the Elapsed event for the timer. 
            aTimer.Elapsed += OnTimedEvent;
            aTimer.AutoReset = true;
            aTimer.Enabled = true;
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        private void OnTimedEvent(Object source, ElapsedEventArgs e)
        {
            //Console.WriteLine("The Elapsed event was raised at {0:HH:mm:ss.fff}",
            //                  e.SignalTime);
            RefreshUserOnline();
        }
    }
}
