using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.System.Intfs.Acction.Dto
{
    public class ActionOnTableModel
    {
        public string tbName { get; set; }
        public List<SYS_ActionsOnTable_ENTITY> SYS_ActionsOnTables { get; set; }
    }
}
