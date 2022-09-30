import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethods } from '../../../common/common.components';
import { GlobalComponent } from '../../../global/global.component';
import { TopicService } from '../topics/topics.service';
import { MomentModel } from './moments.model';
import { MomentService } from './moments.service';

@Component({
  selector: 'app-moments',
  templateUrl: './moments.component.html',
  styleUrls: ['./moments.component.css']
})
export class MomentsComponent implements OnInit {
  pageView:string="list";
  createEditValue:string = "";
  momentForm: FormGroup;
  submitted = false;
  public momentModel : MomentModel;
  constructor(private commonMethods: CommonMethods,private momentService: MomentService, private topicService: TopicService,private formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,public global: GlobalComponent) {
    this.commonMethods.dynamicBackgroundColorChange('default');
    this.momentModel = new MomentModel();
    this.getMomentType();
    this.getChannelList();
    this.getSentimentList();
    this.getFormValidate();
   }

  ngOnInit(): void {
    this.getMomentListDB();
  }
  
  getFormValidate(){
    this.momentForm = this.formBuilder.group({
      momentName: ['', Validators.required],
    });
  }

  get f() { return this.momentForm.controls; }

  createEditView(type , item){
    if(type == 'create'){
      this.pageView = 'createEdit';
      this.momentModel = new MomentModel();
      this.commonMethods.dynamicBackgroundColorChange('white');
      this.createEditValue = type;
    }
    else{
      this.momentModel = JSON.parse(JSON.stringify(item));
      this.pageView = 'createEdit';
      this.commonMethods.dynamicBackgroundColorChange('white');
      this.createEditValue = type;
    }
    
  }
  
  breadCrumbBack(){
    this.pageView = "list";
    this.momentModel = new MomentModel();
    this.commonMethods.dynamicBackgroundColorChange('default');
    this.momentForm.reset();
    this.submitted = false;
    this.timeErr = "";
    this.searchMomentName = "";
  }

  Cancel(){
    this.pageView = "list";
    this.commonMethods.dynamicBackgroundColorChange('default');
    this.momentModel = new MomentModel();
    this.momentForm.reset();
    this.submitted = false;
    this.timeErr = "";
    this.searchMomentName = "";
  }
  
  momentList:any = [];
  getMomentType(){
    this.momentService.getmomentTypes().subscribe(
      (data:any)=>{
        // console.log(data);
        this.momentList = data;
      }
    )
  }
  
  channelList:any = [];
  getChannelList(){
    let channel = [];
    this.topicService.getChannelDropDownList().subscribe(
      (data:any)=>{
        // console.log(data);
        channel = data.shift()
        // console.log(channel)
        this.channelList = data;
      }
    )
  }

  sentimentList:any = [];
  getSentimentList(){
    this.momentService.getSentimentType().subscribe(
      (data:any)=>{
        this.sentimentList = data;
      }
    )
  }
  
  addTextTags(text2: string) {
    if (text2) {
      let duplicate = false;
      this.momentModel.momentTags.forEach(item => {
        if (item == text2) {
          duplicate = true;
        }
      })
      if (!duplicate) {
        this.momentModel.momentTags.push(text2);
      } else {
        // this.alerts = "";
        // this.alerts = "Avoid entering same data";
        // this.commonMethods.addToastforlongtime(false, 'Avoid Entering Same Data');
      }
    }
  }

  deleteTags(txt: string) {
    const index: number = this.momentModel.momentTags.indexOf(txt);
    if (index !== -1) {
      this.momentModel.momentTags.splice(index, 1);
    }
  }
  
  saveMoment(){
    this.validateDetectionTime();
    this.submitted = true;
    if(this.momentForm.invalid || this.timeErr != ""){
      return;
    }
    else{
      // console.log(this.momentModel)
      if(this.momentModel.detectionTime_Type == 'absolute'){
        this.momentModel.relative_startTime = 0;
        this.momentModel.relative_endTime = 0;
      }
      if(this.momentModel.detectionTime_Type == 'relative'){
        this.momentModel.absolute_startTimeMinutes = 0;
        this.momentModel.absolute_startTimeSeconds = 0;
        this.momentModel.absolute_endTimeMinutes = 0;
        this.momentModel.absolute_endTimeSeconds = 0;
      }
      this.spinnerService.show();
      this.momentService.saveMoment(this.momentModel).subscribe(
        (data:any)=>{
          // console.log("save",data);
          this.submitted = false;
          this.momentForm.reset();
          this.momentModel = new MomentModel();
          this.pageView = 'list';
          this.getMomentListDB();
          this.commonMethods.dynamicBackgroundColorChange('default');
          this.commonMethods.addToastforlongtime(true, "Moment created");
          this.searchMomentName = "";
          this.spinnerService.hide();
        },
        (error)=>{
          console.log(error);
          this.spinnerService.hide();
          this.commonMethods.addToastforlongtime(false, error.error.error);
        }
      )
    }
  }

  updateMoment(){
    this.validateDetectionTime();
    this.submitted = true;
    if(this.momentForm.invalid || this.timeErr != ""){
      return;
    }
    else{
      // console.log(this.momentModel)
      if(this.momentModel.detectionTime_Type == 'absolute'){
        this.momentModel.relative_startTime = 0;
        this.momentModel.relative_endTime = 0;
      }
      if(this.momentModel.detectionTime_Type == 'relative'){
        this.momentModel.absolute_startTimeMinutes = 0;
        this.momentModel.absolute_startTimeSeconds = 0;
        this.momentModel.absolute_endTimeMinutes = 0;
        this.momentModel.absolute_endTimeSeconds = 0;
      }
      this.spinnerService.show();
      this.momentService.updateMoment(this.momentModel).subscribe(
        (data:any)=>{
          // console.log("update",data);
          this.submitted = false;
          this.momentForm.reset();
          this.pageView = 'list';
          this.momentModel = new MomentModel();
          this.getMomentListDB();
          this.commonMethods.dynamicBackgroundColorChange('default');
          this.commonMethods.addToastforlongtime(true, "Moment updated");
          this.searchMomentName = "";
          this.spinnerService.hide();
        },
        (error)=>{
          console.log(error);
          this.spinnerService.hide();
          this.commonMethods.addToastforlongtime(false, error.error.error);
         
        }
      )
    }
  }

  deleteMoment(){
    this.spinnerService.show();
    this.momentService.deleteMoment(this.momentModel).subscribe(
      (data:any)=>{
        // console.log("delete",data);
        this.momentModel = new MomentModel();
        this.pageView = 'list';
        this.getMomentListDB();
        this.commonMethods.dynamicBackgroundColorChange('default');
        this.spinnerService.hide();
        this.searchMomentName = "";
        this.commonMethods.addToastforlongtime(true, "Moment deleted");
      },
      (error)=>{
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error.error);
      }
    )
  }
  
  getList:any=[];
  tempAllList:any = [];
  getMomentListDB(){
    this.spinnerService.show();
    this.momentService.getMoment().subscribe(
      (data:any)=>{
        // console.log("Get",data);
        this.getList = data.Response;
        this.tempAllList = data.Response;
        this.commonMethods.dynamicBackgroundColorChange('default');
        this.spinnerService.hide();
      },
      (error)=>{
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      }
    )
  }
  
  timeErr:string = "";
  validateDetectionTime(){
    this.timeErr = ""
    if(this.momentModel.detectionTime_Type == 'relative'){
      if(this.momentModel.relative_endTime == 0){
        this.timeErr = "Detection end time will be minimum '1'";
      }
      else if(this.momentModel.relative_endTime > 100){
        this.timeErr = "Maximum detection end time will be '100%'";
      }
      else if(this.momentModel.relative_startTime > 99){
        this.timeErr = "Maximum detection start time will be '99%'";
      }
      else if(this.momentModel.relative_startTime == this.momentModel.relative_endTime){
        this.timeErr = "Detection start and end time cannot be equal";
      }
      else if(this.momentModel.relative_startTime > this.momentModel.relative_endTime){
        this.timeErr = "Detection start time must be less than end time";
      }
      else {
        this.timeErr = "";
      }
    }
    if(this.momentModel.detectionTime_Type == 'absolute'){
      let startTime = this.momentModel.absolute_startTimeMinutes+ "." + this.momentModel.absolute_startTimeSeconds;
      let endTime = this.momentModel.absolute_endTimeMinutes + "."+ this.momentModel.absolute_endTimeSeconds;
      // console.log(parseFloat(startTime),parseFloat(endTime))
      // console.log(typeof(parseFloat(startTime)),typeof(parseFloat(endTime)))
      let startValue = parseFloat(startTime);
      let endValue = parseFloat(endTime);

      if(startValue == 0 && endValue == 0){
        this.timeErr = "Detection end time will be minimum '1'";
      } 
      else if(startValue != 0 && endValue == 0){
        this.timeErr = "Detection start time must be less than end time";
      }
      else if(startValue != 0 && endValue != 0){
        if(startValue == endValue){
          this.timeErr = "Detection start and end time cannot be equal";
        }
        else if(startValue > endValue){
          this.timeErr = "Detection start time must be less than end time";
        }
        // else{
        //   this.timeErr = "";
        // }
      }
      else{
        this.timeErr = "";
      }
    }
  }
  
  keyPressFalse(event){
    // console.log(event)
    if(event.code.toLowerCase() == 'minus' || event.keyCode == 45 || event.charCode == 45 || event.keyCode == 101 || event.charCode == 101 || event.keyCode == 43 || event.charCode == 43 || event.keyCode == 46 || event.charCode == 46){
      event.preventDefault();
    }
    // return false;
  }

  toggleActiveMoment(item){
    this.momentService.momentActive({ momentActive: item.momentActive, momentId: item.momentId }).subscribe(
      (data:any)=>{
        // console.log("Active", data);
      },
      (error)=>{
        console.log(error);
        this.commonMethods.addToastforlongtime(false, error.error);
      }
    )
  }
  
  searchMomentName: string = "";
  searchMoment() {
    this.getList = this.tempAllList.filter(item => item.momentName.toLowerCase().includes(this.searchMomentName.toLowerCase()));
  }

  keyPressOption: boolean = false;
  async omit_special_char(event) {
    this.keyPressOption = true;
    var k;
    k = event.charCode;  
    if ((k > 32 && k < 45) || k == 47 || (k > 57 && k < 65) || (k > 90 && k < 95) || k == 96 || (k > 122 && k < 127)) {
      return await event.preventDefault();
    }
  }


  // RemoveSpecialCharacters(val) {
  //   if (val != null && val.length > 1 && !this.keyPressOption) {
  //     const res = val.replace(/[^a-zA-Z0-9--._-_ - ]/g, "");
  //     // setTimeout(() => {
  //       this.momentModel.momentName = res;
  //     // }, 50);
  //   }
  //   this.keyPressOption = false;
  // }

  onPaste(event) {
    if(event){
       const trimmedText = event.replace(/[`~!@#$%^&*()|+\=?;:%'",.<>\{\}\[\]\\\/]/gi, '');
       (<HTMLInputElement>document.getElementById('momentnameid')).value = trimmedText;
       this.momentModel.momentName= trimmedText
    }
}

}
