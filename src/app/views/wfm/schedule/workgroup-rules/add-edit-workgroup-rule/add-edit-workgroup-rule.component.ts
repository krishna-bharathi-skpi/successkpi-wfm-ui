import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import * as $ from "jquery";
import { MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { CommonMethods } from '../../../../../common/common.components';
import { GlobalComponent } from '../../../../../global/global.component';
import { serviceLevelService } from '../../../service-levels/serviceLevel.service';
import { ForecastService } from '../../../forecast/forecast.service';
import { ScheduleService } from '../../schedule.service';
import { element } from 'protractor';

@Component({
  selector: 'app-add-edit-workgroup-rule',
  templateUrl: './add-edit-workgroup-rule.component.html',
  styleUrls: ['./add-edit-workgroup-rule.component.css'],
  providers: [MessageService]
})

export class AddEditWorkgroupRuleComponent implements OnInit {

  @ViewChild('op') panel: OverlayPanel;

  // To validate a form
  isSubmitted: boolean = false;
  isRulesSubmitted: boolean = false;
  // workgroupRuleForm: FormGroup;
  description = ''; // to show the description count to user
  wfmConfigs: any = [];
  selectedConfig: any = []; // to select item in a datatable

  model={
    wfmConfigId:null,
    workgroupId:null,
    workgroupRuleId!: null
  }

  //edit mode
  workgroupRuleId!: any; // to get the specific staffing detail
  isAddMode!: boolean; // to check the mode add/update
  workgroupRuleData: any = []; // contains specific service level detail for editing

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

  // isEditModeEnabled: boolean = false;
  editedData: any = [];
  ruleIds:any = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private el: ElementRef,
    private commonMethods: CommonMethods,
    public global: GlobalComponent,
    private serviceLevelService: serviceLevelService,
    private forecastService: ForecastService,
    private scheduleService: ScheduleService,
    private spinnerService: NgxSpinnerService,
    private messageService: MessageService
  ) {
    this.commonMethods.dynamicBackgroundColorChange('white');

    // this.workgroupRuleForm = this.formBuilder.group({
    //   workgroupRuleName: [null, [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9-_ ]*$')]],
    //   workgroupRuleDescription: [null, [Validators.maxLength(400), Validators.pattern('^[a-zA-Z0-9-_,. ]*$')]],
    // });
  }

  ngOnInit(): void {
    this.serviceLevelService.alignWfmContainer();
    this.spinnerService.show();
    this.model.workgroupId = this.route.snapshot.params['workgroupId'];
    this.model.workgroupRuleId = this.route.snapshot.params['workgroupRuleId'];
    this.model.wfmConfigId = this.route.snapshot.params['wfmConfigId'];
    this.isAddMode = !this.model.workgroupRuleId;
    if (this.isAddMode) {
      this.getWfmConfigs(null);
    } else {
      this.getWorkgroupRuleDetail();
    }
  }

  submitWorkgroupRule() {

    // // To check wfm config is selected
    let selectedConfigLength = Object.keys(this.selectedConfig).length;
    if (selectedConfigLength == 0) {
      this.messageService.add({ severity:'error', summary: 'Choose any one option from Configuration' });
      if(this.wfmConfigs.length > 1){
        this.scroll('wfm_configs_table');
      }
      return
    }

    this.isSubmitted = true;
    if(!this.rulesModel.type || !this.rulesModel.category || !this.rulesModel.unit){
      return
    }

    if(this.rules.length){
      let isRuleDefaultValueInvalidOrNull:boolean = false;
      this.isRulesSubmitted = true;
      this.rules.forEach(element => {
        // if(!element.ruleDefaultValue){
        //   isRuleDefaultValueInvalidOrNull = true;
        // }
        if(element.ruleDefaultValue && element.ruleDefaultValue < 1){
          isRuleDefaultValueInvalidOrNull = true;
          this.messageService.add({ severity:'error', summary: 'Rule value should be greater than zero' });
        }
      });
      if(isRuleDefaultValueInvalidOrNull){
        return
      }
    }

    // // comparing backend data key: ruleDefaultValue with edited data key
    this.spinnerService.show();
    this.constRules.forEach(element => {
      let result = this.editedData.filter(x => x.ruleId == element.ruleId);
      if(!result.length){
        // It will assign the value to rules array when ruleDefaultValue is edited
        this.rules.find(o => o.ruleId === element.ruleId).ruleValue = element.ruleDefaultValue;
      }else if(this.rules.find(o => o.ruleId === element.ruleId).ruleDefaultValue == ""){
        // It will assign the default value to rules array when ruleDefaultValue is empty
        this.rules.find(o => o.ruleId === element.ruleId).ruleValue = element.ruleDefaultValue;
      }
    });

    // console.log('dataForBackend:', dataForBackend);
    if (this.isAddMode) {
      // Create workgroup rule payload request
      this.scheduleService.createWorkgroupRule(this.rules, this.model).subscribe((data: any) => {
        this.messageService.add({ severity:'success', summary: 'Workgroup Rule has been created successfully!' });
        setTimeout(() => {
          this.router.navigate([`wfm/schedule/workgroup_rules/list/${this.model.workgroupId}`]);
          this.spinnerService.hide();
        }, 2000);
      }, (error) => {
        console.log('error:', error.error.message);
        this.messageService.add({ severity: 'error', summary: error.error.message });
        this.spinnerService.hide();
      })
    } else {
      // Update workgroup rule payload request
      this.scheduleService.updateWorkgroupRule(this.rules, this.model).subscribe((data: any) => {
        this.messageService.add({ severity:'success', summary: 'Workgroup Rule has been updated successfully!' });
        setTimeout(() => {
          this.router.navigate([`wfm/schedule/workgroup_rules/list/${this.model.workgroupId}`]);
          this.spinnerService.hide();
        }, 2000);
      }, (error) => {
        console.log('error:', error.error.message);
        this.messageService.add({ severity: 'error', summary: error.error.message });
        this.spinnerService.hide();
      })
    }
  }

  getRuleTypesList(){
    this.scheduleService.getRuleTypes().subscribe((data: any) => {
      if (data) {
        this.ruleTypes = data // store the rule type options
      }
      this.spinnerService.hide();
    }, (error) => {
      console.log('error:', error.error);
      this.messageService.add({ severity: 'error', summary: 'Workgroup rule types are not available', detail: 'Please try again later' });
      this.spinnerService.hide();
    })
  }

  onChangeRuleType(event){
    this.spinnerService.show();
    this.rulesModel.type = event.value.Value;
    this.getRuleCategoriesList(this.rulesModel);
  }

  getRuleCategoriesList(rulesModel){
    this.scheduleService.getRuleCategories(rulesModel.type).subscribe((data: any) => {
      if (data) {
        this.ruleCategories = data // store the rule categories options
      }
      this.spinnerService.hide();
    }, (error) => {
      console.log('error:', error.error);
      this.messageService.add({ severity: 'error', summary: 'Workgroup rule categories are not available', detail: 'Please try again later' });
      this.spinnerService.hide();
    })
  }

  onChangeRuleCategory(event){
    this.spinnerService.show();
    this.rulesModel.category = event.value.Value;
    this.getRuleUnitsList(this.rulesModel);
  }

  getRuleUnitsList(rulesModel){
    this.scheduleService.getRuleUnits(rulesModel).subscribe((data: any) => {
      if (data) {
        this.ruleUnits = data // store the rule units options
      }
      this.spinnerService.hide();
    }, (error) => {
      console.log('error:', error.error);
      this.messageService.add({ severity: 'error', summary: 'Workgroup rule units are not available', detail: 'Please try again later' });
      this.spinnerService.hide();
    })
  }

  onChangeRuleUnit(event){
    this.spinnerService.show();
    this.rulesModel.unit = event.value.Value;
    this.getRulesList(this.rulesModel);
  }

  getRulesList(rulesModel){
    this.scheduleService.getRules(rulesModel).subscribe((data: any) => {
      if (data) {
        data.forEach(element => {
          element.ruleDefaultValue = ""
          element["ruleValue"] = ""
          element["isMandatory"] = false,
          element["status"] = "Published"
        });
        this.rules = data // to store the rule json
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

  //Edit mode
  getWorkgroupRuleDetail() {
    this.spinnerService.show();
    this.scheduleService.getWorkgroupRule(this.model).subscribe((data: any) => {
      if (data) {
        this.workgroupRuleData = data[0] // store the response data to forecastData variable
        // this.workgroupRuleForm.patchValue(this.workgroupRuleData) // bind the response data to forecast form
        this.rulesModel.type = this.workgroupRuleData.ruleType;
        this.rulesModel.category = this.workgroupRuleData.ruleName;
        this.rulesModel.unit = this.workgroupRuleData.ruleUnit;
        this.rules.push(this.workgroupRuleData);
        this.rules.forEach(element => {
          element["ruleDefaultValue"] = element.ruleValue
          element["isMandatory"] = false,
          element["status"] = "Published"
        });
        this.getWfmConfigs(this.workgroupRuleData.wfmConfigId); // get wfm config list based on wfm config id 
      }
    }, (error) => {
      console.log('error:', error.error);
      this.messageService.add({ severity: 'error', summary: 'Workgroup rule details are not available', detail: 'Please try again later' });
      this.spinnerService.hide();
    })
  }

  // Page load -get wfm config details
  getWfmConfigs(wfmConfigId) {
    this.forecastService.getWfmConfigId().subscribe((data: any) => {
      if (data.Items[0]) {
        this.wfmConfigs = data.Items;
        if (this.isAddMode && this.wfmConfigs.length) {
          this.selectedConfig = this.wfmConfigs[0];
          this.model.wfmConfigId = this.wfmConfigs[0].wfmConfigId;
        }
        if (!this.isAddMode) {
          this.preSelectWfmConfig(wfmConfigId);
        }
        this.getRuleTypesList();
        // this.getRuleCategoriesList();
      } else {
        this.wfmConfigs = [];
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
      $('input:radio[name="configOptions"]').filter('[value="' + wfmConfigId + '"]').prop('checked', true);
      $('input:radio[name="configOptions"]').filter('[value!="' + wfmConfigId + '"]').prop('disabled', true);
      this.selectedConfig = {
        wfmConfigId: this.workgroupRuleData.wfmConfigId,
        configId: this.workgroupRuleData.configId
      }
      this.model.wfmConfigId = this.workgroupRuleData.wfmConfigId;
      this.spinnerService.hide();
    }, 1000);
  }

  // Wfm config onchange to get selected config and queue list
  onChangeConfig(config) {
    this.selectedConfig = config;
    this.model.wfmConfigId = config.wfmConfigId;
    this.getRuleTypesList();
  }

  cancelWorkgroupRule() {
    // this.workgroupRuleForm.reset();
    this.router.navigate([`wfm/schedule/workgroup_rules/list/${this.model.workgroupId}`]);
  }

  // enableEditMode(){
  //   this.isEditModeEnabled = true;
  // }

  // disableEditMode(){
  //   this.isEditModeEnabled = false;
  // }

  onChangeInput(data){
    // this.isEditModeEnabled = true;
    let defaultValue = this.constRules.filter(a => a.ruleId == data.ruleId && a.ruleDefaultValue == data.ruleDefaultValue);

    // condition for override the values of default value
    if(!defaultValue.length){
      this.editedData.find(c => c.ruleId === data.ruleId) !== undefined ? this.editedData.find(c => c.ruleId === data.ruleId).ruleDefaultValue = data.ruleDefaultValue : this.editedData.push(data);
      this.editedData.find(c => c.ruleId === data.ruleId) !== undefined ? this.editedData.find(c => c.ruleId === data.ruleId).ruleValue = data.ruleDefaultValue : this.editedData.push(data);
    }
    else{
      // to remove the object from array, if any values are gets roll back
      this.editedData.splice(this.editedData.findIndex(item => item.ruleId === data.ruleId),1);
    }
  }

  scroll(id) {
    let el = document.getElementById(id);
    el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  }

}