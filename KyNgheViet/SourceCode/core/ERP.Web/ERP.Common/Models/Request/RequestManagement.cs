using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.Common.Models.Request
{
    public class RequestManagement
    {
        public string Username { get; set; }
        public string Token { get; set; }
        public DateTime? LastRequest { get; set; }
        public DateTime? FirstRequest { get; set; }
        public bool? countLogin { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public int? TimeOut { get; set; }
    }
}
