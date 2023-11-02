using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.System.Intfs.GenRowTable.Dto
{
    public class SYS_TypeColumn_ENTITY
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int? TypeGroup { get; set; }
        public string TypeOnGirdView { get; set; }
        public string TypeOnGirdEdit { get; set; }
        public string Format { get; set; }
        public string dx_format { get; set; }
        public string editorType { get; set; }
    }
}
