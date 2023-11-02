using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.Common.TokenAuthentication
{
    public class Token
    {
        public string Value { get; set; }
        public DateTime ExpiryDate { get; set; }
    }
}
