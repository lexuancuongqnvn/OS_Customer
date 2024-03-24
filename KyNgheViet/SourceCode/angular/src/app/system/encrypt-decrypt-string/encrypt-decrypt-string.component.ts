import { Component, OnInit } from '@angular/core';
import { CRYPTModel, ToolService } from 'src/app/shared/service-proxies/api-shared';

@Component({
  selector: 'encrypt-decrypt-string',
  templateUrl: './encrypt-decrypt-string.component.html',
  styleUrls: ['./encrypt-decrypt-string.component.css']
})
export class EncryptDecryptStringComponent implements OnInit {

  constructor(
    private toolService:ToolService
  ) { }

  ngOnInit(): void {
  }
  InputModel:CRYPTModel = new CRYPTModel();
  public onClickEncrypt(){
    this.toolService.enCryptString(this.InputModel).subscribe((respond)=>{
      this.InputModel.textResult = respond.textResult;
    },
    (err) => {
        if (err.status == 401) {
          alert("Vui lòng đăng nhập lại.")
        }
    },
    () => {
    });
  }
  public onClickDecrypt(){
    this.toolService.deCryptString(this.InputModel).subscribe((respond)=>{
      this.InputModel.textResult = respond.textResult;
    },
    (err) => {
        if (err.status == 401) {
          alert("Vui lòng đăng nhập lại.")
        }
    },
    () => {
    });
  }
}
