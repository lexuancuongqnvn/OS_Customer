import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { observable, Observable } from "rxjs";
import { AppConsts } from "src/app/app-consts.component";

@Injectable()
export class SystemServiceProxy {
    constructor(public http: HttpClient) {
    }
    public baseUrl: string = AppConsts.baseUrl;
    GetByObject(param: object): Observable<any> {
        const params = new HttpParams({ fromString: 'name=term' });
        return this.http.request('GET', this.baseUrl, { responseType: 'json', params });
    }
    PostByObject(url: string, param: object): Observable<any> {
        var pStr = '';
        Object.keys(param).forEach(key => {
            if (pStr != '')
                pStr += '&';
            pStr += key + '=' + param[key];
        });

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        };
        let url_ = (this.baseUrl + '/' + url).replace(/[?&]$/, "");
        return this.http.post<any>(url_, null, httpOptions);
    }
    GetByModel(param: object): Observable<any> {
        const params = new HttpParams({ fromString: 'name=term' });
        return this.http.request('GET', this.baseUrl, { responseType: 'json', params });
    }
    PostByModel(url: string, param: any): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(param);
        let url_ = (this.baseUrl + '/' + url).replace(/[?&]$/, "");
        return this.http.post<any>(url_, body, { 'headers': headers })
    }
    setDrawer() {

    }
}

