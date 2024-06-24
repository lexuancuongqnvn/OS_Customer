import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormEditV2ForPopupComponent } from 'src/app/shared/form/form-edit-v2-for-popup/form-edit-v2-for-popup.component';
import { CAT_Contract_ENTITY, CAT_Customer_ENTITY, CAT_Goods_ENTITY, CAT_Goods_Group_ENTITY, CAT_Goods_Serial_ENTITY, CAT_Goods_Unit_ENTITY, CAT_Profession_ENTITY, CAT_Tax_ENTITY, CAT_Warehouse_ENTITY, ConsolidationCategoryService, SYS_GenRowTable_Detail, SalesCategoryService, SalesVATService, WMSCategoryService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';

@Component({
    selector: 'dialog-form',
    templateUrl: './dialog-from.component.html',
})
export class DialogFormComponent {
    opened:boolean = false;
    tables:any[] = [];
    @Input() content: string = '';
    @Input() titlxe: string = '';
    @Input() tbName: string = '';
    @Input() title: string = '';
    @Input() width: number = 450;
    editPageState:string = EditPageState.edit;
    row:SYS_GenRowTable_Detail = new SYS_GenRowTable_Detail()
    InputMaster:object = {};
    i:number;
    j:number;
    k:number;
    event:any;
    widthScreen: number =  ($('body').width() *0.85);
    @ViewChild(FormEditV2ForPopupComponent, {static: false}) formEdit: FormEditV2ForPopupComponent;
    @Output() confirmOutput: EventEmitter<any> = new EventEmitter();
    @Output() dataSaveOutput: EventEmitter<any> = new EventEmitter();
    saveButtonOptions:any;
    closeButtonOptions:any;
    constructor(
        private salesCategoryService: SalesCategoryService,
        private salesVATService: SalesVATService,
        private wMSCategoryService: WMSCategoryService,
        private consolidationCategoryService: ConsolidationCategoryService,

        ) {
        const that = this;
        
        this.saveButtonOptions = {
            icon: 'save',
            text: 'Lưu',
            onClick(e:any) {
                switch(that.tbName){
                    case 'CAT_Customer':
                        that.salesCategoryService.cAT_Customer_Insert(new CAT_Customer_ENTITY(
                            {...that.InputMaster}) as CAT_Customer_ENTITY).subscribe(res=>{
                            if(res.status == 0){
                                that.InputMaster['code'] = res.ref_code;
                                that.dataSaveOutput.emit({data:that.InputMaster,column:that.row,i:that.i,j:that.j,k:that.k,event:that.event});
                                that.close('yes');
                            }
                            else alert(res.message)
                          })
                    break;
                    case 'CAT_Goods':
                        that.wMSCategoryService.cAT_Goods_Insert(new CAT_Goods_ENTITY(
                            {...that.InputMaster}) as CAT_Goods_ENTITY).subscribe(res=>{
                                if(res.status == 0){
                                    that.InputMaster['code'] = res.ref_code;
                                    that.dataSaveOutput.emit({data:that.InputMaster,column:that.row,i:that.i,j:that.j,k:that.k,event:that.event});
                                    that.close('yes');
                                }
                                else alert(res.message)
                          })
                    break;
                    case 'CAT_Goods_Group':
                        that.wMSCategoryService.cAT_Goods_Group_Action_By_Type(new CAT_Goods_Group_ENTITY(
                            {...that.InputMaster,type:'INSERT'}) as CAT_Goods_Group_ENTITY).subscribe(res=>{
                                if(res.status == 0){
                                    that.InputMaster['code'] = res.ref_code;
                                    that.dataSaveOutput.emit({data:that.InputMaster,column:that.row,i:that.i,j:that.j,k:that.k,event:that.event});
                                    that.close('yes');
                                }
                                else alert(res.message)
                          })
                    break;
                    case 'CAT_Goods_Unit':
                        that.wMSCategoryService.cAT_Goods_Unit_Action_By_Type(new CAT_Goods_Unit_ENTITY(
                            {...that.InputMaster,type:'INSERT'}) as CAT_Goods_Unit_ENTITY).subscribe(res=>{
                                if(res.status == 0){
                                    that.InputMaster['code'] = res.ref_code;
                                    that.dataSaveOutput.emit({data:that.InputMaster,column:that.row,i:that.i,j:that.j,k:that.k,event:that.event});
                                    that.close('yes');
                                }
                                else alert(res.message)
                          })
                    break;
                    case 'CAT_Goods_Serial':
                        that.wMSCategoryService.cAT_Goods_Serial_Insert(new CAT_Goods_Serial_ENTITY(
                            {...that.InputMaster}) as CAT_Goods_Serial_ENTITY).subscribe(res=>{
                                if(res.status == 0){
                                    that.InputMaster['code'] = res.ref_code;
                                    that.dataSaveOutput.emit({data:that.InputMaster,column:that.row,i:that.i,j:that.j,k:that.k,event:that.event});
                                    that.close('yes');
                                }
                                else alert(res.message)
                          })
                    break;
                    case 'CAT_Warehouse':
                        that.wMSCategoryService.cAT_Warehouse_Action_By_Type(new CAT_Warehouse_ENTITY(
                            {...that.InputMaster,type:'INSERT'}) as CAT_Warehouse_ENTITY).subscribe(res=>{
                                if(res.status == 0){
                                    that.InputMaster['code'] = res.ref_code;
                                    that.dataSaveOutput.emit({data:that.InputMaster,column:that.row,i:that.i,j:that.j,k:that.k,event:that.event});
                                    that.close('yes');
                                }
                                else alert(res.message)
                          })
                    break;
                    case 'CAT_Tax':
                        that.salesVATService.cAT_Tax_Insert(new CAT_Tax_ENTITY(
                            {...that.InputMaster}) as CAT_Tax_ENTITY).subscribe(res=>{
                                if(res.status == 0){
                                    that.InputMaster['code'] = res.ref_code;
                                    that.dataSaveOutput.emit({data:that.InputMaster,column:that.row,i:that.i,j:that.j,k:that.k,event:that.event});
                                    that.close('yes');
                                }
                                else alert(res.message)
                          })
                    break;
                    case 'CAT_Contract':
                        that.InputMaster['type'] = 'INSERT'
                        that.salesCategoryService.cAT_Contract_Action_By_Type(new CAT_Contract_ENTITY({...that.InputMaster}) as CAT_Contract_ENTITY).subscribe(res=>{
                            if(res.status == 0){
                                that.InputMaster['code'] = res.ref_code;
                                that.dataSaveOutput.emit({data:that.InputMaster,column:that.row,i:that.i,j:that.j,k:that.k,event:that.event});
                                that.close('yes');
                            }
                            else alert(res.message)
                        })
                    break;
                    case 'CAT_Profession':
                        that.InputMaster['type'] = 'INSERT'
                        that.consolidationCategoryService.cAT_Profession_Insert(new CAT_Profession_ENTITY(
                            {...that.InputMaster}) as CAT_Profession_ENTITY).subscribe(res=>{
                                if(res.status == 0){
                                    that.InputMaster['code'] = res.ref_code;
                                    that.dataSaveOutput.emit({data:that.InputMaster,column:that.row,i:that.i,j:that.j,k:that.k,event:that.event});
                                    that.close('yes');
                                }
                                else alert(res.message)
                          })
                    break;
                }
            },
        };
        this.closeButtonOptions = {
        text: 'Close',
        onClick(e) {
            that.close('yes')
        },
        };
      }
    public close(status) {
        if (status == 'yes') this.confirmOutput.emit();
        this.opened = false;
    }

    public open(column:SYS_GenRowTable_Detail=new SYS_GenRowTable_Detail(),i:number = -1,j:number = -1,k:number = -1) {
        this.tbName = column.droP_DOWN_TABLE;
        this.title = ''+column.name+' (Thêm Mới)';
        this.row = column;
        this.i = i;
        this.j = j;
        this.k = k;
        this.InputMaster = {};
        if(column.droP_DOWN_TABLE == 'CAT_Customer') this.InputMaster['code']='C'+this.generateRandomCustomerCode()
        if(!this.tables.includes(this.tbName))
        this.tables.push(this.tbName)
        this.opened = true;
    }
    public open2(e:any,i:number = -1,j:number = -1,k:number = -1) {
        this.event=e;
        var column=e.row
        this.tbName = column.droP_DOWN_TABLE;
        this.title = ''+column.name+' (Thêm Mới)';
        this.row = column;
        this.i = i;
        this.j = j;
        this.k = k;
        this.InputMaster = {};
        if(column.droP_DOWN_TABLE == 'CAT_Customer') this.InputMaster['code']='C'+this.generateRandomCustomerCode()
        if(!this.tables.includes(this.tbName))
            this.tables.push(this.tbName)
        this.opened = true;

    }
    onClickAcctionResponse(e:any): void {
        debugger
    }
    handleValueChanged(event: any) {
        this.InputMaster[event.dataField]= event.value;
    }
    generateRandomCustomerCode(): string {
        let result = '';
        for (let i = 0; i < 6; i++) {
          result += Math.floor(Math.random() * 10); // Generate a random digit (0-9)
        }
        return result;
      }
}
