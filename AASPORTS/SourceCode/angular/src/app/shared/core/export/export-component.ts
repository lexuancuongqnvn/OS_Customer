import { Component, ElementRef, Injector, Input, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { Workbook } from 'exceljs';
import { LayoutComponentBase } from '../../layout/layoutBase';
import { ExportAPIService, ExportModdel } from '../../service-proxies/api-shared';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent extends LayoutComponentBase{
    constructor(
        private injector: Injector,
        private exportAPIService:ExportAPIService
      ) {
        super(injector);
      }
    header:string[] = []
    data:any[] =[];
    //   ExportTOExcel() {
    //     import("xlsx").then(xlsx => {
    //
    //         const worksheet = xlsx.utils.json_to_sheet(this.sales); // Sale Data
    //         const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    //         const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    //         this.saveAsExcelFile(excelBuffer, "sales");
    //     });
    //   }

    GenHeader(arr:any[]){
        var hd = [];
        for (const [key, value] of Object.entries(arr[0])) {
            hd.push(value);
          }
        this.header = hd;
    }
    GenData(arr:any[]){
        var dt = [];
        for(var i = 1; i < arr.length ; i++){
            var t = [];
            for (const [key, value] of Object.entries(arr[i])) {
                t.push(value);
            }
            dt.push(t);
        }
        this.data = dt;
    }
    ExportTOExcel(title:string,fileName:string,sheetName:string,stored:string,filter:string,key_connect:string) {
        var pr = new ExportModdel();
        pr.title = title;
        pr.filter = filter;
        pr.stored = stored;
        pr.type = 'EXCEL';
        pr.key_connect = key_connect;

        this.exportAPIService.aPI_Data_Export_By_StoredProceduces(pr).subscribe((respond:any)=>{
            this.GenHeader(respond);
            this.GenData(respond);
            import("xlsx").then(xlsx => {
                let workbook = new Workbook();
                let worksheet = workbook.addWorksheet(sheetName);
                // Add new row
                let titleRow = worksheet.addRow([title]);

                // Set font, size and style in title row.
                titleRow.font = { name: 'Times New Roman', family: 4, size: 16, underline: 'double', bold: true };

                // Blank Row
                worksheet.addRow([]);

                //Add row with current date
                // let subTitleRow = worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')]);
                //Add Header Row
                let headerRow = worksheet.addRow(this.header);

                // Cell Style : Fill and Border
                headerRow.eachCell((cell, number) => {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FFFFFF00' },
                        bgColor: { argb: 'FF0000FF' }
                    }
                    cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
                });
                // Add Data and Conditional Formatting
                this.data.forEach(d => {
                        let row = worksheet.addRow(d);
                        let qty = row.getCell(5);
                        let color = 'FFFFFFFF';
                        if (+qty.value < 500) {
                        color = 'FFFFFFFF'
                        }
                        qty.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        //bgColor: { argb: 'FF0000FF' },
                        fgColor: { argb: color }
                        }
                        row.eachCell((cell, number) => {
                            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
                        });
                    }
                );
                workbook.xlsx.writeBuffer().then((data) => {
                    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                    this.saveAsExcelFile(blob, title);
                });
            });
        })
  }
  
arrayBuffer:any;
file:File;
incomingfile(event) 
{
this.file= event.target.files[0]; 
}

 Upload() {
      let fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, {type:"binary"});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            // console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
        }
        fileReader.readAsArrayBuffer(this.file);
}
  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(
        data,
        fileName + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }
}