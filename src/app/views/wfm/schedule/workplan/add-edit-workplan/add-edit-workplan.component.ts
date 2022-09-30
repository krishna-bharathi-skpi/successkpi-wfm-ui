import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonMethods } from '../../../../../common/common.components';
import { GlobalComponent } from '../../../../../global/global.component';
import { ForecastService } from '../../../forecast/forecast.service';
import { serviceLevelService } from '../../../service-levels/serviceLevel.service';
import { ScheduleService } from '../../schedule.service';
import {isEqual, pick} from 'lodash'

@Component({
  selector: 'app-add-edit-workplan',
  templateUrl: './add-edit-workplan.component.html',
  styleUrls: ['./add-edit-workplan.component.css'],
  providers: [MessageService],
})

export class AddEditWorkplanComponent implements OnInit {

  // To validate a form
  isSubmitted: boolean = false;
  workplanForm: FormGroup;
  description = ''; // to show the description count to user
  wfmConfigs: any = [];
  wfmConfigId: string;
  selectedConfig: any = []; // to select item in a datatable

  model={
    wfmConfigId:null,
    configId:null,
    workgroupId:null,
    workplanId: null
  }

  //edit mode
  workplanId!: number; // to get the specific workplan detail
  isAddMode!: boolean; // to check the mode add/update
  workplanData: any = []; // contains specific workplan data for editing

  workgroupName: string;
  // rules = [
  //   { Key: 'Rule 1', Value: 'Rule 1' },
  //   { Key: 'Rule 2', Value: 'Rule 2' },
  //   { Key: 'Rule 3', Value: 'Rule 3' },
  //   { Key: 'Rule 4', Value: 'Rule 4' },
  //   { Key: 'Rule 5', Value: 'Rule 5' },
  //   { Key: 'Rule 6', Value: 'Rule 6' }
  // ]
  // selectedRules: any;

  // To create a new rules 
  newRules:any = []; 
  isAddRowEnabled:boolean = false;

  ruleTypes:any = []
  ruleCategories:any = [];
  ruleUnits:any = [];

  rulesModel = {
    type: "",
    category: "",
    unit: ""
  }
  
  rules:any = [];
  constRules:any = [];
  workgroupRuleBody = [];
  subRules = [];

  workgroupNames: any = [];
  selectedWorkgroups: any = [];

  // dialog models
  display: boolean = false; // confirm dialog - show/hide
  workgroupsAssignedtoAnotherWorkplan:any = []
  saveMode: string = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonMethods: CommonMethods,
    public global: GlobalComponent,
    private el: ElementRef,
    private forecastService: ForecastService,
    private serviceLevelService: serviceLevelService,
    private scheduleService: ScheduleService,
    private spinnerService: NgxSpinnerService,
    private messageService: MessageService,
  ) {
    this.commonMethods.dynamicBackgroundColorChange('white');

    this.workplanForm = this.formBuilder.group({
      workplanName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9-_ ]*$')]],
      workplanDescription: [null, [Validators.maxLength(400), Validators.pattern('^[a-zA-Z0-9-_,. ]*$')]],
    });
  }

  ngOnInit(): void {
    this.serviceLevelService.alignWfmContainer();
    this.spinnerService.show();
    this.model.wfmConfigId = this.route.snapshot.params['wfmConfigId'];
    this.model.workgroupId = this.route.snapshot.params['workgroupId'];
    this.model.workplanId = this.route.snapshot.params['workplanId'];
    this.isAddMode = !this.model.workplanId;
    if(this.isAddMode){
      this.getWfmConfigs(null);
    }else{
      this.getWorkplanDetail(this.model);
    }
  }

  submitWorkplan(saveMode, override) {
    this.saveMode = saveMode;
      // // To check wfm config is selected
      // let selectedConfigLength = Object.keys(this.selectedConfig).length;
      // if (selectedConfigLength == 0) {
      //   this.messageService.add({ severity:'error', summary: 'Choose any one option from Configuration' });
      //   if(this.wfmConfigs.length > 1){
      //     this.scroll('wfm_configs_table');
      //   }
      //   return
      // }

      // checking form is valid
      this.isSubmitted = true;
      if (this.workplanForm.invalid) {
        // set focus on invalid controls
        for (const key of Object.keys(this.workplanForm.controls)) {
          if (this.workplanForm.controls[key].invalid) {
            const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
            invalidControl.focus();
            break;
          }
        }
        return;
      }

      // to check whether the workgroups are assigned to another workplan
      this.workgroupsAssignedtoAnotherWorkplan = [];
      if(!override){
        this.selectedWorkgroups.forEach(element => {
          if(element.workplanId && element.workplanName){
            this.workgroupsAssignedtoAnotherWorkplan.push(element)
          }
        });
  
        if(this.workgroupsAssignedtoAnotherWorkplan.length){
          this.showDialog();
          return;
        }
      }else{
        this.closeDialog();
      }
      
      // // assigning data for backend
      let dataForBackend = {
          ...this.workplanForm.value,
        wfmConfigId: this.selectedConfig.wfmConfigId,
        configId: this.selectedConfig.configId,
        workgroupId: this.model.workgroupId,
        workPlanWorkGroupData: this.selectedWorkgroups,
        status: 'draft'
      }
      localStorage.setItem('workplanName', this.workplanForm.get('workplanName').value)
      // console.log('dataForBackend:', dataForBackend);

      if (this.isAddMode) {
        // Create workplan payload request
        this.spinnerService.show();
        this.scheduleService.createWorkplan(dataForBackend).subscribe((data: any) => {
          this.messageService.add({ severity: 'success', summary: 'Workplan has been created successfully' });
          setTimeout(() => {
            this.redirectToOrganizeTasksOrWorkplanList(saveMode);
          }, 2000);
        }, (error) => {
          let errorMessage = (error.error.message) ? error.error.message : 'Something went wrong. Please try again later!'
          console.log('error:', errorMessage);
          this.messageService.add({ severity: 'error', summary: errorMessage });
          this.spinnerService.hide();
        })
      } else {
        // Update workplan payload request
        const valuesToCompare = ['workplanName', 'workplanDescription', 'workPlanWorkGroupData']
        const originalLoadedData = pick(this.workplanData, valuesToCompare);
        const payload = {
          ...pick(dataForBackend, valuesToCompare),
          workPlanWorkGroupData: dataForBackend.workPlanWorkGroupData.map(workgroupDetails => {
            return pick(workgroupDetails, ['workgroupId', 'workgroupName'])
          })
        }
        const isModified = !isEqual(payload, originalLoadedData);

        if (isModified) {
          this.spinnerService.show();
          this.scheduleService.updateWorkplan(dataForBackend, this.model).subscribe((data: any) => {
            this.messageService.add({ severity: 'success', summary: 'Workplan has been updated successfully' });
            setTimeout(() => {
              this.redirectToOrganizeTasksOrWorkplanList(saveMode);
            }, 2000);
          }, (error) => {
            let errorMessage = (error.error.message) ? error.error.message : 'Something went wrong. Please try again later!'
            console.log('error:', errorMessage);
            this.messageService.add({ severity: 'error', summary: errorMessage });
            this.spinnerService.hide();
          })
        } else {
          this.redirectToOrganizeTasksOrWorkplanList(saveMode);
        }
      }
  }

  continueToCreateWorkplan(){
    this.submitWorkplan(this.saveMode, true)
  }

  getWorkgroupNames(){
    if (this.model.wfmConfigId) {
      this.scheduleService.getWorkgroupNamesList(this.model).subscribe((data: any) => {
          // console.log('workgroup names list:', data);
          if (data) {
              this.workgroupNames = data;

              // Edit mode
              if(!this.isAddMode){
                this.selectedWorkgroups = [];
                if(this.workplanData.workPlanWorkGroupData.length){
                  this.workplanData.workPlanWorkGroupData.forEach(element => {
                    this.workgroupNames.filter(x => {
                      if(x.workgroupName == element.workgroupName){
                        this.selectedWorkgroups.push(
                          {
                            workgroupId: element.workgroupId,
                            workgroupName: element.workgroupName,
                            workplanId:x.workplanId,
                            workplanName: x.workplanName
                          }
                        )
                      }
                    })
                  });
                }else{
                  this.selectedWorkgroups = [];
                }
              }
          }
          this.spinnerService.hide();
      }, (error) => {
          console.log(error);
          this.spinnerService.hide();
      })
  }
  }

  redirectToOrganizeTasksOrWorkplanList(saveMode){
    if(saveMode == 'continue'){
      let params = {
        pageNo:1,
        pageSize:10,
        orderBy:"desc",
        orderColumn:"workplanId",
        globalText:"",
        workplanName:"",
        workplanDescription:"",
        status: "",
        updateDate:"",
        updateBy:""
      }
      this.scheduleService.getWorkplanList(params, this.model).subscribe((data: any) => {
        if(data){
          let workplan = data.items.filter(x => x.workplanName == this.workplanForm.get("workplanName").value)
          this.router.navigate(['wfm/schedule/workplan/organize_tasks/' + workplan[0].workplanId]);
        }
      });
    }
    else{
      this.router.navigate(['wfm/schedule/workplan/list']);
      this.spinnerService.hide();
    }
  }

  //Edit mode
  getWorkplanDetail(model) {
    this.spinnerService.show();
    this.scheduleService.getWorkplan(model).subscribe((data: any) => {
      if (data) {
        if(data.workplanName){
          this.workplanData = data; // store the response data to forecastData variable
          this.selectedConfig = {
            wfmConfigId: this.workplanData.wfmConfigId,
            configId: this.workplanData.configId
          }
          this.model.wfmConfigId = this.workplanData.wfmConfigId;
          this.model.configId = this.workplanData.configId;
          this.workplanForm.patchValue(this.workplanData) // bind the response data to forecast form
          this.getWorkgroupNames();
          // this.getWfmConfigs(this.workplanData.wfmConfigId); // get wfm config list based on wfm config id 
        }else{
          this.messageService.add({ severity: 'info', summary: 'Workplan detail is not available for Id: ' + this.model.workplanId });
          setTimeout(() => {
            this.router.navigate(['wfm/schedule/workplan/list']);
            this.spinnerService.hide();
          }, 2000);
        }
      }else{
        this.messageService.add({ severity: 'info', summary: 'Workplan detail is not available for Id: ' + this.model.workplanId });
        setTimeout(() => {
          this.router.navigate(['wfm/schedule/workplan/list']);
          this.spinnerService.hide();
        }, 2000);
      }
    }, (error) => {
      console.log('error:', error.error);
      this.messageService.add({ severity: 'error', summary: 'Workplan details are not available', detail: 'Please try again later' });
      this.spinnerService.hide();
    })
  }

  // Getting specific workgroup detail to display workroup name in top bar
  getWorkgroupDetail() {
    this.spinnerService.show();
    this.scheduleService.getWorkgroup(this.model).subscribe((data: any) => {
      if (data) {
        this.workgroupName = data.workgroupName;
        this.spinnerService.hide();
      }
    }, (error) => {
      console.log('error:', error.error);
      this.messageService.add({ severity: 'error', summary: 'Workgroup details are not available', detail: 'Please try again later' });
      this.spinnerService.hide();
    })
  }

  // Page load -get wfm config details
  getWfmConfigs(wfmConfigId) {
    this.forecastService.getWfmConfigId().subscribe((data: any) => {
      if (data.Items[0]) {
        this.wfmConfigs = data.Items;
        if (this.wfmConfigs.length) {
          this.selectedConfig = this.wfmConfigs[0];
          this.model.wfmConfigId = this.wfmConfigs[0].wfmConfigId;
          setTimeout(() => {
            $('.wfm-table #table_row_'+ this.selectedConfig.wfmConfigId).addClass('row-highlight');
          }, 1000);
          this.getWorkgroupNames();
        }
        if (!this.isAddMode) {
          this.preSelectWfmConfig(this.model.wfmConfigId);
        }
      } else {
        this.wfmConfigs = [];
        this.spinnerService.hide();
        this.messageService.add({ severity: 'error', summary: 'Wfm config is not available', detail: 'Please try again later' });
      }
    }, (error) => {
      console.log('error:', error.error.message);
      this.messageService.add({ severity: 'error', summary: 'Wfm config is not available', detail: 'Please try again later' });
      this.spinnerService.hide();
    })
  }

  preSelectWfmConfig(wfmConfigId) {
    setTimeout(() => {
      if(this.wfmConfigs.length > 1){
        $('input:radio[name="configOptions"]').filter('[value="' + wfmConfigId + '"]').prop('checked', true);
        $('input:radio[name="configOptions"]').filter('[value!="' + wfmConfigId + '"]').prop('disabled', true);
      }
      $('.wfm-table #table_row_'+ wfmConfigId).addClass('row-highlight');
      this.selectedConfig = {
        wfmConfigId: this.workplanData.wfmConfigId,
        configId: this.workplanData.configId
      }
      let model = {workgroupId: this.model.workgroupId, wfmConfigId: wfmConfigId}
      this.model.wfmConfigId = wfmConfigId;
      this.getWorkplanDetail(model);
      // this.spinnerService.hide();
    }, 1000);
  }

  // Wfm config onchange to get selected config
  onChangeConfig(config) {
    this.selectedConfig = config;
    this.model.wfmConfigId = config.wfmConfigId;
    // this.selectedConfiglength = Object.keys(this.selectedConfig).length;
    $('#wfm_config_header').removeClass('alert-text');
  }  

  scroll(id) {
    let el = document.getElementById(id);
    el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  }

  getRuleTypesList(){
    this.scheduleService.getRuleTypes().subscribe((data: any) => {
      if (data) {
        this.ruleTypes = data // store the rule type options
        this.getRuleCategoriesList(this.rulesModel);
      }
      if(this.isAddMode){
        this.spinnerService.hide();
      }
    }, (error) => {
      console.log('error:', error.error);
      this.messageService.add({ severity: 'error', summary: 'Workplan rule types are not available', detail: 'Please try again later' });
      this.spinnerService.hide();
    })
  }

  // onChangeRuleType(event){
  //   this.spinnerService.show();
  //   this.rulesModel.type = event.value.Value;
  //   this.getRuleCategoriesList(this.rulesModel);
  // }

  getRuleCategoriesList(rulesModel){
    let ruleType = this.ruleTypes.find(item => { return item.Value == 'workplan'});
    if(ruleType){
      this.rulesModel.type = ruleType.Value;
    }
    if(!ruleType){
      this.messageService.add({ severity: 'error', summary: 'Rule type is not available for workplan', detail: 'Please try again later' });
      this.spinnerService.hide();
      return;
    }
    this.scheduleService.getRuleCategories(ruleType.Value).subscribe((data: any) => {
      if (data) {
        this.ruleCategories = data // store the rule categories options
      }
      if(this.isAddMode){
        this.spinnerService.hide();
      }
    }, (error) => {
      console.log('error:', error.error);
      this.messageService.add({ severity: 'error', summary: 'Workplan rule categories are not available', detail: 'Please try again later' });
      this.spinnerService.hide();
    })
  }

  onChangeRuleCategory(rowIndex, event){
    this.spinnerService.show();
    this.rulesModel.category = event.value.Value;
    this.getRuleUnitsList(rowIndex,this.rulesModel);
  }

  getRuleUnitsList(rowIndex, rulesModel){
    this.scheduleService.getRuleUnits(rulesModel).subscribe((data: any) => {
      if (data) {
        // this.ruleUnits = data // store the rule units options
        this.newRules[rowIndex.serialNo].ruleUnits = data;
      }
      this.spinnerService.hide();
    }, (error) => {
      console.log('error:', error.error);
      this.messageService.add({ severity: 'error', summary: 'Workplan rule units are not available', detail: 'Please try again later' });
      this.spinnerService.hide();
    })
  }

  onChangeRuleUnit(rowIndex, event){
    this.rulesModel.unit = rowIndex.ruleUnit.Value;
    let rules = [];
    this.newRules.forEach(element => {
      if(this.rulesModel.type == 'workplan' && element.ruleCategory.Value == rowIndex.ruleCategory.Value && element.ruleUnit.Value == rowIndex.ruleUnit.Value){
        rules.push(element)
        if(rules.length > 1){
          this.newRules[element.serialNo].rules = null;
          this.messageService.add({ severity: 'error', summary: 'For the rule ' + element.ruleCategory.Value + ' and ' + element.ruleUnit.Value + ' is already added!' });
        }
      }
    });
    if(rules.length > 1){
      return;
    }
    this.spinnerService.show();
    this.getRulesList(rowIndex, this.rulesModel);
  }

  getRulesList(rowIndex, rulesModel){
    this.scheduleService.getRules(rulesModel).subscribe((data: any) => {
      if (data) {
        // adding new keys - ruleValue, isMandatory & status to array
        data.forEach(element => {
          element["ruleValue"] = "",
          element["isMandatory"] = false,
          element["status"] = "Published"
        });
        this.rules = data // to store the rule json
        this.newRules[rowIndex.serialNo].rules = data;
        this.subRules = data;
        this.getconstRulesList(rulesModel);
      }
    }, (error) => {
      console.log('error:', error.error);
      this.messageService.add({ severity: 'error', summary: 'Workplan rule is not available', detail: 'Please try again later' });
      this.spinnerService.hide();
    })
  }

  getconstRulesList(rulesModel){
    this.scheduleService.getRules(rulesModel).subscribe((data: any) => {
      if (data) {
        this.constRules = data // to store the rule json
      }
      this.spinnerService.hide();
    }, (error) => {
      console.log('error:', error.error);
      this.messageService.add({ severity: 'error', summary: 'Workplan rule is not available', detail: 'Please try again later' });
      this.spinnerService.hide();
    })
  }

  addNewRow(){
    this.isAddRowEnabled = true;

    // To validate workplan rule is empty and to check rule value is entered valid/invalid
    let isWorkgroupRulesRowEmpty = false;
    let emptyData = [];
    let invalidData = [];

    if(this.newRules.length){
      this.newRules.forEach(element => {
        
        if(!element.rules){
          isWorkgroupRulesRowEmpty = true;
        }
        if(element.rules){
          element.rules.forEach(element2 =>{
            if(element2.ruleDefaultValue == null || element2.ruleDefaultValue == ''){
              emptyData.push(element2)
            }
            if(element2.ruleDefaultValue < 0){
              invalidData.push(element2)
            }
          })
        }
      })
      if(isWorkgroupRulesRowEmpty){
        this.messageService.add({ severity: 'error', summary: 'Alert!', detail: 'Please fill the incomplete rule and then add new one' });
        return;
      }
      if(emptyData.length){
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'Rule value can not be empty. Plese enter the value' });
        return;
      }
      if(invalidData.length){
        this.messageService.add({ severity: 'error', summary: 'Invalid data', detail: 'Rule value can not be Negative. Plese enter Positive value' });
        return;
      }
    }
    
    // add new rows to array
    this.newRules.push({
      serialNo: this.newRules.length,
      ruleType: null,
      ruleCategory: null,
      ruleUnit: null,
      ruleUnits:null,
      ruleBoundary: null,
      ruleDefaultValue: null,
      rules:null
    })
  }

  saveNewRules(){
    this.workgroupRuleBody = [];
    this.newRules.map(item => {
      item.rules.map(item2 => {
        item2.ruleValue = item2.ruleDefaultValue
        this.workgroupRuleBody.push(item2)
      })
    })
  }

  deleteRow(row){
    this.subRules = [];
    this.newRules.splice(this.newRules.findIndex(item => item.serialNo === row.serialNo),1);
    this.newRules.map(item => {
      if(item.rules.length){
        this.subRules = item.rules
      }
    })
  }

  // Show message to user in dialog
  showDialog() {  
    this.display = true;
  }

  // Hide the dialog
  closeDialog() {
      this.display = false;
  }

}