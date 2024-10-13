using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Common.Models.Request
{
    public class RequestModel
    {
        public string Result { get; set; }
        public string ErrorDesc { get; set; }
        public int? StatusCode { get; set; }
        public int? Status { get; set; }
        public string Message { get; set; }
    }
}