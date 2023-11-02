import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie";
import { AppComponent } from "src/app/app.component";
import { User } from "../models/system/account";



@Injectable()
export class AppSession {
    constructor(
        public cookieService: CookieService,
        private appComponent: AppComponent
    ) { }
    public setVoucherCode(v:string){
        let path = location.pathname.split(';')[0].trim()
        while(path.includes('-')){ path=path.replace('-','')}
        while(path.includes('/')){ path=path.replace('/','_')}
        this.cookieService.remove('VCH'+path)
        this.cookieService.put('VCH'+path,v)
    }
    public get getVoucherCode():string{
        let path = location.pathname.split(';')[0].trim();
        while(path.includes('-')){ path=path.replace('-','')}
        while(path.includes('/')){ path=path.replace('/','_')}
        return this.cookieService.get('VCH'+path);
    }
    public get user(): User {
        return this.genSessionData();
    }
    public genSessionData(): User {
        try{
            if (this.cookieService.get('allowShowTheme') == 'true') {
                this.appComponent.showtheme = true;
            } else {
                this.appComponent.showtheme = false;
                return null;
            }
            var user = new User();
            var obj = this.cookieService.getObject('userlogin');
            user.username = obj['userlogin'];
            user.token = obj['token'];
            user.id = obj['id'];
            user.code = obj['code'];
            user.avatar = obj['avatar'];
            user.firstName = obj['firstName'];
            user.lastName = obj['lastName'];
            user.roleID = obj['roleID'];
            user.roleName = obj['roleName'];
            user.branch = obj['branch'];
            user.department = obj['department'];
            user.title_code = obj['title_code'];
            user.position_code = obj['position_code'];
            user.level = obj['level'];
            user.company_code = obj['company_code'];
            user.language_id = obj['language_id'];
            user.branch_name = obj['branch_name'];
            return user;
        }catch{
            return new User();
        }
    }
}