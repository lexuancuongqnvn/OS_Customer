using ERP.Common.Filters;
using Microsoft.AspNetCore.Mvc;
using System;
using MimeKit;
using MimeKit.Text;
using MailKit.Net.Smtp;
using MailKit.Security;

namespace ERP.Web.Controllers.System
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class EmailController : ControllerBase
    {
        //Sending an HTML email in ASP.NET Core
        //source https://jasonwatmore.com/post/2020/07/15/aspnet-core-3-send-emails-via-smtp-with-mailkit
        public static int HTMLEmail(string html)
        {
            try
            {
                //var email = new MimeMessage();
                //email.From.Add(MailboxAddress.Parse("cuongcris7@gmail.com"));
                //email.To.Add(MailboxAddress.Parse("lexuancuongqnvn@gmail.com"));
                //email.Subject = "Test Email Subject";
                //email.Body = new TextPart(TextFormat.Html) { Text = "<h1>Thay đổi mật khẩu ngay:</h1>"+html };

                //// send email
                //using var smtp = new SmtpClient();
                //smtp.Connect("smtp.ethereal.email", 587, SecureSocketOptions.StartTls);
                //smtp.Authenticate("cuongcris7@gmail.com", "Abc@1234567");
                //smtp.Send(email);
                //smtp.Disconnect(true);
                MimeMessage message = new MimeMessage();

                MailboxAddress from = new MailboxAddress("Admin",
                "cuongcris7@gmail.com");
                message.From.Add(from);

                MailboxAddress to = new MailboxAddress("User",
                "lexuancuongqnvn@gmail.com");
                message.To.Add(to);

                message.Subject = "This is email subject";
                BodyBuilder bodyBuilder = new BodyBuilder();
                bodyBuilder.HtmlBody = "<h1>Hello World!</h1>";
                bodyBuilder.TextBody = "Hello World!";
                message.Body = bodyBuilder.ToMessageBody();
                SmtpClient client = new SmtpClient();
                client.Connect("smtp.ethereal.email", 587, true);
                client.Authenticate("cuongcris7@gmail.com", "Abc@1234567");
                client.Send(message);
                client.Disconnect(true);
                client.Dispose();
                return 0;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }
    }
}
