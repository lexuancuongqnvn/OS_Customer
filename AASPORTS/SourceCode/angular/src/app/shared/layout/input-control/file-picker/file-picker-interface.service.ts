import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ChangeDetectorRef, Inject, Injectable, Optional } from "@angular/core";
import { AppSession } from "src/app/shared/app-session/app-session";
import { ApiBase, API_BASE_URL } from "src/app/shared/service-proxies/api-shared";

@Injectable()
export class FilePickerInterface extends ApiBase {
    private http: HttpClient;
    private baseUrl: string;
    public refValue: any;
    constructor(
        @Inject(AppSession) configuration: AppSession,
        @Inject(HttpClient) http: HttpClient,
        @Optional() @Inject(API_BASE_URL) baseUrl?: string
    ) {
        super(configuration);
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }
    fileToUpload: any;
    listFiles: any[] = [];
    async postFiles(): Promise<any> {
        if (this.fileToUpload == undefined) return;
        const formData: FormData = new FormData();

        debugger;
        for (var i = 0; i < this.listFiles.length; i++) {
            if (this.listFiles[i]['id'] < 0) {
                let t = this.fileToUpload.find(e => e['id'] == this.listFiles[i]['id']);
                this.listFiles[i]['index'] = this.fileToUpload.indexOf(t);
            }
            formData.append("listFiles", JSON.stringify(this.listFiles[i]))
        }
        this.fileToUpload.forEach(item_ => {
            if (this.listFiles.filter(e => e['id'] == item_['id']).length > 0)
                formData.append("MyFile", item_)
        });
        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                'Accept': 'application/json'
            })
        };
        this.transformOptions(options_);
        return await this.http.post(this.baseUrl + '/api/FileManager/PostFile', formData,
            {
                headers: options_.headers
            }).subscribe();
    }
}