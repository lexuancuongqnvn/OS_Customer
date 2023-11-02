using ERP.Common.Controllers;
using ERP.Common.TokenAuthentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ERP.Common.Filters
{
    public class TokenAuthenticationFilter:Attribute,IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var tokenManager =(ITokenManager)context.HttpContext.RequestServices.GetService(typeof(ITokenManager));
            var result = true;
            if (!context.HttpContext.Request.Headers.ContainsKey("Authorization"))
                result = false;
            string token = string.Empty;
            if (result)
            {
                token = context.HttpContext.Request.Headers.First(x => x.Key == "Authorization").Value;
                if (!tokenManager.VerifyToken(token))
                    result = false;
                try
                {
                    AuthenticateController.appSessionUser.code = context.HttpContext.Request.Headers.First(x => x.Key == "code").Value;
                    AuthenticateController.appSessionUser.username = context.HttpContext.Request.Headers.First(x => x.Key == "username").Value;
                    AuthenticateController.appSessionUser.company_code = context.HttpContext.Request.Headers.First(x => x.Key == "company_code").Value;
                    AuthenticateController.appSessionUser.voucher_year = int.Parse(context.HttpContext.Request.Headers.First(x => x.Key == "voucher_year").Value);
                    AuthenticateController.appSessionUser.voucher_code = context.HttpContext.Request.Headers.First(x => x.Key == "voucher_code").Value;
                    AuthenticateController.appSessionUser.language_id = int.Parse(context.HttpContext.Request.Headers.First(x => x.Key == "language_id").Value);
                }
                catch { }
            }
            if (!result)
            {
                string host = context.HttpContext.Request.Headers["origin"].ToString();
                if (!AuthenticateController.list_host_allow_request.Contains(host))
                {
                    string log = JsonConvert.SerializeObject(context.HttpContext.Request.Headers);
                    string qr = @"
                        INSERT INTO [dbo].[Notification]
                           ([new_message]
                           ,[title]
                           ,[message]
                           ,[link_direct]
                           ,[time_add]
                           ,[type]
                           ,[isView]
                           ,[isRead]
                           ,[string_time]
                           ,[account_id]
		                    ,module
			                ,code_in_form)
		                 VALUES
			                   (1
			                   ,N'Truy cập trái phép'
			                   ,N'" + log + @"'
			                   ,'/'
			                   ,GETDATE()
			                   ,NULL
			                   ,0
			                   ,0
			                   ,''
			                   ,1
			                   ,'SYS'
			                   ,NULL)
                            ";
                        bool check = ManagementController.ExecuteNonQuery(ConnectController.GetConnectStringByKey("HRM"), qr);
                }    
                
                context.ModelState.AddModelError("Unauthorized", "You are not unauthorized.");
                context.Result = new UnauthorizedObjectResult(context.ModelState);
            }
        }
    }
}
