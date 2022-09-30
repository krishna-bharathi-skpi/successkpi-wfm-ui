import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonMethods } from '../../../common/common.components';
import { GlobalComponent } from '../../../global/global.component';
import { ActionsService } from '../../playbooks/actions/actions.service';
import { DipositionCodingModel } from './disposition-coding.model';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { DispositionCodingService } from './disposition-coding.service';
import { ScheduleService } from '../../analyze/schedule-delivery/schedule-delivery.service';

@Component({
  selector: 'app-disposition-coding',
  templateUrl: './disposition-coding.component.html',
  styleUrls: ['./disposition-coding.component.css']
})
export class DispositionCodingComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  createEdit:string="";
  pageView:string = 'list';
  modelList:any = [];
  fromDate: Date;
  toDate: Date;
  modelForm: FormGroup;
  submitted = false;
  public dipositionCoding_model: DipositionCodingModel;
  isEvalFormDDL:boolean = false;
  isformExit:boolean = false;
  isModelnameEnable:boolean = false;
  EvalformDDL:any=[];
  maxModelLimit:number = 1000;

  constructor(public global: GlobalComponent,private formBuilder: FormBuilder,private commonMethods: CommonMethods,
     actionsService: ActionsService,private spinnerService: NgxSpinnerService, private dispCodingService: DispositionCodingService,
     private scheduleService: ScheduleService) { 
      this.getMaxLimit();
      this.commonMethods.dynamicBackgroundColorChange('default');
      // this.getEvalDDL();
      this.dipositionCoding_model = new DipositionCodingModel();
     }

  // ngOnInit(): void {
    ngOnInit() {
      this.modelForm = this.formBuilder.group({
        modelName: ['', Validators.required],
        // evaluationForm: ['', Validators.required]
      });
    this.fromDate = new Date();
    this.fromDate.setDate(this.fromDate.getDate() - 90)
    this.toDate = new Date();
    this.toDate.setDate(this.toDate.getDate() - 1)
    this.getDispositionCoding();
    // this.getFormValidate();
  }

  // getFormValidate(){
  //   this.modelForm = this.formBuilder.group({
  //     modelName: ['', [Validators.required]],
  //     evaluationForm: [['', Validators.required]]
  //   });
  // }

      // convenience getter for easy access to form fields
  // get f() { return this.modelForm.controls; }
  get f() { return this.modelForm.controls; }
  
  dataTableModel:any = [];
  ModelNameTxt:string= "";
  evalFromTxt:string = "";
  modelObj:any;
  modelDataSets(item){
    // console.log(item)
    this.dataTableModel = [];
    this.ModelNameTxt = "";
    this.evalFromTxt = "";
    this.modelObj = {};
    this.ModelNameTxt = item.modelName;
    this.evalFromTxt = item.evaluationForm;
    this.modelObj = item;
    this.pageView = 'editModel';
    this.commonMethods.dynamicBackgroundColorChange('white');
    this.dataTableModel = this.tempModelData.filter(s => (s.evaluationForm == item.evaluationForm && s.modelName == item.modelName));
  }

  breadcrumbBack(){
    this.pageView = 'list';
    this.commonMethods.dynamicBackgroundColorChange('default');
  }
  openModal(type,value){
    // console.log(this.modelList.length);
    // console.log(this.maxModelLimit);
    
    if( type == 'create'){
      if(this.modelList.length <  this.maxModelLimit){
        this.createEdit = type;
        document.getElementById('modalopen').click();
        this.submitted = false;
        this.modelForm.reset();
        this.dipositionCoding_model = new DipositionCodingModel();
        this.isEvalFormDDL = false;
        this.isformExit = false;
        this.isModelnameEnable = false;
        this.modelForm.controls['modelName'].enable();
        this.fromDate = new Date();
        this.fromDate.setDate(this.fromDate.getDate() - 90)
        this.toDate = new Date();
        this.toDate.setDate(this.toDate.getDate() - 1)
      }
      else{
        this.commonMethods.addToastforlongtime(false,"Maximum limit of training models reached. Please reach out to support@successkpi.com")
      }
    }
    else if(type == 'generate'){
      // console.log("Genrate",value)
      this.dipositionCoding_model = new DipositionCodingModel();
      this.createEdit = type;
      // this.dipositionCoding_model.modelName = value.modelName;
      // this.dipositionCoding_model.evaluationId = value.evaluationId;
      this.fromDate = new Date();
      this.fromDate.setDate(this.fromDate.getDate() - 90);
      this.toDate = new Date();
      this.toDate.setDate(this.toDate.getDate() - 1);
      this.submitted = false;
      this.isformExit = false;
      this.isEvalFormDDL = true;
      this.isModelnameEnable = true;
      this.modelForm.controls['modelName'].disable();
      document.getElementById('modalopen').click();
    }
    else{
      this.createEdit = type;
      this.dipositionCoding_model = JSON.parse(JSON.stringify(value));
      // console.log(this.dipositionCoding_model)
      this.fromDate = new Date(this.dipositionCoding_model.startDate);
      this.toDate = new Date(this.dipositionCoding_model.endDate);
      document.getElementById('modalopen').click();
      this.modelForm.controls['modelName'].enable();
      this.submitted = false;
      this.isformExit = false;
      this.isModelnameEnable = false;
      this.isEvalFormDDL = true;
    }
   
  }
 
  // getEvalDDL(){
  //   this.actionsService.getEvaluationItems().subscribe(
  //     (data:any)=>{
  //       this.EvalformDDL = data;
  //     }, (error) => {
  //       console.log(error.error)
  //       this.commonMethods.addToastforlongtime(false, error.error)
  //     })
  // }
  
  // Save model into DB
  saveModel(type){
    this.submitted = true;
    this.isformExit = false;
    if(type == 'create'){
    // console.log(this.isformExit);
    // if(this.modelList.modelList > 0){
    //     let filterVal = this.modelList.filter(s=> s.evaluationId == this.dipositionCoding_model.evaluationId);
    //     if(filterVal.length > 0){
    //       this.isformExit = true;
    //     }
    //     else{
    //       this.isformExit = false;
    //     }
    //   }
    }
    // console.log("this.isformExit");
    // console.log(this.isformExit);
    
    // if (this.modelForm.invalid || this.isformExit == true) {
      if (this.modelForm.invalid || this.isformExit) {
        // console.log("true");
        return;
    }
    else{
      // console.log("false");
      this.isformExit = false;
      // let formName = this.EvalformDDL.filter(s => s.value == this.dipositionCoding_model.evaluationId)[0].label;
      // this.dipositionCoding_model.evaluationForm = formName;
      this.dipositionCoding_model.startDate = moment(this.fromDate).format("MM/DD/YYYY");
      this.dipositionCoding_model.endDate = moment(this.toDate).format("MM/DD/YYYY");
      this.spinnerService.show();
      this.dispCodingService.saveDispositionCoding(this.dipositionCoding_model).subscribe(
        (data:any)=>{
          // console.log("save",data)
          this.submitted = false;
          this.modelForm.reset();
          this.dipositionCoding_model = new DipositionCodingModel();
          this.closebutton.nativeElement.click();
          this.pageView = 'list';
          this.getDispositionCoding();
          this.spinnerService.hide();
          this.isformExit = false;
          this.commonMethods.dynamicBackgroundColorChange('default');
          if(type == 'create'){
            this.commonMethods.addToastforlongtime(true,'Disposition Coding Scoring Created');
          }
          if(type == 'generate'){
            this.commonMethods.addToastforlongtime(true,'New version of model generated');
          }
        },
        (error)=>{
          console.log(error);
          this.spinnerService.hide();
          this.commonMethods.addToastforlongtime(false, error.error);
        }
      )
      
    }
  }
  
  // Update Model
  updateModel(){
    this.submitted = true;
    this.isformExit = false;
    if (this.modelForm.invalid) {
        return;
    }
    else{
      // let formName = this.EvalformDDL.filter(s => s.value == this.dipositionCoding_model.evaluationFormID)[0].label;
      // this.dipositionCoding_model.evaluationFormName = formName;
      this.dipositionCoding_model.startDate = moment(this.fromDate).format("MM/DD/YYYY");
      this.dipositionCoding_model.endDate = moment(this.toDate).format("MM/DD/YYYY");
      this.spinnerService.show();
      this.dispCodingService.updateDispositionCoding(this.dipositionCoding_model).subscribe(
        (data:any)=>{
          // console.log("update",data)
          this.submitted = false;
          this.modelForm.reset();
          this.dipositionCoding_model = new DipositionCodingModel();
          this.closebutton.nativeElement.click();
          this.pageView = 'list';
          this.getDispositionCoding();
          this.spinnerService.hide();
          this.isformExit = false;
          this.commonMethods.dynamicBackgroundColorChange('default');
          this.commonMethods.addToastforlongtime(true,'Disposition Coding Updated');
        },
        (error)=>{
          console.log(error);
          this.spinnerService.hide();
          this.commonMethods.addToastforlongtime(false, error.error);
        }
      )
    }
  }
  
  // Delete Model
  deleteModel(){
    this.commonMethods.addToastforlongtime(false,'Delete model is in progress');
    this.spinnerService.show();
    this.dispCodingService.deleteDispositionCoding(this.dipositionCoding_model).subscribe(
      (data:any)=>{
        this.dipositionCoding_model = new DipositionCodingModel();
        this.spinnerService.hide();
        this.getDispositionCoding();
        this.commonMethods.addToastforlongtime(true,'Disposition Coding deleted');
      },
      (error)=>{
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      }
    )
  }
  
  // Getlist of Disposition Coding from DB
  tempModelData:any = [];
  getDispositionCoding(){
    this.modelList = [];
    this.tempModelData = [];
    this.spinnerService.show(); 
      this.dispCodingService.getDispositionCoding().subscribe(
      (data:any)=>{
        // console.log(data)
        this.tempModelData = data;
        if(data.length >  0){
          // let arrList = data;
          // arrList.forEach(element => {
          //   let item = element['predictionEnabled'].toLowerCase();
          //   delete element['predictionEnabled']
          //   element.predictionEnabled = JSON.parse(item);
          // });
          // this.tempModelData = arrList;
          // this.modelList = data.filter((v,i,a)=>a.findIndex(t => (t.modelName == v.modelName && t.evaluationForm == v.evaluationForm))===i);
          this.modelList = data.filter((v,i,a)=>a.findIndex(t => (t.modelName == v.modelName && t.evaluationForm == v.evaluationForm))===i);
        }
        else{
          this.modelList = [];
        }
        this.spinnerService.hide();
      },
      (error)=>{
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      }
    )
  }
  
  cancel(){
    this.isEvalFormDDL = false;
    this.dipositionCoding_model = new DipositionCodingModel();
    this.submitted = false;
    this.modelForm.reset();
    this.isformExit = false;
  }
  
  // Get limit from Systemsetting table for Disposition Coding
  getMaxLimit() {
    this.scheduleService.getMaxScheduleLimit().subscribe(
      (data: any) => {
        // console.log(data);
        if(data['maxAIScoringModelLimit'] != undefined && data['maxAIScoringModelLimit'] != 0){
          // this.maxModelLimit = data['maxAIScoringModelLimit'];
          this.maxModelLimit = 1000;
        }
        else{
          this.maxModelLimit = 1000;
        }
      },
      (error) => {
        console.log(error);
        this.commonMethods.addToastforlongtime(false, error.error);
      })
  }

  modelResult(){
    this.commonMethods.addToastforlongtime(false, 'Training result are in progress');
  }
  
  confusionMatrix:any;
  showMetrix(event, defaultEvent, item){
    // console.log(typeof(item))
    this.confusionMatrix = {};
    if(typeof(item) == 'string'){
      if(item != undefined){
        let tempReplace = item.replace(/'/g,'"');
        this.confusionMatrix = JSON.parse(tempReplace);
        defaultEvent.show(event);
      }
      else{
        this.commonMethods.addToastforlongtime(false, "Training results are in progress");
        defaultEvent.hide(event); 
      }
      
    }
    else{
      if(item != undefined){
        this.confusionMatrix = JSON.parse(JSON.stringify(item));
        defaultEvent.show(event);
      }
      else{
        this.commonMethods.addToastforlongtime(false, "Training results are in progress");
        defaultEvent.hide(event);
      }
     
    }

  }

  makeActiveVersion(modelid,evalID,modelObj){
    let params={
      modelId: modelObj.modelId,
      // evaluationId: evalID
    }
    this.spinnerService.show();
    this.dispCodingService.makeActiveVersion(params).subscribe(  
      (data:any)=>{
        //  console.log(data);
        this.pageView = 'list';
        let str = "Model will be activated to" + " " + modelObj.modelName + " " + ":" + " " + "V_" + modelObj.modelId.split('_')[1];
        this.commonMethods.addToastforlongtime(true, str);
        this.getDispositionCoding();
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      }
    )
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
  //       this.dipositionCoding_model.modelName = res;
  //     // }, 50);
  //   }
  //   this.keyPressOption = false;
  // }

  onPaste(event) {
    if(event){
      const trimmedText = event.replace(/[`~!@#$%^&*()|+\=?;:%'",.<>\{\}\[\]\\\/]/gi, '');
      (<HTMLInputElement>document.getElementById('dispositionnameid')).value = trimmedText;
      this.dipositionCoding_model.modelName = trimmedText;
    }
  }

}
