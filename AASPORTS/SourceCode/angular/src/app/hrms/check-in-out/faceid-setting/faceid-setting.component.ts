import { Component, Injector, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { DeviceDetectorService } from 'ngx-device-detector';
import { HRM_TimeSheet_ENTITY, TimeSheetService } from 'src/app/shared/service-proxies/api-shared';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';
import { AppSession } from 'src/app/shared/app-session/app-session';
@Component({
  selector: 'app-faceid-setting',
  templateUrl: './faceid-setting.component.html',
  styleUrls: ['./faceid-setting.component.css']
})
export class FaceidSettingComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {
  deviceInfo = null;
  InputModel: HRM_TimeSheet_ENTITY = new HRM_TimeSheet_ENTITY();
  constructor(
    private injector: Injector,
    private deviceService: DeviceDetectorService,
    private appSession: AppSession,
    private timeSheetService: TimeSheetService
  ) {
    super(injector);
    this.deviceInfo = deviceService.getDeviceInfo();
    console.log(this.deviceInfo);
  }
  onAdd(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: any): void {
    throw new Error('Method not implemented.');
  }
  onDelete(item: any): void {
    throw new Error('Method not implemented.');
  }
  onApprove(item: any): void {
    throw new Error('Method not implemented.');
  }
  onViewDetail(item: any): void {
    throw new Error('Method not implemented.');
  }
  onSave(): void {
    throw new Error('Method not implemented.');
  }
  onSearch(): void {
    throw new Error('Method not implemented.');
  }
  onResetSearch(): void {
    throw new Error('Method not implemented.');
  }
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    throw new Error('Method not implemented.');
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }

  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }
  counterCheck: number = 0;
  message: string = '';
  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.InputModel = new HRM_TimeSheet_ENTITY();
    this.InputModel.base64 = webcamImage.imageAsDataUrl;
    this.InputModel.host = 'D:/SourceCode/ERP/RELEASE/core/ERP.Web/ERP.Web/bin/Release/netcoreapp3.1/';
    this.InputModel.company_code = 'OSoft';
    this.InputModel.employee_code = this.appSession.user.code;
    this.timeSheetService.checkInOut_FaceID_Setting(this.InputModel).subscribe(
      (data: any) => {
        this.InputModel = data[0];
        if (data['status'] == 0) {
          this.message = data['message'];
          this.toggleWebcam();
        }
        else if (data['status'] > 0 && this.counterCheck < 20) {
          this.triggerSnapshot(); this.counterCheck++;
          this.message = data['message'];
        } else this.showMessageError(data['message']);
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
}
