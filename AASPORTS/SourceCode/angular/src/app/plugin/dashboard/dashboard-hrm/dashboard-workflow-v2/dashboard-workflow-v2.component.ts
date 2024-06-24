import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { HRM_Project_Management_Dashboard_Workflow_ENTITY, HRM_Project_Management_Report_Project_Percent_ENTITY, ProjectManagementService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
declare var renderBarChart;
declare var renderColumnChart;
declare var renderPieChartProject;
declare var renderColumnchart_material;
declare var RenderDataTableDashboardWorkFlow;
declare var renderSimpleBarChart;
declare var renderRoundedLineChart;
declare var renderStraightLinesChart;
declare var renderColouredBarsChart;
declare var renderPieChartTask;
@Component({
  selector: 'app-dashboard-workflow-v2',
  templateUrl: './dashboard-workflow-v2.component.html',
  styleUrls: ['./dashboard-workflow-v2.component.css']
})
export class DashboardWorkflowV2Component extends LayoutComponentBase implements OnInit {

  constructor(
    private injector: Injector,
    private projectManagementService:ProjectManagementService,
    private appSession: AppSession,
  ) { 
    super(injector);
  }
  @ViewChild('gridList') gridList: JqgridListComponent;

  InputModel:HRM_Project_Management_Dashboard_Workflow_ENTITY = new HRM_Project_Management_Dashboard_Workflow_ENTITY();
  
  tbName: string = 'Department';
  pie_chart_project_name: string = '';
  CurrenFrom:string = EditPageState.view;
  arr_color:any[]=['#FF721C','#FFEE1C','#BEFF1C','#23FF1C','#1CFFBE','#1CFFF1','#1CC1FF','#1F1CFF','#6B1CFF','#9F1CFF','#FF1CCB','#FF1C2A','#922B21','#4A235A','#1B4F72','#0E6251','#145A32','#7D6608','#784212','#7B7D7D','#17202A','#17202A'];
  col_model:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Tên dự án', name: 'name', width: 25 },
    { label: 'Người duyệt worktime', name: 'allow_approve_worktime_name', width: 10 }
  ]
  //=====================================================================
  dataJSON_proj = [
    ['', 'Tỉ lệ hoàn thành (%)'],
  ]
  options_proj: object = {
    title: '',
    legend: {
      position: 'top',
      maxLines: 3
    },
    chartArea: {
      width: '75%'
    },
    hAxis: {
      title: 'Tiến độ của các dự án chưa hoàn thành',
      minValue: 0
    },
    vAxis: {
      title: ''
    },
    height: 400,
    bar: {
      groupWidth: "75%"
    },
    colors: ['#4caf50']
  };
  //=====================================================================
  dataJSON_proj_type = [
    ['', 'Đã hoàn thành', 'Đang hoàn thành', 'Mới', {
      role: 'style'
    }]
  ]
   //Begin department=====================================================================
  dataJSON_department_sub = [
    ['', 'Phòng ban 1', 'Phòng ban 2', 'Phòng ban 3'],
    ['Dự án 1', 10, 24, 20],
    ['Dự án 2', 16, 22, 23],
    ['Dự án 3', 28, 19, 29]
  ]
  options_proj_department: object = {
    height: 450,
    legend: {
      position: 'top',
      maxLines: 3
    },
    chartArea: {
      width: '85%'
    },
    bar: {
      groupWidth: '85%'
    },
    hAxis: {
      title: 'Biểu đồ trạng thái công việc',
      minValue: 0
    },
    tooltip: {isHtml: true},
    isStacked: true,
  };
  //End department=====================================================================
 
  //=====================================================================
  options_proj_sub: object = {
    height: 400,
    legend: {
      position: 'top',
      maxLines: 3
    },
    chartArea: {
      width: '85%'
    },
    bar: {
      groupWidth: '85%'
    },
    hAxis: {
      title: 'Biểu đồ trạng thái công việc',
      minValue: 0
    },
    isStacked: true,
    colors: ['#00D631', '#FF721C', '#0065D6'],
  };

//=====================================================================
  dataLine:any =[
    ['Year','Mới', 'Đang hoàn thành', 'Đã hoàn thành'],
    ['11/04/2022', 2, 10,20],
    ['12/04/2022', 1170, 460,422],
    ['13/04/2022', 660, 1120,522],
    ['14/04/2022', 660, 1120,522],
    ['15/04/2022', 660, 1120,522],
    ['16/04/2022', 660, 1120,522],
    ['17/04/2022', 660, 1120,522]
  ];

  optionsLine:any = {
    height: 450,
    curveType: 'function',
    legend: {
        position: 'none'
    },
    chartArea: {
      width: '100%'
    },
    hAxis: {
      title: 'Tiến độ công việc trong tuần',
      minValue: 0
    },
    colors: [ '#0065D6','#FF721C', '#00D631']
  };
//=====================================================================
//=====================================================================

//=====================================================================
  ngOnInit(): void {
    this.initLoadData();
    document.getElementsByClassName('content')[0]['style'].setProperty('background-color', '#e9e9e93b', 'important');
    document.getElementsByClassName('content')[1]['style'].setProperty('background-color', '#e9e9e93b', 'important');
  }
  getColor(i:number):string{
    return 'color:'+ this.arr_color[i];
  }
  initLoadData(){
    this.InputModel = new HRM_Project_Management_Dashboard_Workflow_ENTITY();
    this.InputModel.account_code = this.appSession.user.code;
        this.projectManagementService.hRM_Project_Management_Dashboard_Workflow_Search(this.InputModel).subscribe((respond)=>{
          this.InputModel = respond;
          this.UpdateView();
          RenderDataTableDashboardWorkFlow();
          renderSimpleBarChart(null,this.InputModel.task_month);
          renderRoundedLineChart(null,this.InputModel.task_week);
          renderStraightLinesChart(this.InputModel.task_day.labels,this.InputModel.task_day.series);
          renderColouredBarsChart(this.InputModel.task_department);
          renderPieChartTask(this.InputModel.task_department_pie);
          this.PieChartProject(this.InputModel.list_projects[0])
        },
        (err) => {
            if (err.status == 401) {
              this.Respond401();
            }
        },
        () => {
          this.UnBlockUI();
        });
  }
  PieChartProject(proj:any){
    let inprogress = ((proj.inprogress_i/proj.total_i)*100).toFixed(2);
    let done = ((proj.done_i/proj.total_i)*100).toFixed(2);
    let news = ((proj.new_i/proj.total_i)*100).toFixed(2);
    this.pie_chart_project_name = proj.name;
    renderPieChartProject([news+'%', done+'%', inprogress+'%'],[news, done,inprogress ]);
  }
  loadProject(){
    this.InputModel = new HRM_Project_Management_Report_Project_Percent_ENTITY();
    this.InputModel.account_code = this.appSession.user.code;
        this.projectManagementService.hRM_Project_Management_Report_Project_Percent_Search(this.InputModel).subscribe((respond)=>{
          this.renderDataProjectPercent(respond.hRM_Project_Managements)
          this.renderDataProjectByType(respond.hRM_Project_Managements)
          renderColumnchart_material(respond.arr_data_progress_in_week, this.optionsLine, 'chart_div_dep_sub');
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
  }
  renderDataProjectPercent(data:any[]){
    data.forEach(d=>{
      if(d.total_i >0)
      this.dataJSON_proj.push([
        d.name,
        d.done_percent
      ]);
    })
    renderBarChart(this.dataJSON_proj, this.options_proj, 'chart_div_proj');
  }
  renderDataProjectByType(data:any[]){
    data.forEach(d=>{
      if(d.total_i >0)
      this.dataJSON_proj_type.push([
        d.name,
        d.done_i,
        d.inprogress_i,
        d.new_i,
        ''
      ]);
    })
    renderColumnChart(this.dataJSON_proj_type, this.options_proj_sub, 'chart_div_proj_sub');
  }

  hidenProj_Dep(){
    $('#div_Proj_Dep').hide('slow')
  }

}
