import { Component, OnInit } from '@angular/core';
import { CommonMethods } from '../../../common/common.components';
import { PlatformService } from './platform-setting.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PlatformSettingModel } from './platform-setting.model';
import { PreferenceService } from '../successkpi-setting/successkpi-setting.service';
import { TopicService } from '../../playbooks/topics/topics.service';
import { element } from 'protractor';
import { GlobalComponent } from '../../../global/global.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { PartitionService } from '../partition/partition.service';
import { data } from 'jquery';
@Component({
  selector: 'app-platform-setting',
  templateUrl: './platform-setting.component.html',
  styleUrls: ['./platform-setting.component.css']
})
export class PlatformSettingComponent implements OnInit {
  platform: any = []
  selectedPlatform: any;
  platformCenters: any = [];
  checked: boolean = false;
  Editcard: string = "PlatformSetting";
  dataType: any = [];
  selectedData:any=[];
  dataSource: any = [];
  queueDatas: any = [];
  otherDataSource: any = [];
  analyticsDataSource: any = [];

  // realtime Parameters

  agentRTA: Boolean = false;
  queueRTA: Boolean = false;

  platformModel: PlatformSettingModel;
  category: Number;
  dataLocationDDL: any = [];
  defTimeZone: string = "UTC"
  // Form Group
  gensys: FormGroup;
  amazon: FormGroup;
  ujet: FormGroup;
  otherContactCenters: FormGroup;
  textAnalytics: FormGroup;
  talkDesk: FormGroup;
  livevox: FormGroup;
  avaya: FormGroup;

  submittedLivevox: boolean = false;
  submittedAvaya: boolean = false;
  LVTranscription: any = null;
  LVServices: any = null;
  LVDNIS: any = null;
  LVCampaigns: any = null;
  LVTeams: any = null;
  LVAgents: any = null;
  LVServicesFilter: any = null;
  LVServicesFilterList: any = [];
  LVCampaignsFilter: any = null;
  LVCampaignsFilterList: any = [];
  LVTeamsFilter: any = null;
  LVTeamsFilterList: any = [];
  LVAgentsFilter: any = null;
  LVAgentsFilterList: any = [];
  LVDNISFilter: any = null;
  LVDNISFilterList: any = [];
  LVRulesCustomerId: any = '';
  LVRulesConfigId: any = '';
  // LVallowAgentFeedback: any = '';
  LVaccept: any = '';
  LVdispute: any = '';

  genesysRegions = [];
  timeZones = [];
  awsRegions = [];
  languageList: any = [];
  validationError = { dataSource: null, queues: null, ccDataSource: null }
  domainURLLivevox = [];
  loading: boolean = false;
  constructor(private commonMethods: CommonMethods, private platformService: PlatformService,
    private formBuilder: FormBuilder, private preferenceService: PreferenceService,
    private topicService: TopicService, public global: GlobalComponent, private spinnerService: NgxSpinnerService, private partitionService: PartitionService) {
    this.platformModel = new PlatformSettingModel();
    this.commonMethods.dynamicBackgroundColorChange('white');
    this.getpreference();
    // this.getData();
    this.platformCenters = [];
  }

  ngOnInit(): void {

    //General
    this.getTimeZones();
    //  Genesys Methods
    this.genesysForm()
    this.getGenesysRegions();
    this.getLanguages();
    //  this.getPlatforms();
    //  Amazon methods
    this.getAwsRegions();
    this.amazonForm();
    this.ujetForm();
    this.getDataLocations();
    this.getChannel();
    this.s3Script();
    // Others centers
    this.otherContactCenterForm();
    // this.getTextdataLocation();
    // textAnalytics
    this.textAnalyticsForm();
    this.talkdeskForm();
    this.livevoxForm();
    this.avayaForm();
    this.getDomainURLsLivevox();
  }

  //timeZones
  getTimeZones() {
    this.platformService.getTimeZones().subscribe(
      (data: any) => {
        this.timeZones = data;
      },
      (error) => {
        console.log('error', error)
      });
  }

  roleJson: any = [];
  s3Script() {
    this.platformService.s3Script().subscribe(
      (data: any) => {
        this.roleJson = data;
      }
    )
  }
  // data source Loop 
  addDataSource() {
    if (this.platformModel.dataLocations.length == 0) {
      let source = { Key: null, Value: null };
      this.platformModel.dataLocations.push(source);
    }
    else {
      let source = { Key: null, Value: null };;
      this.platformModel.dataLocations.push(source);
    }
  }
  // delete data source using index
  removeDataSource(i) {
    // if (this.platformModel.dataLocations.length == 1) {
    //   return false;
    // } else {
    this.platformModel.dataLocations.splice(i, 1);
    //   return true;
    // }
  }

  //  Add queue loop
  addQueue() {
    if (this.platformModel.queueNameArn.length == 0) {
      let source = { queueName: null, queueArn: null };
      this.platformModel.queueNameArn.push(source);
    }
    else {
      let source = { queueName: null, queueArn: null };
      this.platformModel.queueNameArn.push(source);
    }
  }
  // delete Queue using index
  removeQueue(j) {
    // if (this.platformModel.queueNameArn.length == 1) {
    //   return false;
    // } else {
    this.platformModel.queueNameArn.splice(j, 1);
    return true;
    // }
  }
  // other-contact-center ->data source looop
  otherData() {
    if (this.platformModel.textDataLocations.length == 0) {
      let source = { Key: null, Value: null };
      this.platformModel.textDataLocations.push(source);
    }
    else {
      let source = { Key: null, Value: null };
      this.platformModel.textDataLocations.push(source);
    }
  }
  // remove data source from other contact centers
  removeOtherData(j) {
    // if (this.platformModel.textDataLocations.length == 1) {
    //   return false;
    // } else {
    this.platformModel.textDataLocations.splice(j, 1);
    //   return true;
    // }
  }
  // add data source from text analytics
  addTextAnalytics() {
    if (this.platformModel.textDataLocations.length == 0) {
      let source = { Key: null, Value: null };
      this.platformModel.textDataLocations.push(source);
    }
    else {
      let source = { Key: null, Value: null };
      this.platformModel.textDataLocations.push(source);
    }
  }
  // remove data source from text analytics
  removeAnalytics(j) {
    if (this.platformModel.textDataLocations.length == 1) {
      return false;
    } else {
      this.platformModel.textDataLocations.splice(j, 1);
      return true;
    }
  }
  // its comes from preference choosen dropdown
  // preferencePlatform:any;
  preferencePlatfromName: any = ''
  getpreference() {
    this.spinnerService.show();
    this.preferenceService.getPlatformDetail.subscribe(
      (data: any) => {
        // console.log(data);
        // console.log(data.platformId);

        // this.preferencePlatform = data;
        this.preferencePlatfromName = data.platformName;
        this.selectedPlatform = parseInt(data.platformId);
        this.spinnerService.show();
        this.getPlatforms();
        this.getTextdataLocation();
        // interaction design condition
        if (this.selectedPlatform === 4) {
          this.commonMethods.addToastforlongtime(false, 'Interaction platform design in progress');
        }
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
      }
    )
  }
  // Contact Centers Dropdown
  // getContactCenter(){
  //   this.platformService.getContactCenter().subscribe(
  //     (data:any)=>{
  //       // console.log(data); 
  //       this.platform = data;
  //       console.log(this.platform); 
  //       this.selectedPlatform=this.platform[0].value;
  //       console.log(this.selectedPlatform);

  //     }
  //   )
  // }
  // DataLocation Dropdown
  getDataLocations() {
    this.platformService.getDataLocations().subscribe(
      (data: any) => {
        this.dataLocationDDL = data;
      },
      (error) => {
        console.log(error)
      })
  }
  backBreadCrumb() {
    this.platformModel = new PlatformSettingModel();
    // this.getPlatforms();
    this.Editcard = 'PlatformSetting';
    if (this.selectedPlatform === 2) {
      this.gensys.reset();
      this.submittedGenesys = false;
      this.intervalValidate = false;
      this.errValTrans = false;
      this.errgenesysOrgID = false;
    }
    else if (this.selectedPlatform === 1) {
      this.amazon.reset();
      this.recordLoc = false;
      this.refInterval = false;
      this.roleArnAc = false;
      this.validationError.dataSource = null;
      this.validationError.queues = null;
      this.submittedAmazon = false;
      this.isDataError = false;
      this.dataAccessErr = false;
    }
    else if (this.selectedPlatform === 3) {
      this.otherContactCenters.reset();
      this.submittedOtherContactCenter = false;
      this.validationError.ccDataSource = null;
      this.isDataError = false;
    }
    else if (this.selectedPlatform === 5) {
      this.textAnalytics.reset();
      this.submittedTextAnalytics = false;
      this.validationError.ccDataSource = null;
      this.isDataError = false;
    }
    else if (this.selectedPlatform === 6) {
      this.ujet.reset();
      this.submittedUJET = false;
      this.recordLoc = false;
      this.refInterval = false;
      this.roleArnAc = false;
      this.validationError.queues = null;
    }
    else if (this.selectedPlatform === 7) {
      this.talkDesk.reset();
      this.submittedTalkdesk = false;
    }
    else if (this.selectedPlatform === 9) {
      this.livevox.reset();
      this.LVDNISFilter = [];
      this.LVServicesFilter = [];
      this.LVServicesFilterList = [];
      this.LVDNISFilterList = [];
      this.LVCampaignsFilter = [];
      this.LVCampaignsFilterList = [];
      this.LVServices = null;
      this.LVDNIS = null;
      this.LVCampaigns = null;
      this.LVTeams = null;
      this.LVAgents = null;
      this.LVTeamsFilter = [];
      this.LVTeamsFilterList = [];
      this.LVAgentsFilter = [];
      this.LVAgentsFilterList = [];
      this.LVTranscription = null;
      this.submittedLivevox = false;
      this.LVRulesConfigId = "";
      this.LVRulesCustomerId = "";
    }
    else if (this.selectedPlatform === 10) {
      this.avaya.reset();
      this.LVDNISFilter = [];
      this.LVServicesFilter = [];
      this.LVServicesFilterList = [];
      this.LVDNISFilterList = [];
      this.LVServices = null;
      this.LVDNIS = null;
      this.LVTranscription = null;
      this.submittedAvaya = false;
      this.LVRulesConfigId = "";
      this.LVRulesCustomerId = "";
    }

  }
  // ************************Genesys center**********************
  genesysForm() {
    this.gensys = this.formBuilder.group({
      genesysCenterName: ['', Validators.required],
      clientID: ['', Validators.required],
      clientSecret: ['', Validators.required],
    })
  }
  get validationGenesys() { return this.gensys.controls; }
  submittedGenesys = false;
  onSubmitGenesys() {
    this.submittedGenesys = true;
    if (this.gensys.invalid) {
      return
    }
  }
  keyPressSpaceRemove(event: any) {
    if (event.keyCode == 32) {
      event.preventDefault();
    }
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 32) {
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
    else {
      event.preventDefault();
    }

  }
  g_passwordToggleClientId(value) {
    if (value == 'g-createId') {
      $('#g-toggle-passwordId').toggleClass("fa-eye fa-eye-slash");
      if ($('#g-password-field').attr("type") == "password") {
        $('#g-password-field').attr("type", "text");
      } else {
        $('#g-password-field').attr("type", "password");
      }
    }
    else {
      $('#g-toggle-passwordIdUpdate').toggleClass("fa-eye fa-eye-slash");
      if ($('#g-password-fieldUpdate').attr("type") == "password") {
        $('#g-password-fieldUpdate').attr("type", "text");
      } else {
        $('#g-password-fieldUpdate').attr("type", "password");
      }
    }

  }

  g_passwordToggleClientSecret(value) {
    if (value == 'g-createSecret') {
      $('#g-toggle-passwordSecret').toggleClass("fa-eye fa-eye-slash");
      if ($('#g-password-fieldSecret').attr("type") == "password") {
        $('#g-password-fieldSecret').attr("type", "text");
      } else {
        $('#g-password-fieldSecret').attr("type", "password");
      }
    }
    else {
      $('#g-toggle-passwordSecretUpdate').toggleClass("fa-eye fa-eye-slash");
      if ($('#g-password-fieldSecretUpdate').attr("type") == "password") {
        $('#g-password-fieldSecretUpdate').attr("type", "text");
      } else {
        $('#g-password-fieldSecretUpdate').attr("type", "password");
      }
    }

  }
  getDomainURLsLivevox() {
    this.platformService.getDomainURLsLivevox().subscribe(
      (data: any) => {
        this.domainURLLivevox = data;
      },
      (error) => {
        console.log('error', error)
      });
  }
  getGenesysRegions() {
    this.platformService.getGenesysRegions().subscribe(
      (data: any) => {
        this.genesysRegions = data;
      },
      (error) => {
        console.log('error', error)
      });
  }
  getLanguages() {
    this.platformService.getLanguages().subscribe(
      (data: any) => {
        this.languageList = data;
      },
      (error) => {
        console.log('error', error)
      });
  }

  instanceListDDL: any = [];
  getPlatforms() {
    this.instanceListDDL = [];
    this.spinnerService.show();
    this.platformService.getPlatforms().subscribe(
      (data: any) => {
        this.platformCenters = data.filter(s => {
          if (parseInt(s.platformId) === this.selectedPlatform) {
            s.platformId = parseInt(s.platformId);
            // alert(s.platformId)
            return s;
          }
        })
        if (this.selectedPlatform == 1) {
          this.platformCenters.forEach(element => {
            let params = {
              label: element.instanceId,
              value: element.instanceId
            }
            this.instanceListDDL.push(params);
          });
        }

        this.spinnerService.hide();
      },
      (error) => {
        console.log('error', error);
        this.spinnerService.hide();
      });
  }
  // update Genesys
  relatimeGenesysIntevalUpdate = false;
  historicalGenesysIntevalUpdate = false;
  updateGenesys() {
    if (this.platformModel.genesysHistorcalInterval == 10 || this.platformModel.genesysHistorcalInterval == 15 || this.platformModel.genesysHistorcalInterval == 30 || this.platformModel.genesysHistorcalInterval == 60) {
      this.intervalValidate = false
    }
    else if (this.platformModel.interval == 10 || this.platformModel.interval == 15 || this.platformModel.interval == 30 || this.platformModel.interval == 60) {
      this.intervalValidate = false
    }
    else {
      this.intervalValidate = true
    }

    if (this.platformModel.percentTranscription >= 1 && this.platformModel.percentTranscription <= 100) {
      this.errValTrans = false;
    }
    else {
      this.errValTrans = true;
    }
    if (this.platformModel.genesysOrgId == "" || this.platformModel.genesysOrgId == null) {
      this.errgenesysOrgID = true;
    }
    else {
      this.errgenesysOrgID = false;
    }

    // if (this.platformModel.accept == undefined || this.platformModel.accept == null) {
    //   this.platformModel.accept = false;
    // }
    // if (this.platformModel.dispute == undefined || this.platformModel.dispute == null) {
    //   this.platformModel.dispute = false;
    // }

    if (this.gensys.invalid || this.intervalValidate == true || this.errValTrans == true || this.errgenesysOrgID == true) {
      if (this.gensys.invalid) {
        this.submittedGenesys = true;
      }
      return
    }
    else {
      if (this.platformModel.genesysRealTimeFlag == true) {
        if (this.platformModel.genesysRealTimeInterval == null || this.platformModel.genesysRealTimeInterval < 5) {
          this.relatimeGenesysIntevalUpdate = true;
        }
        else {
          this.relatimeGenesysIntevalUpdate = false;
        }
      }
      else {
        this.relatimeGenesysIntevalUpdate = false;
      }

      if (this.relatimeGenesysIntevalUpdate == false && this.historicalGenesysIntevalUpdate == false) {
        this.loading = true;
        this.spinnerService.show();
        this.setRealTimeParameter();
        this.platformService.updateGenesys(this.platformModel).subscribe(
          (data: any) => {
            this.platformModel = new PlatformSettingModel();
            this.Editcard = 'PlatformSetting';
            this.getPlatforms();
            this.commonMethods.addToastforlongtime(true, 'Platform updated');
            this.loading = false;
            this.spinnerService.hide();
          },
          (error) => {
            this.loading = false;
            console.log('error', error)
            this.spinnerService.hide();
            this.commonMethods.addToastforlongtime(false, error.error);
          })
      }
    }
  }
  relatimeGenesysInteval = false;
  historicalGenesysInteval = false;
  errValTrans: boolean = false;
  errgenesysOrgID: boolean = false;
  saveGenesys() {
    if (this.platformModel.genesysHistorcalInterval == 15 || this.platformModel.genesysHistorcalInterval == 30 || this.platformModel.genesysHistorcalInterval == 60 || this.platformModel.genesysHistorcalInterval == 10) {
      this.intervalValidate = false
    }
    else if (this.platformModel.interval == 15 || this.platformModel.interval == 30 || this.platformModel.interval == 60 || this.platformModel.interval == 10) {
      this.intervalValidate = false
    }
    else {
      this.intervalValidate = true
    }

    if (this.platformModel.percentTranscription >= 1 && this.platformModel.percentTranscription <= 100) {
      this.errValTrans = false;
    }
    else {
      this.errValTrans = true;
    }

    if (this.platformModel.genesysOrgId == "" || this.platformModel.genesysOrgId == null) {
      this.errgenesysOrgID = true;
    }
    else {
      this.errgenesysOrgID = false;
    }
    // if (this.platformModel.accept == undefined || this.platformModel.accept == null) {
    //   this.platformModel.accept = false;
    // }
    // if (this.platformModel.dispute == undefined || this.platformModel.dispute == null) {
    //   this.platformModel.dispute = false;
    // }
    if (this.gensys.invalid || this.intervalValidate == true || this.errValTrans == true || this.errgenesysOrgID == true) {
      if (this.gensys.invalid) {
        this.submittedGenesys = true;
      }
      return
    }
    else {
      if (this.platformModel.genesysRealTimeFlag == true) {
        if (this.platformModel.genesysRealTimeInterval == null || this.platformModel.genesysRealTimeInterval < 5) {
          this.relatimeGenesysInteval = true;
        }
        else {
          this.relatimeGenesysInteval = false;
        }
      }
      else {
        this.relatimeGenesysInteval = false;
      }

      if (this.platformModel.genesysHistorcalInterval == null || (this.platformModel.genesysHistorcalInterval != 15 && this.platformModel.genesysHistorcalInterval != 30 && this.platformModel.genesysHistorcalInterval != 60)) {
        this.historicalGenesysInteval = true;
      }
      else {
        this.historicalGenesysInteval = false;
      }
      if (this.relatimeGenesysInteval == false && this.historicalGenesysInteval == false) {
        this.platformModel.platformName = this.preferencePlatfromName;
        this.platformModel.platformId = this.selectedPlatform;
        this.loading = true;
        this.spinnerService.show();
        this.setRealTimeParameter();
        this.platformService.saveGenesys(this.platformModel).subscribe(
          (data: any) => {
            this.platformModel = new PlatformSettingModel;
            this.getPlatforms();
            this.Editcard = 'PlatformSetting';
            this.commonMethods.addToastforlongtime(true, 'Platform Created');
            this.loading = false;
            this.spinnerService.hide();
          },
          (error) => {
            this.loading = false;
            console.log(error);
            this.spinnerService.hide();
            this.commonMethods.addToastforlongtime(false, error.error);
          })
      }
    }
  }
  // delete Platform
  deletePlatform() {
    this.spinnerService.show();
    this.platformService.deletePlatform(this.platformModel).subscribe(
      (data: any) => {
        this.getPlatforms();
        this.Editcard = 'PlatformSetting';
        this.commonMethods.addToastforlongtime(true, 'Platform deleted');
        this.spinnerService.hide();
      },
      (error) => {
        console.log('error', error)
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      })
  }
  // EditPlatform
  centerName: any
  clientID: any
  clientSecret: any
  createEdit: any = "";
  editPlatform(cards, type) {
    this.getCustomDataDDL(this.selectedPlatform);
    if (this.selectedPlatform.toString() == "9") {
      this.livevox.reset();
      this.LVDNISFilter = [];
      this.LVServicesFilter = [];
      this.LVServicesFilterList = [];
      this.LVDNISFilterList = [];
      this.LVCampaignsFilter = [];
      this.LVCampaignsFilterList = [];
      this.LVServices = null;
      this.LVDNIS = null;
      this.LVCampaigns = null;
      this.LVTeams = null;
      this.LVAgents = null;
      this.LVTeamsFilter = [];
      this.LVTeamsFilterList = [];
      this.LVAgentsFilter = [];
      this.LVAgentsFilterList = [];
      this.LVTranscription = null;
      this.submittedLivevox = false;
      this.LVRulesConfigId = "";
      this.LVRulesCustomerId = "";
      this.livevox.value.platformId = this.selectedPlatform;
      this.livevox.value.platformName = this.preferencePlatfromName;
      this.livevox.value.awsRegion = this.platformModel.awsRegion;
      this.livevox.value.cusTimeZone = this.platformModel.cusTimeZone;
      this.livevox.value.languageCode = this.platformModel.languageCode;


      this.livevox.setValue(this.livevox.value);
    }
    else if (this.selectedPlatform.toString() == "10") {
      this.avaya.reset();
      this.LVDNISFilter = [];
      this.LVServicesFilter = [];
      this.LVServicesFilterList = [];
      this.LVDNISFilterList = [];
      this.LVServices = null;
      this.LVCampaignsFilter = [];
      this.LVCampaignsFilterList = [];
      this.LVDNIS = null;
      this.LVCampaigns = null
      this.LVTranscription = null;
      this.submittedAvaya = false;
      this.LVRulesConfigId = "";
      this.LVRulesCustomerId = "";
      this.avaya.value.platformId = this.selectedPlatform;
      this.avaya.value.platformName = this.preferencePlatfromName;
      this.avaya.value.awsRegion = this.platformModel.awsRegion;
      this.avaya.value.cusTimeZone = this.platformModel.cusTimeZone;
      this.avaya.value.languageCode = this.platformModel.languageCode;


      this.avaya.setValue(this.avaya.value);
    }
    // this.amazon.reset();
    if (type == "create") {
      this.platformModel = new PlatformSettingModel();
      this.recDisable = false;

      if (this.selectedPlatform === 4) {
        this.Editcard = 'PlatformSetting';
        this.commonMethods.addToastforlongtime(false, 'Interaction platform design in progress');
      } else {
        if (this.selectedPlatform == 5) {
          this.platformModel.textDataLocations = [{ Key: null, Value: null }]
        }
        if (this.selectedPlatform === 6) {
          this.platformModel.callrecording = "";
          this.platformModel.dataLocations = [
            { Key: 'callRecording', Value: "" },
            { Key: 'ujetMetadata', Value: "" }
          ];
        }
        this.centerName = "";
        this.clientID = this.platformModel.clientID;
        this.clientSecret = this.platformModel.clientSecret;
        this.Editcard = "editCard";
        this.createEdit = type;
      }

    }
    else {
      this.centerName = cards.cxCenterName;
      this.Editcard = "editCard";
      this.createEdit = type;
      if (this.selectedPlatform === 9) {
        this.LVRulesCustomerId = cards.customerId;
        this.platformModel.configId = this.LVRulesConfigId = cards.configId;
        this.platformModel.cxCenterName = cards.cxCenterName;
        // this.getCustomDataOption(data.customerId, data.platformId);
        this.LVDNISFilter = cards.Dialing_Number == undefined ? null : cards.Dialing_Number;
        this.LVServicesFilter = cards.Services == undefined ? null : cards.Services;
        this.LVServices = cards.isServices == undefined ? null : cards.isServices;
        this.LVDNIS = cards.isDNIS == undefined ? null : cards.isDNIS;
        this.LVTranscription = cards.percentTranscription == undefined ? null : cards.percentTranscription;
        this.LVCampaigns = cards.isCampaigns == undefined ? null : cards.isCampaigns;
        this.LVCampaignsFilter = cards.Campaigns == undefined ? null : cards.Campaigns;
        this.LVTeams = cards.isTeams == undefined ? null : cards.isTeams;
        this.LVTeamsFilter = cards.Teams == undefined ? null : cards.Teams;
        this.LVAgents = cards.isAgents == undefined ? null : cards.isAgents;
        this.LVAgentsFilter = cards.Agents == undefined ? null : cards.Agents;

        this.livevox.reset();
        let values = {
          customerId: cards.customerId,
          configId: cards.configId,
          platformId: cards.platformId,
          platformName: cards.platformName,
          languageCode: cards.languageCode == undefined ? null : cards.languageCode,
          cusTimeZone: cards.cusTimeZone == undefined ? null : cards.cusTimeZone,
          awsRegion: cards.awsRegion == undefined ? null : cards.awsRegion,
          domainURL: cards.domainURL == undefined ? null : cards.domainURL,
          LVAccess: cards.LVAccess == undefined ? null : cards.LVAccess,
          SFTPHostName: cards.SFTPHostName == undefined ? null : cards.SFTPHostName,
          SFTPPassword: cards.SFTPPassword == undefined ? null : cards.SFTPPassword,
          SFTPPort: cards.SFTPPort == undefined ? null : cards.SFTPPort,
          SFTPUserName: cards.SFTPUserName == undefined ? null : cards.SFTPUserName,
          SpeechtxtType: cards.SpeechtxtType == undefined ? null : cards.SpeechtxtType,
          acdType: cards.acdType == undefined ? null : cards.acdType,
          clientName: cards.clientName == undefined ? null : cards.clientName,
          cxCenterName: cards.cxCenterName == undefined ? null : cards.cxCenterName,
          password: cards.password == undefined ? null : cards.password,
          qmType: cards.qmType == undefined ? null : cards.qmType,
          realTimeFlag: cards.realTimeFlag == undefined ? null : cards.realTimeFlag,
          userName: cards.userName == undefined ? null : cards.userName,
          // allowAgentFeedback: cards.allowAgentFeedback == undefined ? null : cards.allowAgentFeedback,
          // accept: cards.accept == undefined ? null : cards.accept,
          // dispute: cards.dispute == undefined ? null : cards.dispute
        }
        this.livevox.setValue(values);

      }
      if (this.selectedPlatform === 10) {
        this.LVRulesCustomerId = cards.customerId;
        this.platformModel.configId = this.LVRulesConfigId = cards.configId;
        this.platformModel.cxCenterName = cards.cxCenterName;
        // this.getCustomDataOption(data.customerId, data.platformId);
        this.LVDNISFilter = cards.Dialing_Number == undefined ? null : cards.Dialing_Number;
        this.LVServicesFilter = cards.Services == undefined ? null : cards.Services;
        this.LVServices = cards.isServices == undefined ? null : cards.isServices;
        this.LVDNIS = cards.isDNIS == undefined ? null : cards.isDNIS;
        this.LVTranscription = cards.percentTranscription == undefined ? null : cards.percentTranscription;


        this.avaya.reset();
        let values = {
          customerId: cards.customerId,
          configId: cards.configId,
          platformId: cards.platformId,
          platformName: cards.platformName,
          languageCode: cards.languageCode == undefined ? null : cards.languageCode,
          cusTimeZone: cards.cusTimeZone == undefined ? null : cards.cusTimeZone,
          awsRegion: cards.awsRegion == undefined ? null : cards.awsRegion,
          SpeechtxtType: cards.SpeechtxtType == undefined ? null : cards.SpeechtxtType,
          acdType: cards.acdType == undefined ? null : cards.acdType,
          clientName: cards.clientName == undefined ? null : cards.clientName,
          cxCenterName: cards.cxCenterName == undefined ? null : cards.cxCenterName,
          qmType: cards.qmType == undefined ? null : cards.qmType,
          realTimeFlag: cards.realTimeFlag == undefined ? null : cards.realTimeFlag,
          // allowAgentFeedback: cards.allowAgentFeedback == undefined ? null : cards.allowAgentFeedback,
          // accept: cards.accept == undefined ? null : cards.accept,
          // dispute: cards.dispute == undefined ? null : cards.dispute
        }
        this.avaya.setValue(values);

      }
      else {
        this.platformModel = JSON.parse(JSON.stringify(cards));
        if (this.selectedPlatform === 6) {
          this.platformModel.domainName = (this.platformModel.domainName === undefined) ? "" : this.platformModel.domainName;
          this.platformModel.dataSyncMethod = (this.platformModel.dataSyncMethod === undefined) ? "s3" : this.platformModel.dataSyncMethod;
          this.platformModel.dataLocations = (this.platformModel.dataLocations === undefined) ? [{ Key: 'callRecording', Value: "" }, { Key: 'ujetMetadata', Value: "" }] : this.platformModel.dataLocations;
        }
        this.readRealTimeParameter()
        this.editRecordingFlag()

        if (this.selectedPlatform === 1) {
          this.platformModel.percentTranscription = this.platformModel.percentTranscription != undefined ? this.platformModel.percentTranscription : 100;
          this.platformModel.SKPI_Recording = this.platformModel.SKPI_Recording != undefined ? this.platformModel.SKPI_Recording : false;
          this.platformModel.Agent_Username = this.platformModel.Agent_Username == undefined ? [] : this.platformModel.Agent_Username;
          this.platformModel.Dialing_Number = this.platformModel.Dialing_Number == undefined ? [] : this.platformModel.Dialing_Number;
          this.platformModel.Instance_id = this.platformModel.Instance_id == undefined ? [] : this.platformModel.Instance_id;
          this.platformModel.Queue_Name = this.platformModel.Queue_Name == undefined ? [] : this.platformModel.Queue_Name;
          this.platformModel.Agent_Username_Flag = this.platformModel.Agent_Username_Flag != undefined ? this.platformModel.Agent_Username_Flag : false;
          this.platformModel.Dialing_Number_Flag = this.platformModel.Dialing_Number_Flag != undefined ? this.platformModel.Dialing_Number_Flag : false;
          this.platformModel.Instance_id_Flag = this.platformModel.Instance_id_Flag != undefined ? this.platformModel.Instance_id_Flag : false;
          this.platformModel.Queue_Name_Flag = this.platformModel.Queue_Name_Flag != undefined ? this.platformModel.Queue_Name_Flag : false;
        }
      }
      // console.log(this.platformModel)
    }


  }
  intervalValidate = false
  intervalValidation() {
    if (this.platformModel.genesysHistorcalInterval == 15 || this.platformModel.genesysHistorcalInterval == 30 || this.platformModel.genesysHistorcalInterval == 60) {
      this.intervalValidate = false
    }
    else if (this.platformModel.interval == 15 || this.platformModel.interval == 30 || this.platformModel.interval == 60) {
      this.intervalValidate = false
    }
    else {
      this.intervalValidate = true
    }
  }

  // ************************Amazon**********************
  amazonForm() {
    this.amazon = this.formBuilder.group(
      {
        centerName: [null, Validators.required],
        instanceID: [null, Validators.required],
        accountID: [null, Validators.required],
      }
    )
  }
  get validationAmazon() { return this.amazon.controls; }
  submittedAmazon = false;
  onSubmitAmazon() {
    this.submittedAmazon = true;
    if (this.amazon.invalid) {
      return
    }
  }


  ujetForm() {
    this.ujet = this.formBuilder.group(
      {
        centerName: [null, Validators.required],
        clientID: ['', Validators.required],
        clientSecret: ['', Validators.required],
        domainName: ['', Validators.required]
      }
    )
  }
  get validationUJET() { return this.ujet.controls; }
  submittedUJET = false;

  onSubmitUJET() {
    this.submittedUJET = true;
    if (this.ujet.invalid) {
      return
    }
  }

  refInterval = false;
  refreshInterval() {
    if (this.platformModel.interval >= 5) {
      this.refInterval = false;
    }
    else {
      this.refInterval = true;
    }
  }
  isDataError = false;
  validations() {
    let conditionFilter = [];
    let queueFilter = [];
    let otherDatasource = [];
    let sameDatasource = [];


    if (this.preferencePlatfromName == 'Amazon Connect') {

      conditionFilter = this.platformModel.dataLocations.filter((o: any) => {
        o.Key = typeof (o.Key) == 'string' ? o.Key.trim() : o.Key;
        return o.Value == null || (o.Key == null || o.Key == '')
      })

      if (this.platformModel.realTimeFlag == true) {
        queueFilter = this.platformModel.queueNameArn.filter((o: any) => {
          o.queueName = typeof (o.queueName) == 'string' ? o.queueName.trim() : o.queueName;
          return o.queueArn == null || (o.queueName == null || o.queueName == '')
        })
      }
    }
    if (this.selectedPlatform === 3 || this.selectedPlatform === 5) {
      otherDatasource = this.platformModel.textDataLocations.filter((o: any) => {
        o.Key = typeof (o.Key) == 'string' ? o.Key.trim() : o.Key;
        return o.Value == null || (o.Key == null || o.Key == '')
      })
    }
    if (conditionFilter.length > 0 || queueFilter.length > 0 || otherDatasource.length > 0) {
      if (conditionFilter.length > 0) {
        this.validationError.dataSource = 'Please enter all fields'
      }
      if (queueFilter.length > 0) {
        this.validationError.queues = 'Please enter all fields'
      }
      if (otherDatasource.length > 0) {
        this.validationError.ccDataSource = 'Please enter all fields'
      }
      // this.submittedThemeCreate=false;
      return true;
    }
    else return false;
  }
  sameDataSource() {
    let sameDatasource: any = [];
    let count = 0;
    if (this.selectedPlatform == 1) {
      if (this.platformModel.dataLocations.length > 1) {
        sameDatasource = this.platformModel.dataLocations.forEach(
          element => {
            this.platformModel.dataLocations.forEach(
              temp => {
                if (element.Key == temp.Key && (element.Key != null && temp.Key != null)) {
                  count++;
                }
                if (count > this.platformModel.dataLocations.length) {
                  this.isDataError = true;
                }
                else {
                  this.isDataError = false;
                }
              }
            )
          }
        )
      }
      else {
        this.isDataError = false;
      }
    }
    else if (this.selectedPlatform == 3 || this.selectedPlatform == 5 || this.selectedPlatform == 6) {
      if (this.platformModel.textDataLocations.length > 1) {
        sameDatasource = this.platformModel.textDataLocations.forEach(
          element => {
            this.platformModel.textDataLocations.forEach(
              temp => {
                if (element.Key == temp.Key && (element.Key != null && temp.Key != null)) {
                  count++;
                }
                if (count > this.platformModel.textDataLocations.length) {
                  this.isDataError = true;
                  return;
                }
                else {
                  this.isDataError = false;
                }
              }
            )
          }
        )
      }
      else {
        this.isDataError = false;
      }
    }
    else {
      this.isDataError = false;
    }
  }
  roleArnAc = false;
  recordLoc = false;

  saveUJET() {
    // if (this.platformModel.connectRecodingLocation == null || this.platformModel.connectRecodingLocation.trim() == '') {
    //   this.recordLoc = true;
    // }
    // else {
    //   this.recordLoc = false;
    // }
    // if (this.platformModel.realTimeFlag == true) {
    //   if (this.platformModel.roleArn == null || this.platformModel.roleArn.trim() == '') {
    //     this.roleArnAc = true;
    //   }
    //   else {
    //     this.roleArnAc = false;
    //   }
    //   if (this.platformModel.interval < 5 || this.platformModel.interval == null) {
    //     this.refInterval = true;
    //   }
    //   else {
    //     this.refInterval = false;
    //   }
    // }
    // else {
    //   this.roleArnAc = false;
    //   this.refInterval = false;
    // }
    if (this.ujet.invalid || this.recordLoc == true || this.roleArnAc == true || this.refInterval == true) {
      if (this.ujet.invalid) {
        this.submittedUJET = true;
      }
      return
    }
    this.platformModel.platformName = this.preferencePlatfromName;
    this.platformModel.platformId = this.selectedPlatform;

    this.platformModel.clientID = this.ujet.value.clientID;
    this.platformModel.clientSecret = this.ujet.value.clientSecret;

    // this.platformModel.cusTimeZone = "UTC";
    this.loading = true;
    this.spinnerService.show();
    this.platformService.saveUjet(this.platformModel).subscribe(
      (data: any) => {
        this.platformModel = new PlatformSettingModel;
        this.getPlatforms();
        this.ujet.reset();
        this.Editcard = 'PlatformSetting';
        this.commonMethods.addToastforlongtime(true, 'Platform Created');
        this.loading = false;
        this.spinnerService.hide();
      },
      (error) => {
        this.loading = false;
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      })
  }

  updateUJET() {
    // if (this.platformModel.connectRecodingLocation == null || this.platformModel.connectRecodingLocation.trim() == '') {
    //   this.recordLoc = true;
    // }
    // else {
    //   this.recordLoc = false;
    // }
    // if (this.platformModel.realTimeFlag == true) {
    //   if (this.platformModel.roleArn == null || this.platformModel.roleArn.trim() == '') {
    //     this.roleArnAc = true;
    //   }
    //   else {
    //     this.roleArnAc = false;
    //   }
    //   if (this.platformModel.interval < 5 || this.platformModel.interval == null) {
    //     this.refInterval = true;
    //   }
    //   else {
    //     this.refInterval = false;
    //   }
    // }
    // else {
    //   this.roleArnAc = false;
    //   this.refInterval = false;
    // }
    if (this.ujet.invalid || this.recordLoc == true || this.roleArnAc == true || this.refInterval == true) {
      if (this.ujet.invalid) {
        this.submittedUJET = true;
      }
      return
    }
    this.platformModel.platformName = this.preferencePlatfromName;
    this.platformModel.platformId = this.selectedPlatform;
    // this.platformModel.cusTimeZone = "UTC";
    this.loading = true;
    this.spinnerService.show();
    this.platformService.updateUjet(this.platformModel).subscribe(
      (data: any) => {
        this.platformModel = new PlatformSettingModel;
        this.getPlatforms();
        this.ujet.reset();
        this.Editcard = 'PlatformSetting';
        this.commonMethods.addToastforlongtime(true, 'Platform updated');
        this.loading = false;
        this.spinnerService.hide();
      },
      (error) => {
        this.loading = false;
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      })
  }

  saveAmazon() {
    this.sameDataSource();
    this.ValidateErrRuleEngine();
    if (this.platformModel.realTimeFlag == true) {
      if (this.platformModel.roleArn == null || this.platformModel.roleArn.trim() == '') {
        this.roleArnAc = true;
      }
      else {
        this.roleArnAc = false;
      }
      if (this.platformModel.interval < 5 || this.platformModel.interval == null) {
        this.refInterval = true;
      }
      else {
        this.refInterval = false;
      }
    }
    else {
      this.roleArnAc = false;
      this.refInterval = false;
    }
    if (this.platformModel.callrecording !== 'None') {
      if (this.platformModel.connectRecodingLocation == null || this.platformModel.connectRecodingLocation.trim() == '') {

        this.recordLoc = true;
      }
      else {
        this.recordLoc = false;
      }
    }
    else {
      this.recordLoc = false;
      this.platformModel.connectRecodingLocation = null;
    }
    this.validationError = { dataSource: null, queues: null, ccDataSource: null }
    let creatValidation = false;
    if (this.platformModel.dataLocations.length > 0 || this.platformModel.realTimeFlag == true) {
      creatValidation = this.validations();
    }
    if (this.dataAccessErr == true) {
      this.commonMethods.addToastforlongtime(false, 'Choose atleast one data filter option, if historical attribute is selected under speech analytics rule')
    }
    if (this.amazon.invalid || creatValidation || this.roleArnAc == true || this.refInterval == true || this.recordLoc == true || this.isDataError == true || this.dataAccessErr == true) {
      if (this.amazon.invalid) {
        this.submittedAmazon = true;
      }
      return
    }
    this.isDataError = false;
    this.platformModel.platformName = this.preferencePlatfromName;
    this.platformModel.platformId = this.selectedPlatform;
    //this.platformModel.cusTimeZone = "UTC";
    this.loading = true;
    this.spinnerService.show();
    this.platformModel.SpeechtxtType = this.platformModel.callrecording == 'Historical' ? true : false;
    // console.log(JSON.stringify(this.platformModel));
    // if (this.platformModel.accept == undefined || this.platformModel.accept == null) {
    //   this.platformModel.accept = false;
    // }
    // if (this.platformModel.dispute == undefined || this.platformModel.dispute == null) {
    //   this.platformModel.dispute = false;
    // }
    this.platformService.saveAmazon(this.platformModel).subscribe(
      (data: any) => {
        this.platformModel = new PlatformSettingModel;
        this.getPlatforms();
        this.amazon.reset();
        this.Editcard = 'PlatformSetting';
        this.commonMethods.addToastforlongtime(true, 'Platform Created');
        this.loading = false;
        this.dataAccessErr = false;
        this.spinnerService.hide();
      },
      (error) => {
        this.loading = false;
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      })
  }
  // channel dropdown in amazon
  channelList: any;
  getChannel() {
    this.topicService.getChannelDropDownList().subscribe(
      (data: any) => {
        this.channelList = data;
      }
    )
  }
  updateAmazon() {
    this.sameDataSource();
    this.ValidateErrRuleEngine();
    if (this.platformModel.realTimeFlag == true) {
      if (this.platformModel.roleArn == null || this.platformModel.roleArn.trim() == '') {
        this.roleArnAc = true
      }
      else {
        this.roleArnAc = false;
      }
      if (this.platformModel.interval < 5 || this.platformModel.interval == null) {
        this.refInterval = true;
      }
      else {
        this.refInterval = false;
      }
    }
    else {
      this.roleArnAc = false;
      this.refInterval = false;
    }
    if (this.platformModel.callrecording !== 'None') {
      if (this.platformModel.connectRecodingLocation == null || this.platformModel.connectRecodingLocation.trim() == '') {
        this.recordLoc = true;
      }
      else {
        this.recordLoc = false;
      }
    }
    else {
      this.recordLoc = false;
      this.platformModel.connectRecodingLocation = null;
    }
    this.validationError = { dataSource: null, queues: null, ccDataSource: null }
    let updateValidation = false;
    if (this.platformModel.dataLocations.length > 0 || this.platformModel.realTimeFlag == true) {
      updateValidation = this.validations();
    }
    if (this.dataAccessErr == true) {
      this.commonMethods.addToastforlongtime(false, 'Choose atleast one data filter option, if historical attribute is selected under speech analytics rule')
    }
    if (this.amazon.invalid || updateValidation || this.roleArnAc == true || this.refInterval == true || this.recordLoc == true || this.isDataError == true || this.dataAccessErr == true) {
      if (this.amazon.invalid) {
        this.submittedAmazon = true;
      }
      return
    }
    //this.platformModel.cusTimeZone = "UTC";
    this.isDataError = false;
    this.loading = true;
    this.spinnerService.show();
    this.platformModel.SpeechtxtType = this.platformModel.callrecording == 'Historical' ? true : false;
    // console.log(this.platformModel);
    // if (this.platformModel.accept == undefined || this.platformModel.accept == null) {
    //   this.platformModel.accept = false;
    // }
    // if (this.platformModel.dispute == undefined || this.platformModel.dispute == null) {
    //   this.platformModel.dispute = false;
    // }
    this.platformService.updateAmazon(this.platformModel).subscribe(
      (data: any) => {
        this.platformModel = new PlatformSettingModel();
        this.Editcard = 'PlatformSetting';
        this.getPlatforms();
        this.commonMethods.addToastforlongtime(true, 'Platform updated');
        this.loading = false;
        this.dataAccessErr = false;
        this.spinnerService.hide();

      },
      (error) => {
        this.loading = false;
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      })
  }

  //get AWS Regions
  getAwsRegions() {
    this.platformService.getAwsRegions().subscribe(
      (data: any) => {
        this.awsRegions = data;
      },
      (error) => {
        console.log('error', error)
      });
  }
  // **************--------------------*******************

  //  ***************Other Contact Center ***************
  ccOtherDataLocations: any = [];
  textDataLocation: any = [];
  getTextdataLocation() {
    this.platformService.getTextdataLocation(this.selectedPlatform).subscribe(
      (data: any) => {
        if (0 != data.length) {
          data.forEach((list) => {
            if (list.PlatformId == 5) {
              this.textDataLocation = list.DataLocation;
              // console.log(this.textDataLocation);
            }
            else if (list.PlatformId == 3) {
              this.ccOtherDataLocations = list.DataLocation;
              // console.log(this.ccOtherDataLocations);
            }
          })
        }
      }
    )
  }
  // Other ContactCenter Form
  otherContactCenterForm() {
    this.otherContactCenters = this.formBuilder.group(
      {
        centerName: [null, Validators.required],
        // clientID: [null, Validators.required],
        // clientSecret: [null, Validators.required],
        recordingLocation: [null, Validators.required],
      }
    )
  }
  get validationOtherContactCenter() { return this.otherContactCenters.controls; }
  submittedOtherContactCenter = false;
  onSubmitOtherContactCenter() {
    this.submittedOtherContactCenter = true;
    if (this.otherContactCenters.invalid) {
      return
    }
  }
  // update
  updateOtherContactCenters() {
    this.sameDataSource();
    this.validationError = { dataSource: null, queues: null, ccDataSource: null }
    let updateValidation = false;
    if (this.platformModel.textDataLocations.length > 0) {
      updateValidation = this.validations();
    }
    if (this.otherContactCenters.invalid || updateValidation || this.isDataError) {
      if (this.otherContactCenters.invalid) {
        this.submittedOtherContactCenter = true;
      }
      return
    }
    this.loading = true;
    this.spinnerService.show();
    this.platformModel.cusTimeZone = "UTC";
    // if (this.platformModel.accept == undefined || this.platformModel.accept == null) {
    //   this.platformModel.accept = false;
    // }
    // if (this.platformModel.dispute == undefined || this.platformModel.dispute == null) {
    //   this.platformModel.dispute = false;
    // }
    this.platformService.updateOtherContactCenters(this.platformModel).subscribe(
      (data: any) => {
        this.platformModel = new PlatformSettingModel();
        this.Editcard = 'PlatformSetting';
        this.getPlatforms();
        this.commonMethods.addToastforlongtime(true, 'Platform updated');
        this.loading = false;
        this.spinnerService.hide();
      },
      (error) => {
        this.loading = false;
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      })
  }
  // save
  saveOtherContactCenter() {
    this.sameDataSource();
    this.validationError = { dataSource: null, queues: null, ccDataSource: null }
    let creatOtherValidation = false;
    if (this.platformModel.textDataLocations.length > 0) {
      creatOtherValidation = this.validations();
    }
    if (this.otherContactCenters.invalid || creatOtherValidation || this.isDataError) {
      if (this.otherContactCenters.invalid) {
        this.submittedOtherContactCenter = true;
      }
      return
    }
    this.platformModel.platformName = this.preferencePlatfromName;
    this.platformModel.platformId = this.selectedPlatform;
    this.platformModel.cusTimeZone = "UTC";
    this.loading = true;
    this.spinnerService.show();
    // if (this.platformModel.accept == undefined || this.platformModel.accept == null) {
    //   this.platformModel.accept = false;
    // }
    // if (this.platformModel.dispute == undefined || this.platformModel.dispute == null) {
    //   this.platformModel.dispute = false;
    // }
    this.platformService.saveOtherContactCenter(this.platformModel).subscribe(
      (data: any) => {
        this.platformModel = new PlatformSettingModel;
        this.getPlatforms();
        this.otherContactCenters.reset();
        this.Editcard = 'PlatformSetting';
        this.commonMethods.addToastforlongtime(true, 'Platform Created');
        this.loading = false;
        this.spinnerService.hide();
      },
      (error) => {
        this.loading = false;
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      })
  }
  // ***************----------------------***************************

  // ***************TextAnalytics***************
  // TextAnalytics Form
  textAnalyticsForm() {
    this.textAnalytics = this.formBuilder.group(
      {
        centerName: [null, Validators.required],
        clientID: [null, Validators.required],
        clientSecret: [null, Validators.required],
      }
    )
  }
  get validationTextAnalytics() { return this.textAnalytics.controls; }
  submittedTextAnalytics = false;
  onSubmitTextAnalytics() {
    this.submittedTextAnalytics = true;
    if (this.textAnalytics.invalid) {
      return
    }
  }
  updateTextAnalytics() {
    this.sameDataSource();
    this.validationError = { dataSource: null, queues: null, ccDataSource: null }
    let updateValidation = this.validations();
    if (this.textAnalytics.invalid || updateValidation || this.isDataError) {
      if (this.textAnalytics.invalid) {
        this.submittedTextAnalytics = true;
      }
      return
    }
    this.loading = true;
    this.spinnerService.show();
    this.platformModel.cusTimeZone = "UTC";
    // if (this.platformModel.accept == undefined || this.platformModel.accept == null) {
    //   this.platformModel.accept = false;
    // }
    // if (this.platformModel.dispute == undefined || this.platformModel.dispute == null) {
    //   this.platformModel.dispute = false;
    // }
    this.platformService.updateTextAnalytics(this.platformModel).subscribe(
      (data: any) => {
        this.platformModel = new PlatformSettingModel();
        this.Editcard = 'PlatformSetting';
        this.getPlatforms();
        this.commonMethods.addToastforlongtime(true, 'Platform updated');
        this.loading = false;
        this.spinnerService.hide();
      },
      (error) => {
        this.loading = false;
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      })
  }
  saveTextAnalytics() {
    this.sameDataSource();
    this.validationError = { dataSource: null, queues: null, ccDataSource: null }
    let creatValidation = this.validations();
    if (this.textAnalytics.invalid || creatValidation || this.isDataError) {
      if (this.textAnalytics.invalid) {
        this.submittedTextAnalytics = true;
      }
      return
    }
    this.platformModel.platformName = this.preferencePlatfromName;
    this.platformModel.platformId = this.selectedPlatform;
    this.platformModel.cusTimeZone = "UTC";
    this.loading = true;
    this.spinnerService.show();
    // if (this.platformModel.accept == undefined || this.platformModel.accept == null) {
    //   this.platformModel.accept = false;
    // }
    // if (this.platformModel.dispute == undefined || this.platformModel.dispute == null) {
    //   this.platformModel.dispute = false;
    // }
    this.platformService.saveTextAnalytics(this.platformModel).subscribe(
      (data: any) => {
        this.platformModel = new PlatformSettingModel;
        this.getPlatforms();
        this.textAnalytics.reset();
        this.Editcard = 'PlatformSetting';
        this.commonMethods.addToastforlongtime(true, 'Platform Created');
        this.loading = false;
        this.spinnerService.hide();
      },
      (error) => {
        this.loading = false;
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      })

  }
  // ***************----------------------***************************

  // ***************LiveVox***************
  livevoxForm() {
    this.livevox = this.formBuilder.group({
      customerId: [null],
      configId: [null],
      platformId: [null],
      platformName: [null],
      languageCode: [null, Validators.required],
      cusTimeZone: [null, Validators.required],
      awsRegion: [null, Validators.required],
      domainURL: [null, Validators.required],
      LVAccess: [null, Validators.required],
      SFTPHostName: [null],
      SFTPPassword: [null],
      SFTPPort: [null],
      SFTPUserName: [null],
      SpeechtxtType: [false],
      acdType: [false],
      clientName: [null, Validators.required],
      cxCenterName: [null, Validators.required],
      password: [null, Validators.required],
      qmType: [false],
      realTimeFlag: [false],
      userName: [null, Validators.required],
      // allowAgentFeedback: [null],
      accept: [null],
      dispute: [null]
    });
  }

  updateLiveVox(checkCreate) {
    console.log(this.livevox.value);

    this.submittedLivevox = true;
    let isError: boolean = false;

    if (this.livevox.invalid) {
      isError = true;
    }
    let values = this.livevox.value;
    console.log('values', values);

    if (isError) {
      return;
    }

    this.submittedLivevox = false;

    this.spinnerService.show();
    this.loading = true;
    // if (values.accept == undefined || values.accept == null) {
    //   values.accept = false;
    // }
    // if (values.dispute == undefined || values.dispute == null) {
    //   values.dispute = false;
    // }
    this.platformService.updateLivevox(values, checkCreate == 'create' ? "/api/platformSettings/createLivevoxCXCenter" : "/api/platformSettings/updateLivevoxCXCenter").subscribe((data: any) => {
      this.platformModel = new PlatformSettingModel;
      this.getPlatforms();
      this.livevox.reset();
      this.Editcard = 'PlatformSetting';
      if(checkCreate == 'create'){
        this.commonMethods.addToastforlongtime(true, 'Platform Created');
      }else{
      this.commonMethods.addToastforlongtime(true, 'Platform updated');
      }
      this.loading = false;
      this.spinnerService.hide();
    },
      (error) => {
        this.loading = false;
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      })
  }
  updateLVRules() {
    this.spinnerService.show();
    let sendData = {
      customerId: this.LVRulesCustomerId,
      configId: this.LVRulesConfigId,
      Dialing_Number: this.LVDNISFilter,
      Services: this.LVServicesFilter,
      isServices: this.LVServices,
      isDNIS: this.LVDNIS,
      Campaigns: this.LVCampaignsFilter,
      isCampaigns: this.LVCampaigns,
      Teams: this.LVTeamsFilter,
      isTeams: this.LVTeams,
      Agents: this.LVAgentsFilter,
      isAgents: this.LVAgents,
      percentTranscription: this.LVTranscription
    }

    if (this.LVTranscription >= 1 && this.LVTranscription <= 100) {
      this.errValTrans = false;
    }
    else {
      this.errValTrans = true;
    }
    if(this.errValTrans == true){
      this.commonMethods.addToastforlongtime(false, 'Please enter transcription between 1 and 100');
      this.spinnerService.hide();
      return
    }
    document.getElementById('closeModal').click();
    this.platformService.updateLivevoxRules(sendData).subscribe((data: any) => {
      this.commonMethods.addToastforlongtime(true, 'Rules updated');
      this.loading = false;
      this.spinnerService.hide();
    },
      (error) => {
        this.loading = false;
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      })
  }
  deleteLabelLV(item,msg) {
    if(item.toLowerCase() == 'dnis'){
      let temVal = JSON.parse(JSON.stringify(this.LVDNISFilter));
      const index: number = this.LVDNISFilter.indexOf(msg);
      if (index !== -1) {
        temVal.splice(index, 1);
        this.LVDNISFilter = temVal;
      }
    }
    else if(item.toLowerCase() == 'services'){
      let temVal = JSON.parse(JSON.stringify(this.LVServicesFilter));
      const index: number = this.LVServicesFilter.indexOf(msg);
      if (index !== -1) {
        temVal.splice(index, 1);
        this.LVServicesFilter = temVal;
      }
    }
    else if(item.toLowerCase() == 'campaigns'){
      let temVal = JSON.parse(JSON.stringify(this.LVCampaignsFilter));
      const index: number = this.LVCampaignsFilter.indexOf(msg);
      if (index !== -1) {
        temVal.splice(index, 1);
        this.LVCampaignsFilter = temVal;
      }
    }
    else if(item.toLowerCase() == 'teams'){
      let temVal = JSON.parse(JSON.stringify(this.LVTeamsFilter));
      const index: number = this.LVTeamsFilter.indexOf(msg);
      if (index !== -1) {
        temVal.splice(index, 1);
        this.LVTeamsFilter = temVal;
      }
    }
    else if(item.toLowerCase() == 'agents'){
      let temVal = JSON.parse(JSON.stringify(this.LVAgentsFilter));
      const index: number = this.LVAgentsFilter.indexOf(msg);
      if (index !== -1) {
        temVal.splice(index, 1);
        this.LVAgentsFilter = temVal;
      }
    }
  }
  // ***************----------------------***************************

  // ***************   Avaya    ***************
  avayaForm() {
    this.avaya = this.formBuilder.group({
      customerId: [null],
      configId: [null],
      platformId: [null],
      platformName: [null],
      languageCode: [null, Validators.required],
      cusTimeZone: [null, Validators.required],
      awsRegion: [null, Validators.required],
      SpeechtxtType: [false],
      acdType: [false],
      clientName: [null, Validators.required],
      cxCenterName: [null, Validators.required],
      qmType: [false],
      realTimeFlag: [false],
      // allowAgentFeedback: [null],
      accept: [null],
      dispute: [null]
    });
  }

  updateAvaya(checkCreate) {
    console.log(this.avaya.value);

    this.submittedAvaya = true;
    let isError: boolean = false;

    if (this.avaya.invalid) {
      isError = true;
    }
    let values = this.avaya.value;

    if (isError) {
      return;
    }

    this.submittedAvaya = false;

    this.spinnerService.show();
    this.loading = true;

    // if (values.accept == undefined || values.accept == null) {
    //   values.accept = false;
    // }
    // if (values.dispute == undefined || values.dispute == null) {
    //   values.dispute = false;
    // }
    this.platformService.updateAvaya(values, checkCreate == 'create' ? "/api/platformSettings/createAvayaCXCenter" : "/api/platformSettings/updateAvayaCXCenter").subscribe((data: any) => {
      this.platformModel = new PlatformSettingModel;
      this.getPlatforms();
      this.avaya.reset();
      this.Editcard = 'PlatformSetting';
      if(checkCreate == 'create'){
        this.commonMethods.addToastforlongtime(true, 'Platform Created');
      }else{
      this.commonMethods.addToastforlongtime(true, 'Platform updated');
      }
      this.loading = false;
      this.spinnerService.hide();
    },
      (error) => {
        this.loading = false;
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      })
  }
  updateAVRules() {
    this.spinnerService.show();
    let sendData = {
      customerId: this.LVRulesCustomerId,
      configId: this.LVRulesConfigId,
      Dialing_Number: this.LVDNISFilter,
      Services: this.LVServicesFilter,
      isServices: this.LVServices,
      isDNIS: this.LVDNIS,
      percentTranscription: this.LVTranscription
    }
    this.platformService.updateLivevoxRules(sendData).subscribe((data: any) => {
      this.commonMethods.addToastforlongtime(true, 'Rules updated');
      this.loading = false;
      this.spinnerService.hide();
    },
      (error) => {
        this.loading = false;
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      })
  }
// ***************----------------------***************************

  //// Extra functions //////////

  setRealTimeParameter() {
    if (this.queueRTA === true || this.agentRTA === true) {
      if (this.queueRTA === true && this.agentRTA === true) {
        this.platformModel.realtimeQueuesOrUsers = "queues,users"
      }
      else if (this.queueRTA === true) {
        this.platformModel.realtimeQueuesOrUsers = "queues"
      }
      else if (this.agentRTA === true) {
        this.platformModel.realtimeQueuesOrUsers = "users"
      }
      else {
        console.log("Please check the parameter with successkpi agent");

      }
    }
    else {
      this.platformModel.realtimeQueuesOrUsers = "";
    }
  }
  readRealTimeParameter() {
    if (this.platformModel.realtimeQueuesOrUsers !== undefined && this.platformModel.realtimeQueuesOrUsers !== null) {
      if (this.platformModel.realtimeQueuesOrUsers.includes('queues')) {
        this.queueRTA = true;
      }
      if (this.platformModel.realtimeQueuesOrUsers.includes('users')) {
        this.agentRTA = true;
      }
    }
  }

  recDisable: boolean = false;
  recordingflag() {
    if (this.platformModel.SpeechtxtType == true || this.platformModel.qmType == true) {
      this.recDisable = true
      this.platformModel.isRecording = true;
    }
    else {
      this.recDisable = false;
      this.platformModel.isRecording = false;
    }
  }

  editRecordingFlag() {
    this.recDisable = false;
    if (this.platformModel.SpeechtxtType == true || this.platformModel.qmType == true) {
      this.recDisable = true
      this.platformModel.isRecording = true;
    }
    if (this.platformModel.isRecording == true) {
      if (this.platformModel.callRecordingOption == undefined || this.platformModel.callRecordingOption == "") {
        this.platformModel.callRecordingOption = "API"
      }
    }
  }

  // Talk Desk Functions

  talkdeskForm() {
    this.talkDesk = this.formBuilder.group({
      cxCenterName: ['', Validators.required],
      clientID: ['', Validators.required],
      clientSecret: ['', Validators.required],
      domainName: ['', Validators.required]
    })
  }
  get validationTalkDesk() { return this.talkDesk.controls; }
  submittedTalkdesk = false;
  onSubmitTalkDesk() {
    this.submittedTalkdesk = true;
    if (this.talkDesk.invalid) {
      return
    }
  }

  saveTalkDesk() {
    if (this.talkDesk.invalid) {
      if (this.talkDesk.invalid) {
        this.submittedTalkdesk = true;
      }
      return
    }
    else {
      this.platformModel.platformName = this.preferencePlatfromName;
      this.platformModel.platformId = this.selectedPlatform;
      this.loading = true;
      this.spinnerService.show();
      // console.log(this.platformModel)
      // if (this.platformModel.accept == undefined || this.platformModel.accept == null) {
      //   this.platformModel.accept = false;
      // }
      // if (this.platformModel.dispute == undefined || this.platformModel.dispute == null) {
      //   this.platformModel.dispute = false;
      // }
      this.platformService.saveTalkDesk(this.platformModel).subscribe(
        (data: any) => {
          this.platformModel = new PlatformSettingModel;
          this.getPlatforms();
          this.talkDesk.reset();
          this.submittedTalkdesk = false;
          this.Editcard = 'PlatformSetting';
          this.commonMethods.addToastforlongtime(true, 'Platform Created');
          this.loading = false;
          this.spinnerService.hide();
        },
        (error) => {
          this.loading = false;
          console.log(error);
          this.spinnerService.hide();
          this.commonMethods.addToastforlongtime(false, error.error);
        })
    }
  }

  updateTalkDesk() {
    if (this.talkDesk.invalid) {
      if (this.talkDesk.invalid) {
        this.submittedTalkdesk = true;
      }
      return
    }
    else {
      this.platformModel.platformName = this.preferencePlatfromName;
      this.platformModel.platformId = this.selectedPlatform;
      this.loading = true;
      this.spinnerService.show();
      // if (this.platformModel.accept == undefined || this.platformModel.accept == null) {
      //   this.platformModel.accept = false;
      // }
      // if (this.platformModel.dispute == undefined || this.platformModel.dispute == null) {
      //   this.platformModel.dispute = false;
      // }
      this.platformService.updateTalkDesk(this.platformModel).subscribe(
        (data: any) => {
          this.platformModel = new PlatformSettingModel;
          this.getPlatforms();
          this.talkDesk.reset();
          this.submittedTalkdesk = false;
          this.Editcard = 'PlatformSetting';
          this.commonMethods.addToastforlongtime(true, 'Platform updated');
          this.loading = false;
          this.spinnerService.hide();
        },
        (error) => {
          this.loading = false;
          console.log(error);
          this.spinnerService.hide();
          this.commonMethods.addToastforlongtime(false, error.error);
        })
    }
  }

  // getData() {
  //   // this.getHistoricalAttr().then((res)=>{
  //   // console.log(res)
  //   this.getCustomDataDDL();
  //   // })
  // }

  // getAttrList:any = [];
  // dataAccessList:any=[]
  // getHistoricalAttr(){
  //   return new Promise((resolve,reject)=>{
  //     this.platformService.getHistoricalAttr().subscribe(
  //       (data:any)=>{
  //         // console.log(data)
  //         this.getAttrList = data;
  //          let arr = [];
  //          this.getAttrList.forEach(element => {
  //           element.dataList = [];
  //           arr.push(element)
  //         });
  //         this.dataAccessList = arr;
  //         // console.log(JSON.stringify(this.dataAccessList))
  //         resolve(data)
  //       },
  //       (error)=>{
  //         console.log(error);
  //         reject(error);
  //       }
  //     )
  //   })
  // }

  ddl_custom_List: any = [];
  customList: any;
  getCustomDataDDL(platformID) {
    this.partitionService.getCustomDataOption(platformID).subscribe(
      (data: any) => {
        this.customList = data;
        if(platformID==9){
          this.LVDNISFilterList = data.DNIS;
          this.LVServicesFilterList = data.Services;
          this.LVCampaignsFilterList = data.Campaigns;
          this.LVTeamsFilterList = data.Teams;
          this.LVAgentsFilterList = data.Agents;
        }
        if(platformID==10){
          this.LVDNISFilterList = data.DNIS;
          this.LVServicesFilterList = data.Services;
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  ddlModelValue(item) {
    this.ddl_custom_List = [];
    if (item.toLowerCase() == 'instances') {
      this.ddl_custom_List = this.instanceListDDL;
    }
    else {
      this.ddl_custom_List = this.customList[item];
    }
  }

  deleteLabel(item, msg) {
    if (item.toLowerCase() == 'instances') {
      let temVal = JSON.parse(JSON.stringify(this.platformModel.Instance_id));
      const index: number = this.platformModel.Instance_id.indexOf(msg);
      if (index !== -1) {
        temVal.splice(index, 1);
        this.platformModel.Instance_id = temVal;
      }
    }

    if (item.toLowerCase() == 'dnis') {
      let temVal = JSON.parse(JSON.stringify(this.platformModel.Dialing_Number));
      const index: number = this.platformModel.Dialing_Number.indexOf(msg);
      if (index !== -1) {
        temVal.splice(index, 1);
        this.platformModel.Dialing_Number = temVal;
      }
    }

    if (item.toLowerCase() == 'agents') {
      let temVal = JSON.parse(JSON.stringify(this.platformModel.Agent_Username));
      const index: number = this.platformModel.Agent_Username.indexOf(msg);
      if (index !== -1) {
        temVal.splice(index, 1);
        this.platformModel.Agent_Username = temVal;
      }
    }

    if (item.toLowerCase() == 'queues') {
      let temVal = JSON.parse(JSON.stringify(this.platformModel.Queue_Name));
      const index: number = this.platformModel.Queue_Name.indexOf(msg);
      if (index !== -1) {
        temVal.splice(index, 1);
        this.platformModel.Queue_Name = temVal;
      }
    }

  }

  selectedValue: any = [];
  onChange(checked, item) {
    if (checked) {
      this.selectedValue.push(item);
    }
    else {
      this.selectedValue.splice(this.selectedValue.indexOf(item), 1);
    }
  }
  openLVRulesPopup(data: any, popup) {
    document.getElementById('rulesLVModalOpen').click();
  }

  dataAccessErr: boolean = false;
  addRule(event, defaultEvent) {
    this.dataAccessErr = false;
    if (this.selectedValue.length > 0) {
      for (let item of this.selectedValue) {
        if (item == 'Queues') {
          if (this.platformModel.Queue_Name_Flag == true && this.platformModel.Queue_Name.length == 0) {
            this.dataAccessErr = true;
            break;
          }
          else if (this.platformModel.Queue_Name_Flag == true && this.platformModel.Queue_Name.length >= 0) {
            this.dataAccessErr = false;
          }
          else {
            this.dataAccessErr = false;
          }
        }
        if (item == 'Agents') {
          if (this.platformModel.Agent_Username_Flag == true && this.platformModel.Agent_Username.length == 0) {
            this.dataAccessErr = true;
            break;
          }
          else if (this.platformModel.Agent_Username_Flag == true && this.platformModel.Agent_Username.length >= 0) {
            this.dataAccessErr = false;
          }
          else {
            this.dataAccessErr = false;
          }
        }
        if (item == 'DNIS') {
          if (this.platformModel.Dialing_Number_Flag == true && this.platformModel.Dialing_Number.length == 0) {
            this.dataAccessErr = true;
            break;
          }
          else if (this.platformModel.Dialing_Number_Flag == true && this.platformModel.Dialing_Number.length >= 0) {
            this.dataAccessErr = false;
          }
          else {
            this.dataAccessErr = false;
          }
        }
        if (item == 'Instances') {
          if (this.platformModel.Instance_id_Flag == true && this.platformModel.Instance_id.length == 0) {
            this.dataAccessErr = true;
            break;
          }
          else if (this.platformModel.Instance_id_Flag == true && this.platformModel.Instance_id.length >= 0) {
            this.dataAccessErr = false;
          }
          else {
            this.dataAccessErr = false;
          }
        }

      }
    }
    else {
      this.dataAccessErr = false;
      defaultEvent.hide(event);
    }

    if (this.dataAccessErr == true) {
      defaultEvent.show(event);
    }
    else {
      this.dataAccessErr = false;
      defaultEvent.hide(event);
    }
  }

  ValidateErrRuleEngine() {
    if (this.selectedValue.length > 0) {
      for (let item of this.selectedValue) {
        if (item == 'Queues') {
          if (this.platformModel.Queue_Name_Flag == true && this.platformModel.Queue_Name.length == 0) {
            this.dataAccessErr = true;
            break;
          }
          else if (this.platformModel.Queue_Name_Flag == true && this.platformModel.Queue_Name.length >= 0) {
            this.dataAccessErr = false;
          }
          else {
            this.dataAccessErr = false;
          }
        }
        if (item == 'Agents') {
          if (this.platformModel.Agent_Username_Flag == true && this.platformModel.Agent_Username.length == 0) {
            this.dataAccessErr = true;
            break;
          }
          else if (this.platformModel.Agent_Username_Flag == true && this.platformModel.Agent_Username.length >= 0) {
            this.dataAccessErr = false;
          }
          else {
            this.dataAccessErr = false;
          }
        }
        if (item == 'DNIS') {
          if (this.platformModel.Dialing_Number_Flag == true && this.platformModel.Dialing_Number.length == 0) {
            this.dataAccessErr = true;
            break;
          }
          else if (this.platformModel.Dialing_Number_Flag == true && this.platformModel.Dialing_Number.length >= 0) {
            this.dataAccessErr = false;
          }
          else {
            this.dataAccessErr = false;
          }
        }
        if (item == 'Instances') {
          if (this.platformModel.Instance_id_Flag == true && this.platformModel.Instance_id.length == 0) {
            this.dataAccessErr = true;
            break;
          }
          else if (this.platformModel.Instance_id_Flag == true && this.platformModel.Instance_id.length >= 0) {
            this.dataAccessErr = false;
          }
          else {
            this.dataAccessErr = false;
          }
        }

      }
    }
    else {
      this.dataAccessErr = false;
    }
  }


  g_passwordTogglePassword(value) {
    if (value == 'g-createId') {
      $('#g-toggle-passwordLV').toggleClass("fa-eye fa-eye-slash");
      if ($('#g-passwordLV-field').attr("type") == "password") {
        $('#g-passwordLV-field').attr("type", "text");
      } else {
        $('#g-passwordLV-field').attr("type", "password");
      }
    }
    else {
      $('#g-toggle-passwordLVUpdate').toggleClass("fa-eye fa-eye-slash");
      if ($('#g-passwordLV-fieldUpdate').attr("type") == "password") {
        $('#g-passwordLV-fieldUpdate').attr("type", "text");
      } else {
        $('#g-passwordLV-fieldUpdate').attr("type", "password");
      }
    }

  }

  g_passwordToggleUsername(value) {
    if (value == 'g-createId') {
      $('#g-toggle-username').toggleClass("fa-eye fa-eye-slash");
      if ($('#g-username-field').attr("type") == "password") {
        $('#g-username-field').attr("type", "text");
      } else {
        $('#g-username-field').attr("type", "password");
      }
    }
    else {
      $('#g-toggle-usernameUpdate').toggleClass("fa-eye fa-eye-slash");
      if ($('#g-username-fieldUpdate').attr("type") == "password") {
        $('#g-username-fieldUpdate').attr("type", "text");
      } else {
        $('#g-username-fieldUpdate').attr("type", "password");
      }
    }

  }

  g_passwordToggleLVAccess(value) {
    if (value == 'g-createId') {
      $('#g-toggle-LVAccess').toggleClass("fa-eye fa-eye-slash");
      if ($('#g-LVAccess-field').attr("type") == "password") {
        $('#g-LVAccess-field').attr("type", "text");
      } else {
        $('#g-LVAccess-field').attr("type", "password");
      }
    }
    else {
      $('#g-toggle-LVAccessUpdate').toggleClass("fa-eye fa-eye-slash");
      if ($('#g-LVAccess-fieldUpdate').attr("type") == "password") {
        $('#g-LVAccess-fieldUpdate').attr("type", "text");
      } else {
        $('#g-LVAccess-fieldUpdate').attr("type", "password");
      }
    }

  }

  g_passwordToggleSFTPPassword(value) {
    if (value == 'g-createId') {
      $('#g-toggle-SFTPPassword').toggleClass("fa-eye fa-eye-slash");
      if ($('#g-SFTPPassword-field').attr("type") == "password") {
        $('#g-SFTPPassword-field').attr("type", "text");
      } else {
        $('#g-SFTPPassword-field').attr("type", "password");
      }
    }
    else {
      $('#g-toggle-SFTPPasswordUpdate').toggleClass("fa-eye fa-eye-slash");
      if ($('#g-SFTPPassword-fieldUpdate').attr("type") == "password") {
        $('#g-SFTPPassword-fieldUpdate').attr("type", "text");
      } else {
        $('#g-SFTPPassword-fieldUpdate').attr("type", "password");
      }
    }

  }

  g_passwordToggleSFTPUserName(value) {
    if (value == 'g-createId') {
      $('#g-toggle-SFTPUserName').toggleClass("fa-eye fa-eye-slash");
      if ($('#g-SFTPUserName-field').attr("type") == "password") {
        $('#g-SFTPUserName-field').attr("type", "text");
      } else {
        $('#g-SFTPUserName-field').attr("type", "password");
      }
    }
    else {
      $('#g-toggle-SFTPUserNameUpdate').toggleClass("fa-eye fa-eye-slash");
      if ($('#g-SFTPUserName-fieldUpdate').attr("type") == "password") {
        $('#g-SFTPUserName-fieldUpdate').attr("type", "text");
      } else {
        $('#g-SFTPUserName-fieldUpdate').attr("type", "password");
      }
    }
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
  //       this.platformModel.cxCenterName = res;
  //     // }, 50);
  //   }
  //   this.keyPressOption = false;
  // }

  onPaste(event) {
    if(event){
       const trimmedText = event.replace(/[`~!@#$%^&*()|+\=?;:%'",.<>\{\}\[\]\\\/]/gi, '');
       (<HTMLInputElement>document.getElementById('cxcenternameid')).value = trimmedText;
       this.platformModel.cxCenterName  = trimmedText
    }
  }

}
