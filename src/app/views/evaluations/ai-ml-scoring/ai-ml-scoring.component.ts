import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethods } from '../../../common/common.components';
import { ActionsService } from '../../playbooks/actions/actions.service';
import { AIMLModel } from './ai-ml-scoring.model';
import { AIMLService } from './ai-ml-scoring.service';
import * as moment from 'moment';
import { GlobalComponent } from '../../../global/global.component';
import { ScheduleService } from '../../analyze/schedule-delivery/schedule-delivery.service';

@Component({
  selector: 'app-ai-ml-scoring',
  templateUrl: './ai-ml-scoring.component.html',
  styleUrls: ['./ai-ml-scoring.component.css']
})
export class AiMlScoringComponent implements OnInit {
  modelList:any = [];
  createEdit:string="";
  public aiMl_model: AIMLModel;
  modelForm: FormGroup;
  submitted = false;
  fromDate: Date;
  toDate: Date;
  isEvalFormDDL:boolean = false;
  maxModelLimit:number = 2;
  pageView:string = 'list'
  @ViewChild('closebutton') closebutton;
  constructor(private actionsService: ActionsService,private commonMethods: CommonMethods,private formBuilder: FormBuilder
    ,private aiMlService: AIMLService,private spinnerService: NgxSpinnerService,public global: GlobalComponent,private scheduleService: ScheduleService) { 
      this.getMaxLimit();
      this.commonMethods.dynamicBackgroundColorChange('default');
      this.getEvalDDL();
      this.getFormValidate();
      this.aiMl_model = new AIMLModel();
    }

  ngOnInit(): void {
    // this.modelList= [
    //   {
    //     modelName: "Auto QM Scoring",
    //     evaluationForm: "QM Monitoring Form",
    //     createdAt: "05/26/2021 8:15",
    //     lastTrainingDate: "05/30/2021 8:15",
    //     startDate: "05/26/2021",
    //     endDate: "05/30/2021",
    //     modelStatus: "Accepted",
    //     predictionEnabled: "true"
    //   }
    // ]
    this.fromDate = new Date();
    this.fromDate.setDate(this.fromDate.getDate() - 90)
    this.toDate = new Date();
    this.toDate.setDate(this.toDate.getDate() - 1)
    this.getAIMLFromDB();
  }
  
  getFormValidate(){
    this.modelForm = this.formBuilder.group({
      modelName: ['', Validators.required],
      evaluationForm: ['', Validators.required]
    });
  }

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
  isModelnameEnable:boolean = false;
  openModal(type,value){
    if( type == 'create'){
      if(this.modelList.length <  this.maxModelLimit){
        this.createEdit = type;
        document.getElementById('modalopen').click();
        this.submitted = false;
        this.modelForm.reset();
        this.aiMl_model = new AIMLModel();
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
      this.aiMl_model = new AIMLModel();
      this.createEdit = type;
      this.aiMl_model.modelName = value.modelName;
      this.aiMl_model.evaluationId = value.evaluationId;
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
      this.aiMl_model = JSON.parse(JSON.stringify(value));
      // console.log(this.aiMl_model)
      this.fromDate = new Date(this.aiMl_model.startDate);
      this.toDate = new Date(this.aiMl_model.endDate);
      document.getElementById('modalopen').click();
      this.modelForm.controls['modelName'].enable();
      this.submitted = false;
      this.isformExit = false;
      this.isModelnameEnable = false;
      this.isEvalFormDDL = true;
    }
   
  }
 
  EvalformDDL:any=[]
  getEvalDDL(){
    this.actionsService.getEvaluationItems().subscribe(
      (data:any)=>{
        this.EvalformDDL = data;
      }, (error) => {
        console.log(error.error)
        this.commonMethods.addToastforlongtime(false, error.error)
      })
  }
  
  // Save model into DB
  isformExit:boolean = false;
  saveModel(type){
    this.submitted = true;
    this.isformExit = false;
    if(type == 'create'){
      if(this.modelList.length > 0){
        let filterVal = this.modelList.filter(s=> s.evaluationId == this.aiMl_model.evaluationId);
        if(filterVal.length > 0){
          this.isformExit = true;
        }
        else{
          this.isformExit = false;
        }
      }
    }
    
    if (this.modelForm.invalid || this.isformExit == true) {
        return;
    }
    else{
      this.isformExit = false;
      let formName = this.EvalformDDL.filter(s => s.value == this.aiMl_model.evaluationId)[0].label;
      this.aiMl_model.evaluationForm = formName;
      this.aiMl_model.startDate = moment(this.fromDate).format("MM/DD/YYYY");
      this.aiMl_model.endDate = moment(this.toDate).format("MM/DD/YYYY");
      this.spinnerService.show();
      this.aiMlService.saveAIScoring(this.aiMl_model).subscribe(
        (data:any)=>{
          // console.log("save",data)
          this.submitted = false;
          this.modelForm.reset();
          this.aiMl_model = new AIMLModel();
          this.closebutton.nativeElement.click();
          this.pageView = 'list';
          this.getAIMLFromDB();
          this.spinnerService.hide();
          this.isformExit = false;
          this.commonMethods.dynamicBackgroundColorChange('default');
          if(type == 'create'){
            this.commonMethods.addToastforlongtime(true,'AI/ML Scoring Created');
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
      // let formName = this.EvalformDDL.filter(s => s.value == this.aiMl_model.evaluationFormID)[0].label;
      // this.aiMl_model.evaluationFormName = formName;
      this.aiMl_model.startDate = moment(this.fromDate).format("MM/DD/YYYY");
      this.aiMl_model.endDate = moment(this.toDate).format("MM/DD/YYYY");
      this.spinnerService.show();
      this.aiMlService.updateAIScoring(this.aiMl_model).subscribe(
        (data:any)=>{
          // console.log("update",data)
          this.submitted = false;
          this.modelForm.reset();
          this.aiMl_model = new AIMLModel();
          this.closebutton.nativeElement.click();
          this.pageView = 'list';
          this.getAIMLFromDB();
          this.spinnerService.hide();
          this.isformExit = false;
          this.commonMethods.dynamicBackgroundColorChange('default');
          this.commonMethods.addToastforlongtime(true,'AI/ML Scoring Updated');
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
    // this.spinnerService.show();
    // this.aiMlService.deleteAIScoring(this.aiMl_model).subscribe(
    //   (data:any)=>{
    //     this.aiMl_model = new AIMLModel();
    //     this.spinnerService.hide();
    //     this.getAIMLFromDB();
    //     this.commonMethods.addToastforlongtime(true,'AI/ML Scoring deleted');
    //   },
    //   (error)=>{
    //     console.log(error);
    //     this.spinnerService.hide();
    //     this.commonMethods.addToastforlongtime(false, error.error);
    //   }
    // )
  }
  
  // Getlist of AIML from DB
  tempModelData:any = [];
  getAIMLFromDB(){
    this.modelList = [];
    this.tempModelData = [];
    this.spinnerService.show();
    this.aiMlService.getAIScoring().subscribe(
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
    this.aiMl_model = new AIMLModel();
    this.submitted = false;
    this.modelForm.reset();
    this.isformExit = false;
  }
  
  // Get limit from Systemsetting table for AI/ML
  getMaxLimit() {
    this.scheduleService.getMaxScheduleLimit().subscribe(
      (data: any) => {
        // console.log(data['maxALML_limit']);
        if(data['maxAIScoringModelLimit'] != undefined && data['maxAIScoringModelLimit'] != 0){
          this.maxModelLimit = data['maxAIScoringModelLimit'];
        }
        else{
          this.maxModelLimit = 2;
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
      modelId: modelid,
      evaluationId: evalID
    }
    // console.log(modelObj)
    this.spinnerService.show();
    this.aiMlService.makeActiveVersion(params).subscribe(  
      (data:any)=>{
        //  console.log(data);
        this.pageView = 'list';
        let str = "Model will be activated to" + " " + modelObj.modelName + " " + ":" + " " + "V_" + modelObj.modelId.split('_')[1];
        this.commonMethods.addToastforlongtime(true, str);
        this.getAIMLFromDB();
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      }
    )
  }

  keyPressOption: boolean = false;
  async omit_special_char(event)
{   
  // if(event.charCode==8)
  this.keyPressOption = true;
  // else
  // this.keyPressOption = false;
  var k;  
   k = event.charCode;  
     if((k > 32 && k < 45) || k == 47 || (k > 57 && k < 65) || (k > 90 && k < 95) ||  k == 96 || (k > 122 && k < 127)) {
      return await event.preventDefault();
     }
}

// async RemoveSpecialCharacters(val)
// {   
//   if(val!=null && val.length>1 && !this.keyPressOption){
//       const res = await val.replace(/[^a-zA-Z0-9--._-_ - ]/g, "");
//       // setTimeout(() => {
//       this.aiMl_model.modelName =res;
//     // }, 50);
//     }
//   this.keyPressOption = false;

// }
onPaste(event) {
  if(event){
     const trimmedText = event.replace(/[`~!@#$%^&*()|+\=?;:%'",.<>\{\}\[\]\\\/]/gi, '');
     (<HTMLInputElement>document.getElementById('aimlnameid')).value = trimmedText;
     this.aiMl_model.modelName  = trimmedText
  }
}
}
