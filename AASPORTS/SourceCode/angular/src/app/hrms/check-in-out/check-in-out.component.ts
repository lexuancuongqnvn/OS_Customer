import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { DeviceDetectorService } from 'ngx-device-detector';
import { EmployeeService, FaceAPIService, HRM_BranchService, HRM_Branch_ENTITY, HRM_Employee_Check_In_Out_ENTITY, HRM_Employee_ENTITY, HRM_Timesheet_Employee_Mission_Allowance_ENTITY, HRM_TimeSheet_ENTITY, HRM_TimeSheet_Work_Shift_ENTITY, TimeSheetService } from 'src/app/shared/service-proxies/api-shared';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import moment from 'moment';
declare var check_distance;declare var faceapi;declare var getFaceDetectorOptions;
@Component({
  selector: 'app-check-in-out',
  templateUrl: './check-in-out.component.html',
  styleUrls: ['./check-in-out.component.css']
})
export class CheckInOutComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {
  deviceInfo = null;
  InputModel: HRM_Employee_Check_In_Out_ENTITY = new HRM_Employee_Check_In_Out_ENTITY();
  filterInput: HRM_Employee_Check_In_Out_ENTITY = new HRM_Employee_Check_In_Out_ENTITY();
  listWorkShift:HRM_TimeSheet_Work_Shift_ENTITY[] = [];

  constructor(
    private injector: Injector,
    private deviceService: DeviceDetectorService,
    private employeeService:EmployeeService,
    private appSession: AppSession,
    private branchService:HRM_BranchService,
    private faceAPIService:FaceAPIService,
    private timeSheetService:TimeSheetService
  ) {
    super(injector);
    this.deviceInfo = deviceService.getDeviceInfo();
    console.log(this.deviceInfo);
    this.latitude_co = 10.82852160;
    this.longitude_co = 106.67943160;
  }
  title: string = 'Chấm công';
  btntitle: string = 'Chấm công';
  latitude: number;
  longitude: number;
  latitude_co: number = 10.82852160;
  longitude_co: number = 106.67943160;
  zoom:number;
  distance:number;
  distancemax:number=1;
  employeeModel:HRM_Employee_ENTITY = new HRM_Employee_ENTITY();
  listBranch:HRM_Branch_ENTITY[]=[];
  actionBtn:boolean = true;
  isMission:boolean = false;
  isSettingFace:boolean = false;
  missionaddress:string = '';
  gif_checkin:string='#';
  listImgTraining:any[]=[{
    right:'../../../assets/img/faces/Right.jpg',
    left:'../../../assets/img/faces/Left.jpg',
    top:'../../../assets/img/faces/Top.jpg',
    bottom:'../../../assets/img/faces/Bottom.jpg',
    center:'../../../assets/img/faces/Center.jpg'
  },
  {
    right:false,
    left:false,
    top:false,
    bottom:false,
    center:false
  }]
  currentFace:string = 'left';
  random:number = Math.random();
  @ViewChild('SelectBranchPicker') SelectBranchPicker: InputSelectComponentV2;
  @ViewChild('SelectWSPicker') SelectWSPicker: InputSelectComponentV2;
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 25;
        this.calculateDistance();
      });
    }
  }
  public get videoOptions(): MediaTrackConstraints {
      const result: MediaTrackConstraints = 
        {
          width:{min:255,max:256,ideal:1920},
          height:{min:255,max:256,ideal:1080}
      };
    return result;
  }
  public get isShowTraining():boolean{
    return this.listImgTraining[1].left && this.listImgTraining[1].right && this.listImgTraining[1].bottom && this.listImgTraining[1].top;
  }
  calculateDistance() {
    this.distance = parseInt(this.asTheCrowFlies(this.latitude_co, this.longitude_co,this.latitude, this.longitude).toString());
  }
  onClickSetting(v:boolean){
    this.random = Math.random();
    this.isSettingFace = v;
    this.UpdateView();
  }
  asTheCrowFlies(x1: number, y1: number, x2: number, y2: number) :number{
    var result = 0;
    const RADIANS: number = 180 / 3.14159265;
    const METRES_IN_MILE: number = 1609.34;
    
    if (x1 == x2 && y1 == y2) {
      result = 0;
    
    } else {
      // Calculating Distance between Points
      var lt1 = x1 / RADIANS;
      var lg1 = y1 / RADIANS;
      var lt2 = x2 / RADIANS;
      var lg2 = y2 / RADIANS;
    
      // radius of earth in miles (3,958.8) * metres in a mile * position on surface of sphere...
      result = (3958.8 * METRES_IN_MILE) * Math.acos(Math.sin(lt1) * Math.sin(lt2) + Math.cos(lt1) * Math.cos(lt2) * Math.cos(lg2 - lg1));
    }
    return result; 
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
  radius = 2;
  radiusLat = 0;
  radiusLong = 0;
  maxLength:number = 50;
  max_dif_face:number = 0.25;
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  public ngOnInit(): void {
    if(this.deviceInfo.deviceType == 'mobile'){
      WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
      // var p2 = new HRM_Employee_Check_In_Out_ENTITY();
      // p2.employee_code = this.appSession.user.code;
      // p2.type = 'CHECKIN-OUT';
      // this.employeeService.hRM_Employee_Check_In_Out_Search(p2).subscribe(
      //   (data: HRM_Employee_Check_In_Out_ENTITY[]) => {
      //     if(data.length > 0){
      //       if(data[0].check_in != '+++')this.btntitle = 'Ra ca';
      //     }else this.btntitle = 'Vào ca';
      //     this.UpdateView();
      //   },
      //   (err) => this.UnBlockUI(),
      //   () => {
      //     this.UnBlockUI();
      //   }
      // )
      this.LoadFaceTraining();
      this.setCurrentLocation();
      this.initCombobox();
      this.LoadMissionAllowance();
      this.employeeModel.branch_code = this.appSession.user.branch;
    }
  }
  onSelect(v:string,col:string){
    this.InputModel[col] = v;
    try{
      let current_co = this.listBranch.find(e=>e.code ==v);
      this.latitude_co = current_co.lat;
      this.longitude_co = current_co.long;
      this.maxLength = current_co.distance;
      this.max_dif_face = current_co.max_dif_face/100;
    }catch{}
    this.setCurrentLocation();
  }
  onSelectWS(v:string,col:string){
    this.InputModel.work_shift_code= v;
    this.InputModel.work_shift_name_in= this.listWorkShift.find(e=>e.code==v).name;
  }
  initCombobox(){
    let p = new HRM_Branch_ENTITY();
    this.branchService.hRM_Branch_Search(p).subscribe((respond)=>{
      this.listBranch = respond;
      this.SelectBranchPicker.setList(respond);
      setTimeout(() => {
        this.InputModel.branch_code = this.appSession.user.branch;
      }, 500);
      let current_co = this.listBranch.find(e=>e.code == this.appSession.user.branch);
      if(!current_co)this.showMessageError("Không tìm thấy bạn trong phòng ban nào")
      this.latitude_co = current_co.lat;
      this.longitude_co = current_co.long;
      this.maxLength = current_co.distance;
      this.max_dif_face = current_co.max_dif_face/100;
      this.UpdateView();
    },
    (err) => {
        if (err.status == 401) {
          this.Respond401();
        }
    },
    () => {
      this.UnBlockUI();
    });
    this.timeSheetService.hRM_TimeSheet_Work_Shift_Search({
        ...new HRM_TimeSheet_Work_Shift_ENTITY(), type: 'FOR_CHECKIN', employee_code: this.appSession.user.code
    } as HRM_TimeSheet_Work_Shift_ENTITY).subscribe((res: HRM_TimeSheet_Work_Shift_ENTITY[]) => {
        if (res.length > 0) {
          this.InputModel.work_shift_code = res[0].code;
          this.InputModel.work_shift_name_in = res[0].name;
          this.SelectWSPicker.value = this.InputModel.work_shift_code;
          this.SelectWSPicker.setList(res);
        }
        this.listWorkShift = res;
    })
    // this.employeeService.hRM_Employee_Search({...new HRM_Employee_ENTITY(),code:this.appSession.user.code,type:'base64'} as HRM_Employee_ENTITY).subscribe(res=>{
    //   this.employeeModel.avarta_base64_256x256 = res[0].avarta_base64_256x256;
    //   this.UpdateView();
    // })
  }
  get showbtncheck():boolean{
    return (this.distance <= this.maxLength || 
      this.isMission || 
      this.appSession.user.username.toUpperCase() == 'ADMIN' || 
      this.appSession.user.username.toUpperCase() == 'CEO' || 
      this.appSession.user.username.toUpperCase() == 'ROOT') &&
      this.InputModel.branch_code !== '' &&
      this.InputModel.branch_code !== undefined  &&
      this.InputModel.branch_code !== null
  }
  public triggerSnapshot(): void {
    if(this.isSettingFace)//cài đặt
    {
      this.trigger.next();
    }else{
      this.actionBtn =false;
      this.setCurrentLocation();
      if(!this.showbtncheck)
      {
        this.showMessageError('Vị trí chấm công không hợp lệ');
      }else {
        this.trigger.next();
      }
    }
    
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
  radiusDragEnd($event: any) {
    // console.log($event);
    this.radiusLat = $event.coords.lat;
    this.radiusLong = $event.coords.lng;
    this.showHideMarkers();
  }

  event(type,$event) {
    // console.log(type,$event);
    this.radius = $event;
    this.showHideMarkers();
  }
  showHideMarkers(){
    // Object.values(this.markers).forEach(value => {
    //   value.isShown = this.getDistanceBetween(value.lat,value.lng,this.radiusLat,this.radiusLong);
    // });
  }
  setCurrentFace(loc:string){
    this.currentFace = loc;
    this.UpdateView();
  }
  counterCheck: number = 0;
  message: string = '';  
  message_checkin: string = '';
  status_checkin:number = -1;
  count_check:number = 1;
  public async handleImage(webcamImage: WebcamImage): Promise<void> {
    // console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;

    let pr_checkin = new HRM_Employee_Check_In_Out_ENTITY();
    pr_checkin.employee_code=this.appSession.user.code;
    pr_checkin.base64 = webcamImage.imageAsDataUrl;
    var my_face = document.getElementById('face1');
    my_face['src'] = pr_checkin.base64;

    if(this.isSettingFace){
      const detections = await faceapi.detectAllFaces(my_face, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      if (!detections.length) {
          this.showMessageWarning('Khuôn mặt không xác định ' + this.currentFace);
          this.UnBlockUI();
          return;
      }
      this.listImgTraining[0][this.currentFace] = pr_checkin.base64;
      this.InputModel.hRM_Employee_Check_In_Out_Image_Trainings[this.currentFace] = pr_checkin.base64;
      $('.webcam-wrapper video').css('border-'+this.currentFace,'15px solid #658d1b')
      
      switch(this.currentFace){
        case 'left':
          this.listImgTraining[1]['left'] = true;
          this.currentFace = 'top';
          this.setCurrentFace('top');  
        break;
        case 'top':
          this.listImgTraining[1]['top'] = true;
          this.currentFace = 'right';
          this.setCurrentFace('right');  
        break;
        case 'right':
          this.listImgTraining[1]['right'] = true;
          this.currentFace = 'bottom';
          this.setCurrentFace('bottom');  
        break;
        case 'bottom':
          this.listImgTraining[1]['bottom'] = true;
        break;
      }
      this.UpdateView();
      this.UnBlockUI();
      return;
    }
    try{
      $('.webcam-wrapper video').css('border-right','15px solid #658d1b')
      setTimeout(function(){$('.webcam-wrapper video').css('border-bottom','15px solid #658d1b')},500)
      setTimeout(function(){$('.webcam-wrapper video').css('border-left','15px solid #658d1b')},1000)
      setTimeout(function(){$('.webcam-wrapper video').css('border-top','15px solid #658d1b')},2000)
    }catch{}
    // this.InputModel = new HRM_Employee_Check_In_Out_ENTITY();
    this.InputModel.base64 = pr_checkin.base64;
    this.InputModel.device_id = this.deviceId;
    this.InputModel.employee_code = this.appSession.user.code;
    this.InputModel.latitude = this.latitude;
    this.InputModel.longitude = this.longitude;
   
    var check_face = document.getElementById('face2');
    let distance = 1;
  
    let numberface = 1;
    while(distance > this.max_dif_face && numberface<=4){
      try{
        switch(this.currentFace){
          case 'left':
            check_face['src'] = this.InputModel.hRM_Employee_Check_In_Out_Image_Trainings.left_base64;
            this.currentFace = 'top';  
          break;
          case 'top':
            check_face['src'] = this.InputModel.hRM_Employee_Check_In_Out_Image_Trainings.top_base64;
            this.currentFace = 'right';
          break;
          case 'right':
            check_face['src'] = this.InputModel.hRM_Employee_Check_In_Out_Image_Trainings.right_base64;
            this.currentFace = 'bottom';  
          break;
          case 'bottom':
            check_face['src'] = this.InputModel.hRM_Employee_Check_In_Out_Image_Trainings.bottom_base64;
          break;
        }
        numberface++;
        let options = new faceapi.TinyFaceDetectorOptions()
  
        let detections = await faceapi.detectAllFaces(my_face, options)
        let faceImages = await faceapi.extractFaces(my_face, detections)
        //$('.croper').append(faceImages[0])
        // if(faceImages.length == 0) numberface=5;
        const descriptor = await faceapi.computeFaceDescriptor(faceImages[0]);
  
        detections = await faceapi.detectAllFaces(check_face, options)
        faceImages = await faceapi.extractFaces(check_face, detections)
        //$('.croper').append(faceImages[0])
  
        const descriptor_train = await faceapi.computeFaceDescriptor(faceImages[0]);
        distance = faceapi.utils.round(
            faceapi.euclideanDistance(descriptor, descriptor_train)
        )
        this.InputModel.base64 = pr_checkin.base64;
        // if(this.count_check%4 == 0 && this.count_check < 16 && distance > max_dif){
        //   $('.croper').empty()
        //   this.currentFace = 'left';  
        //   this.triggerSnapshot();
        // }
        this.count_check++;
      }catch{
        this.UnBlockUI();
        //this.showMessageError("Khuôn mặt không xác định");
      }
    }
    
    if(distance <= this.max_dif_face){
      this.InputModel.status_checkin = 0;
      this.InputModel.percent_success = distance;
      this.setCurrentLocation();
      if(!this.showbtncheck)
      {
        this.showMessageError('Vị trí chấm công không hợp lệ');
        return;
      }
      this.employeeService.hRM_Employee_Check_In_Out_Insert(this.InputModel).subscribe(
        (data: any) => {
          this.gif_checkin = '../../../assets/img/gif/checkin-success.gif'
          if (data['status'] == 0) {
            this.message = data['message']  ;
            this.status_checkin = 0;
            this.toggleWebcam();
          }
          else if (data['status'] > 0 && this.counterCheck < 20) {
            this.triggerSnapshot(); this.counterCheck++;
            this.message = data['message'];
          } else this.showMessageError('Chấm công thất bại');
          this.UnBlockUI();
          this.UpdateView();
        },
        (err) => this.UnBlockUI(),
        () => {
          this.UnBlockUI();
        }
      )
    }else{
      if(distance < this.distancemax) 
        this.distancemax = distance;
      // this.message = 'Di chuyển khuôn mặt '+parsent+'%';
      if(this.count_check > 0){
        this.message = 'Chấm công thất bại';
        this.gif_checkin = '';
        this.status_checkin = -1;
        this.InputModel.status_checkin = distance?distance:-1;
        this.toggleWebcam();
        this.setCurrentLocation();
        if(!this.showbtncheck)
        {
          this.showMessageError('Vị trí chấm công không hợp lệ');
          return;
        }
        this.employeeService.hRM_Employee_Check_In_Out_Insert(this.InputModel).subscribe(
          (data: any) => {
            this.UpdateView();
          },
          (err) => this.UnBlockUI(),
          () => {
            this.UnBlockUI();
          }
        )
        return;
      }
    }
    this.UnBlockUI();
  }
  SaveFaceTraing(){
    this.faceAPIService.hRM_Employee_Check_In_Out_Save_Setting(this.InputModel).subscribe((res:HRM_Employee_Check_In_Out_ENTITY)=>{
      if(res.status == 0){
        this.showMessageSuccess('Cập nhật thành công');
        this.onClickSetting(false);
        location.reload()
      }else{
        this.showMessageError('Cập nhật thất bại');
      }
    })
  }
  LoadFaceTraining(){
    this.BlockUI();
    this.filterInput.employee_code = this.appSession.user.code;
    this.employeeService.hRM_Employee_Check_In_Out_Face_Training_Search(this.filterInput).subscribe(
      (data: HRM_Employee_Check_In_Out_ENTITY) => {
        this.InputModel = data;
        if(data.status == 1){
          this.InputModel.hRM_Employee_Check_In_Out_Image_Trainings.left = this.listImgTraining[0].left;
          this.InputModel.hRM_Employee_Check_In_Out_Image_Trainings.right = this.listImgTraining[0].right;
          this.InputModel.hRM_Employee_Check_In_Out_Image_Trainings.top = this.listImgTraining[0].top;
          this.InputModel.hRM_Employee_Check_In_Out_Image_Trainings.bottom = this.listImgTraining[0].bottom;
          this.InputModel.hRM_Employee_Check_In_Out_Image_Trainings.center = this.listImgTraining[0].center;
          setTimeout(() => {
            this.onClickSetting(true);
          }, 500);
        }else{
          this.InputModel.hRM_Employee_Check_In_Out_Image_Trainings.left += '?v='+this.random;
          this.InputModel.hRM_Employee_Check_In_Out_Image_Trainings.right += '?v='+this.random;
          this.InputModel.hRM_Employee_Check_In_Out_Image_Trainings.top += '?v='+this.random;
          this.InputModel.hRM_Employee_Check_In_Out_Image_Trainings.bottom += '?v='+this.random;
          this.InputModel.hRM_Employee_Check_In_Out_Image_Trainings.center += '?v='+this.random;
        }
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  public cameraWasSwitched(deviceId: string): void {
    // console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
  LoadMissionAllowance(){
    var pr = new HRM_Timesheet_Employee_Mission_Allowance_ENTITY();
    pr.login_account = this.appSession.user.code;
    pr.type = '1';
    pr.start_datetime = moment().set('date',15);
    this.timeSheetService.hRM_Timesheet_Employee_Mission_Allowance_Search(pr).subscribe(
      (data: HRM_Timesheet_Employee_Mission_Allowance_ENTITY[]) => {
        data.forEach(check=>{
          if(check.is_mission) {
            this.isMission = true;
            this.missionaddress = 'Chấm công được ghi nhận từ địa điểm công tác <b>'+ check.address+'</b>';
          }
          this.UpdateView();
        })
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  settingFaceID() {
    this.navigatePassParam('/check-in-out/faceid-setting', { code: this.idSelect }, { filterInput: JSON.stringify(this.InputModel) });
  }

}
