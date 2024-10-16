import { Component, Injector, OnInit } from '@angular/core';
import { LayoutComponentBase } from '../../layoutBase';
import { AppConsts } from 'src/app/app-consts.component';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DomSanitizer } from '@angular/platform-browser';
import { ExportAPIService, SYS_Report_Infomation_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import moment from 'moment';

@Component({
  selector: 'os-dialog-preview-print',
  templateUrl: './dialog-preview-print.component.html',
  styleUrls: ['./dialog-preview-print.component.css']
})
export class DialogPreviewPrintComponent  extends LayoutComponentBase implements OnInit {

  constructor(
    injector: Injector,
    private appSession: AppSession,
    private exportAPIService: ExportAPIService,
    private sanitizer: DomSanitizer
  ) { super(injector);}

  popupPreviewReportVisible = false;
  popupVisible = false;
  htmlPreview:any;
  dataSourceTemplate:SYS_Report_Infomation_ENTITY[]=[];
  dataSourcePrint:SYS_Report_Infomation_ENTITY[]=[];
  selectedItem:SYS_Report_Infomation_ENTITY = new SYS_Report_Infomation_ENTITY()
  ngOnInit(): void {
  }
  async onPrint(tableName:string,data:any){
    this.dataSourcePrint = data;
    this.exportAPIService.sYS_Report_Infomation_Search(new SYS_Report_Infomation_ENTITY({
      table_name:tableName,
      employee_code:this.appSession.user.code,
      is_pdf:true
    })).subscribe(res=>{
      this.dataSourceTemplate = res;
      this.selectedItem = this.dataSourceTemplate.find(r=>r.is_default == true);
      if(!this.selectedItem)this.selectedItem = this.dataSourceTemplate[0]
      this.popupVisible = true;
      this.UpdateView()
    })
  }
  async onReportPreview( ){
    if(!this.dataSourcePrint){
      this.showMessageError(this.translate('Chưa có dòng nào được chọn','No lines are selected'));
      return;
    }if(!this.selectedItem || !this.selectedItem.code){
      this.showMessageError(this.translate('Mẫu in không được phép trống','Template no data'));
      return;
    }
    const url = AppConsts.baseUrl+'/report/preview'; // Replace with your URL
    let voucher_year;
    let y = localStorage.getItem('voucherDate');
    const postData = new URLSearchParams();// Add your POST parameters
    postData.append('master_code', this.dataSourcePrint['code']); 
    postData.append('company_code', this.appSession.user.company_code); 
    postData.append('voucher_code', this.dataSourcePrint['voucher_code']); 
    postData.append('voucher_no', this.dataSourcePrint['voucher_no']); 
    postData.append('voucher_year', this.getFullVoucherDate.year()+'');
    postData.append('report_code', this.selectedItem.code);
    
    if(this.dataSourcePrint){
      for (const [key, value] of Object.entries(this.dataSourcePrint)) {
        if(key !== 'master_code' 
        && key !== 'company_code' 
        && key !== 'voucher_code' 
        && key !== 'voucher_no' 
        && key !== 'voucher_year' 
        && key !== 'report_code')
        {
          if(moment.isMoment(value)) postData.append(key, value.format('yyyy-MM-DD HH:ss'));
          else if(this.isDate(value))  
            postData.append(key, this.convertDateToMomentUTC(value).format('yyyy-MM-DD HH:ss'));
          else  postData.append(key, value+'');
        }
       
      }
    }

    try {
      this.BlockUI()
      voucher_year = y?Number(y):(new Date()).getFullYear();
        const response = await fetch(url, {
            method: 'POST',
            body: postData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization':this.appSession.user.token,
                'company_code':this.appSession.user.company_code,
                'voucher_year':voucher_year+'',
                'voucher_code': this.appSession.getVoucherCode+'',
                'language_id':this.appSession.user.language_id+''
            },
        });

        if (response.ok) {
          this.UnBlockUI()
          const html = await response.text();
          this.htmlPreview = this.sanitizer.bypassSecurityTrustHtml(html);
          this.popupPreviewReportVisible = true;
        } else {
          this.UnBlockUI()
          this.showMessageError('Failed to fetch page');
            console.error('Failed to fetch page:', response.status);
        }
    } catch (error) {
      this.UnBlockUI()
      console.error('Error fetching page:', error);
    }
  }
  isDate(value: any): boolean {
      return value instanceof Date && !isNaN(value.valueOf());
  }
  async onReportExport(type:string = 'PDF' ){
    if(!this.dataSourcePrint){
      this.showMessageError(this.translate('Chưa có dòng nào được chọn','No lines are selected'));
      return;
    }if(!this.selectedItem || !this.selectedItem.code){
      this.showMessageError(this.translate('Mẫu in không được phép trống','Template no data'));
      return;
    }
    const url = AppConsts.baseUrl+'/report/Export'; // Replace with your URL
    let voucher_year;
    let y = localStorage.getItem('voucherDate');
    const postData = new URLSearchParams();// Add your POST parameters
    postData.append('master_code', this.dataSourcePrint['code']); 
    postData.append('company_code', this.appSession.user.company_code); 
    postData.append('voucher_code', this.dataSourcePrint['voucher_code']); 
    postData.append('voucher_no', this.dataSourcePrint['voucher_no']); 
    postData.append('voucher_year', this.getFullVoucherDate.year()+'');
    postData.append('report_code', this.selectedItem.code);
    postData.append('type', type);
    
    if(this.dataSourcePrint){
      for (const [key, value] of Object.entries(this.dataSourcePrint)) {
        if(key !== 'master_code' 
        && key !== 'company_code' 
        && key !== 'voucher_code' 
        && key !== 'voucher_no' 
        && key !== 'voucher_year' 
        && key !== 'report_code')
        {
          if(moment.isMoment(value)) 
            postData.append(key, value.format('yyyy-MM-DD HH:ss'));
          else if(this.isDate(value))  
            postData.append(key, this.convertDateToMomentUTC(value).format('yyyy-MM-DD HH:ss'));
          else  postData.append(key, value+'');
        }
       
      }
    }

    try {
      this.BlockUI()
      voucher_year = y?Number(y):(new Date()).getFullYear();
        await fetch(url, {
            method: 'POST',
            body: postData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization':this.appSession.user.token,
                'company_code':this.appSession.user.company_code,
                'voucher_year':voucher_year+'',
                'voucher_code': this.appSession.getVoucherCode+'',
                'language_id':this.appSession.user.language_id+''
            },
        }).then(response => {
          this.UnBlockUI();
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.blob();
      }).then(response=>{
        this.UnBlockUI();
          switch(type){
            case 'PDF': type = '.pdf'; break;
            case 'Excel': type = '.xls'; break;
          }
          const a = document.createElement('a');
          a.href = window.URL.createObjectURL(response);
          a.download = this.dataSourcePrint['voucher_no']?this.dataSourcePrint['voucher_no']:this.selectedItem.name+type;

          // Append the anchor to the body and trigger the download
          document.body.appendChild(a);
          a.click();

          // Remove the anchor from the body
          window.URL.revokeObjectURL(a.href);
          document.body.removeChild(a);
          this.showMessageSuccess('File đã được tải thành công.')
        }).catch(err=>{
          this.UnBlockUI()
          this.showMessageError('Failed to fetch page');
          console.error('Failed to fetch page:', err);
        });

    } catch (error) {
      this.UnBlockUI()
      console.error('Error fetching page:', error);
    }
  }
}
