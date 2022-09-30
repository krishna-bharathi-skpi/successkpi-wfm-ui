import { Component, OnInit } from '@angular/core';
import { CommonMethods } from '../../../common/common.components';
import { DatePipe } from '../../../pipes/date.pipe';
import { topicDetectionService } from './topic-detection.service';
import { TopicDtModel } from './topic-detection.model';
import * as moment from 'moment';
import { GlobalComponent } from '../../../global/global.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-topic-detection',
  templateUrl: './topic-detection.component.html',
  styleUrls: ['./topic-detection.component.css']
})
export class TopicDetectionComponent implements OnInit {
  hoursDDL = [];
  jobTypDDL = [];
  cols = [];
  getJobTimer: any;
  tDetectModel:TopicDtModel;
  loading:boolean = false;
  constructor(private commonMethods: CommonMethods,private datePipe: DatePipe,
    private tDetectService: topicDetectionService, public global: GlobalComponent,private spinnerService: NgxSpinnerService) { 
    this.commonMethods.dynamicBackgroundColorChange('white'); 
    this.tDetectModel = new TopicDtModel();
    this.tableheader();

  }

  ngOnInit(): void {
    this.cols = [{ field: "jobId", header: "JobID" }, { field: "jobStartTime", header: "JobStartTime", type: this.datePipe, width: "18%"}, { field: "version", header: "Version"}, { field: "jobType", header: "JobType"}, { field: "startTime", header: "StartTime"}, { field: "endTime", header: "EndTime"}, { field: "status", header: "Status" }]
    this.getJobs();
    this.getJobTimer = setInterval((function () {
      this.getJobs()
    }).bind(this), 120000)

    this.jobType();
    this.jobHours();
  }
  
  // Get jobs
  jobList:any=[];
  getJobs(){
    this.spinnerService.show();
    this.tDetectService.getJobs().subscribe(
      (data:any)=>{
        // console.log(data);
        this.jobList = data;
        this.spinnerService.hide();
      },
      (error)=>{
        console.log(error);
        this.commonMethods.addToastforlongtime(false, error.error)
        this.spinnerService.hide();
      })
  }
  
  // create job
  
  createJobs(){
    
    if (this.jobList.length == 0 || this.jobList.length != 0 && this.jobList[0].status != "In progress"){
      let FromDate= moment(new Date(this.tDetectModel.fromDate)).format("MM/DD/YYYY");
      let fvDate = FromDate + 'T' + this.tDetectModel.fromHour;
      let ToDate = moment(new Date(this.tDetectModel.toDate)).format("MM/DD/YYYY");
      let tvDate = ToDate + 'T' + this.tDetectModel.toHour;
      let cT = moment(new Date).format("MM/DD/YYYYTHH");
      if (fvDate > cT || tvDate > cT) {
        
        this.commonMethods.addToastforlongtime(false,"Job date must be less than or equal to the current date");
      }
      else if(tvDate < fvDate){
        
        this.commonMethods.addToastforlongtime(false,"To date must be greater than From date");
      }
      else{
        this.loading = true;
        this.spinnerService.show();
      this.tDetectService.createJobs(this.tDetectModel).subscribe(
        (data:any)=>{
           
           this.tDetectModel = new TopicDtModel();
           this.getJobs();
           this.commonMethods.addToastforlongtime(true,"Job Created");
           this.loading = false;
           this.spinnerService.hide();
        },
        (error)=>{
          this.loading = false;
          console.log(error);
          this.spinnerService.hide();
          this.commonMethods.addToastforlongtime(false,error.error);
        })
      }
    }
    else{
      this.spinnerService.hide();
      this.commonMethods.addToastforlongtime(false,"Job already running. please wait until job complete");
    }
    
  }

  ngOnDestroy = () => {
    if (this.getJobTimer) {
      clearInterval(this.getJobTimer);
    }
  }
  
  tableheader(){
    
    this.tDetectService.tableheader().subscribe(
      (data:any)=>{
         
          this.cols = [{ field: "jobId", header: data[0].header }, { field: "jobStartTime", header: data[1].header, type: this.datePipe, width: "18%"}, { field: "version", header: data[2].header}, { field: "jobType", header: data[3].header}, { field: "startTime", header: data[4].header}, { field: "endTime", header: data[5].header}, { field: "status", header: data[6].header }]
        // this.cols = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  jobType(){
    this.tDetectService.jobType().subscribe(
      (data:any)=>{
        this.jobTypDDL = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  jobHours(){
    this.tDetectService.jobHours().subscribe(
      (data:any)=>{
        this.hoursDDL = data;
        // console.log(this.hoursDDL);
        
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
