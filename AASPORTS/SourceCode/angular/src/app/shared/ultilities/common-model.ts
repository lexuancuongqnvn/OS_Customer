import { Injectable } from "@angular/core";
import { Tb_TestTheme_ENTITY, Tb_TestTheme_Sub1_ENTITY, Tb_TestTheme_Sub2_ENTITY, Tb_TestTheme_Sub3_ENTITY } from "../service-proxies/api-shared";

@Injectable()
export class CommonModels {
    constructor(

    ) {
    }
    tb_TestTheme: Tb_TestTheme_ENTITY;
    tb_TestTheme_Sub1: Tb_TestTheme_Sub1_ENTITY = new Tb_TestTheme_Sub1_ENTITY();
    tb_TestTheme_Sub2: Tb_TestTheme_Sub2_ENTITY = new Tb_TestTheme_Sub2_ENTITY();
    tb_TestTheme_Sub3: Tb_TestTheme_Sub3_ENTITY = new Tb_TestTheme_Sub3_ENTITY();
    ListModel: any =
        [
            //tb_TestTheme
            {
                Key: 'tb_TestTheme',
                tb_TestTheme: new Tb_TestTheme_ENTITY()
            },
            //tb_TestTheme_Sub1
            {
                Key: 'tb_TestTheme_Sub1',
                tb_TestTheme_Sub1: this.tb_TestTheme_Sub1.toJSON()
            },
            //tb_TestTheme_Sub2
            {
                Key: 'tb_TestTheme_Sub2',
                tb_TestTheme_Sub2: this.tb_TestTheme_Sub2.toJSON()
            },
            //tb_TestTheme_Sub3
            {
                Key: 'tb_TestTheme_Sub3',
                tb_TestTheme_Sub3: this.tb_TestTheme_Sub3.toJSON()
            }
        ]
}