import { Component, OnInit } from '@angular/core';
import { MyPlaybookService } from './myplaybook.service'
import { CommonMethods } from '../../../common/common.components'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { group } from '@angular/animations';
import { MyPlaybookModel } from './myplaybook.model';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalComponent } from '../../../global/global.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { TopicService } from '../topics/topics.service';
import { PreferenceService } from '../../settings/successkpi-setting/successkpi-setting.service';
import { PartitionService } from '../../settings/partition/partition.service';
import * as moment from 'moment';


@Component({
  selector: 'app-myplaybook',
  templateUrl: './myplaybook.component.html',
  styleUrls: ['./myplaybook.component.css']
})
export class MyplaybookComponent implements OnInit {
  //dropdownProperties
  conditionDdl: any = [];
  topicSentimentCondition: [];
  scoreCondition: [];
  sentimentList: [];
  topicList: [];
  measure: [];
  dimension: []
  //playbookForm:FormGroup;
  submitted = false;
  submittedEdit = false;

  item: string;
  selectedCity: any;
  logicEdit: boolean = false;
  LOGIC: boolean = false;
  logic: boolean = false;
  playbookTemplate_action: any = [];
  conditionTemplate: any = [];
  // cfacondition: any = [];

  // playbookname search
  searchPlaybookName: string = "";
  allcards: any = [];

  //validation
  playbookCreateForm: FormGroup;
  playbookEditForm: FormGroup;
  private playbookModel: MyPlaybookModel;

  createEdit: string = "list";
  TopicsList = [];
  CallToActionItems = [];
  cards: any = [];
  themeLists: any = [];

  templateList: Object[];

  playbookTemplateList: object;

  errorValidation = { actionError: null, conditionError: null, logicError: null }
  // errorValidation=new Object();

  // langjson:any;
  loading: boolean = false;
  metricValue: any = [];
  metricOption: any = [];
  metricValueOption: any = [];
  getPlatformValue: any = '';
  // isDisableMetrics: boolean[] = [];                 // Disable the metric name after choosing the metricvalue in overlay panel
  metricNameIndex: any;
  getMetricItem: any = ''
  metricOptionErr: boolean = false                  //Error message for choose same metricFilterName in dropdown 
  metricValueErr: boolean = false;                  //Error message for not choosing the metricvalue in dropdown
  addConditionErr: boolean = false                  // Error message for create condition without choosing existing metricFilterName and value
  isAddDisable: boolean = false                     // Disable the add condition button in overlaypanel
  listDropdown = [{ label: 'In List', value: 'In List' }, { label: 'Not In List', value: 'Not In List' }];
  isValidateFilter: boolean = false;
  isFilterTimeError: boolean = false;
  isFilterEqualTimeError: boolean = false
  isDisableDone:boolean = false;
  isFilterErr:boolean = false;

  constructor(private myPlaybookService: MyPlaybookService, private commonMethods: CommonMethods,
    private formBuilder: FormBuilder, public global: GlobalComponent, private spinnerService: NgxSpinnerService, private topicService: TopicService,
    private preferenceService: PreferenceService, private partitionService: PartitionService) {
    this.playbookModel = new MyPlaybookModel();
    // this.playbookCreatets();
    this.getplatformValidate().then(() => {
      this.getFilterDropDownList();
      this.getMetricValue();
    })
    this.playbookForms();
    // this.commonMethods.emptyJson().subscribe(response => {
    //   console.log(response);
    //   this.langjson=response;
    // });
    this.commonMethods.dynamicBackgroundColorChange('default');

  }


  ngOnInit() {

    this.getplaybookItems();
    this.getCalltoAction();
    // this.addCondition();
    // this.addAction();
    // this.addActionCreate();
    // this.addConditionCreate();
    this.addActionTemplate();
    this.addConditionTemplate();
    //formInitialize
    // console.log(this.playbookModel);
    // this.getConditionsJson();
    this.getTopics();
    this.getTheme();
    this.getChannel();
  }

  //***********************************************dropDownFunctions***********************************************
  metricOptions: any = [];
  metricOperations: any = [];
  getConditionsJson() {
    this.myPlaybookService.getConditionsJson().subscribe((data: any) => {
      let arr = [];
      if (this.platfromID == 2 || this.platfromID == 1 || this.platfromID == 7 || this.platfromID == 9) {
        arr = data.Condition
        // console.log("IF",arr)
      }
      else {
        arr = data.Condition.filter(s => s.label.toLowerCase() != 'metrics')
        // console.log("ELSE",arr)
      }
      this.conditionDdl = arr;
      this.topicSentimentCondition = data.Topic_SentimentCondition;
      this.scoreCondition = data.ScoreCondition;
      this.sentimentList = data.Measure;
      this.metricOperations = data.MetricOperation;
      
      if(this.callAnalyticsData == 'Call Transcription V2'){
          this.metricOptions = data.MetricsOptions;
      }
      else{
        this.metricOptions = data.MetricsOptions.filter(e => e.label.toLowerCase() != 'silence' && e.label.toLowerCase() != 'overtalk' && e.label.toLowerCase() != 'loudness' && e.label.toLowerCase() != 'talk speed');
      }
      if (this.platfromID == 7) {
        this.metricOptions = [];
        data.MetricsOptions.forEach(element => {
          if (element.label.includes('Talk Time') || element.label.includes('Wait time') || element.label.includes('Hold Time')) {
            this.metricOptions.push(element);
          }
        });
      }
      if (this.platfromID == 9) {
        this.metricOptions = [];
        data.MetricsOptions.forEach(element => {
          if (element.label.includes('Talk Time')) {
            this.metricOptions.push(element);
          }
        });
      }
      // console.log(data);
    }, (error) => {
      console.log('error', error)
      this.commonMethods.addToastforlongtime(false, error.error)
    })
  }
  istableGet: boolean = false;
  getTemplateItem() {
    if (this.istableGet == false) {
      this.istableGet = true;
    }
    this.myPlaybookService.getTemplateItem().subscribe((data: any) => {
      // console.log(data);
      this.istableGet = false;
      this.templateList = data;

    }, (error) => {
      console.log('error', error)
      this.commonMethods.addToastforlongtime(false, error.error)
    })
  }

  viewTemplate(templateCards) {
    this.commonMethods.dynamicBackgroundColorChange('white');
    this.playbookTemplateList = JSON.parse(JSON.stringify(templateCards));
    this.createEdit = 'templateCard'
  }

  copyTemplate(playbookTemplateList) {
    // console.log(playbookTemplateList);
    this.loading = true;
    this.myPlaybookService.copyTemplate(playbookTemplateList).subscribe((data: any) => {
      this.commonMethods.addToastforlongtime(true, 'This copy of ' + playbookTemplateList.playbookName + ' was created in your Playbooks. Go ahead and modify it: make it your own.')
      this.createEdit = 'template';
      this.loading = false;
    },
      (error) => {
        this.loading = false;
        console.log('error', error)
        this.commonMethods.addToastforlongtime(false, error.error)
      })
  }

  changeLogicEdit(value) {
    if (value == 3) {
      this.LOGIC = true;
    }
    else {
      this.LOGIC = false;
    }
  }
  changeLogicCreate(value) {
    if (value == 3) {
      this.LOGIC = true;
    }
    else {
      this.LOGIC = false;
    }
  }
  //playbook template
  changeLogic(value) {
    if (value == 3) {
      this.LOGIC = true;
    }
    else {
      this.LOGIC = false;
    }
  }


  //*********************************************************playbook forms*******************************************************
  playbookForms() {
    this.playbookCreateForm = this.formBuilder.group({
      playbookName: ['', Validators.required]
    })
    this.playbookEditForm = this.formBuilder.group({
      playbookNameEdit: ['', Validators.required],
      cfaLogic: ['']
    })

  }

  //*******************************************************edit playbook*******************************************************

  addCondition() {
    if (this.playbookModel.cfacondition.length == 0) {
      let conditionObj = { Condition: null, Dimension: null, Measure: null };
      this.playbookModel.cfacondition.push(conditionObj);
    }
    else {
      let conditionObj = { Condition: null, Dimension: null, Measure: null };
      this.playbookModel.cfacondition.push(conditionObj);
    }

  }

  addAction() {
    if (this.playbookModel.callActionList.length == 0) {
      let conditionObje = { callActionId: null };
      this.playbookModel.callActionList.push(conditionObje);
    }
    else {
      let conditionObje = { callActionId: null };
      this.playbookModel.callActionList.push(conditionObje);
    }
  }

  removeConditionEdit(i) {
    if (this.playbookModel.cfacondition.length == 1) {
      return false;
    }
    else {
      this.playbookModel.cfacondition.splice(i, 1);
      return true;
    }

    // this.playbookModel.cfacondition.splice(i, 1);
    // console.log(i);
    // return true;
  }

  removeActionEdit(j) {
    if (this.playbookModel.callActionList.length == 1) {
      return false;
    }
    else {
      this.playbookModel.callActionList.splice(j, 1);
      return true;
    }
    // this.playbookModel.callActionList.splice(j, 1);
    // return false;
  }

  //required field validation
  get validationEdit() { return this.playbookEditForm.controls }



  //edit and save playbook
  updatePlaybooks() {
    this.playbookMetricMeasure();
    this.errorValidation = { actionError: null, conditionError: null, logicError: null }
    let isUpdateConditionAndAction = this.conditionActionValidation();
    let isUpdateLogic = this.logicValidation();
    if(this.playbookModel.filterConditions != undefined && this.playbookModel.filterConditions.length){
     this.playbookModel.filterConditions.map(element => {
          if(element.conditionFilterName == 'Interaction Start Time (UTC)'){
              const startTime =  moment(new Date(element.conditionFilterStartTime)).format("YYYY-MM-DD HH:mm");
              const endTime =  moment(new Date(element.conditionFilterEndTime)).format("YYYY-MM-DD HH:mm");
              console.log(startTime,endTime)
              element.conditionFilterStartTime = startTime
              element.conditionFilterEndTime = endTime

          }
      })
    }
    console.log(this.playbookModel.filterConditions)
    if (this.playbookEditForm.invalid || isUpdateConditionAndAction || isUpdateLogic || this.errBetween == true || this.errSameValue == true || this.metricOptionErr || this.metricValueErr == true || this.addConditionErr == true || this.isValidateFilter == true || this.isFilterTimeError == true || this.isFilterEqualTimeError == true) {
      if (this.playbookEditForm.invalid || this.errBetween == true) {
        this.submittedEdit = true;
      }
      return
    }
    this.loading = true;
    this.spinnerService.show();
    this.myPlaybookService.updatePlaybook(this.playbookModel).subscribe((data: any) => {
      // console.log(data);
      this.playbookModel = new MyPlaybookModel();
      this.getplaybookItems();
      this.createEdit = "list";
      this.commonMethods.addToastforlongtime(true, 'Playbook updated');
      this.commonMethods.dynamicBackgroundColorChange('default');
      this.spinnerService.hide();
      this.loading = false;
      this.errBetween = false;
      this.errSameValue = false;
      this.isAddDisable = false;
      this.metricOptionErr = false;
      this.metricValueErr = false;
      this.addConditionErr = false;
      this.isValidateFilter = false;
      this.isFilterTimeError  = false;
      this.isFilterEqualTimeError = false;
      // this.isDisableMetrics = [];
      this.isFilterErr = false;
    }, (error) => {
      this.loading = false;
      console.log('error', error);
      this.spinnerService.hide();
      this.commonMethods.addToastforlongtime(false, error.error);
    });
  }

  // delete playbook
  deletePlaybook() {
    this.spinnerService.show();
    this.myPlaybookService.deletePlaybook(this.playbookModel.playBookId).subscribe(
      (data: any) => {
        //  console.log("delete",data) 
        this.getplaybookItems();
        this.createEdit = "list";
        this.commonMethods.addToastforlongtime(true, 'Playbook deleted');
        this.commonMethods.dynamicBackgroundColorChange('default');
        this.spinnerService.hide();
      },
      (error) => {
        console.log('error', error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      });
  }

  //*******************************************************create playbook*******************************************************
  //add conition in create a playbook 
  addConditionCreate() {
    if (this.playbookModel.cfacondition.length == 0) {
      let conditionCreateObj = { Condition: null, Dimension: null, Measure: null };
      this.playbookModel.cfacondition.push(conditionCreateObj);
    }
    else {
      let conditionCreateObj = { Condition: null, Dimension: null, Measure: null };
      this.playbookModel.cfacondition.push(conditionCreateObj);
    }
    // console.log("click", this.playbookModel.cfacondition);
  }

  addActionCreate() {
    if (this.playbookModel.callActionList.length == 0) {
      let conditionCreateObject = { callActionId: null };
      this.playbookModel.callActionList.push(conditionCreateObject);
    }
    else {
      let conditionCreateObject = { callActionId: null };
      this.playbookModel.callActionList.push(conditionCreateObject);
    }
  }

  removeConditionCreate(i) {
    if (this.playbookModel.cfacondition.length == 1) {
      return false;
    }
    else {
      this.playbookModel.cfacondition.splice(i, 1);
      return true;
    }

  }

  removeActionCreate(j) {
    if (this.playbookModel.callActionList.length == 1) {
      return false;
    }
    else {
      this.playbookModel.callActionList.splice(j, 1);
      return true;
    }
  }

  //validation 
  get validationCreate() { return this.playbookCreateForm.controls; }
  //create save 
  playbookCreate() {
    this.playbookMetricMeasure();
    this.errorValidation = { actionError: null, conditionError: null, logicError: null }
    let isEditConditionAndAction = this.conditionActionValidation();
    let isEditLogic = this.logicValidation();
    if(this.playbookModel.filterConditions != undefined && this.playbookModel.filterConditions.length){
      this.playbookModel.filterConditions.map(element => {
           if(element.conditionFilterName == 'Interaction Start Time (UTC)'){
               const startTime =  moment(new Date(element.conditionFilterStartTime)).format("YYYY-MM-DD HH:mm");
               const endTime =  moment(new Date(element.conditionFilterEndTime)).format("YYYY-MM-DD HH:mm");
               console.log(startTime,endTime)
               element.conditionFilterStartTime = startTime
               element.conditionFilterEndTime = endTime
 
           }
       })
     }

    if (this.playbookCreateForm.invalid || isEditConditionAndAction || isEditLogic || this.errBetween == true || this.errSameValue == true || this.isValidateFilter == true || this.isFilterTimeError == true || this.isFilterEqualTimeError == true || this.isFilterErr == true) {
      if (this.playbookCreateForm.invalid || this.errBetween == true || this.errSameValue == true) {
      this.submitted = true;
      }
      return
    }
    // console.log("After IF");
    this.loading = true;
     this.spinnerService.show();
    this.myPlaybookService.playbookCreate(this.playbookModel).subscribe((data: any) => {
      this.playbookModel = new MyPlaybookModel();
      this.getplaybookItems();
      this.playbookCreateForm.reset();
      this.createEdit = "list";
      this.commonMethods.addToastforlongtime(true, 'Playbook created');
      this.commonMethods.dynamicBackgroundColorChange('default');
      this.spinnerService.hide();
      this.loading = false;
      this.errBetween = false;
      this.errSameValue = false;
      this.isAddDisable = false;
      this.metricOptionErr = false;
      this.metricValueErr = false;
      this.addConditionErr = false
      this.isValidateFilter = false;
      this.isFilterTimeError = false;
      this.isFilterEqualTimeError = false;
      // this.isDisableMetrics = [];
      this.isFilterErr = false;
    }, (error) => {
      this.loading = false;
      console.log('error', error);
      this.spinnerService.hide();
      this.commonMethods.addToastforlongtime(false, error.error);
    });
  }

  errBetween: boolean = false;
  errSameValue: boolean = false;
  playbookMetricMeasure() {
    let conditionValue: any = [];
    conditionValue = this.playbookModel.cfacondition;
    // conditionValue.forEach(element => {
    //   if(element.Dimension == "Metrics"){
    //     if(element.Condition == '>=<='){
    //       element.Measure = element.measureFrom + 'AND' + element.measureTo;
    //       console.log(element.Measure)
    //     }
    //   }
    // });
    // this.playbookModel.cfacondition = conditionValue.map(s=> {return {
    //   Dimension:s.Dimension != undefined ? s.Dimension : null,
    //   Condition:s.Condition != undefined ? s.Condition : null,
    //   Measure:s.Measure != undefined ? s.Measure : null,
    //   Metrics:s.Metrics != undefined ? s.Metrics : null,
    //   Theme:s.Theme != undefined ? s.Theme : null,
    //   Channel:s.Channel != undefined ? s.Channel : null}
    // })
    // console.log(this.playbookModel.cfacondition)
    for (let element of conditionValue) {
      if (element.Dimension == "Metrics") {
        if (element.Condition == '>=<=') {
          let split = element.Measure.split('-');
          // console.log(split)
          if (split.length == 3) {
            // this.errBetween = false;
            // this.errSameValue = false;
            if (split[0] == "" || split[2] == "") {
              this.errBetween = true;
              this.errSameValue = false;
              break;
            }
            else {
              this.errBetween = false;
              this.errSameValue = false;
            }
          }
          else if (split.length == 4) {
            if (split[1] != split[3]) {
              this.errBetween = false;
              this.errSameValue = false;
            }
            else {
              this.errSameValue = true;
              break;
            }

          }
          else {
            if (split.length == 2) {
              if ((split[0] != "" || split[0] != null) && (split[1] != "" || split[1] != null)) {
                if (split[0] != split[1]) {
                  this.errBetween = false;
                  this.errSameValue = false;
                }
                else {
                  this.errSameValue = true;
                  break;
                }

              }
            }
            if (split.length == 2) {
              if ((split[0] == "" || split[0] == null) || (split[1] == "" || split[1] == null)) {
                this.errBetween = true;
                break;
              }
              if (split[0] == "(" && split[1] != "") {
                // console.log("2nd IF")
                this.errBetween = true;
                break;
              }
            }
            else {
              this.errBetween = true;
              break;
            }
          }

        }
      }
    }
  }
  //**************************************************Validation **************************************************
  conditionActionValidation() {
    let conditionFilter = [];
    if (this.errBetween == true || this.errSameValue == true || this.metricOptionErr || this.metricValueErr == true || this.addConditionErr == true || this.isValidateFilter == true || this.isFilterTimeError == true || this.isFilterEqualTimeError == true){
        return
    }
    if (this.playbookModel.filterConditions.length < this.metricOption.length) {
      for (let element of this.playbookModel.filterConditions) {
        if (element.conditionFilterValue.length == 0) {
          this.isValidateFilter = true
          return
        }
        else {
          if (element.conditionFilterName == 'Interaction Start Time (UTC)') {
            if ((element.conditionFilterStartTime != null && element.conditionFilterEndTime == null) || (element.conditionFilterStartTime == null && element.conditionFilterEndTime != null) || (element.conditionFilterStartTime == null && element.conditionFilterEndTime == null)) {
              this.isValidateFilter = true
              return
            }
          }
        }
      }
    }


    // console.log(this.playbookModel.cfacondition);
    conditionFilter = this.playbookModel.cfacondition.filter((o: any) => {
      o.Measure = typeof (o.Measure) == 'string' ? o.Measure.trim() : o.Measure;
      if (o.Dimension == "Metrics" && o.Metrics == "Hold Time" && (o.Condition == "=" || o.Condition == ">") && o.Measure == 0) {
        return
      } else {
        return o.Condition == null || o.Dimension == null || (o.Measure == null || o.Measure == '')
      }
    });
    // console.log(conditionFilter);

    let ctaIdFilter = this.playbookModel.callActionList.filter((o: any) => {
      return o.callActionId == null;
    })
    // console.log(conditionFilter);
    // console.log(ctaIdFilter);
    if (conditionFilter.length > 0 || ctaIdFilter.length > 0) {
      if (conditionFilter.length > 0) {
        conditionFilter.forEach(element => {
          // !(element.Measure >= 0) || 
          if (element.Dimension == "Metrics") {
            if (element.Metrics == "Hold Time") {
              // if(element.Condition != "<" || element.Condition != ">=<="){
              // console.log(element.Condition);
              if (element.Condition == ">" || element.Condition == "=") {
                // console.log(element.Measure);
                // console.log(element.Measure >= 0);
                // console.log(element.Measure != null);
                // console.log(element.Measure >= 0 && element.Measure != null);
                if (element.Measure >= 0 && element.Measure != null) {
                  this.errorValidation.conditionError = '';
                } else {
                  this.errorValidation.conditionError = 'Please Complete Condition Definition';
                }
              } else {
                this.errorValidation.conditionError = 'Please Complete Condition Definition';
              }
            } else {
              this.errorValidation.conditionError = 'Please Complete Condition Definition';
            }
          } else {
            this.errorValidation.conditionError = 'Please Complete Condition Definition';
          }
        });
        // this.errorValidation.conditionError = 'Please Complete Condition Definition'
      }
      if (ctaIdFilter.length > 0) {
        this.errorValidation.actionError = 'Please Complete Action Definition';
      }
      return true
    }
    else {
      return false
    }


  }

  logicValidation() {
    if (this.playbookModel.cfaOperator == 'LOGIC') {
      this.playbookModel.cfaLogic = typeof (this.playbookModel.cfaLogic) == 'string' ? this.playbookModel.cfaLogic.trim().toUpperCase() : this.playbookModel.cfaLogic;
      if (this.playbookModel.cfaLogic == null || this.playbookModel.cfaLogic == '') {
        this.errorValidation.logicError = 'Please enter an valid logic'
        return true;
      }
      else {
        let length = this.playbookModel.cfacondition.length;
        let filteredNo = this.playbookModel.cfaLogic.replace(/\D+/g, ' ').trim().split(' ').map(e => parseInt(e));
        // console.log('matches', filteredNo)
        if (filteredNo.length > 0 && (!isNaN(filteredNo[0]))) {
          let largestNo = Math.max(...filteredNo)
          // console.log('parseInt(largestNo)', largestNo)
          if (largestNo == length) {
            let findDuplicates = filteredNo.filter((item, index) => filteredNo.indexOf(item) != index);
            // console.log('findDuplicates', findDuplicates)
            if (findDuplicates.length > 0) {
              this.errorValidation.logicError = "Please remove duplicate numbers in logic"
              return true;
            }
            else {
              let lo = this.playbookModel.cfaLogic.replace(/[^A-Za-z ]/g, '').split(" ");
              // console.log('lo', lo)
              let sfilter = lo.filter((o) => {
                return o.trim() != 'AND' && o.trim() != 'OR' && o.trim() != 'NOT' && o.trim() != ""
              })
              // console.log('sfilter', sfilter)
              if (sfilter.length > 0) {
                this.errorValidation.logicError = "Invalid logical operators used. Use only AND,OR,NOT operators. Please verify sample logic format ( 1 AND 2 ) OR 3";
                return true;
              }
              else {
                return false;
              }
              // console.log('lo', sfilter)
            }
          }
          else {
            this.errorValidation.logicError = 'Invalid Logic (' + largestNo.toString() + ')'
            return true
          }
        }
        else {
          this.errorValidation.logicError = 'Invalid Logic. Please verify sample logic format ( 1 AND 2 ) OR 3'
          return true;
        }
      }

    }
    else if (this.playbookModel.cfaOperator == 'AND') {
      this.playbookModel.cfaLogic = ''
      for (const key in this.playbookModel.cfacondition) {
        // console.log('key', typeof (key))
        if (this.playbookModel.cfacondition.hasOwnProperty(key)) {
          if (this.playbookModel.cfacondition.length == 1) {
            let tKey = parseInt(key) + 1
            this.playbookModel.cfaLogic = tKey.toString() + ' AND ' + tKey.toString()
          }
          else {
            if (parseInt(key) == 0) {
              let tKey = parseInt(key) + 1
              this.playbookModel.cfaLogic += tKey.toString()
            }
            else {
              let tKey = parseInt(key) + 1
              this.playbookModel.cfaLogic += ' AND ' + tKey.toString()
            }
          }

        }
      }
      this.playbookModel.cfaLogic = '( ' + this.playbookModel.cfaLogic.trim() + ' )'
      return false;
    }
    else if (this.playbookModel.cfaOperator == 'OR') {
      this.playbookModel.cfaLogic = ''
      for (const key in this.playbookModel.cfacondition) {
        // console.log('key', typeof (key))
        if (this.playbookModel.cfacondition.hasOwnProperty(key)) {
          if (this.playbookModel.cfacondition.length == 1) {
            let tKey = parseInt(key) + 1
            this.playbookModel.cfaLogic = tKey.toString() + ' OR ' + tKey.toString()
          }
          else {
            if (parseInt(key) == 0) {
              let tKey = parseInt(key) + 1
              this.playbookModel.cfaLogic += tKey.toString()
            }
            else {
              let tKey = parseInt(key) + 1
              this.playbookModel.cfaLogic += ' OR ' + tKey.toString()
            }
          }

        }
      }
      this.playbookModel.cfaLogic = '( ' + this.playbookModel.cfaLogic.trim() + ' )'
      return false;
    }
  }

  getEmployee() {
    this.myPlaybookService.getEmployee().subscribe((data: any) => {
      this.commonMethods.addToastforlongtime(true, 'Playbook Created')
    }, (error) => {
      console.log('error', error)
      this.commonMethods.addToastforlongtime(false, error.error)
    })
  }

  //************************************************** playbook Template**************************************************
  addActionTemplate() {
    if (this.playbookTemplate_action.length == 0) {
      let templateAction = { selectedCity: "" };
      this.playbookTemplate_action.push(templateAction);
    }
    else {
      let templateAction = { selectedCity: "" };
      this.playbookTemplate_action.push(templateAction);
    }
  }
  deleteActionTemplate(event) {
    if (this.playbookTemplate_action.length == 1) {
      // console.log("Can't delete the row when there is only one row");
      return false;
    }
    else {
      this.playbookTemplate_action.splice(event, 1);
      return true;
    }
  }
  addConditionTemplate() {
    if (this.conditionTemplate.length == 0) {
      let conditionTemplate = { condition: "", operation: "", value: "" };
      this.conditionTemplate.push(conditionTemplate);
    }
    else {
      let conditionTemplate = { condition: "", operation: "", value: "" };
      this.conditionTemplate.push(conditionTemplate);
    }
  }
  deleteCondTemplate(e) {
    if (this.conditionTemplate.length == 1) {
      return false;
    }
    else {
      this.conditionTemplate.splice(e, 1);
      return true;
    }
  }


  //**************************************************playbook cards**************************************************
  getplaybookItems() {
    this.searchPlaybookName = "";
    this.spinnerService.show();
    this.myPlaybookService.getplaybookItems().subscribe(
      (data: any) => {
        this.cards = data.Items;
        this.allcards = data.Items;
        this.spinnerService.hide();
      }, (error) => {
        console.log('error', error.error);
        this.commonMethods.addToastforlongtime(false, error.error);
        this.commonMethods.dynamicBackgroundColorChange('default');
        this.spinnerService.hide();
      }
    );
  }

  //open create playbook
  openCreatePlaybook() {
    this.commonMethods.dynamicBackgroundColorChange('white');
    this.playbookModel = new MyPlaybookModel();
    this.createEdit = 'create';
    this.errBetween = false;
  }

  //edit and open playbook
  updatePlaybook(playbookCards) {
    this.commonMethods.dynamicBackgroundColorChange('white');
    this.playbookModel = JSON.parse(JSON.stringify(playbookCards));
    this.createEdit = "edit";
    this.playbookModel.filterConditionType = (this.playbookModel.filterConditionType === undefined) ? "all" : this.playbookModel.filterConditionType;
    this.playbookModel.filterConditions = (this.playbookModel.filterConditions === undefined) ? [] : this.playbookModel.filterConditions;
    // console.log(this.playbookModel)
    if(this.playbookModel.filterConditions.length > 0){
    this.playbookModel.filterConditions.map(element => {
      if(element.conditionFilterName == 'Interaction Start Time (UTC)'){ 
        console.log(element.conditionFilterStartTime,element.conditionFilterEndTime)
          const startTime = new Date(element.conditionFilterStartTime)
          const endTime = new Date(element.conditionFilterEndTime)
          element.conditionFilterStartTime = startTime
          element.conditionFilterEndTime =  endTime
      }
    })
  }
  console.log(this.playbookModel.filterConditions)
    // let conditionValue:any= [];
    // conditionValue = this.playbookModel.cfacondition;
    // conditionValue.forEach(element => {
    //   if(element.Dimension == "Metrics"){
    //     if(element.Condition == '>=<='){
    //       let split = element.Measure.split('AND')
    //       element.measureFrom = split[0];
    //       element.measureTo = split[1]
    //     }
    //   }
    // });
  }



  // **************************************** (edit & create)****************************************
  //get topics
  getTopics() {
    this.myPlaybookService.getTopics().subscribe((data: any) => {
      this.TopicsList = data;
    }, (error) => {
      console.log('error', error);
      this.commonMethods.addToastforlongtime(false, error.error)
    });
  }

  //get theme
  getTheme() {
    this.myPlaybookService.getTheme().subscribe((data: any) => {
      this.themeLists = data;
    },
      (error) => {
        console.log('error', error);
        this.commonMethods.addToastforlongtime(false, error.error)
      });
  }

  //call the action details (edit & create)
  getCalltoAction() {
    this.myPlaybookService.getCalltoAction().subscribe((data: any) => {
      //  console.log(data);
      this.CallToActionItems = data;
    },
      (error) => {
        console.log('error', error);
        this.commonMethods.addToastforlongtime(false, error.error)
      });
  }

  //*******************************************edit & create cancel********************************************* 
  createCancel() {
    this.commonMethods.dynamicBackgroundColorChange('default');
    this.playbookModel = new MyPlaybookModel();
    this.playbookForms();
    this.createEdit = 'list';
    this.playbookCreateForm.reset();
    this.errorValidation = { actionError: null, conditionError: null, logicError: null }
    this.errBetween = false;
    this.errSameValue = false;
    this.isAddDisable = false;
    this.metricOptionErr = false;
    this.metricValueErr = false;
    this.addConditionErr = false
    this.isValidateFilter = false;
    this.isFilterTimeError = false;
    this.isFilterEqualTimeError = false;
    // this.isDisableMetrics = [];
    this.isFilterErr = false;

  }
  editCancel() {
    this.commonMethods.dynamicBackgroundColorChange('default');
    this.playbookModel = new MyPlaybookModel();
    this.playbookForms();
    this.playbookEditForm.reset();
    this.submittedEdit = false;
    this.createEdit = 'list';
    this.errorValidation = { actionError: null, conditionError: null, logicError: null }
    this.errBetween = false;
    this.errSameValue = false;
    this.isAddDisable = false;
    this.metricOptionErr = false;
    this.metricValueErr = false;
    this.addConditionErr = false
    this.isValidateFilter = false;
    // this.isDisableMetrics = [];
    this.isFilterErr = false;
  }

  // PLAYBOOKNAME SEARCH
  searchPlaybook() {
    this.cards = this.allcards.filter(item => item.playbookName.toLowerCase().includes(this.searchPlaybookName.toLowerCase()))
  }

  togglePlaybook(playbookCards) {
    this.myPlaybookService.togglePlaybook({ active: playbookCards.active, playBookId: playbookCards.playBookId }).subscribe(
      (data: any) => {
        // console.log("actiee", data)
        // this.getplaybookItems();
      },
      (error) => {
        console.log('error', error);
        this.commonMethods.addToastforlongtime(false, error.error)
      }
    )
  }

  // clickTemplateDetails(){
  //   this.commonMethods.dynamicBackgroundColorChange('white');
  //   this.createEdit= 'templateCard'
  // }

  breadcrumbPlaybook(template) {
    if (template == 'template') {
      this.playbookTemplateList = {}
      this.commonMethods.dynamicBackgroundColorChange('default');
      this.createEdit = 'template';
    }
    else if (template == 'list') {
      this.commonMethods.dynamicBackgroundColorChange('default');
      this.createEdit = 'list';
      this.getplaybookItems();
      this.errBetween = false;
      this.errSameValue = false;
    }
    // else if (template == 'templateCard') {
    //   this.commonMethods.dynamicBackgroundColorChange('white');
    //   // this.templateList = JSON.parse(JSON.stringify(templateCards));
    //   this.createEdit = 'templateCard'
    // }
  }

  channelList: any;
  getChannel() {
    let channel = []
    this.topicService.getChannelDropDownList().subscribe(
      (data: any) => {
        channel = data.shift()
        this.channelList = data;
        // console.log(this.channelList)
      }
    )
  }

  defaultChannelVal(test) {
    // console.log(test)
    if (test.Dimension == "Sentiment") {
      test.Channel = this.channelList[0].value;
    }
    // else{
    //   test.Channel = "";
    // }
  }
  platfromID:any = 0;
  callAnalyticsData:any
  getplatformValidate() {
    // this.preferenceService.getPlatformDetail.subscribe(
    return new Promise((resolve, reject) => {
      this.preferenceService.getPreference().subscribe(
        (data: any) => {
          this.platfromID = data.platformId;
          this.callAnalyticsData = data.callAnalyticsType != undefined && data.callAnalyticsType != null ?  data.callAnalyticsType : 'Call Transcription V1'
          //  console.log(this.platfromID)
          this.getConditionsJson();
          resolve(data)
        }
      ),
        (error) => {
          console.log(error)
          reject(error)
        }
    })
  }

  keyPress(event: any) {
    const pattern = /[- +()0-9]+/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressOption: boolean = false;
  async omit_special_char(event) {
    // console.log(event)
    // if(event.charCode==8)
    this.keyPressOption = true;
    // else
    // this.keyPressOption = false;
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    if ((k > 32 && k < 45) || k == 47 || (k > 57 && k < 65) || (k > 90 && k < 95) || k == 96 || (k > 122 && k < 127)) {
      return await event.preventDefault();
    }
  }

  // async RemoveSpecialCharacters(val)
  // {   
  //   // setTimeout(() => {
  //   if(val!=null && val.length>1 && !this.keyPressOption){
  //       const res = await val.replace(/[^a-zA-Z0-9--._-_ - ]/g, "");
  //       // setTimeout(() => {
  //       this.playbookModel.playbookName =res;
  //     // }, 50);
  //     }
  //   this.keyPressOption = false;
  // // }, 100);

  // }

  onPaste(event) {
    if (event) {
      const trimmedText = event.replace(/[`~!@#$%^&*()|+\=?;:%'",.<>\{\}\[\]\\\/]/gi, '');
      (<HTMLInputElement>document.getElementById('playbooknameid')).value = trimmedText;
      this.playbookModel.playbookName = trimmedText
    }
  }

  // ********* Remove Condition in the callHydrationCondition overlay panel ******
  removeFilterConditionCreate(i, fieldName) {
    this.isAddDisable = false
    this.metricValueErr = false
    this.addConditionErr = false
    this.metricOptionErr = false
    this.isValidateFilter = false;
    this.isFilterEqualTimeError = false
    this.isFilterTimeError = false
    this.isFilterErr = false;

    if (fieldName.toLowerCase() == 'removecreate') {
      if (this.playbookModel.filterConditions.length == 0) {
        return false;

      }
      else {
        this.playbookModel.filterConditions.splice(i, 1);
        // this.isDisableMetrics.splice(i, 1)
        // return true;
      }
      if (this.playbookModel.filterConditions.length > 1) {
        this.metricNameIndex = 0
        for (let item of this.metricOption) {
          let metricVar = this.playbookModel.filterConditions.filter(e => e.conditionFilterName == item.value)
          if (metricVar.length >= 2) {
            this.metricOptionErr = true
            this.metricNameIndex = i
            this.isAddDisable = true
            this.isDisableDone = true;
            return
          }
          else {
            this.metricOptionErr = false
            this.isAddDisable = false
            this.isDisableDone = false;
          }

        }
      }
    }
    else {
      if (this.playbookModel.filterConditions.length == 0) {
        return false;
      }
      else {
        this.playbookModel.filterConditions.splice(i, 1);
        // this.isDisableMetrics.splice(i, 1)
        // return true;
      }
      if (this.playbookModel.filterConditions.length > 1) {
        this.metricNameIndex = 0
        for (let item of this.metricOption) {
          let metricVar = this.playbookModel.filterConditions.filter(e => e.conditionFilterName == item.value)
          if (metricVar.length >= 2) {
            this.metricOptionErr = true
            // this.metricNameIndex = i
            this.isAddDisable = true;
            this.isDisableDone = true;
            return
          }
          else {
            this.metricOptionErr = false
            this.isAddDisable = false
            this.isDisableDone = false;
          }
        }
      }
    }
  }

  // ********* Add Condition in the filterConditions ******
  addFilterConditionCreate(fieldName) {
    if (this.playbookModel.filterConditions.length < this.metricOption.length) {
      for (let element of this.playbookModel.filterConditions) {
        if (element.conditionFilterValue.length == 0) {
          this.addConditionErr = true
          this.metricValueErr = false
          this.metricOptionErr = false
          this.isValidateFilter = false
          this.isFilterErr = false;
          setTimeout(() => {
            this.addConditionErr = false
          }, 4000);
          return
        }
        else {
          if (element.conditionFilterName == 'Interaction Start Time (UTC)') {
            if ((element.conditionFilterStartTime != null && element.conditionFilterEndTime == null) || (element.conditionFilterStartTime == null && element.conditionFilterEndTime != null) || (element.conditionFilterStartTime == null && element.conditionFilterEndTime == null)) {
              this.addConditionErr = true
              this.metricValueErr = false
              this.metricOptionErr = false
              this.isValidateFilter = false
              this.isFilterErr = false;
              setTimeout(() => {
                this.addConditionErr = false
              }, 4000);
              return
            }
          }
          else {
            this.addConditionErr = false
            this.isValidateFilter = false
          }
        }
      }
      if(this.isValidateFilter || this.isFilterEqualTimeError || this.isFilterTimeError || this.isFilterErr ){
        return ;
      }

      this.metricOptionErr = false
      this.isDisableDone = false
      if (fieldName.toLowerCase() == 'createcondition') {
        let conditionCreateObj = { conditionFilterName: null, conditionFilterType: null, conditionFilterValue: [], conditionFilterStartTime: null, conditionFilterEndTime: null };
        this.playbookModel.filterConditions.push(conditionCreateObj);
      }
      else {
        let conditionEditObj = { conditionFilterName: null, conditionFilterType: null, conditionFilterValue: [], conditionFilterStartTime: null, conditionFilterEndTime: null };
        this.playbookModel.filterConditions.push(conditionEditObj);
      }
    }
    else {
      this.isAddDisable = false
    }

    if (this.playbookModel.filterConditions.length == this.metricOption.length) {
      this.isAddDisable = true
    }
    else {
      this.isAddDisable = false
    }
    

    // this.isDisableMetrics.push(false)
  }


  //********* get the Filter Condition Value Dropdown data ************ 
  getMetricValue() {
    this.partitionService.getCustomDataOption(this.platfromID).subscribe(
      (data: any) => {
        this.metricValue = data;
      },
      (error) => {
        console.log(error)
      }
    )
  }

  // ******* Bind the Filter Condition Value to DropDown ****
  getMetricValueData(item) {
    if (this.metricValue[item] != undefined && this.metricValue[item].length > 0) {
      this.metricValueOption = this.metricValue[item];
    }
    else {
      this.metricValueOption = [];
    }
  }

  mediaTypeOption: any;
  filterWeekDays: any;
  // ******* get the metricFilterName DropDown data ******
  getFilterDropDownList() {
    this.myPlaybookService.getFilterConditionsDDL().subscribe(
      (data: any) => {
        console
        this.metricOption = data.filterConditions;
        this.mediaTypeOption = data.mediaType;
        this.filterWeekDays = data.dayWeek;
      },
      (error) => {
        console.log(error);
      }
    )

  }

  //******** Validate the metricFilterName is already exist in the dropdown ******
  filterMetricNameValidation(item, i) {
    this.isValidateFilter = false;
    this.isDisableDone = false
    this.getMetricItem = item;
    if (this.playbookModel.filterConditions.length > 1) {
      const metricVar = this.playbookModel.filterConditions.filter(s => s.conditionFilterName == this.getMetricItem)
      if (metricVar.length >= 2) {
        this.metricOptionErr = true
        this.isAddDisable = true
        this.metricValueErr = false
        this.metricNameIndex = i;
        this.isDisableDone = true
        return;
      }
      else {
        this.metricOptionErr = false
        this.isAddDisable = false
        this.isDisableDone = false
      }
    }

    if (this.playbookModel.filterConditions.length == this.metricOption.length) {
      this.isAddDisable = true
    }

    this.playbookModel.filterConditions.forEach((element, index) => {
      if (index == i) {
        element.conditionFilterType = null
      }
    });

  }

  //********** Disable the filterConditionValue and filterConditionName for Create and Edit in Dynamic way */
  filterMetricOnChange(item, index, fieldName) {
    if (fieldName.toLowerCase() == 'createmetric') {
      if (item.length > 0) {
        // this.isDisableMetrics[index] = true;
        this.addConditionErr = false
        this.metricValueErr = false
        this.isValidateFilter = false;
        this.isFilterEqualTimeError = false
        this.isFilterTimeError = false
        this.isFilterErr = false
      }
      // else {
      //   this.isDisableMetrics[index] = false
      // }
    }
    else {
      if (item.length > 0) {
        // this.isDisableMetrics[index] = true;
        this.addConditionErr = false
        this.metricValueErr = false
        this.isValidateFilter = false;
        this.isFilterEqualTimeError = false
        this.isFilterTimeError = false
        this.isFilterErr = false
      }
      // else {
      //   this.isDisableMetrics[index] = false
      // }
    }


  }

  filterTimeOnChange(startTime, endTime) {
    if (startTime != null && endTime != null && startTime != undefined && endTime != undefined) {
      startTime = moment(startTime).format("H:m");
      endTime = moment(endTime).format("H:m");
      let startSplit = startTime.split(":")
      let endSplit = endTime.split(":")
      this.isValidateFilter = false;
      this.metricValueErr = false
      if (parseInt(startSplit[0]) > parseInt(endSplit[0])) {
        this.isFilterTimeError = true;
        this.isFilterEqualTimeError = false;
        this.isFilterErr= false;
        this.isAddDisable = true
        this.isDisableDone = true
        return;
      }
      else {
        if (parseInt(startSplit[0]) == parseInt(endSplit[0])) {
          if (parseInt(startSplit[1]) == parseInt(endSplit[1])) {
            this.isFilterEqualTimeError = true
            this.isAddDisable = true
            this.isDisableDone = true
            this.isFilterTimeError = false
            this.isFilterErr= false;
            return
          }
          else if (parseInt(startSplit[1]) > parseInt(endSplit[1])) {
            this.isFilterTimeError = true
            this.isFilterEqualTimeError = false
            this.isFilterErr= false;
            this.isAddDisable = true
            this.isDisableDone = true
            return
          }
          else {
            this.isFilterEqualTimeError = false
            this.isFilterTimeError = false
            this.isFilterErr= false;
            this.isAddDisable = false
            this.isDisableDone = false
          }
        }
        else {
          this.isFilterEqualTimeError = false
          this.isFilterTimeError = false
          this.isFilterErr= false;
          this.isAddDisable = false;
          this.isDisableDone = false;
        }
      }

    }
    else {
      this.isValidateFilter = false
      this.isFilterEqualTimeError = false;
      this.isFilterTimeError = false;
    }
  }

  addFilterDefinition(event?, defaultEvent?) {
    this.addConditionErr = false;
    for (let item of this.playbookModel.filterConditions) {
      if(item.conditionFilterName != null && item.conditionFilterName != undefined){
      for (let ele of this.metricOption) {
        if(!item.conditionFilterName.toLowerCase().includes('time')){
          if (ele.value == item.conditionFilterName) {
            if (item.conditionFilterValue.length > 0) {
              this.metricValueErr = false
            }
            else {
              this.metricValueErr = true
              this.addConditionErr = false
              break;
            }
          }
          else {
            this.metricValueErr = false;
          }
        }
        else{
          if (item.conditionFilterName == 'Interaction Start Time (UTC)') {
            if(item.conditionFilterValue.length > 0){
            if ((item.conditionFilterStartTime != null && item.conditionFilterEndTime == null) || (item.conditionFilterStartTime == null && item.conditionFilterEndTime != null) || (item.conditionFilterStartTime == null && item.conditionFilterEndTime == null)) {
                this.isFilterErr= true;
                this.metricValueErr = false
              return
            }
          }
          else{
            this.metricValueErr = true;
            this.isFilterErr = false;
            return;
          //   if ((item.conditionFilterStartTime != null && item.conditionFilterEndTime == null) || (item.conditionFilterStartTime == null && item.conditionFilterEndTime != null) || (item.conditionFilterStartTime == null && item.conditionFilterEndTime == null)) {
          //     this.metricValueErr = true
          //     this.isFilterErr= false;
          //   return
          // }
          }
          }
          else {
            this.addConditionErr = false
            this.isValidateFilter = false
            this.isFilterErr= false;
            this.metricValueErr = false;
          }
        }
        
      }
    }

      if (this.metricValueErr ) {
        break;
      }
    }

    // overlay panel to show /hide the panel based on condition and event
    if (defaultEvent != undefined && event != undefined) {
      if (this.metricValueErr == true || this.metricOptionErr == true || this.addConditionErr || this.errBetween == true || this.errSameValue == true || this.isFilterEqualTimeError == true || this.isFilterTimeError == true ||  this.isValidateFilter == true || this.isFilterErr == true ) {
        defaultEvent.show(event);
      }
      else {
        this.metricValueErr = false;
        this.metricOptionErr = false
        this.addConditionErr = false
        this.errBetween = false 
        this.errSameValue = false
        this.isFilterEqualTimeError = false
        this.isFilterTimeError = false  
        this.isValidateFilter = false 
        this.isFilterErr = false
        defaultEvent.hide(event);
      }
    }
  }
}
