import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonMethods } from '../../../../common/common.components';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { GlobalComponent } from '../../../../global/global.component';
import { ScheduleService } from '../schedule.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { serviceLevelService } from '../../service-levels/serviceLevel.service';
import { ForecastService } from '../../forecast/forecast.service';
import {isEqual, pick} from 'lodash';

@Component({
  selector: 'app-add-edit-workgroup',
  templateUrl: './add-edit-workgroup.component.html',
  styleUrls: ['./add-edit-workgroup.component.css'],
  providers: [MessageService],
})

export class AddEditWorkGroupComponent implements OnInit {

  // To validate a form
  isSubmitted: boolean = false;
  workgroupForm: FormGroup;
  description = ''; // to show the description count to user
  wfmConfigs: any = [];
  wfmConfigId: string;
  selectedConfig: any = []; // to select item in a datatable

  //edit mode
  workgroupId: number; // to get the specific workgroup detail
  isAddMode!: boolean; // to check the mode add/update
  workGroupData: any = []; // contains specific workgroup data for editing

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
  deleteWorkgroupRuleList = [];

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

    this.workgroupId = this.route.snapshot.params['id'];
    this.isAddMode = !this.workgroupId;

    this.workgroupForm = this.formBuilder.group({
      workgroupName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9-_ ]*$')]],
      workgroupDesc: [null, [Validators.maxLength(400), Validators.pattern('^[a-zA-Z0-9-_,. ]*$')]],
      // severeAdherenceThreshold: [null, [Validators.required]],
      // adherenceExceptionThreshold: [null, [Validators.required]],
      // adherenceTarget: [null, [Validators.required]],
      // activityEquivalency: [false],
      // workingOutsideShift: [false]
    });
  }

  ngOnInit(): void {
    this.serviceLevelService.alignWfmContainer();
    this.spinnerService.show();
    this.workgroupId = this.route.snapshot.params['id'];
    this.isAddMode = !this.workgroupId;
    this.getWfmConfigs(null);
  }

  submitWorkgroup(saveMode) {

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
    if (this.workgroupForm.invalid) {
      // set focus on invalid controls
      for (const key of Object.keys(this.workgroupForm.controls)) {
        if (this.workgroupForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
        }
      }
      return;
    }

    // To validate workgroup rule is empty and to check rule value is entered valid/invalid
    let isWorkgroupRulesRowEmpty = false;
    let emptyData = [];
    let invalidData = [];
    let isMinMaxDataInvalid:boolean = false;

    if(this.newRules.length){
      this.newRules.forEach(element => {
        
        if(!element.rules){
          isWorkgroupRulesRowEmpty = true;
        }
        if(element.rules){
          // To check max value is greater than min value
          if(element.rules.length > 1){
            if(element.rules[0].ruleDefaultValue > element.rules[1].ruleDefaultValue){
              isMinMaxDataInvalid = true;
            }
          }
          element.rules.forEach(element2 =>{
            // To check rule value is empty
            if(element2.ruleDefaultValue == null || element2.ruleDefaultValue == ''){
              emptyData.push(element2)
            }
            // To check rule value is valid
            if(element2.ruleDefaultValue < 0){
              invalidData.push(element2)
            }
          })
        }
      })
      if(isWorkgroupRulesRowEmpty){
        this.messageService.add({ severity: 'error', summary: 'Alert!', detail: 'Please fill the incomplete rule or you can delete and save it!' });
        this.scroll('rule_table');
        return;
      }
      if(emptyData.length){
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'Rule value can not be empty. Plese enter the value' });
        this.scroll('rule_table');
        return;
      }
      if(invalidData.length){
        this.messageService.add({ severity: 'error', summary: 'Invalid data!', detail: 'Rule value can not be negative. Plese enter positive value' });
        this.scroll('rule_table');
        return;
      }
      if(isMinMaxDataInvalid){
        this.messageService.add({ severity: 'error', summary: 'Alert!', detail: 'Maximum value must be greater than minimum value' });
        this.scroll('rule_table');
        return;
      }
    }

    // assigning rules to workgroup
    this.workgroupRuleBody = [];
    if(this.newRules.length){
      this.newRules.map(item => {
        item.rules.map(item2 => {
          item2.ruleValue = item2.ruleDefaultValue
          this.workgroupRuleBody.push(item2)
        })
      })
    }
    
    // // assigning data for backend
    let dataForBackend = [{
      wfmConfigId: this.selectedConfig.wfmConfigId,
      configId: this.selectedConfig.configId,
      ...this.workgroupForm.value,
      severeAdherenceThreshold: 0,
      adherenceTarget: 0,
      adherenceExceptionThreshold: 0,
      workgroupRuleData: this.workgroupRuleBody
      // severeAdherenceThreshold: +this.workgroupForm.value.severeAdherenceThreshold,
      // adherenceTarget: +this.workgroupForm.value.adherenceTarget,
      // adherenceExceptionThreshold: +this.workgroupForm.value.adherenceExceptionThreshold
    }]

    if (this.isAddMode) {
      // Create workgroup payload request
      this.spinnerService.show();
      this.scheduleService.createWorkgroup(dataForBackend[0]).subscribe((data: any) => {
        this.messageService.add({ severity: 'success', summary: 'Workgroup has been created successfully' });
        setTimeout(() => {
          this.redirectToAgentListOrWorkgroupList(saveMode);
        }, 2000);
      }, (error) => {
        this.spinnerService.hide();
        console.log('error:', error.error.message);
        this.messageService.add({ severity: 'error', summary: error.error.message });
      })
    } else {
      const originalLoadedData = pick(this.workGroupData, Object.keys(dataForBackend[0]))
      const isModified = !isEqual(dataForBackend[0], originalLoadedData);

      if (isModified) {
        // Update workgroup payload request
        this.spinnerService.show();
        dataForBackend.push({ workgroupId: this.workgroupId, wfmConfigId: this.wfmConfigId });
        this.scheduleService.updateWorkgroup(dataForBackend).subscribe((data: any) => {

          // deleting workgroup rule while updating workgroup
          if (this.deleteWorkgroupRuleList.length) {
            this.deleteWorkgroupRuleList.forEach(element => {
              let model = { wfmConfigId: this.wfmConfigId, workgroupId: this.workgroupId, workgroupRuleId: element.ruleId }
              this.scheduleService.deleteWorkgroupRule(model).subscribe((data: any) => {
                this.deleteWorkgroupRuleList = this.deleteWorkgroupRuleList.filter(({ ruleId }) => ruleId !== element.ruleId);
                if (!this.deleteWorkgroupRuleList.length) {
                  this.messageService.add({ severity: 'success', summary: 'Workgroup has been updated successfully' });
                  setTimeout(() => {
                    this.redirectToAgentListOrWorkgroupList(saveMode);
                  }, 2000);
                }
              }, (error) => {
                console.log(error.error.message);
                this.messageService.add({ severity: 'error', summary: 'Please try again later' });
                this.spinnerService.hide();
              })
            })
          } else {
            this.messageService.add({ severity: 'success', summary: 'Workgroup has been updated successfully' });
            setTimeout(() => {
              this.redirectToAgentListOrWorkgroupList(saveMode);
            }, 2000);
          }
        }, (error) => {
          this.spinnerService.hide();
          console.log('error:', error.error.message);
          this.messageService.add({ severity: 'error', summary: error.error.message });
        })
      } else {
        this.redirectToAgentListOrWorkgroupList(saveMode);
      }
    }
  }

  redirectToAgentListOrWorkgroupList(saveMode){
    if(saveMode == 'continue'){
      let params = {
        pageNo: 1,
        pageSize: 10,
        globalText: "",
        orderBy: "desc",
        orderColumn: "workgroupId",
        workgroupName: "",
        adherThreshold: 0,
        adherTarget: 0,
        excepThreshold:0,
        updateDate: "",
        updateBy: ""
      }
      this.scheduleService.getWorkgroupList(params, this.selectedConfig.wfmConfigId).subscribe((data: any) => {
        if(data){
          let workgroup = data.items.filter(x => x.workgroupName == this.workgroupForm.get("workgroupName").value)
          this.router.navigate(['wfm/schedule/agents/list/' + workgroup[0].workgroupId]);
        }
      });
    }
    else{
      this.router.navigate(['wfm/schedule/workgroup/list']);
      this.spinnerService.hide();
    }
  }

  //Edit mode
  getWorkgroupDetail(params) {
    this.spinnerService.show();
    this.scheduleService.getWorkgroup(params).subscribe((data: any) => {
      if (data) {
        this.workGroupData = data // store the response data to forecastData variable
        this.selectedConfig = {
          wfmConfigId: this.workGroupData.wfmConfigId,
          configId: this.workGroupData.configId
        }
        this.workgroupForm.patchValue(this.workGroupData) // bind the response data to forecast form
        // this.getWfmConfigs(this.workGroupData.wfmConfigId); // get wfm config list based on wfm config id
        if(this.workGroupData.workgroupRuleData){
          this.getRuleTypesList();
        } 
      }else{
        this.messageService.add({ severity: 'info', summary: 'Workgroup detail is not available for Id: ' + this.workgroupId });
        setTimeout(() => {
          this.router.navigate(['wfm/schedule/workgroup/list']);
          this.spinnerService.hide();
        }, 2000);
      }
    }, (error) => {
      console.log('error:', error.error);
      this.messageService.add({ severity: 'error', summary: 'Workgroup details are not available', detail: 'Please try again later' });
      setTimeout(() => {
        this.router.navigate(['wfm/schedule/workgroup/list']);
        this.spinnerService.hide();
      }, 2000);
    })
  }

  // Page load -get wfm config details
  getWfmConfigs(wfmConfigId) {
    this.forecastService.getWfmConfigId().subscribe((data: any) => {
      if (data.Items[0]) {
        this.wfmConfigs = data.Items;
        if (this.wfmConfigs.length) {
          this.selectedConfig = this.wfmConfigs[0];
          this.wfmConfigId = this.wfmConfigs[0].wfmConfigId;
          setTimeout(() => {
            $('.wfm-table #table_row_'+ this.selectedConfig.wfmConfigId).addClass('row-highlight');
          }, 1000);
        }
        if(this.isAddMode){
          this.getRuleTypesList();
        }
        if (!this.isAddMode) {
          this.preSelectWfmConfig(this.wfmConfigId);
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
      // if(this.wfmConfigs.length > 1){
      //   $('input:radio[name="configOptions"]').filter('[value="' + wfmConfigId + '"]').prop('checked', true);
      //   $('input:radio[name="configOptions"]').filter('[value!="' + wfmConfigId + '"]').prop('disabled', true);
      // }
      // $('.wfm-table #table_row_'+ wfmConfigId).addClass('row-highlight');
      this.selectedConfig = {
        wfmConfigId: this.workGroupData.wfmConfigId,
        configId: this.workGroupData.configId
      }
      let model = {workgroupId: this.workgroupId, wfmConfigId: wfmConfigId}
      this.wfmConfigId = wfmConfigId;
      this.getWorkgroupDetail(model);
      // this.spinnerService.hide();
    }, 1000);
  }

  // Wfm config onchange to get selected config
  onChangeConfig(config) {
    this.selectedConfig = config;
    this.wfmConfigId = config.wfmConfigId;
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
    }, (error) => {
      console.log('error:', error.error);
      this.messageService.add({ severity: 'error', summary: 'Workgroup rule types are not available', detail: 'Please try again later' });
      this.spinnerService.hide();
    })
  }

  // onChangeRuleType(event){
  //   this.spinnerService.show();
  //   this.rulesModel.type = event.value.Value;
  //   this.getRuleCategoriesList(this.rulesModel);
  // }

  getRuleCategoriesList(rulesModel){
    let ruleType = this.ruleTypes.find(item => { return item.Value == 'workgroup'});
    if(ruleType){
      this.rulesModel.type = ruleType.Value;
    }
    if(!ruleType){
      this.messageService.add({ severity: 'error', summary: 'Rule type is not available for workgroup', detail: 'Please try again later' });
      this.spinnerService.hide();
      return;
    }
    this.scheduleService.getRuleCategories(ruleType.Value).subscribe((data: any) => {
      if (data) {
        this.ruleCategories = data // store the rule categories options
      }

      // Re-binding the rules for edit mode
      if (!this.isAddMode && this.workGroupData.workgroupRuleData[0].ruleId) {
        // get distinct of rule categories/ rule names

        let rulesData = [];

        // group the distinct data for rule type, rule name and rule unit
        rulesData = this.unique(this.workGroupData.workgroupRuleData, ['ruleType', 'ruleName', 'ruleUnit'])

        let ruleValues = [];
        rulesData.forEach((item, index) => {
          
          // group the rule names and unit 
          ruleValues = this.workGroupData.workgroupRuleData.filter(x => x.ruleName == item.ruleName && x.ruleUnit == item.ruleUnit)

          // add rule default value field to rules array
          ruleValues.forEach(element => {
            element["ruleDefaultValue"] = element.ruleValue
          });

          // sorting the order of rule default values from min to max to check max is greater than min value
          ruleValues = ruleValues?.sort((a, b) => (a.ruleDefaultValue < b.ruleDefaultValue ? -1 : 1))

          // get rule/category name key
          let rule_category = this.ruleCategories.find(x => { return x.Value == item.ruleName })
          
          // generating newRules array to populate on edit workgroup mode
          this.newRules.push({
            serialNo: index,
            ruleType: null,
            ruleCategory: { Value: item.ruleName, Key: rule_category.Key},
            ruleCategories : [{ Value: item.ruleName }],
            ruleUnit: { Value: item.ruleUnit },
            ruleUnits: [{ Value: item.ruleUnit }],
            ruleBoundary: null,
            ruleDefaultValue: null,
            rules: ruleValues,
            editable: false
          })
        })
        this.isAddRowEnabled = true; // flag used to show the dynamic rules section
        if(ruleValues.length){
          this.subRules = ruleValues;
        }
      }
      // console.log('this.newRules:', this.newRules);
      this.spinnerService.hide()
    }, (error) => {
      console.log('error:', error.error);
      this.messageService.add({ severity: 'error', summary: 'Workgroup rule categories are not available', detail: 'Please try again later' });
      this.spinnerService.hide();
    })
  }

  unique(arr, keyProps) {
    const kvArray = arr.map(entry => {
    const key = keyProps.map(k => entry[k]).join('|');
     return [key, entry];
    });
    const map = new Map(kvArray);
    return Array.from(map.values());
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
      this.messageService.add({ severity: 'error', summary: 'Workgroup rule units are not available', detail: 'Please try again later' });
      this.spinnerService.hide();
    })
  }

  onChangeRuleUnit(rowIndex, event){
    this.rulesModel.unit = rowIndex.ruleUnit.Value;
    let rules = [];
    this.newRules.forEach(element => {
      if(this.rulesModel.type == 'workgroup' && element.ruleCategory.Value == rowIndex.ruleCategory.Value && element.ruleUnit.Value == rowIndex.ruleUnit.Value){
        rules.push(element)
        if(rules.length > 1){
          this.newRules[element.serialNo].rules = null;
          this.messageService.add({ severity: 'error', summary:'Alert!', detail: 'For ' + element.ruleCategory.Value + ' and ' + element.ruleUnit.Value + ' is already added!' });
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
      this.messageService.add({ severity: 'error', summary: 'Workgroup rule is not available', detail: 'Please try again later' });
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
      this.messageService.add({ severity: 'error', summary: 'Workgroup rule is not available', detail: 'Please try again later' });
      this.spinnerService.hide();
    })
  }

  addNewRow(){
    this.isAddRowEnabled = true;

    // To validate workgroup rule is empty and to check rule value is entered valid/invalid
    let isWorkgroupRulesRowEmpty = false;
    let emptyData = [];
    let invalidData = [];
    let isMinMaxDataInvalid = false;

    if(this.newRules.length){
      this.newRules.forEach(element => {
        
        if(!element.rules){
          isWorkgroupRulesRowEmpty = true;
        }
        if(element.rules){
          // To check max value is greater than min value
          if(element.rules.length > 1){
            if(element.rules[0].ruleDefaultValue > element.rules[1].ruleDefaultValue){
              isMinMaxDataInvalid = true;
            }
          }
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
      if(isMinMaxDataInvalid){
        this.messageService.add({ severity: 'error', summary: 'Alert!', detail: 'Maximum value must be greater than minimum value' });
        this.scroll('rule_table');
        return;
      }
    }
    
    // add new rows to array
    this.newRules.push({
      serialNo: this.newRules.length,
      ruleType: null,
      ruleCategory: null,
      ruleCategories: null,
      ruleUnit: null,
      ruleUnits:null,
      ruleBoundary: null,
      ruleDefaultValue: null,
      rules:null,
      editable: true
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
    if(!this.isAddMode){
      row.rules.forEach(element => {
        this.deleteWorkgroupRuleList.push(element);
      });
    }
    
  }

}