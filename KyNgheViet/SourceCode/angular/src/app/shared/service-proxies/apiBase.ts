import { CookieService } from "ngx-cookie";
import { AppSession } from "../app-session/app-session";
let dataUploads: any[] = [];
export class ApiBase {
    authToken = '';
    protected constructor(
        private appSession: AppSession
    ) {

    }
    setAuthToken(token: string) {
        this.authToken = token;
    }
    setDataUpload(d: any) {
        dataUploads.push(d);
    }
    deleteDataUpload_ById(id: any) {
        for (var i = 0; i < dataUploads.length; i++)
            if (dataUploads[i]['id'] == id) {
                dataUploads.splice(i, 0);
                break;
            }
    }
    clearAllDataUpload() {
        dataUploads = [];
    }
    get getDataUpload(): any {
        return dataUploads;
    }
    protected transformOptions(options: any): Promise<any> {
        // options.headers = options.headers.append('Authorization', `${this.authToken}`);
        if(this.appSession.user)
            {
                let voucher_year;
                let y = localStorage.getItem('voucherDate');
                voucher_year = y?Number(y):(new Date()).getFullYear();
                options.headers = options.headers.append('Authorization', this.appSession.user.token);
                options.headers = options.headers.append('username', this.appSession.user.username);
                options.headers = options.headers.append('code', this.appSession.user.code);
                options.headers = options.headers.append('company_code', this.appSession.user.company_code);
                options.headers = options.headers.append('voucher_year', voucher_year+'');
                options.headers = options.headers.append('voucher_code', this.appSession.getVoucherCode+'');
                options.headers = options.headers.append('language_id', this.appSession.user.language_id+'');
            }
        return Promise.resolve(options);
    }
}
