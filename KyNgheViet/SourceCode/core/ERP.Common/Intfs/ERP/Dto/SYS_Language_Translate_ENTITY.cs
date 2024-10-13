using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.Common.Intfs.ERP.Dto
{
    public class SYS_Language_Translate_ENTITY
    {
        public int id { get; set; }
        public string code { get; set; }
        public string language_key { get; set; }
        public int? language_id { get; set; }
        public string name_vn { get; set; }
        public string name_en { get; set; }
        public string type { get; set; }


    }
}
