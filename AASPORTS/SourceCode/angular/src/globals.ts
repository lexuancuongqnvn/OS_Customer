import { Injectable } from '@angular/core';
import { SYS_GenRowTable, SYS_Menu } from './app/shared/service-proxies/api-shared';

@Injectable()
export class Globals {

    sYS_Menu: SYS_Menu[];
    sYS_GenRowTable: SYS_GenRowTable[];
    items: Object = {
        parents: [
        ]
    }
    setDrawer(item: SYS_Menu[]) {
        this.sYS_Menu = item;
    }
    getDrawer(): SYS_Menu[] {
        return this.sYS_Menu;
    }
    getDrawerItems(): Object {
        return this.items;
    }
    setItemsDrawer(items: Object) {
        this.items = items;
    }
    setGenRow(item: SYS_GenRowTable[]) {
        this.sYS_Menu = item;
    }
    getGenRow(): SYS_GenRowTable[] {
        return this.sYS_GenRowTable;
    }

}