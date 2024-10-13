using ERP.Web.System.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ERP.System.Intfs.Mail
{
    public interface ISendMailService
    {
        Task SendMail(MailContent mailContent);
        Task SendMail_v2(MailContent mailContent);

        Task SendEmailAsync(string email, string subject, string htmlMessage);
    }
}
