using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.System.Intfs.Export.Dto
{
    public class Export_ENTITY
    {
        public string exportType { get; set; }
        public List<object> colModel { get; set; }
        public object filter { get; set; }
        public string store { get; set; }
    }
}
