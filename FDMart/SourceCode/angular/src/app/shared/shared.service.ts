import { ChangeDetectorRef, Injectable, Injector } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { Observable } from "rxjs";
import { AppComponent } from "src/app/app.component";
import { Globals } from "src/globals";
import { AppSession } from "./app-session/app-session";
import { LoginComponent } from "./form/login/login.component";
import { User } from "./models/system/account";
import { GenRowTableService, MenuService, SYS_GenRowTable, SYS_Menu } from "./service-proxies/api-shared";
import { CommonService } from "./ultilities/commonService";

export const dataMenu = {
    parents: [],
    child: []
}

@Injectable()
export class DrawerService {
    constructor(
        private appSession: AppSession,
        private commonService: CommonService,
        private appComponent: AppComponent
    ) {

    }
    @BlockUI() blockUI: NgBlockUI;
    sYS_GenRowTable: SYS_GenRowTable;

    getGenrowItems(tbName: string, e): void {
        // if (this.sYS_GenRowTable != undefined && this.sYS_GenRowTable.tablE_NAME == tbName) e.completeCallback(this.sYS_GenRowTable);
        this.blockUI.start('Loading...');
        let param = new SYS_GenRowTable();
        var user = new User();
        user = this.appSession.user;
        param.userID = user.id;
        param.tablE_NAME = tbName;

        this.commonService.ListService.find(element => element['Key'] == 'GenRowTableService')['GenRowTableService']['service']['sYS_GenRowTable_Search'](param).subscribe(
            (data: SYS_GenRowTable[]) => {
                this.sYS_GenRowTable = data[0];
                e.completeCallback(data);
            },
            (err) => {
                if (err.status == 401) {
                    this.appComponent.existSession();
                }
            },
            () => {
                this.blockUI.stop();
            }
        )
    }
    getMenuItems(): any {
        if (dataMenu.parents.length > 0) return dataMenu;
        let param = new SYS_Menu();
        var user = new User();
        user = this.appSession.user;
        if (user == null) return;
        param.userID = user.id;
        this.commonService.ListService.find(element => element['Key'] == 'MenuService')
        ['MenuService']['service']['sYS_Menu_Search'](param).subscribe((data: any[]) => {
            this.extractMenu(data);
            this.appComponent.dataMenu = dataMenu.parents;
            this.appComponent.updateViewApp();
        },
            (err) => {
                if (err.status == 401) {
                    this.appComponent.existSession();
                }
            },
            () => {
                //isloading = true
            }
        )
    }

    private extractMenu(sYS_Menu: SYS_Menu[]) {
        if (dataMenu.parents.length > 0) return;
        sYS_Menu.forEach(e => {
            var children = false, overview = [];
            if (e.syS_Menu_Sub.length > 0) {
                children = true;
                e.syS_Menu_Sub.forEach(e => {
                    overview.push({
                        text: e.name,
                        icon: e.icon,
                        selected: false,
                        link: e.link,
                        listAcction: e.lisT_ACCTIONS,
                        level: 1
                    });
                });
            }
            var p = {
                id: e.id,
                text: e.name,
                icon: e.icon,
                expanded: false,
                children: children,
                selected: false,
                overview: overview,
                listAcction: e.lisT_ACCTIONS,
                link: e.link
            }
            dataMenu.child.push(overview);
            dataMenu.parents.push(p);
        });
        this.appComponent.setData(dataMenu);
    }
}