import { Injectable, Injector } from "@angular/core";
import { GenRowTableService, MenuService, Tb_TestTheme_ENTITY, Tb_TestTheme_Sub1_ENTITY, Tb_TestTheme_Sub2_ENTITY, Tb_TestTheme_Sub3_ENTITY, TestThemeService } from "../service-proxies/api-shared";

@Injectable()
export class CommonService {
    constructor(
        private menuService: MenuService,
        private genRowTableService: GenRowTableService,
        private testThemeService: TestThemeService
    ) {

    }
    ListService: any =
        [
            //gen row table
            {
                Key: 'GenRowTableService',
                GenRowTableService: {
                    service: this.genRowTableService,
                    acctions: {
                        search: 'sYS_GenRowTable_Search'
                    }
                },
            },
            //menu
            {
                Key: 'MenuService',
                MenuService: {
                    service: this.menuService,
                    acctions: {
                        search: 'sYS_Menu_Search'
                    }
                }
            },
            //TestThemeService
            {
                Key: 'TestThemeService',
                TestThemeService: {
                    service: this.testThemeService
                }
            }
        ]
}
