import { Component, OnInit } from '@angular/core';
import { CommonMethods } from '../../../common/common.components'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActionModel } from './actions.model';
import { SubscriptionModel } from './actions.model';
import { ActionsService } from './actions.service'
import { GlobalComponent } from '../../../global/global.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  private actionModel: ActionModel;
  actionCard = [];
  actionNavigate: string = 'card'
  actionTypeDdl = [];
  parameterDdl = [];
  evaluationDdl = [];



  selectedAction: any;
  selectedAction1: any;
  actions: any;
  types: any;
  typeCre: any;
  selectedParameter: any;

  searchActionName: string = "";
  item: string;
  // cards :any;
  allcards :any;

  variableConstant: string = 'var';
  ParameterInputValuesCreate: any = [];
  ParameterInputValuesEdit: any = [];
  getTaken = "get";

  actionCreateForm: FormGroup;
  actionEditForm: FormGroup;

  issubmitCreate: boolean = false;
  errorValidationCreate: any;
  // errorValidationCreate = { EMAIL: null, HTTPS: null, SMS: null, Evaluation: null, LAMBDA: null }

  loading:boolean = false;
  constructor(private actionsService: ActionsService, private commonMethods: CommonMethods, 
    private fb: FormBuilder,public global: GlobalComponent,private spinnerService: NgxSpinnerService) {
    this.actionModel = new ActionModel();
    this.actionForms();
    this.commonMethods.dynamicBackgroundColorChange('default')
    // console.log('this.actionModel', this.actionCard)
  }

  ngOnInit(): void {
    // get Action Items for Card
    this.getActionsItems();
    this.getActionType();
    this.getHttpsParameter();
    this.addParameterEdit();
    this.getEvaluationItems();
  }
  //
  actionForms() {
    this.actionCreateForm = this.fb.group({
      createActionName: ['', Validators.required],
      // createActionDesc: ['', Validators.required],
    })
    this.actionEditForm = this.fb.group({
      editActionName: ['', Validators.required],
      // editActionDesc: ['', Validators.required],
    })

  }

  //get Actions Items:
  getActionsItems() {
    this.spinnerService.show();
    this.actionsService.getActionsItems().subscribe((data: any) => {
      this.actionCard = data.Items;
      // this.actionCard = data;
      this.allcards = data.Items;
      this.spinnerService.hide();
      // console.log('data', this.actionCard)
    }, (error) => {
        console.log(error);
        this.commonMethods.addToastforlongtime(false, error.error);
        this.spinnerService.hide();
    })
  }

  //get Action type DDL
  getActionType() {
    this.actionsService.getActionType().subscribe((data: any) => {
      this.actionTypeDdl = data;
    }, (error) => {
        console.log(error);
        this.commonMethods.addToastforlongtime(false, error.error)
    })
  }

  changeActiontype() {
    this.errorValidationCreate = null;
    this.actionModel.cfaSnsTopics = new SubscriptionModel();
  }

  //create Action:
  actionCreate() {
    this.errorValidationCreate = null;
    let actionError = this.actionValidation(this.actionModel.actionType);
    if (this.actionCreateForm.invalid || actionError) {
      this.issubmitCreate = true;
    }
    else {
      this.issubmitCreate = false;
      // console.log('this.action', this.actionModel);
      this.loading = true;
      this.spinnerService.show();
      this.actionsService.actionCreate(this.actionModel).subscribe((data: any) => {
        this.commonMethods.addToastforlongtime(true, 'Action saved')
        this.actionNavigate = 'card';
        this.commonMethods.dynamicBackgroundColorChange('default');
        this.actionModel = new ActionModel();
        this.getActionsItems();
        this.spinnerService.hide();
        this.loading = false;
      }, (error) => {
        this.loading = false;
        console.log(error);
        this.commonMethods.addToastforlongtime(false, error.error);
        this.spinnerService.hide();
      })
    }

  }

  cancelAction() {
    this.actionCreateForm.reset();
    this.issubmitCreate = false;
    this.actionModel = new ActionModel();
    this.actionNavigate = 'card';
    this.commonMethods.dynamicBackgroundColorChange('default');

  }

  actionValidation(actionType) {
    if (actionType == 'EMAIL') {
      if ((this.actionModel.cfaSnsTopics.emailMessage == null || (typeof (this.actionModel.cfaSnsTopics.emailMessage) == "string" ? this.actionModel.cfaSnsTopics.emailMessage.trim() : this.actionModel.cfaSnsTopics.emailMessage) == "")
        || (this.actionModel.cfaSnsTopics.emailRecipients == null || (typeof (this.actionModel.cfaSnsTopics.emailRecipients) == "string" ? this.actionModel.cfaSnsTopics.emailRecipients.trim() : this.actionModel.cfaSnsTopics.emailRecipients) == "")
        || (this.actionModel.cfaSnsTopics.emailSubject == null || (typeof (this.actionModel.cfaSnsTopics.emailSubject) == "string" ? this.actionModel.cfaSnsTopics.emailSubject.trim() : this.actionModel.cfaSnsTopics.emailSubject) == "")) {
        this.errorValidationCreate = "Please fill all the fields! EMAIL";
        return true
      }
    }

    // else if (actionType == 'HTTPS') {
    //   if ((this.actionModel.cfaSnsTopics.httpsEndurl == null || (typeof (this.actionModel.cfaSnsTopics.httpsEndurl) == "string" ? this.actionModel.cfaSnsTopics.httpsEndurl.trim() : this.actionModel.cfaSnsTopics.httpsEndurl) == "")) {
    //     this.errorValidationCreate = "Please fill all the fields! HTTPS";
    //     return true
    //   }

    //   let httpParameterFilter = this.actionModel.cfaSnsTopics.httpsParameters.filter((o: any) => {
    //     o.Value = typeof (o.Value) == 'string' ? o.Value.trim() : o.Value;
    //     return o.Key == null || (o.Value == null || o.Value == '')
    //   })
    //   if (httpParameterFilter.length > 0) {
    //     this.errorValidationCreate = "Please fill all the fields! HTTPSs"
    //     return true
    //   }
    // }

    else if (actionType == 'SMS') {
      if ((this.actionModel.cfaSnsTopics.smsFromPhoneNumber == null || (typeof (this.actionModel.cfaSnsTopics.smsFromPhoneNumber) == "string" ? this.actionModel.cfaSnsTopics.smsFromPhoneNumber.trim() : this.actionModel.cfaSnsTopics.smsFromPhoneNumber) == "")
        || (this.actionModel.cfaSnsTopics.smsMessage == null || (typeof (this.actionModel.cfaSnsTopics.smsMessage) == "string" ? this.actionModel.cfaSnsTopics.smsMessage.trim() : this.actionModel.cfaSnsTopics.smsMessage) == "")
        || (this.actionModel.cfaSnsTopics.smsPhoneNumbers == null || (typeof (this.actionModel.cfaSnsTopics.smsPhoneNumbers) == "string" ? this.actionModel.cfaSnsTopics.smsPhoneNumbers.trim() : this.actionModel.cfaSnsTopics.smsPhoneNumbers) == "")
        || (this.actionModel.cfaSnsTopics.smsTitle == null || (typeof (this.actionModel.cfaSnsTopics.smsTitle) == "string" ? this.actionModel.cfaSnsTopics.smsTitle.trim() : this.actionModel.cfaSnsTopics.smsTitle) == "")) {
        this.errorValidationCreate = "Please fill all the fields! SMS";
        return true
      }
    }

    else if (actionType == 'Evaluation') {
      if ((this.actionModel.cfaSnsTopics.evaluationId == null || (typeof (this.actionModel.cfaSnsTopics.evaluationId) == "string" ? this.actionModel.cfaSnsTopics.evaluationId.trim() : this.actionModel.cfaSnsTopics.evaluationId) == "")) {
        this.errorValidationCreate = "Please fill all the fields! Evaluation";
        return true
      }
    }

    else if (actionType == 'LAMBDA') {
      if ((this.actionModel.cfaSnsTopics.lambdaArn == null || (typeof (this.actionModel.cfaSnsTopics.lambdaArn) == "string" ? this.actionModel.cfaSnsTopics.lambdaArn.trim() : this.actionModel.cfaSnsTopics.lambdaArn) == "")) {
        this.errorValidationCreate = "Please fill all the fields! LAMBDA";
        return true
      }
    }
    else return false
  }



  //click create an action button
  createNewAction() {
    this.actionModel = new ActionModel();
    this.actionNavigate = 'create';
    this.commonMethods.dynamicBackgroundColorChange('white');
  }

  getHttpsParameter() {
    this.actionsService.getHttpsParameter().subscribe((data: any) => {
      this.parameterDdl = data;
    }, (error) => {
      console.log(error.error)
      this.commonMethods.addToastforlongtime(false, error.error)
    })
  }

  getEvaluationItems() {
    this.actionsService.getEvaluationItems().subscribe((data: any) => {
      this.evaluationDdl = data;
    }, (error) => {
      console.log(error.error)
      this.commonMethods.addToastforlongtime(false, error.error)
    })
  }

  clickActionCard(actionIterate) {
    this.actionForms();
    this.actionModel = new ActionModel();
    this.actionModel = JSON.parse(JSON.stringify(actionIterate))
    this.actionNavigate = 'update';
    this.commonMethods.dynamicBackgroundColorChange('white');
  }

  //update Action:
  actionUpdate() {
    this.errorValidationCreate = null;
    let actionEditError = this.actionValidation(this.actionModel.actionType);
    if (this.actionEditForm.invalid || actionEditError) {
      // if (this.actionCreateForm.invalid) {
      //   this.issubmitCreate = true;
      // }
      // return
      this.issubmitCreate = true;
    }
    else {
      // console.log('this.action', this.actionModel);
      this.loading = true;
      this.spinnerService.show();
      this.actionsService.actionUpdate(this.actionModel).subscribe((data: any) => {
        this.commonMethods.addToastforlongtime(true, 'Action updated')
        this.actionNavigate = 'card';
        this.commonMethods.dynamicBackgroundColorChange('default');
        this.actionModel = new ActionModel();
        this.getActionsItems();
        this.spinnerService.hide();
        this.loading = false;
      }, (error) => {
        this.loading = false;
        console.log(error.error)
        this.commonMethods.addToastforlongtime(false, error.error)
        this.spinnerService.hide();
      })
    }
  }

  //actionDelete

  actionDelete() {
    this.spinnerService.show();
    this.actionsService.actionDelete(this.actionModel).subscribe((data: any) => {
      this.commonMethods.addToastforlongtime(true, 'Action deleted')
      this.actionNavigate = 'card';
      this.actionModel = new ActionModel();
      this.getActionsItems();
      this.spinnerService.hide();
    }, (error) => {
      console.log(error.error)
      this.commonMethods.addToastforlongtime(false, error.error);
      this.spinnerService.hide();
    })
  }





  actiontype(type) {
    //console.log(type);
    // console.log(type.code);
    if (type == null) {
      this.types = "";
    }
    if (!(type == undefined)) {
      if (type.code == "email") {
        this.types = "email";
      }
      if (type.code == "sms") {
        this.types = "sms";
      }
      if (type.code == "evaluation") {
        this.types = "evaluation";
      }
      if (type.code == "aws") {
        this.types = "aws";
      }
      // if (type.code == "http") {
      //   this.types = "http";
      // }
      // console.log(this.types);
    }

  }

  //********************************************create action parameter(add)*****************************************

  addParameter(parameterList) {
    parameterList.push({
      Parametertype: 'variable',
      Key: null,
      Value: null,
    });
  }
  //*****************************************create action parameter(delete)*****************************************
  removeParameter(parameterList, index) {
    if (index !== -1) {
      parameterList.splice(index, 1);
    }
  }

  //*****************************************Edit action parameter(add)*****************************************

  addParameterEdit() {
    if (this.ParameterInputValuesEdit.length == 0) {
      let parameterEditobj = {};

      parameterEditobj = { variable: null, constant: null, name: "", selectedParameter: "", constName: "", constSelectedParameter: "" };
      this.ParameterInputValuesEdit.push(parameterEditobj);
      // parameterEditobj = {};
      // parameterEditobj = { variableConstant: null, name: "" ,selectedParameter:"", constName: "" , constSelectedParameter:""};
      // this.ParameterInputValuesEdit.push(parameterEditobj);
    }
    else {
      let parameterEditobj = { variable: null, constant: null, name: "", selectedParameter: "", constName: "", constSelectedParameter: "" };
      this.ParameterInputValuesEdit.push(parameterEditobj);
    }

    // console.log(this.ParameterInputValuesEdit);    
  }

  //*****************************************create action parameter(delete)*****************************************
  removeParameterEdit(i) {
    if (this.ParameterInputValuesEdit.length == 1) {
      return false;
    }
    else {
      this.ParameterInputValuesEdit.splice(i, 1);
      return true;
    }
  }

  searchAction() {
    // console.log("search",this.searchActionName);
    this.actionCard = this.allcards.filter(item => item.cfaName.toLowerCase().includes(this.searchActionName.toLowerCase()))
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
  //       this.actionModel.cfaName = res;
  //     // }, 50);
  //   }
  //   this.keyPressOption = false;
  // }

  onPaste(event) {
    if(event){
       const trimmedText = event.replace(/[`~!@#$%^&*()|+\=?;:%'",.<>\{\}\[\]\\\/]/gi, '');
       (<HTMLInputElement>document.getElementById('actionnameid')).value = trimmedText;
       this.actionModel.cfaName = trimmedText
    }
  }

}
