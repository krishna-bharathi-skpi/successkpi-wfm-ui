///eval

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import { CategoryInput, EvaluationModel, CategoryModel } from './evaluation-forms.model';
import { EvaluationFormsService } from './evaluation-forms.service';
import { CommonMethods } from '../../../common/common.components';
import { MyPlaybookService } from '../../playbooks/myplaybook/myplaybook.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalComponent } from '../../../global/global.component';
import { NgxSpinnerService } from "ngx-spinner";
import { UserData } from '../../../user';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { v4 as uuidv4 } from 'uuid';
import { count } from 'console';
import { PartitionService } from '../../settings/partition/partition.service';
import { PreferenceService } from '../../settings/successkpi-setting/successkpi-setting.service';
import { MessageService } from 'primeng';
@Component({
  selector: 'app-evaluation-forms',
  templateUrl: './evaluation-forms.component.html',
  styleUrls: ['./evaluation-forms.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EvaluationFormsComponent implements OnInit {
  collapse: string = 'down';
  collapseEdit: string = 'down';
  //   template: string =`<html>
  //   <body>
  //   <div class="loadingio-spinner-dual-ring-eqj1yt32h0c">
  //   <div class="ldio-k62zfqoxtwr">
  //   <div></div>
  //   <div>
  //       <div>
  //       </div>
  //   </div>
  //   </div>
  // </div>
  // </body>
  // </html>`
  questionChoices: any = [];
  selectedCity: any = [];
  cookieToken: any;
  decode: any;
  customerId: any;
  query: any;
  strategyItems: any;
  List: any = [];
  issubmitCreate: boolean = false;
  issubmitEdit: boolean = false;

  cards: any = [];

  getStrategyValue: any = '';
  filteredThemeList: any[];
  allcards: any = [];
  searchEvaluationRoomName: any;
  public evaluationModel: any;
  categoryInput: CategoryInput;
  categoryModel: CategoryModel;
  createEvaluationForm: FormGroup;
  editEvaluationForm: FormGroup;
  createOrEditEvaluation: string = "list";
  loading: boolean = false;
  users: any;
  selectedUser: any = [];
  percentageDropdown = [{ label: 'HOURLY', value: 'HOURLY' }, { label: 'DAILY', value: 'DAILY' }];
  ruleDropdown = [{ label: 'DAILY', value: 'DAILY' }, { label: 'WEEKLY', value: 'WEEKLY' }, { label: 'MONTHLY', value: 'MONTHLY' }];
  percentageSend: number = null;
  percentageDuration: string = '';
  ruleSend: number = null;
  ruleDuration: string = '';
  allConditionMet: any = 'All';
  disabledConditionalDisplayOption: boolean = false;
  stateOptions: any = [{ label: 'Radio', value: 'radio' }, { label: 'Dropdown', value: 'dropdown' }];
  metricValue: any = [];
  metricOption: any = [];
  metricValueOption: any = [];
  getPlatformValue: any = '';
  isDisableMetrics: boolean[] = [];                 // Disable the metric name after choosing the metricvalue in overlay panel
  metricNameIndex: any;
  getMetricItem: any = ''
  metricOptionErr: boolean = false                  //Error message for choose same metricname in dropdown 
  metricValueErr: boolean = false;                  //Error message for not choosing the metricvalue in dropdown
  addConditionErr: boolean = false                  // Error message for create condition without choosing existing metricname and value
  isAddDisable: boolean = false                     // Disable the add condition button in overlaypanel
  isDisableDone: boolean = false                     // Disable the Done button with validation

  constructor(public playbookService: MyPlaybookService, private evaluationService: EvaluationFormsService,
    private commonMethods: CommonMethods, private fb: FormBuilder, public global: GlobalComponent
    , private spinnerService: NgxSpinnerService, private partitionService: PartitionService, private preferenceService: PreferenceService, private messageService: MessageService,private myPlaybookService:MyPlaybookService) {
    this.evaluationModel = new EvaluationModel();
    // console.log('this.evaluationModel', this.evaluationModel);
    this.commonMethods.dynamicBackgroundColorChange('default');
    this.getPlatform().then(() => {
      this.getHydrationDropDownList();
      this.getMetricValue();
      this.getConfigFormDossierId();
    })
      this.getConditionJSON();
  }

  ngOnInit() {

    this.getQuestionDropDownList();
    this.cookieToken = this.commonMethods.decryptData(localStorage.getItem('userToken'));
    this.decode = jwtDecode(this.cookieToken);
    this.customerId = this.decode['custom:customerId'];
    this.evaluationForms();
    this.getThemes();
    this.getEvaluation();
    this.userEvaluatorDDL()
    setTimeout(() => {
      this.evaluationModel.automaticHydrationDetail = {
        automaticcallhydration: true,
        rulebasedDetail: {
          rulebased: 'percentage',
          percentage: {
            send: null, duration: '',
          },
          rule: {
            send: null, duration: '',
          },
        }
      };

    }, 100);
  }

  // delete evaluator user
  deleteEvalEdit(msg) {
    let tempEditEvaluator = JSON.parse(JSON.stringify(this.evaluationModel.userEvaluator));
    const index: number = this.evaluationModel.userEvaluator.indexOf(msg);
    if (index !== -1) {
      tempEditEvaluator.splice(index, 1);
      this.evaluationModel.userEvaluator = tempEditEvaluator;
    }
  }

  // delete evaluator user
  deleteEvalModEdit(msg) {
    let tempEditModerator = JSON.parse(JSON.stringify(this.evaluationModel.userModerator));
    const index: number = this.evaluationModel.userModerator.indexOf(msg);
    if (index !== -1) {
      tempEditModerator.splice(index, 1);
      this.evaluationModel.userModerator = tempEditModerator;
    }
  }

  deleteEvalCoachCreate(msg) {
    let tempEditModerator = JSON.parse(JSON.stringify(this.evaluationModel.userCoaches));
    const index: number = this.evaluationModel.userCoaches.indexOf(msg);
    if (index !== -1) {
      tempEditModerator.splice(index, 1);
      this.evaluationModel.userCoaches = tempEditModerator;
    }
  }

  deleteEvalCreate(msg) {
    let tempCreateEvaluator = JSON.parse(JSON.stringify(this.evaluationModel.userEvaluator));
    const index: number = this.evaluationModel.userEvaluator.indexOf(msg);
    if (index !== -1) {

      tempCreateEvaluator.splice(index, 1);
      this.evaluationModel.userEvaluator = tempCreateEvaluator;

    }
  }


  //***********************************************Evaluation functions**********************************************************/
  //Form validation
  evaluationForms() {
    this.createEvaluationForm = this.fb.group({
      createEvalutionName: ['', Validators.required],
      createThemeName: ['', Validators.required],
    })
    this.editEvaluationForm = this.fb.group({
      editEvalutionName: ['', Validators.required],
      editThemeName: ['', Validators.required],
    })
  }

  //search cards
  search() {
    this.cards = this.allcards.filter(item => item.evaluationRoomName.toLowerCase().includes(this.searchEvaluationRoomName.toLowerCase()))
  }
  userModel: any = [];
  //create a new evaluation 
  createNewEvaluationForm() {
    this.commonMethods.dynamicBackgroundColorChange('white');
    // let userModel = this.evaluationModel.userEvaluator
    this.evaluationModel = new EvaluationModel();
    this.createOrEditEvaluation = 'create';
    // this.evaluationForms();
    this.closePopupText = JSON.parse(JSON.stringify(this.evaluationModel))
    this.evaluationModel.userEvaluator = this.userModel;
    this.coachPopUP = false;
    // this. evaluationModel.ruletype='HOURLY';
    this.evaluationModel.automaticcallhydration = false;
    this.evaluationModel.rulebased = '';
    this.evaluationModel.percentageDuration = 'HOURLY';
    this.percentageSend = null;
    this.percentageDuration = '';
    this.ruleSend = null;
    this.ruleDuration = '';
    this.conditionalSkipChoiceOptionList = [];
    this.conditionalSkipChoiceYesNoList = [];
    this.isDisableMetrics = []
    this.isAddDisable = false;
    this.metricOptionErr = false;
    this.metricValueErr = false;
    this.addConditionErr = false
    this.isDisableDone = false;
    this.isDisplayErr = false;
    this.hyperlink = false;
    this.hyperDisplayErr = false
    this.hyperURLErr = false;
  }

  //edit a evaluation
  userLabel: any;
  closePopupText: any = [];
  async clickCard(evalutionCard) {
    // console.log('evalutionCard', evalutionCard);
    this.evaluationModel = new EvaluationModel();
    let arr: any = []
    let moderatorArr: any = [];
    let coachArr: any = []






    await evalutionCard.questionsList.forEach(element => {
      element.Topics.questions.forEach((element1, index) => {
        if (element1.questionChoice == 'Number') {
          if (element1.questionValue != undefined) {
            if (element1.questionValue?.toString().includes('=')) {
              element1.topicQuestionValueMinimumEdit = element1.questionValue.split("=")[0];
              element1.topicQuestionValueMaximumEdit = element1.questionValue.split("=")[1];
            }
            if (element1.questionValue?.toString().includes('-')) {
              element1.topicQuestionValueMinimumEdit = element1.questionValue.split("-")[0];
              element1.topicQuestionValueMaximumEdit = element1.questionValue.split("-")[1];
            }

          }
        }
        if (element1.questionChoice == 'Yes/No') {
          if (element1.questionValue != undefined) {
            if (element1.questionValue?.toString().includes('=')) {
              element1.topicQuestionValueYesEdit = element1.questionValue.split(",")[0]?.split("=")[1];
              element1.topicQuestionValueNoEdit = element1.questionValue.split(",")[1]?.split("=")[1];
            }
            if (element1.questionValue?.toString().includes('-')) {
              element1.topicQuestionValueYesEdit = element1.questionValue.split(",")[0]?.split("-")[1];
              element1.topicQuestionValueNoEdit = element1.questionValue.split(",")[1]?.split("-")[1];
            }
          }
        }
        // debugger
        if (element1.questionChoice == 'Choice') {
          // if (element1.topicQuestionChoiceArrayInputsEdit==undefined) {
          element1.topicQuestionChoiceArrayInputsEdit = [];
          // }
          let tempArrChoice = [];
          if (element1.questionValue != undefined) {
            tempArrChoice = element1.questionValue.split(",");

          }

          tempArrChoice.forEach((element2, index2) => {
            if (element2?.includes('=')) {
              element1.topicQuestionChoiceArrayInputsEdit.push({
                topicQuestionChoiceQuestionEdit: element2.split("=")[0],
                topicQuestionChoiceValueEdit: (element2.split("=")[1] == '' || element2.split("=")[1] == null || element2.split("=")[1] == undefined) ?
                  ((element2.split("=")[2] == null || element2.split("=")[2] == undefined) ? '' : '-' + element2.split("=")[2]) : element2.split("=")[1]
              });
            } else if (element2?.includes('-')) {
              element1.topicQuestionChoiceArrayInputsEdit.push({
                topicQuestionChoiceQuestionEdit: element2.split("-")[0],
                topicQuestionChoiceValueEdit: (element2.split("-")[1] == '' || element2.split("-")[1] == null || element2.split("-")[1] == undefined) ?
                  ((element2.split("-")[2] == null || element2.split("-")[2] == undefined) ? '' : '-' + element2.split("-")[2]) : element2.split("-")[1]
              });
            }
          });
        }

        if (element1.questionChoice == "Choice" || element1.questionChoice == "Yes/No"
          && element1?.defaultanswer != undefined && element1?.defaultanswer != null) {
          // console.log('element1.defaultanswer', element1.defaultanswer);
          if (element1.questionChoice == "Choice" && element1.defaultanswer?.Answer != undefined && element1.defaultanswer?.Answer != null) {
            element1.defaultanswer = element1.defaultanswer?.Answer;
          } else {
            element1.defaultanswer = element1.defaultanswer;
          }
          if (element1.questionChoice == "Yes/No" && element1.defaultanswer?.Score != undefined && element1.defaultanswer?.Score != null) {
            element1.defaultanswer = element1.defaultanswer?.Score;
          } else {
            element1.defaultanswer = element1.defaultanswer;
          }
        }

      });
    });
    await this.evaluationForms();
    this.createOrEditEvaluation = 'edit'
    this.commonMethods.dynamicBackgroundColorChange('white');
    this.coachPopUP = false;
    this.evaluationModel = JSON.parse(JSON.stringify(evalutionCard));
    if (this.evaluationModel.rulebased == 'percentage') {
      this.percentageSend = this.evaluationModel.sendcalls;
      this.percentageDuration = this.evaluationModel.ruletype?.toUpperCase();
    }
    if (this.evaluationModel.rulebased == 'rule') {
      this.ruleSend = this.evaluationModel.sendcalls;
      this.ruleDuration = this.evaluationModel.ruletype?.toUpperCase();
    }
    this.evaluationModel.lockAfterSubmit = (this.evaluationModel.lockAfterSubmit === undefined) ? false : this.evaluationModel.lockAfterSubmit;
    this.evaluationModel.allowResubmit = (this.evaluationModel.allowResubmit === undefined) ? false : this.evaluationModel.allowResubmit;
    this.evaluationModel.userModerator = (this.evaluationModel.userModerator === undefined) ? [] : this.evaluationModel.userModerator;
    this.evaluationModel.allowCoaches = (this.evaluationModel.allowCoaches === undefined) ? false : this.evaluationModel.allowCoaches;
    this.evaluationModel.userCoaches = (this.evaluationModel.userCoaches === undefined) ? [] : this.evaluationModel.userCoaches;
    let coachValueEdit = this.evaluationModel.userCoaches;
    if (coachValueEdit != undefined) {
      coachValueEdit.forEach(element => {
        let val = this.users.filter(s => s.value == element)[0]
        if (val != undefined) {
          coachArr.push(val);
        }

      });
    }
    this.evaluationModel.userCoaches = coachArr
    let moderatorValueEdit = this.evaluationModel.userModerator;
    if (moderatorValueEdit != undefined) {
      moderatorValueEdit.forEach(element => {
        let val = this.users.filter(s => s.value == element)[0]
        if (val != undefined) {
          moderatorArr.push(val);
        }

      });
    }
    this.evaluationModel.userModerator = moderatorArr;
    let userValueEdit = this.evaluationModel.userEvaluator;
    if (userValueEdit != undefined) {
      userValueEdit.forEach(element => {
        let val = this.users.filter(s => s.value == element)[0]
        if (val != undefined) {
          arr.push(val);
        }

      });
    }
    this.evaluationModel.userEvaluator = arr;
    this.collapse = 'down';
    // this.issubmitEdit=false;
    this.closePopupText = JSON.parse(JSON.stringify(this.evaluationModel))
    this.evaluationModel.coachCategories = (this.evaluationModel.coachCategories === undefined) ? [] : this.evaluationModel.coachCategories;
    this.conditionalSkipQuestionList = [];
    this.conditionalSkipQuestionListEdit = [];
    this.evaluationModel.conditionMetrics = (this.evaluationModel.conditionMetrics === undefined) ? "all" : this.evaluationModel.conditionMetrics;
    this.evaluationModel.callHydrationCondition = (this.evaluationModel.callHydrationCondition === undefined) ? [] : this.evaluationModel.callHydrationCondition;
    this.isDisableMetrics = [];
    this.isAddDisable = false;
    this.metricOptionErr = false;
    this.metricValueErr = false;
    this.addConditionErr = false;
    this.isDisableDone = false;
    this.isHyperlinkDescription = true
    this.isDisplayErr = false
    this.hyperURLErr = false;

  }

  //get a themes
  getThemes() {
    this.playbookService.getTheme().subscribe(data => {
      this.strategyItems = data;
    },
      (error) => {
        console.log(error);
        this.commonMethods.addToastforlongtime(false, error.error);
      });
  }

  //get questions dropdown list from json
  getQuestionDropDownList() {
    this.evaluationService.getQuestionDropDownList().subscribe(
      (data: any) => {
        this.questionChoices = data
      },
      (error) => {
        console.log(error);
        this.commonMethods.addToastforlongtime(false, error.error);
      })
  }

  //keypress validation
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  metricKeyPress(event:any,item){
    if(item == 'between'){
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
    else{
      return String.fromCharCode(event.charCode).match(/[^a-zA-Z0-9]/g) === null
    }
   
  }

  //******************************************************Create functions**********************************************/

  //add category 
  async addCategory(evaluationQlist) {
    let categoryInputs = new CategoryModel();
    categoryInputs.Topics.questions[0].questionId = await uuidv4();
    categoryInputs.Topics.questions[0].conditionalSkip = false;
    categoryInputs.Topics.questions[0].conditionalSkipDetails =
      // [
      { allConditionMet: 'All', conditionSkipQuestion: '', conditionSkipValue: '' }
    // ];
    // console.log('categoryInputs', categoryInputs);

    categoryInputs.Topics.customerId = this.customerId;
    if (categoryInputs.Topics.questions[0].questionId != undefined) {
      this.evaluationModel.questionsList.push(categoryInputs);
    } else {
      categoryInputs.Topics.questions[0].questionId = await uuidv4();
      this.evaluationModel.questionsList.push(categoryInputs);
    }
    // console.log('this.evaluationModel.questionsList', this.evaluationModel.questionsList);
  }

  removeCreateCategory(i) {
    this.evaluationModel.questionsList.splice(i, 1);
    this.collapse = 'down';
    this.textPopup = false;
  }

  //add question
  async addQuestionsCreate(i) {
    let count = 0;
    this.evaluationModel.questionsList[i].Topics.questions.forEach(element => {
      if (element.questionChoice != 'Comments' && (element.questionValue == null || element.questionValue == '' || element.questionValue == undefined || element.questionValue?.includes('null') || element.questionValue?.includes('undefined'))) {
        count = count + 1;
      }
    });

    if (count == 0) {

      if (this.evaluationModel.questionsList[i].Topics.questions == 'undefined') {

        let questionsObj = { questionId: await uuidv4(), question: null, questionChoice: null, questionValue: null, conditionalSkip: false, questionDescription: null, hyperlinkUrl: null, hyperlinkDisplayType: null };
        this.evaluationModel.questionsList[i].Topics.questions.push(questionsObj);
      } else {
        let questionsObj = { questionId: await uuidv4(), question: null, questionChoice: null, questionValue: null, conditionalSkip: false, questionDescription: null, hyperlinkUrl: null, hyperlinkDisplayType: null };
        this.evaluationModel.questionsList[i].Topics.questions.push(questionsObj);
      }

      if (this.closePopupText.questionsList[i].Topics.questions == 'undefined') {
        let questionsObj = { questionId: await uuidv4(), question: null, questionChoice: null, questionValue: null, questionDescription: null, hyperlinkUrl: null, hyperlinkDisplayType: null };
        this.closePopupText.questionsList[i].Topics.questions.push(questionsObj)
      }
      else {
        let questionsObj = { questionId: await uuidv4(), question: null, questionChoice: null, questionValue: null, questionDescription: null, hyperlinkUrl: null, hyperlinkDisplayType: null };
        this.closePopupText.questionsList[i].Topics.questions.push(questionsObj)
      }
      // console.log(this.closePopupText.questionsList[i].Topics.questions)
      // await this.evaluationModel.questionsList[i].Topics.questions.forEach(element => {
      //   if(element.id == undefined) {
      //     element.id = await uuidv4();
      //   }
      // });
      // console.log(this.evaluationModel.questionsList[0].Topics.questions);
    } else {
      // this.invalidSupportConditionalInputs = 'Conditional skip option must be one valid question and answer';
      this.commonMethods.addToastforlongtime(false, 'Category Question must be valid question and answer (OR) Remove this Question.');
    }
  }

  async removeQuestionsCreate(i, j) {
    // Check this question and answer using Condition Display or not
    let count = 0;
    await this.evaluationModel.questionsList.forEach(elementTopic => {
      elementTopic.Topics.questions.forEach(elementQuest => {
        if (elementQuest.conditionalSkipDetails?.conditionalList != undefined) {
          elementQuest.conditionalSkipDetails.conditionalList.forEach(elementCSQ => {
            let choiceArray;
            if (elementCSQ.conditionalQuestion?.id == this.evaluationModel.questionsList[i].Topics.questions[j].questionId && elementCSQ.conditionalQuestion?.questionChoice == this.evaluationModel.questionsList[i].Topics.questions[j].questionChoice) {
              count = count + 1;
              this.commonMethods.addToastforlongtime(false, 'This question choice and value is used in conditional skip. Please remove that question and try again.');
              return true;
            }

          });
        }

      });
    });

    if (count == 0) {
      this.evaluationModel.questionsList[i].Topics.questions.splice(j, 1);
      return true;
    }
  }

  //get theme data
  changeThemeCreate(selectedStrategy) {
    this.evaluationService.getChangeTheme(selectedStrategy).subscribe((data: any) => {
      this.getStrategyValue = selectedStrategy.value;

      // data.Item.topicScore[0].Topics.questions[0].questionId = uuidv4();
      data.Item.topicScore.forEach(elementTP => {
        elementTP.Topics.questions[0].questionId = uuidv4();
      });
      // console.log('data.Item.topicScore', data.Item.topicScore);
      data.Item.topicScore[0].Topics.questions[0].conditionalSkip = false;
      data.Item.topicScore[0].Topics.questions[0].conditionalSkipDetails = { allConditionMet: 'All', conditionSkipQuestion: '', conditionSkipValue: '' };
      data.Item.topicScore[0].Topics.questions[0].questionDescription = null;
      data.Item.topicScore[0].Topics.questions[0].hyperlinkDisplayType = null;
      data.Item.topicScore[0].Topics.questions[0].hyperlinkUrl = null;
      // // [
      // {allConditionMet: 'All', conditionSkipQuestion:'', conditionSkipValue:''};
      // // ];
      // this.closePopupText.questionsList.forEach(element => {
      //     conso
      // });
      this.closePopupText.questionsList[0].Topics.questions[0].questionDescription = null;
      this.closePopupText.questionsList[0].Topics.questions[0].hyperlinkUrl = null;
      this.closePopupText.questionsList[0].Topics.questions[0].hyperlinkDisplayType = null;

      data.Item.topicScore.forEach(elementTP => {
        if (elementTP.Topics.questions[0].questionId != undefined || elementTP.Topics.questions[0].questionId != null) {
          this.evaluationModel.questionsList = data.Item.topicScore;
        } else {
          elementTP.Topics.questions[0].questionId = uuidv4();
          this.evaluationModel.questionsList = data.Item.topicScore;
        }
      });
      //  console.log("this.evaluationModel.questionsList", this.evaluationModel.questionsList);
    },
      (error) => {
        console.log(error);
        this.commonMethods.addToastforlongtime(false, error.error);
      })
  }

  //save new evaluation
  async postEvaluation(evaluationModel) {

    if(this.loading || this.createEvaluationForm.invalid ) {
      this.messageService.clear();
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Please provide form name and theme', life: 5000 });
      setTimeout(() => {
        this.messageService.clear();
      }, 5000);
      return ;
    }
    if(this.QustionChoiceAnswerValue) {
      this.messageService.clear();
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Same Question choice answer label', life: 5000 });
      setTimeout(() => {
        this.messageService.clear();
      }, 5000);
      return ;
    }

    let count = 0;
    await evaluationModel.questionsList.forEach((elementT: any) => {
      elementT.Topics.questions.forEach(elementQ => {

        // if (elementQ.questionChoice != 'Comments' && (elementQ.question == '' || elementQ.question == null) || (elementQ.question == '' || elementQ.question == null) || (elementQ.questionValue == null || elementQ.questionValue == '' || elementQ.questionValue == undefined || elementQ.questionValue?.includes('null') || elementQ.questionValue?.includes('undefined'))) {
        //     count = count + 1;
        // } else if (elementQ.questionChoice == 'Comments' && (elementQ.question == '' || elementQ.question == null)) {
        //   count = count + 1;
        // }

        if (elementQ.questionChoice != 'Comments' && ((elementQ.question == '' || elementQ.question == null) || (elementQ.questionValue == null || elementQ.questionValue == '' || elementQ.questionValue == undefined || elementQ.questionValue?.includes('null') || elementQ.questionValue?.includes('undefined')))) {
          count = count + 1;
          // } else if (elementQ.questionChoice == 'Comments' && (elementQ.question == '' || elementQ.question == null)) {
        } else {
          if (elementQ.questionChoice == 'Comments' && (elementQ.question == '' || elementQ.question == null)) {
            count = count + 1;
          }
        }

        if (elementQ?.displaytype?.value == "radio") {
          let choiceYesNo;
          choiceYesNo = elementQ.questionValue.split(',');
          choiceYesNo.forEach((quesData, indexQD) => {
            if (quesData.split('=')[0] == elementQ.defaultanswer) {
              elementQ.defaultanswer = { Answer: quesData?.split('=')[0], Score: quesData?.split('=')[1] };
            }
          });
        }

        // if(elementQ?.displaytype?.value == "radio") {
        //   let choiceYesNo;
        //   choiceYesNo = elementQ.questionValue.split(',');
        //   choiceYesNo.forEach((quesData, indexQD) => {
        //     if(quesData.split('=')[0] == elementQ.defaultanswer) {
        //       elementQ.defaultanswer = {Answer:quesData?.split('=')[0], Score:quesData?.split('=')[1]};
        //     }
        //   });
        // }

        if (elementQ.questionChoice == "Yes/No" || elementQ.questionChoice == "Choice" && elementQ?.defaultanswer != undefined) {
          let choiceYesNo;
          choiceYesNo = elementQ?.questionValue?.split(',');
          choiceYesNo?.forEach((quesData, indexQD) => {
            if (quesData.split('=')[0] == elementQ.defaultanswer || quesData.split('=')[1] == elementQ.defaultanswer) {
              elementQ.defaultanswer = { Answer: quesData?.split('=')[0], Score: quesData?.split('=')[1] };
            }
          });
        }

      });
    });
    // });


    if (count == 0) {

      if (this.evaluationModel.rulebased === 'percentage') {
        this.evaluationModel.sendcalls = this.percentageSend == undefined ? null : this.percentageSend;
        this.evaluationModel.ruletype = this.percentageDuration == undefined ? null : this.percentageDuration?.toUpperCase();
      }
      if (this.evaluationModel.rulebased === 'rule') {
        this.evaluationModel.sendcalls = this.ruleSend == undefined ? null : this.ruleSend;
        this.evaluationModel.ruletype = this.ruleDuration == undefined ? null : this.ruleDuration?.toUpperCase();
      }
      if (this.evaluationModel.rulebased == '' || this.evaluationModel.rulebased == undefined) {
        this.evaluationModel.rulebased = '';
        this.evaluationModel.sendcalls = null;
        this.evaluationModel.ruletype = null;
      }

      if (this.evaluationModel.rulebased == '' || this.evaluationModel.rulebased == undefined) {
        this.evaluationModel.automaticcallhydration = false;
      }

      await this.evaluationModel.questionsList.forEach(element => {
        element.Topics.questions.forEach(element1 => {
          if (element1.topicQuestionChoiceArrayInputs !== undefined) {
            delete element1.topicQuestionChoiceArrayInputs;
          }
          if (element1.questionChoice === 'Number') {
            delete element1.topicQuestionValueMaximum;
            delete element1.topicQuestionValueMinimum;
          }
          if (element1.questionChoice === 'Yes/No') {
            delete element1.topicQuestionValueYes;
            delete element1.topicQuestionValueNo;
          }

          if (element1.conditionalSkip == true && element1.conditionalSkipDetails == undefined) {
            element1.conditionalSkipDetails = { conditionMet: 'All', conditionalList: [{ conditionalQuestion: null, conditionalValue: null }] };
          }

          if (element1.conditionalSkipDetails != undefined && element1.conditionalSkipDetails.conditionalList != undefined) {

            element1.conditionalSkipDetails.conditionalList.forEach(element2 => {
              delete element2.choiceQuestionList;

              if (element2.conditionalQuestion != null && element2.conditionalQuestion?.questionChoice == 'Yes/No') {
                delete element2.conditionalYesNoValue;
              }
              if (element2.conditionalQuestion != null && element2.conditionalQuestion?.questionChoice == 'Number') {
                delete element2.conditionalMinValue;
                delete element2.conditionalMaxValue;
              }
            });
          }

        });
      });

      if (this.evaluationModel.isNonACD === undefined || this.evaluationModel.isNonACD == null) {
        this.evaluationModel.isNonACD = false;
      }


      let tempVal = JSON.parse(JSON.stringify(evaluationModel));
      if (tempVal.userEvaluator != null && tempVal.userEvaluator != undefined) {
        let userEvalId = tempVal.userEvaluator.map(s => s.value);
        tempVal.userEvaluator = userEvalId;
      }
      if (tempVal.userModerator != null && tempVal.userModerator != undefined) {
        let moderatorEvalId = tempVal.userModerator.map(s => s.value);
        tempVal.userModerator = moderatorEvalId;
      }
      if (tempVal.userCoaches != null && tempVal.userCoaches != undefined) {
        let coachEvalId = tempVal.userCoaches.map(s => s.value);
        tempVal.userCoaches = coachEvalId;
      }
      if (this.evaluationModel.automaticcallhydration) {
        this.addDefinition();
      }
      this.metricBetweenValidation()

      if (this.createEvaluationForm.invalid || this.metricOptionErr || this.metricValueErr || this.addConditionErr || this.errBetween || this.errSameValue || this.metricConditionErr ) {
        this.issubmitCreate = true;
        return
      } else {

        this.loading = true;
        this.spinnerService.show();
        this.evaluationService.postEvaluation(tempVal).subscribe((data: any) => {
          this.commonMethods.addToastforlongtime(true, 'Evaluation form saved')
          this.createOrEditEvaluation = "list";
          this.textPopup = false;
          this.textPopupEdit = false;
          this.commonMethods.dynamicBackgroundColorChange('default')
          this.issubmitCreate = false;
          this.getEvaluation();
          this.loading = false;
          this.isDisableMetrics = [];
          this.isAddDisable = false;
          this.metricOptionErr = false;
          this.metricValueErr = false;
          this.addConditionErr = false;
          this.isDisableDone = false;
          this.spinnerService.hide();
        },
          (error) => {
            this.loading = false;
            console.log(error);
            this.commonMethods.addToastforlongtime(false, error.error);
            this.spinnerService.hide();
          })
      }
    } else {
      // this.invalidSupportConditionalInputs = 'Conditional skip option must be one valid question and answer';
      this.commonMethods.addToastforlongtime(false, 'Category Question must be valid question and answer (OR) Remove this Question.');
    }
  }


  //******************************************************Edit functions**********************************************/

  //get a evaluation details
  async getEvaluation() {
    this.searchEvaluationRoomName = ""
    this.spinnerService.show();
    await this.evaluationService.getEvaluation().subscribe((data: any) => {
      this.cards = data;
      this.allcards = data;
      this.spinnerService.hide();
    },
      (error) => {
        console.log(error);
        this.commonMethods.addToastforlongtime(false, error.error);
        this.spinnerService.hide();
      });
  }

  //add category
  async addEditCategory() {
    let categoryInputs = new CategoryModel();
    categoryInputs.Topics.customerId = this.customerId;
    // categoryInputs.Topics.questions[0].questionId = uuidv4();
    await categoryInputs.Topics.questions.forEach(element => {
      element.questionId = uuidv4();
    });
    this.evaluationModel.questionsList.push(categoryInputs);
  }

  removeEditCategory(i) {
    this.evaluationModel.questionsList.splice(i, 1);
    this.collapse = 'down';
  }

  //add questions
  async addQuestionsEdit(i) {
    let count = 0;
    this.evaluationModel.questionsList[i].Topics.questions.forEach(element => {
      if (element.questionChoice != 'Comments' && (element.questionValue == null || element.questionValue == '' || element.questionValue == undefined || element.questionValue?.includes('null') || element.questionValue?.includes('undefined'))) {
        count = count + 1;
      }
    });

    if (count == 0) {

      if (this.evaluationModel.questionsList[i].Topics.questions == 'undefined') {
        let questionsObj = { questionId: await uuidv4(), question: null, questionChoice: null, questionValue: null, questionDescription: null, hyperlinkUrl: null, hyperlinkDisplayType: null };
        this.evaluationModel.questionsList[i].Topics.questions.push(questionsObj);
      }
      else {
        let questionsObj = { questionId: await uuidv4(), question: null, questionChoice: null, questionValue: null, questionDescription: null, hyperlinkUrl: null, hyperlinkDisplayType: null };
        this.evaluationModel.questionsList[i].Topics.questions.push(questionsObj);
      }

      if (this.closePopupText.questionsList[i].Topics.questions == 'undefined') {
        let questionsObj = { questionId: await uuidv4(), question: null, questionChoice: null, questionValue: null, questionDescription: null, hyperlinkUrl: null, hyperlinkDisplayType: null };
        this.closePopupText.questionsList[i].Topics.questions.push(questionsObj)
      }
      else {
        let questionsObj = { questionId: await uuidv4(), question: null, questionChoice: null, questionValue: null, questionDescription: null, hyperlinkUrl: null, hyperlinkDisplayType: null };
        this.closePopupText.questionsList[i].Topics.questions.push(questionsObj)
      }
    } else {
      // this.invalidSupportConditionalInputs = 'Conditional skip option must be one valid question and answer';
      this.commonMethods.addToastforlongtime(false, 'Category Question must be valid question and answer (OR) Remove this Question.');
    }
    // console.log(this.evaluationModel.questionsList[i].Topics.questions)
  }

  async removeQuestionsEdit(i, j) {
    let count = 0;
    await this.evaluationModel.questionsList.forEach(elementTopic => {
      elementTopic.Topics.questions.forEach(elementQuest => {
        if (elementQuest.conditionalSkipDetails?.conditionalList != undefined) {
          elementQuest.conditionalSkipDetails.conditionalList.forEach(elementCSQ => {
            let choiceArray;
            if (elementCSQ.conditionalQuestion?.id == this.evaluationModel.questionsList[i].Topics.questions[j].questionId && elementCSQ.conditionalQuestion?.questionChoice == this.evaluationModel.questionsList[i].Topics.questions[j].questionChoice) {
              count = count + 1;
              this.commonMethods.addToastforlongtime(false, 'This question choice and value is used in conditional skip. Please remove that question and try again.');
              return true;
            }

          });
        }

      });
    });

    if (count == 0) {
      this.evaluationModel.questionsList[i].Topics.questions.splice(j, 1);
      return true;
    }

  }

  //get theme  data
  changeThemeEdit(evaluationModel) {
    this.evaluationService.getChangeEditTheme(evaluationModel).subscribe((data: any) => {
      this.getStrategyValue = evaluationModel.value;
      this.evaluationModel.questionsList = data.Item.topicScore;
    },
      (error) => {
        console.log(error);
        this.commonMethods.addToastforlongtime(false, error.error);
      })
  }

  //change question type
  changeQuestionType(value) {
    // console.log(value);

    value.questionValue = null;

  }

  //update evaluation
  async evaluationUpdate(evaluateItem) {

    if(this.loading || this.editEvaluationForm.invalid) {
      this.messageService.clear();
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Please provide form name and theme', life: 5000 });
      setTimeout(() => {
        this.messageService.clear();
      }, 5000);
      return ;
    }
    if(this.QustionChoiceAnswerValue) {
      this.messageService.clear();
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Same Question choice answer label', life: 5000 });
      setTimeout(() => {
        this.messageService.clear();
      }, 5000);
      return ;
    }

    let count = 0;
    await this.evaluationModel.questionsList.forEach((elementT: any) => {
      elementT.Topics.questions.forEach(elementQ => {
        // if (elementQ.questionChoice != 'Comments' && (elementQ.question == '' || elementQ.question == null) || (elementQ.questionValue == null || elementQ.questionValue == '' || elementQ.questionValue == undefined || elementQ.questionValue?.includes('null') || elementQ.questionValue?.includes('undefined'))) {
        //   count = count + 1;
        // } else if (elementQ.questionChoice == 'Comments' && (elementQ.question == '' || elementQ.question == null)) {
        //   count = count + 1;
        // }

        if (elementQ.questionChoice != 'Comments' && ((elementQ.question == '' || elementQ.question == null) || (elementQ.questionValue == null || elementQ.questionValue == '' || elementQ.questionValue == undefined || elementQ.questionValue?.includes('null') || elementQ.questionValue?.includes('undefined')))) {
          count = count + 1;
          // } else if (elementQ.questionChoice == 'Comments' && (elementQ.question == '' || elementQ.question == null)) {
        } else {
          if (elementQ.questionChoice == 'Comments' && (elementQ.question == '' || elementQ.question == null)) {
            count = count + 1;
          }
        }

        if (elementQ.questionChoice == "Yes/No" || elementQ.questionChoice == "Choice") {
          let choiceYesNo;
          choiceYesNo = elementQ.questionValue?.split(',');
          choiceYesNo?.forEach((quesData, indexQD) => {
            if (quesData.split('=')[0] == elementQ.defaultanswer || quesData.split('=')[1] == elementQ.defaultanswer) {
              elementQ.defaultanswer = { Answer: quesData?.split('=')[0], Score: quesData?.split('=')[1] };

              // elementQ.defaultanswer.Answer = quesData?.split('=')[0];
              // elementQ.defaultanswer.Score = quesData?.split('=')[1];
            }
          });
        }
        // console.log('elementQ.defaultanswer', elementQ.defaultanswer);

      });
    });


    if (count == 0) {

      if (this.evaluationModel.automaticcallhydration == undefined || this.evaluationModel.automaticcallhydration == '') {
        this.evaluationModel.automaticcallhydration = false;
      }

      if (this.evaluationModel.rulebased == 'percentage') {
        this.evaluationModel.sendcalls = this.percentageSend == undefined ? null : this.percentageSend;
        this.evaluationModel.ruletype = this.percentageDuration == undefined ? null : this.percentageDuration?.toUpperCase();
      }
      if (this.evaluationModel.rulebased == 'rule') {
        this.evaluationModel.sendcalls = this.ruleSend == undefined ? null : this.ruleSend;
        this.evaluationModel.ruletype = this.ruleDuration == undefined ? null : this.ruleDuration?.toUpperCase();
      }
      if (this.evaluationModel.rulebased == '' || this.evaluationModel.rulebased == undefined) {
        this.evaluationModel.rulebased = '';
        this.evaluationModel.sendcalls = null;
        this.evaluationModel.ruletype = null;
      }

      // Remove unwanted objects and value reassigned for undefined & null values
      await this.evaluationModel.questionsList.forEach(element => {
        element.Topics.questions.forEach(element1 => {

          if (element1.topicQuestionChoiceArrayInputs !== undefined) {
            delete element1.topicQuestionChoiceArrayInputs;
          }
          if (element1.questionChoice === 'Number') {
            delete element1.topicQuestionValueMaximum;
            delete element1.topicQuestionValueMinimum;
          }
          if (element1.questionChoice === 'Yes/No') {
            delete element1.topicQuestionValueYes;
            delete element1.topicQuestionValueNo;
          }
          if (element1.conditionalSkip == true && element1.conditionalSkipDetails == undefined) {
            element1.conditionalSkipDetails = { conditionMet: 'All', conditionalList: [{ conditionalQuestion: null, conditionalValue: null }] };
          } else if (element1.conditionalSkip == false && element1.conditionalSkipDetails == undefined) {
            element1.conditionalSkipDetails = { conditionMet: 'All', conditionalList: [{ conditionalQuestion: null, conditionalValue: null }] };
          }
          // }

        });
      });

      if (this.evaluationModel.isNonACD === undefined || this.evaluationModel.isNonACD == null) {
        this.evaluationModel.isNonACD = false;
      }

      let tempVal = JSON.parse(JSON.stringify(evaluateItem));
      if (tempVal.userEvaluator != null && tempVal.userEvaluator != undefined) {
        let userEvalId = tempVal.userEvaluator.map(s => s.value);
        tempVal.userEvaluator = userEvalId;
      }

      if (tempVal.userModerator != null && tempVal.userModerator != undefined) {
        let moderatorEvalId = tempVal.userModerator.map(s => s.value);
        tempVal.userModerator = moderatorEvalId;
      }

      if (tempVal.userCoaches != null && tempVal.userCoaches != undefined) {
        let coachEvalId = tempVal.userCoaches.map(s => s.value);
        tempVal.userCoaches = coachEvalId;
      }

      if (this.evaluationModel.automaticcallhydration) {
        this.addDefinition();
      }
      this.metricBetweenValidation();

      if (this.editEvaluationForm.invalid || this.metricOptionErr || this.metricValueErr || this.addConditionErr || this.errBetween || this.errSameValue || this.metricConditionErr) {
        this.issubmitEdit = true;
        return;
      }
      else {
        this.loading = true;
        this.spinnerService.show();
        this.evaluationService.evaluationUpdate(tempVal).subscribe((data: any) => {
          this.commonMethods.addToastforlongtime(true, 'Evaluation form updated')
          this.createOrEditEvaluation = "list";
          this.commonMethods.dynamicBackgroundColorChange('default')
          this.issubmitEdit = false;
          this.getEvaluation();
          this.loading = false;
          this.textPopup = false;
          this.textPopupEdit = false;
          this.isDisableMetrics = [];
          this.isAddDisable = false;
          this.metricOptionErr = false;
          this.metricValueErr = false;
          this.addConditionErr = false;
          this.isDisableDone = false;
          this.hyperlink = false
          this.isDisplayErr = false
          this.hyperURLErr = false;
          this.spinnerService.hide();
        },
          (error) => {
            this.loading = false;
            console.log(error);
            this.commonMethods.addToastforlongtime(false, error.error);
            this.spinnerService.hide();
          })
      }
    } else {
      // this.invalidSupportConditionalInputs = 'Conditional skip option must be one valid question and answer';
      this.commonMethods.addToastforlongtime(false, 'Category Question must be valid question and answer (OR) Remove this Question.');
    }
  }
  // Copy evaluation
  copyEvaluationForm() {
    let copyEvaluationModel = new EvaluationModel();
    copyEvaluationModel.evaluationRoomDesc = this.evaluationModel.evaluationRoomDesc;
    copyEvaluationModel.evaluationRoomName = this.evaluationModel.evaluationRoomName + ' (Copy)';
    copyEvaluationModel.questionsList = this.evaluationModel.questionsList;
    copyEvaluationModel.strategyId = this.evaluationModel.strategyId;
    copyEvaluationModel.userEvaluator = this.evaluationModel.userEvaluator;
    copyEvaluationModel.lockAfterSubmit = (this.evaluationModel.lockAfterSubmit === undefined) ? false : this.evaluationModel.lockAfterSubmit;
    copyEvaluationModel.allowResubmit = (this.evaluationModel.allowResubmit === undefined) ? false : this.evaluationModel.allowResubmit;
    copyEvaluationModel.userModerator = (this.evaluationModel.userModerator === undefined) ? [] : this.evaluationModel.userModerator;
    copyEvaluationModel.userCoaches = (this.evaluationModel.userCoaches === undefined) ? [] : this.evaluationModel.userCoaches;
    copyEvaluationModel.coachCategories = this.evaluationModel.coachCategories;

    if (this.evaluationModel.rulebased === 'percentage') {
      this.evaluationModel.sendcalls = this.percentageSend == undefined ? null : this.percentageSend;
      this.evaluationModel.ruletype = this.percentageDuration == undefined ? null : this.percentageDuration?.toUpperCase();
    }
    if (this.evaluationModel.rulebased === 'rule') {
      this.evaluationModel.sendcalls = this.ruleSend == undefined ? null : this.ruleSend;
      this.evaluationModel.ruletype = this.ruleDuration == undefined ? null : this.ruleDuration?.toUpperCase();
    }
    if (this.evaluationModel.rulebased == '' || this.evaluationModel.rulebased == undefined) {
      this.evaluationModel.rulebased = '';
      this.evaluationModel.sendcalls = null;
      this.evaluationModel.ruletype = null;
      this.evaluationModel.automaticcallhydration = false;
    }
    copyEvaluationModel.automaticcallhydration = this.evaluationModel.automaticcallhydration;
    copyEvaluationModel.rulebased = this.evaluationModel.rulebased;
    copyEvaluationModel.sendcalls = this.evaluationModel.sendcalls;
    copyEvaluationModel.ruletype = this.evaluationModel.ruletype;

    if (this.evaluationModel.isNonACD === undefined || this.evaluationModel.isNonACD == null) {
      this.evaluationModel.isNonACD = false;
    }
    copyEvaluationModel.isNonACD = this.evaluationModel.isNonACD;
    let tempVal = JSON.parse(JSON.stringify(copyEvaluationModel));
    if (tempVal.userEvaluator != null && tempVal.userEvaluator != undefined) {
      let userEvalId = tempVal.userEvaluator.map(s => s.value);
      tempVal.userEvaluator = userEvalId;
    }

    this.spinnerService.show();
    this.evaluationService.postEvaluation(tempVal).subscribe((data: any) => {
      this.commonMethods.addToastforlongtime(true, 'Evaluation Copy saved')
      this.createOrEditEvaluation = "list";
      this.commonMethods.dynamicBackgroundColorChange('default')
      this.issubmitCreate = false;
      this.getEvaluation();
      this.loading = false;
      this.textPopup = false;
      this.textPopupEdit = false;
      this.isDisableMetrics = [];
      this.isAddDisable = false;
      this.metricOptionErr = false;
      this.metricValueErr = false;
      this.addConditionErr = false
      this.spinnerService.hide();
    },
      (error) => {
        this.loading = false;
        console.log(error);
        this.commonMethods.addToastforlongtime(false, error.error);
        this.spinnerService.hide();
      })

  }
  //delete evaluation
  deleteEvaluationForm() {
    this.spinnerService.show();
    this.evaluationService.deleteEvalutionForm(this.evaluationModel).subscribe((data: any) => {
      this.getEvaluation();
      this.createOrEditEvaluation = 'list';
      this.commonMethods.dynamicBackgroundColorChange('default')
      this.commonMethods.addToastforlongtime(true, 'Evaluation form deleted');
      this.spinnerService.hide();
    },
      (error) => {
        console.log(error);
        this.commonMethods.addToastforlongtime(false, error.error);
        this.spinnerService.hide();
      })
  }



  //****************************************************************Cancel*******************************************/

  cancel() {
    this.createOrEditEvaluation = 'list'
    this.evaluationModel = new EvaluationModel();
    this.commonMethods.dynamicBackgroundColorChange('default')
    this.createEvaluationForm.reset();
    this.getStrategyValue = "";
    this.collapse = 'down';
    this.issubmitCreate = false;
    this.textPopup = false;
    this.textPopupEdit = false;
    this.coachPopUP = false;
    this.errCoachCategory = false;
    this.isHyperlinkDescription = true
    this.hyperlink = false
    this.isDisplayErr = false
    this.hyperURLErr = false;
    this.evaluationModel.callHydrationCondition = []
  }

  history: any;
  // upDown:boolean=false;
  changeTextToInput(i) {
    // console.log('event',event)
    let regExp = this.collapse.replace(/[0-9]/g, '');
    if (this.history == i) {
      if (regExp.trim() == 'up') {
        this.collapse = 'down' + i;
      }
      else if (regExp.trim() == 'down') {
        this.collapse = 'up' + i;
      }
    }
    else {
      this.collapse = 'up' + i;
      this.history = i;
    }
    this.textPopup = false;
    this.textPopupEdit = false;
  }

  UserNonRole: any;
  nonUserName: any;
  userEvaluatorDDL() {
    this.evaluationService.userEvaluatorDDL().subscribe(
      (data: any) => {
        this.users = data;
        this.UserNonRole = UserData.role;
        this.nonUserName = UserData.userName;
        if (this.UserNonRole.toLowerCase() != 'admin') {
          let val = this.users.filter(s => s.label == this.nonUserName);
          this.userModel = val;
        }

      },
      (error) => {
        console.log(error);
      }

    )
  }

  textPopup: boolean = false;
  indexTextj: any;
  indexTexti: any;
  addHypertext(i, j, item) {
    // this.categoryModel = new CategoryModel();
    if (item == 'create') {
      if (this.textPopup == false) {
        this.textPopup = true;
        this.indexTextj = j
        this.indexTexti = i
      }
      else {
        this.textPopup = false;
      }

      this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType = this.closePopupText.questionsList[i].Topics.questions[j].hyperlinkDisplayType;
      this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl = this.closePopupText.questionsList[i].Topics.questions[j].hyperlinkUrl;
      if (this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType != '' && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType != undefined && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType != null && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl != '' && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl != undefined && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl != null) {
        this.hyperlink = true
      }
      else {
        this.hyperlink = false
      }
      this.isHyperlinkDescription = true
    }
    if (item = 'edit') {
      if (this.textPopupEdit == false) {
        this.textPopupEdit = true;
        this.indexTextj_edit = j
        this.indexTexti_edit = i
      }
      else {
        this.textPopupEdit = false;
      }
      this.isDisplayErr = false
      this.hyperURLErr = false;
      this.hyperDisplayErr = false

      this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType = this.closePopupText.questionsList[i].Topics.questions[j].hyperlinkDisplayType;
      this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl = this.closePopupText.questionsList[i].Topics.questions[j].hyperlinkUrl;
      if (this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType != '' && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType != undefined && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType != null && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl != '' && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl != undefined && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl != null) {
        this.hyperlink = true
      }
      else {
        this.hyperlink = false
      }
      this.isHyperlinkDescription = true
    }

  }


  closehypertext(i, j, item) {
    if (item == 'create') {
      this.textPopup = false;
      this.hyperlink = false
      if (this.evaluationModel.questionsList[i].Topics.questions[j].questionDescription != null && this.evaluationModel.questionsList[i].Topics.questions[j].questionDescription != undefined || this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType != null && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType != undefined || this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl != null && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl != undefined) {
        this.evaluationModel.questionsList[i].Topics.questions[j].questionDescription = this.closePopupText.questionsList[i].Topics.questions[j].questionDescription;
        this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl = this.closePopupText.questionsList[i].Topics.questions[j].hyperlinkUrl;
        this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType = this.closePopupText.questionsList[i].Topics.questions[j].hyperlinkDisplayType;
      }
      else {
        this.evaluationModel.questionsList[i].Topics.questions[j].questionDescription = null;
        this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType = null;
        this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl = null;
      }

      if (this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType != null && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType != undefined && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl != null && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl != undefined) {
        this.hyperlink = true
      }
      else {
        this.hyperlink = false
      }
    }
    if (item == 'edit') {
      this.hyperlink = false
      this.isDisplayErr = false
      this.hyperURLErr = false;
      this.textPopupEdit = false;
      if (this.evaluationModel.questionsList[i].Topics.questions[j].questionDescription != null && this.evaluationModel.questionsList[i].Topics.questions[j].questionDescription != undefined || this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType != null && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType != undefined || this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl != null && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl != undefined) {
        this.evaluationModel.questionsList[i].Topics.questions[j].questionDescription = this.closePopupText.questionsList[i].Topics.questions[j].questionDescription;
        this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl = this.closePopupText.questionsList[i].Topics.questions[j].hyperlinkUrl;
        this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType = this.closePopupText.questionsList[i].Topics.questions[j].hyperlinkDisplayType;
      }
      else {
        this.evaluationModel.questionsList[i].Topics.questions[j].questionDescription = null;
        this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType = null;
        this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl = null;
      }

      if (this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType != null && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType != undefined && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl != null && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl != undefined) {
        this.hyperlink = true
      }
      else {
        this.hyperlink = false
      }
    }
  }


  savehypertext(i, j, item) {
    if (item == 'edit') {
      this.closePopupText.questionsList[i].Topics.questions[j].questionDescription = this.evaluationModel.questionsList[i].Topics.questions[j].questionDescription;
      this.closePopupText.questionsList[i].Topics.questions[j].hyperlinkDisplayType = this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType;
      this.closePopupText.questionsList[i].Topics.questions[j].hyperlinkUrl = this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl
      if (this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType != '' && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType != undefined && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl != '' && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl != undefined) {
        this.hyperlink = true
      }
      else {
        this.hyperlink = false
      }
      this.textPopupEdit = false;
    }
    if (item == 'create') {
      this.closePopupText.questionsList[i].Topics.questions[j].questionDescription = this.evaluationModel.questionsList[i].Topics.questions[j].questionDescription;
      this.closePopupText.questionsList[i].Topics.questions[j].hyperlinkDisplayType = this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType;
      this.closePopupText.questionsList[i].Topics.questions[j].hyperlinkUrl = this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl
      if (this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType != '' && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType != undefined && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl != '' && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl != undefined) {
        this.hyperlink = true
      }
      else {
        this.hyperlink = false
      }
      this.textPopup = false;
    }
  }
  isHyperlinkDescription: boolean = true
  textchange(item) {
    if (item) {
      this.isHyperlinkDescription = false
    }
  }

  resethyperlink(i, j, event?, defaultEvent?) {
    this.isDisplayErr = false
    this.hyperlink = false
    this.hyperURLErr = false;
    this.hyperDisplayErr = false
    this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType = null;
    this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl = null
    this.isHyperlinkDescription = false;
    defaultEvent.hide(event);
  }

  cancelhyperlink(item,event,defaultEvent,i,j) {
    if (item == 'edit') {
      this.hyperDisplayErr = false
      this.isDisplayErr = false
      this.hyperURLErr = false;
      if (this.hyperlink == false) {
        this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType = null;
        this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl = null
      }
      defaultEvent.hide(event);


      this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType = this.closePopupText.questionsList[i].Topics.questions[j].hyperlinkDisplayType;
      this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl = this.closePopupText.questionsList[i].Topics.questions[j].hyperlinkUrl;
      if (this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType != '' && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType != undefined && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl != '' && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl != undefined) {
        this.hyperlink = true
      }
      else {
        this.hyperlink = false
      }
    }
    if (item == 'create') {
      this.hyperDisplayErr = false
      this.isDisplayErr = false
      this.hyperURLErr = false;
      if (this.hyperlink == false) {
        this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType = null;
        this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl = null
      }
      defaultEvent.hide(event);


      this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType = this.closePopupText.questionsList[i].Topics.questions[j].hyperlinkDisplayType;
      this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl = this.closePopupText.questionsList[i].Topics.questions[j].hyperlinkUrl;
      if (this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType != '' && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkDisplayType != undefined && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl != '' && this.evaluationModel.questionsList[i].Topics.questions[j].hyperlinkUrl != undefined) {
        this.hyperlink = true
      }
      else {
        this.hyperlink = false
      }
    }
  }

  hyperlink: boolean = false
  hyperDisplayErr: boolean = false;
  hyperURLErr:boolean = false
  isDisplayErr: boolean = false
  savehyperlink(displayAs, url, event, defaultEvent, quesDesc) {
    if (displayAs != undefined && url != undefined && displayAs != '' && url != '' && quesDesc != '' && quesDesc != undefined && quesDesc != null && displayAs != null && url != null) {
      if (quesDesc.includes(displayAs) == true) {
        this.hyperDisplayErr = false
        this.hyperlink = true
        this.isDisplayErr = false
        this.hyperURLErr = false
        defaultEvent.hide(event);
      }
      else {
        this.isDisplayErr = true
        this.hyperDisplayErr = false
        this.hyperURLErr = false;
      }

    }
    else {
     if (quesDesc == '' || quesDesc == null || quesDesc == undefined && displayAs != undefined && url != undefined && displayAs != '' && displayAs != null && url != '' && url != null) {
        this.hyperDisplayErr = false
        this.hyperlink = true
        this.isDisplayErr = false
        this.hyperURLErr = false;
        defaultEvent.hide(event);
      }
       else if((displayAs != null && displayAs != undefined && displayAs != '') && (url == null || url == undefined || url == '') ){
          this.hyperURLErr = true;
          this.isDisplayErr = false
          this.hyperlink = false
          this.hyperDisplayErr = false
        }
        else if((displayAs == null || displayAs == undefined  || displayAs == '') && (url != null  && url != '' && displayAs != undefined )){
          this.hyperURLErr = false;
          this.isDisplayErr = false
          this.hyperlink = false
          this.hyperDisplayErr = true
        }
        else if ((displayAs == null || displayAs == undefined || displayAs == '')  && (url == null || url == undefined || url == '') ) {
          this.hyperDisplayErr = true
          this.isDisplayErr = false
          this.hyperlink = false
          this.hyperURLErr = false;
        }
      
    }

    if (this.isDisplayErr == true || this.hyperDisplayErr == true ) {
      this.isHyperlinkDescription = true
    }
    else {
      this.isHyperlinkDescription = false
    }

  }

  textPopupEdit: boolean = false;
  indexTextj_edit: any;
  indexTexti_edit: any;
  // drag & drop event
  drop(i, event: CdkDragDrop<string[]>) {
    if (i > 0) {
      moveItemInArray(this.evaluationModel.questionsList[i].Topics.questions, event.previousIndex, event.currentIndex);
    } else {
      if (event.previousIndex != 0 && event.currentIndex != 0) {
        moveItemInArray(this.evaluationModel.questionsList[i].Topics.questions, event.previousIndex, event.currentIndex);
      }
    }
  }

  dropCategoryEdit(event: CdkDragDrop<string[]>) {
    // console.log(event)
    moveItemInArray(this.evaluationModel.questionsList, event.previousIndex, event.currentIndex);
  }

  dropCategoryCreate(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.evaluationModel.questionsList, event.previousIndex, event.currentIndex);
  }
  dropCreate(i, event: CdkDragDrop<string[]>) {
    moveItemInArray(this.evaluationModel.questionsList[i].Topics.questions, event.previousIndex, event.currentIndex);
  }

  //Background tag clr change based on tab for evaluator:
  getTagBG(val) {
    if (val == 0) {
      return 'eval-tag'
    }
    if (val == 2) {
      return 'mod-tag'
    }
    if (val == 1) {
      return 'coach-tag'
    }

  }

  coachPopUP: boolean = false;
  iptCoachModel: string = "";
  addCoachCategory() {
    this.errCoachCategory = false;
    if (this.coachPopUP == false) {
      this.coachPopUP = true;
    }
    else {
      this.coachPopUP = false;
    }
  }

  closeCoachCategory() {
    this.errCoachCategory = false;
    if (this.coachPopUP == true) {
      this.coachPopUP = false;
      this.iptCoachModel = "";
    }
    else {
      this.coachPopUP = false;
      this.iptCoachModel = "";
    }
  }

  errCoachCategory: boolean = false;
  addList() {
    this.errCoachCategory = false;
    if (this.iptCoachModel.trim() != "") {
      this.evaluationModel.coachCategories.push(this.iptCoachModel)
      this.coachPopUP = false;
      this.iptCoachModel = "";
    }
    if (this.iptCoachModel.trim() == "") {
      this.errCoachCategory = true;
    }

    // console.log(this.evaluationModel.coachCategories)
  }

  closeList(msg) {
    let tempCreateEvaluator = JSON.parse(JSON.stringify(this.evaluationModel.coachCategories));
    const index: number = this.evaluationModel.coachCategories.indexOf(msg);
    if (index !== -1) {
      tempCreateEvaluator.splice(index, 1);
      this.evaluationModel.coachCategories = tempCreateEvaluator;
    }
  }

  coachEditPopUP: boolean = false;
  iptEditCoachModel: string = "";
  addEditCoachCategory() {
    this.errEditCoachCategory = false;
    if (this.coachEditPopUP == false) {
      this.iptEditCoachModel = ""
      this.coachEditPopUP = true;
    }
    else {
      this.coachEditPopUP = false;
    }
  }

  closeEditCoachCategory() {
    this.errEditCoachCategory = false;
    if (this.coachEditPopUP == true) {
      this.coachEditPopUP = false;
      this.iptEditCoachModel = "";
    }
    else {
      this.coachEditPopUP = false;
      this.iptEditCoachModel = "";
    }
  }

  errEditCoachCategory: boolean = false;
  addEditList() {
    this.errEditCoachCategory = false;
    if (this.iptEditCoachModel.trim() != "") {
      this.evaluationModel.coachCategories.push(this.iptEditCoachModel)
      this.coachEditPopUP = false;
      this.iptEditCoachModel = "";
    }
    if (this.iptEditCoachModel.trim() == "") {
      this.errEditCoachCategory = true;
    }

    // console.log(this.evaluationModel.coachCategories)
  }

  closeEditList(msg) {
    let tempCreateEvaluator = JSON.parse(JSON.stringify(this.evaluationModel.coachCategories));
    const index: number = this.evaluationModel.coachCategories.indexOf(msg);
    if (index !== -1) {
      tempCreateEvaluator.splice(index, 1);
      this.evaluationModel.coachCategories = tempCreateEvaluator;
    }
  }


  // ****************************** Add Conditional Skip Detail Section  *****************************
  topicQuestionChoiceArrayInputs: any = [];
  addtopicQuestionChoice(val, i, j) {
    this.disabledConditionalDisplayOption = true;
    this.topicQuestionChoiceArrayInputs = [];
    let questionsObj = { topicQuestionChoiceQuestion: null, topicQuestionChoiceValue: null };
    if (val === 1) {
      this.topicQuestionChoiceArrayInputs.push(questionsObj);
    } else {
      if (this.topicQuestionChoiceArrayInputs.length === 0) {
        this.topicQuestionChoiceArrayInputs.push(questionsObj);
      }
    }
    this.topicQuestionChoiceArrayInputs.forEach(element => {
      if (this.evaluationModel.questionsList[i].Topics.questions[j].topicQuestionChoiceArrayInputs == undefined) {
        this.evaluationModel.questionsList[i].Topics.questions[j].topicQuestionChoiceArrayInputs = [];
        this.evaluationModel.questionsList[i].Topics.questions[j].topicQuestionChoiceArrayInputs.push(element);
      } else {
        if (this.evaluationModel.questionsList[i].Topics.questions[j].topicQuestionChoiceArrayInputs.length < 2) {
          this.evaluationModel.questionsList[i].Topics.questions[j].topicQuestionChoiceArrayInputs.push(element);
        } else if (val == 1) {
          this.evaluationModel.questionsList[i].Topics.questions[j].topicQuestionChoiceArrayInputs.push(element);
        }
      }
    });

    this.evaluationModel.questionsList.forEach((elementT: any) => {
      elementT.Topics.questions.forEach(elementQ => {
        // Intiate the default value
        if (elementQ.questionChoice == 'Choice' || elementQ.questionChoice == 'Yes/No') {
          if (elementQ?.defaultanswer == null || elementQ?.defaultanswer == '') {
            elementQ.defaultanswer = '';
          }
        }
      });
    });
    // console.log(this.evaluationModel.questionsList[i].Topics.questions.topicQuestionChoiceArrayInputs);
  }

  async removetopicQuestionChoice(ch, i, j, topicQuestionChoiceArrayInputs, choice) {

    // this.topicQuestionChoiceArrayInputs.splice(ch, 1);
    let count = 0;
    let findChoice = choice.topicQuestionChoiceQuestion + '-' + choice.topicQuestionChoiceValue;
    await this.evaluationModel.questionsList[i].Topics.questions.forEach(element => {
      // console.log('element', element);
      if (element.conditionalSkipDetails?.conditionalList != undefined) {
        element.conditionalSkipDetails.conditionalList.forEach(element1 => {
          let choiceArray;
          if (element1.conditionalQuestion?.questionChoice == 'Choice' && element1.conditionalValue != undefined && element1.conditionalValue != '') {
            choiceArray = element1.conditionalValue.split(',');
            choiceArray.forEach(element2 => {
              if (element2 == findChoice) {
                count = count + 1;
                this.commonMethods.addToastforlongtime(false, 'This choice option is used another place.');
                return true;
              }
            });
          }

        });
      }
    });

    // main Section of remove choice option
    if (count == 0) {
      this.evaluationModel.questionsList[i].Topics.questions[j].topicQuestionChoiceArrayInputs.splice(ch, 1);
      this.evaluationModel.questionsList[i].Topics.questions[j].questionValue = topicQuestionChoiceArrayInputs.map(x => x.topicQuestionChoiceQuestion + '-' + x.topicQuestionChoiceValue).join(",");
      return true;
    }

    let countQA = 0;
    await this.evaluationModel.questionsList.forEach((elementT: any) => {
      elementT.Topics.questions.forEach(elementQ => {
        if (elementQ.questionChoice != 'Comments' && (elementQ.questionValue == null || elementQ.questionValue == '' || elementQ.questionValue == undefined || elementQ.questionValue?.includes('null') || elementQ.questionValue?.includes('undefined'))) {
          countQA = countQA + 1;
        }
      });
    });
    if (countQA == 0) {
      this.disabledConditionalDisplayOption = false;
    } else {
      this.disabledConditionalDisplayOption = true;
      // this.invalidSupportConditionalInputs = 'Conditional skip option must be one valid question and answer';
      this.commonMethods.addToastforlongtime(false, 'Conditional skip option must be one valid question and answer.');
    }

  }

  async disabledConditionalDisplay() {
    let countQA = 0;
    await this.evaluationModel.questionsList.forEach((elementT: any) => {
      elementT.Topics.questions.forEach(elementQ => {
        if (elementQ.questionChoice != 'Comments' && (elementQ.questionValue == null || elementQ.questionValue == '' || elementQ.questionValue == undefined || elementQ.questionValue?.includes('null') || elementQ.questionValue?.includes('undefined'))) {
          countQA = countQA + 1;
        }
      });
    });
    if (countQA == 0) {
      this.disabledConditionalDisplayOption = false;
    } else {
      this.disabledConditionalDisplayOption = true;
      // this.invalidSupportConditionalInputs = 'Conditional skip option must be one valid question and answer';
      this.commonMethods.addToastforlongtime(false, 'Conditional skip option must be one valid question and answer.');
    }
  }

  conditionalSkipDetails: any = { allConditionMet: '', conditionalSkipArrayInputs: [] };
  conditionalSkipArrayInputs: any = [];
  conditionalSkipQuestionList: any = [];
  CurrentTopicIndexI: any = null;
  CurrentTopicIndexJ: any = null;
  async addconditionalSkipDetailCreate(val, i, j, item) {
    // if(val==0) {
    //   document.getElementById("createModalOpen").click();
    // }

    let count = 0;
    if (this.conditionalSkipDetails.conditionalSkipArrayInputs.length > 0) {

      this.conditionalSkipDetails.conditionalSkipArrayInputs.forEach(element => {
        if (element.conditionalQuestion != undefined && element.conditionalQuestion != null && element.conditionalValue != undefined && element.conditionalValue != null && element.conditionalValue != '' && (element.conditionalValue != '=' && element.conditionalValue != '-')) {
          count += 1;
        }
      });
    }

    if (count >= this.conditionalSkipDetails.conditionalSkipArrayInputs.length || this.conditionalSkipDetails.conditionalSkipArrayInputs.length == 0) {

      this.conditionalSkipQuestionRepeated = false;
      let questionsObj = { conditionalQuestion: null, conditionalValue: null, choiceQuestionList: [] };
      if (val == 0 && item != undefined && item.conditionalSkip && item.conditionalSkipDetails != undefined) {
        this.CurrentTopicIndexI = i;
        this.CurrentTopicIndexJ = j;
        this.conditionalSkipDetails = { allConditionMet: 'All', conditionalSkipArrayInputs: [] };
        this.conditionalSkipDetails.allConditionMet = item.conditionalSkipDetails.conditionMet;
        this.conditionalSkipDetails.conditionalSkipArrayInputs = item.conditionalSkipDetails.conditionalList;
        if (this.conditionalSkipDetails.conditionalSkipArrayInputs == undefined || this.conditionalSkipDetails.conditionalSkipArrayInputs.length == 0) {
          this.conditionalSkipDetails.conditionalSkipArrayInputs = [];
          this.conditionalSkipDetails.allConditionMet = 'All';
          // this.conditionalSkipDetails.conditionalSkipArrayInputs.push(questionsObj);
        }
        this.conditionalSkipQuestionList = [];
        if (i >= 0) {
          await this.evaluationModel.questionsList.forEach((element0, index0) => {
            element0.Topics.questions.forEach((element, index) => {
              let questionValue = { id: element.questionId == undefined || element.questionId == null ? uuidv4() : element.questionId, name: element.question, questionChoice: element.questionChoice, value: element.questionValue };
              // if(index < this.evaluationModel.questionsList[index0].Topics.questions.length) {
              if (i == index0 && j == index) {
                // if(i==index0) {
              } else {
                if (this.conditionalSkipQuestionList.indexOf(questionValue) == -1) {
                  if (questionValue.name != null && questionValue.name != undefined && questionValue.questionChoice != null && questionValue.questionChoice != undefined) {
                    this.conditionalSkipQuestionList.push(questionValue);
                  }
                }
              }
            });
          });
        }
      } else {
        if (val === 1) {
          this.conditionalSkipDetails.conditionalSkipArrayInputs.push(questionsObj);
          this.conditionalSkipDetails.allConditionMet = 'All';
          this.conditionalSkipQuestionList = [];
          if (i >= 0) {
            await this.evaluationModel.questionsList.forEach((element0, index0) => {
              element0.Topics.questions.forEach((element, index) => {
                let questionValue = { id: element.questionId == undefined || element.questionId == null ? uuidv4() : element.questionId, name: element.question, questionChoice: element.questionChoice, value: element.questionValue };
                if (this.CurrentTopicIndexI == index0 && this.CurrentTopicIndexJ == index) {
                  // if(i==index0) {
                } else {
                  if (this.conditionalSkipQuestionList.indexOf(questionValue) == -1) {
                    if (questionValue.name != null && questionValue.name != undefined && questionValue.questionChoice != null && questionValue.questionChoice != undefined) {
                      this.conditionalSkipQuestionList.push(questionValue);
                    }
                  }
                }
              });
            });
          }
        } else {
          this.conditionalSkipDetails = { allConditionMet: 'All', conditionalSkipArrayInputs: [] };
          this.CurrentTopicIndexI = i;
          this.CurrentTopicIndexJ = j;
          // if (this.conditionalSkipDetails.conditionalSkipArrayInputs.length === 0) {
          //   this.conditionalSkipDetails.conditionalSkipArrayInputs.push(questionsObj);
          // }
          this.conditionalSkipDetails.allConditionMet = 'All';
          this.conditionalSkipQuestionList = [];
          if (i >= 0) {
            await this.evaluationModel.questionsList.forEach((element0, index0) => {
              element0.Topics.questions.forEach((element, index) => {
                let questionValue = { id: element.questionId == undefined || element.questionId == null ? uuidv4() : element.questionId, name: element.question, questionChoice: element.questionChoice, value: element.questionValue };
                if (i == index0 && j == index) {
                  // if(i==index0) {
                } else {
                  if (this.conditionalSkipQuestionList.indexOf(questionValue) == -1) {
                    if (questionValue.name != null && questionValue.name != undefined && questionValue.questionChoice != null && questionValue.questionChoice != undefined) {
                      this.conditionalSkipQuestionList.push(questionValue);
                    }
                  }
                }
              });
            });
          }
        }
        // Remove duplicates
        this.conditionalSkipQuestionList = this.conditionalSkipQuestionList.reduce((accumalator, current) => {
          if (
            !accumalator.some(
              (item) => item.id === current.id && item.name === current.name
            )
          ) {
            accumalator.push(current);
          }
          return accumalator;
        }, []);

      }

      await this.conditionalSkipDetails.conditionalSkipArrayInputs.forEach((elementI, indexI) => {
        this.conditionalSkipQuestionList.forEach(elementQ => {
          if (elementQ.questionChoice == elementI.conditionalQuestion?.questionChoice && elementQ.id == elementI.conditionalQuestion.id) {
            this.conditionalSkipDetails.conditionalSkipArrayInputs[indexI].conditionalQuestion = elementQ;
            let tempQuestionValue = [];
            elementI.conditionalSkipChoiceOptionList = [];
            if (elementQ.value?.indexOf(',') > -1) {
              tempQuestionValue = elementQ.value.split(',');
            } else {
              if (elementQ.value != undefined || elementQ.value != null) {
                tempQuestionValue = [elementQ.value];
              } else {
                tempQuestionValue = [];
              }
            }
            tempQuestionValue.forEach(elementQV => {
              if (elementI.conditionalQuestion?.questionChoice == "Choice") {
                if (elementQV.includes('=')) {
                  elementI.conditionalSkipChoiceOptionList.push({ label: elementQV.split('=')[0], value: elementQV.split('=')[1] });
                } else if (elementQV.includes('-')) {
                  elementI.conditionalSkipChoiceOptionList.push({ label: elementQV.split('-')[0], value: elementQV.split('-')[1] });
                }
              }
            });
          }
        });
      });

    } else {
      // this.invalidSupportConditionalInputs = 'Conditional skip option must be one valid question and answer';
      this.commonMethods.addToastforlongtime(false, 'Conditional skip option must be one valid question and answer');
    }

  }

  // invalidSupportConditionalInputs: any = '';
  async saveConditionalSkip() {
    // console.log(this.conditionalSkipDetails.conditionalSkipArrayInputs);
    let count = 0;
    if (this.conditionalSkipDetails.conditionalSkipArrayInputs.length > 0) {
      this.conditionalSkipDetails.conditionalSkipArrayInputs.forEach(element => {
        if (element.conditionalQuestion != undefined && element.conditionalQuestion != null && element.conditionalValue != undefined && element.conditionalValue != null && element.conditionalValue != '' && (element.conditionalValue != '=' && element.conditionalValue != '-')) {
          count += 1;
        }
      });
    }

    if (count >= this.conditionalSkipDetails.conditionalSkipArrayInputs.length || this.conditionalSkipDetails.conditionalSkipArrayInputs.length == 0) {
      // this.invalidSupportConditionalInputs = '';

      let conditionalSkipDetails = await {
        conditionMet: this.conditionalSkipDetails.allConditionMet,
        conditionalList: this.conditionalSkipDetails.conditionalSkipArrayInputs
        // conditionalList:this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit
      };
      if (this.conditionalSkipDetails.conditionalSkipArrayInputs.length == 0 || this.conditionalSkipDetails.conditionalSkipArrayInputs == undefined && this.conditionalSkipDetails.conditionalSkipArrayInputs == null) {
        this.evaluationModel.questionsList[this.CurrentTopicIndexI].Topics.questions[this.CurrentTopicIndexJ].conditionalSkip = false;
      }
      this.evaluationModel.questionsList[this.CurrentTopicIndexI].Topics.questions[this.CurrentTopicIndexJ].conditionalSkipDetails = conditionalSkipDetails;
      document.getElementById('createModalClose').click();
    } else {
      // this.invalidSupportConditionalInputs = 'Conditional skip option must be one valid question and answer';
      this.commonMethods.addToastforlongtime(false, 'Conditional skip option must be one valid question and answer (OR) Remove this Question.');
    }
    // console.log(this.evaluationModel.questionsList[this.CurrentTopicIndexI]);

  }

  async removeconditionalSkip(c, conditionalSkipArrayInputs, choiceQuestionList, conditionalSkipChoiceOptionList) {
    this.conditionalSkipQuestionRepeated = false;
    this.conditionalSkipDetails.conditionalSkipArrayInputs.splice(c, 1);

    let tempConditionalValue = [];
    choiceQuestionList.forEach(element => {
      conditionalSkipChoiceOptionList?.forEach(element1 => {
        if (element.choiceQuestionOption == element1.label) {
          tempConditionalValue.push(element1);
        }
      });
    });

    if (tempConditionalValue != undefined && tempConditionalValue.length > 0 && this.conditionalSkipDetails.conditionalSkipArrayInputs.length > c) {
      // this.conditionalSkipDetails.conditionalSkipArrayInputs[c].conditionalValue = tempConditionalValue.map(x=>x.label+'-'+x.value).join(",");
      this.conditionalSkipDetails.conditionalSkipArrayInputs[c].conditionalValue = tempConditionalValue.map(x => x.label + '=' + x.value).join(",");
    }

    if (conditionalSkipArrayInputs != undefined) {

      this.conditionalSkipQuestionRepeated = await conditionalSkipArrayInputs.some(user => {
        let counter = 0;
        for (const iterator of conditionalSkipArrayInputs) {
          if (iterator.conditionalQuestion?.id === user.conditionalQuestion?.id && iterator.conditionalQuestion?.name === user.conditionalQuestion?.name) {
            counter += 1;
          }
        }
        if (counter > 1) {
          this.commonMethods.addToastforlongtime(false, 'Same Question is not allowed');
        }
        return counter > 1;
      });

    }

    return true;
  }

  minMaxWarningMessage: any = '';
  async minMaxWarningMessageFuncion(val, min, max, i, j) {

    if (min?.toString().split('.')[1]?.length > 1) {
      min = parseFloat(min).toFixed(2);
    } else if (min?.toString().split('.')[1]?.length == 1) {
      min = parseFloat(min).toFixed(1);
    } else {
      // return element.defaultanswer = val;
    }

    if (max?.toString().split('.')[1]?.length > 1) {
      max = parseFloat(max).toFixed(2);
    } else if (max?.toString().split('.')[1]?.length == 1) {
      max = parseFloat(max).toFixed(1);
    } else {
      // return element.defaultanswer = val;
    }

    // setTimeout(() => {
    this.evaluationModel.questionsList[i].Topics.questions[j].topicQuestionValueMinimum = parseFloat(min);
    this.evaluationModel.questionsList[i].Topics.questions[j].topicQuestionValueMaximum = parseFloat(max);
    // }, 100);


    if (val == 'max') {
      if (max < min) {
        this.minMaxWarningMessage = 'Maximum value must be greater than Minimum value';
      } else {
        this.minMaxWarningMessage = '';
      }
    }
    if (val == 'min') {
      if (min > max) {
        this.minMaxWarningMessage = 'Minimum value must be lessthan than Maximum value';
      } else {
        this.minMaxWarningMessage = '';
      }
    }
    // this.evaluationModel.questionsList[i].Topics.questions[j].questionValue = min?.toString()+'-'+max?.toString();
    this.evaluationModel.questionsList[i].Topics.questions[j].questionValue = min?.toString() + '=' + max?.toString();
    let countQA = 0;
    await this.evaluationModel.questionsList.forEach((elementT: any) => {
      elementT.Topics.questions.forEach(elementQ => {
        if (elementQ.questionChoice != 'Comments' && (elementQ.questionValue == null || elementQ.questionValue == '' || elementQ.questionValue == undefined || elementQ.questionValue?.includes('null') || elementQ.questionValue?.includes('undefined'))) {
          countQA = countQA + 1;
        }
      });
    });
    if (countQA == 0) {
      this.disabledConditionalDisplayOption = false;
    } else {
      this.disabledConditionalDisplayOption = true;
    }
  }

  topicQuestionValueMinimum: any = null;
  topicQuestionValueMaximum: any = null;
  topicQuestionValueYes: any = null;
  topicQuestionValueNo: any = null;
  async yesNoQuestionTypeFuncion(yes, no, i, j) {
    // this.evaluationModel.questionsList[i].Topics.questions[j].questionValue = 'Yes-'+yes?.toString()+','+ 'No-'+no?.toString();
    this.evaluationModel.questionsList[i].Topics.questions[j].questionValue = 'Yes=' + yes?.toString() + ',' + 'No=' + no?.toString();
    let countQA = 0;
    await this.evaluationModel.questionsList.forEach((elementT: any) => {
      elementT.Topics.questions.forEach(elementQ => {
        if (elementQ.questionChoice != 'Comments' && (elementQ.questionValue == null || elementQ.questionValue == '' || elementQ.questionValue == undefined || elementQ.questionValue?.includes('null') || elementQ.questionValue?.includes('undefined'))) {
          countQA = countQA + 1;
        }
      });
    });
    if (countQA == 0) {
      this.disabledConditionalDisplayOption = false;
    } else {
      this.disabledConditionalDisplayOption = true;
    }
  }

  async choiceQuestionTypeFuncion(topicQuestionChoiceArrayInputs, i, j) {

    // this.evaluationModel.questionsList[i].Topics.questions[j].questionValue = topicQuestionChoiceArrayInputs.map(x=>x.topicQuestionChoiceQuestion+'-'+x.topicQuestionChoiceValue).join(",");
    this.evaluationModel.questionsList[i].Topics.questions[j].questionValue = topicQuestionChoiceArrayInputs.map(x => x.topicQuestionChoiceQuestion + '=' + x.topicQuestionChoiceValue).join(",");
    // console.log(this.evaluationModel.questionsList[i].Topics.questions[j].questionValue);
    let countQA = 0;
    await this.evaluationModel.questionsList.forEach((elementT: any) => {
      elementT.Topics.questions.forEach(elementQ => {
        if (elementQ.questionChoice != 'Comments' && (elementQ.questionValue == null || elementQ.questionValue == '' || elementQ.questionValue == undefined || elementQ.questionValue?.includes('null') || elementQ.questionValue?.includes('undefined'))) {
          countQA = countQA + 1;
        }
      });
    });
    if (countQA == 0) {
      this.disabledConditionalDisplayOption = false;
    } else {
      this.disabledConditionalDisplayOption = true;
    }

    // Find duplicate Question choice answer value
    // await topicQuestionChoiceArrayInputs.some(user => {
    //   let counter = 0;
    //   for (const iterator of topicQuestionChoiceArrayInputs) {
    //     if (iterator.topicQuestionChoiceQuestionEdit === user.topicQuestionChoiceQuestionEdit || iterator.topicQuestionChoiceValueEdit === user.topicQuestionChoiceValueEdit) {
    //       counter += 1;
    //     }
    //   }
    //   if (counter > 1) {
    //     this.QustionChoiceAnswerValue = true;
    //     this.commonMethods.addToastforlongtime(false, 'Same Question choice answer value is not allowed');
    //   } else {
    //     this.QustionChoiceAnswerValue = false;
    //   }
    //   return counter > 1;
    // });

    // Find duplicate Question choice answer value
    this.ChoiceInputCount = 0;
    await topicQuestionChoiceArrayInputs.some(user => {
      for (const iterator of topicQuestionChoiceArrayInputs) {
        if (iterator.topicQuestionChoiceQuestion == user.topicQuestionChoiceQuestion
          // || iterator.topicQuestionChoiceValue == user.topicQuestionChoiceValue
        ) {
          this.ChoiceInputCount += 1;
        }
      }
      if (this.ChoiceInputCount >= topicQuestionChoiceArrayInputs.length + 1) {
        this.QustionChoiceAnswerValue = true;
        // this.commonMethods.addToastforlongtime(false, 'Same Question choice answer label');
        this.messageService.clear();
        this.messageService.add({ key: 'tc', severity: 'info', summary: 'Same Question choice answer label', life: 5000 });
        setTimeout(() => {
          this.messageService.clear();
        }, 5000);
      } else {
        this.messageService.clear();
        this.QustionChoiceAnswerValue = false;
        // this.commonMethods.addToastforshorttime(false, 'Same Question choice answer value is not allowed');
      }
      return this.ChoiceInputCount >= topicQuestionChoiceArrayInputs.length + 1;
    });

  }

  conditionalSkipValueChange(minOrYes, maxOrNo, cs) {


    setTimeout(() => {
      if (minOrYes.toString().length >= 5 && minOrYes.toString().includes('.')) {
        if (minOrYes.toString().split('.')[1] > 1) {
          this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMinValue = parseFloat(minOrYes).toFixed(2);
        } else if (minOrYes.toString().split('.')[1].length == 1) {
          this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMinValue = parseFloat(minOrYes).toFixed(1);
        }
      } else {
        this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMinValue = minOrYes;
      }

      if (maxOrNo.toString().length >= 5 && maxOrNo.toString().includes('.')) {
        if (maxOrNo.toString().split('.')[1] > 1) {
          this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMaxValue = parseFloat(maxOrNo).toFixed(2);
        } else if (maxOrNo.toString().split('.')[1].length == 1) {
          this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMaxValue = parseFloat(maxOrNo).toFixed(1);
        }
      } else {
        this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMaxValue = maxOrNo;
      }
    }, 10);

    setTimeout(() => {
      // this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalValue = minOrYes + '= + maxOrNo;
      this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalValue =
        this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMinValue + '=' +
        this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMaxValue;

      if (this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMinValue != null && this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMaxValue != null) {
        this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalValue = this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMinValue + '=' + this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMaxValue;
      } else {
        if (this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMinValue != null || this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMaxValue != null) {
          this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMinValue = this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMinValue == '' || this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMinValue == null ? '' : this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMinValue;
          this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMaxValue = this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMaxValue == '' || this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMaxValue == null ? '' : this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMaxValue;
          this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalValue = this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMinValue + '=' + this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMaxValue;
        } else {
          this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalValue = null;
        }
      }


    }, 100);


  }

  conditionalSkipValueChangeYesNo(conditionalValue, cs, conditionalSkipChoiceYesNoList) {
    // console.log("conditionalValue", conditionalValue);
    // this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalValue = conditionalValue.map(x=>x.label+'-'+x.value).join(",");
    conditionalSkipChoiceYesNoList.forEach(element => {
      if (element.label == conditionalValue) {
        // this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalValue = element.label+'-'+element.value;
        this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalValue = element.label + '=' + element.value;
      }
    });
    // conditionalValue;
    // conditionalValue.label + '-' + conditionalValue.value;
  }

  conditionalSkipChoiceQuestionValueRepeated: boolean = false;
  async conditionalSkipValueChangeChoice(cs, choiceQuestionList, choiceQuestionOption, conditionalSkipChoiceOptionList) {

    this.conditionalSkipChoiceQuestionValueRepeated = await choiceQuestionList.some(user => {
      let counter = 0;
      for (const iterator of choiceQuestionList) {
        if (iterator.choiceQuestionOption === user.choiceQuestionOption) {
          counter += 1;
        }
      }
      if (counter > 1) {
        this.commonMethods.addToastforlongtime(false, 'Same Question choice value is not allowed');
      }
      return counter > 1;
    });

    let tempConditionalValue = [];
    choiceQuestionList.forEach(element => {
      conditionalSkipChoiceOptionList.forEach(element1 => {
        if (element.choiceQuestionOption == element1.label) {
          tempConditionalValue.push(element1);
        }
      });
    });
    // this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalValue = tempConditionalValue.map(x=>x.label+'-'+x.value).join(",");
    this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalValue = tempConditionalValue.map(x => x.label + '=' + x.value).join(",");
  }

  choiceQuestionList: any = [];
  conditionalSkipChoiceOptionList: any = [];
  conditionalSkipChoiceYesNoList: any = [];
  conditionalSkipQuestionRepeated: boolean = false;
  async addSCBQuestionChoiceList(val, cs, conditionalQuestion, conditionalSkipArrayInputs, condition) {
    // console.log('cs', cs);
    // console.log('conditionalQuestion', conditionalQuestion);
    // console.log('condition', condition);
    this.choiceQuestionList = [];
    let questionsObj = { choiceQuestionOption: null, choiceQuestionOptionValue: null };
    if (val === 1) {
      this.choiceQuestionList.push(questionsObj);
    } else {
      if (this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].choiceQuestionList.length === 0) {
        this.choiceQuestionList.push(questionsObj);
      }
    }

    if (conditionalSkipArrayInputs != undefined) {
      let count = 0;
      conditionalSkipArrayInputs.forEach((element, index) => {
        if (element.conditionalQuestion != null && element.conditionalQuestion != null)
          if (element.conditionalQuestion.id == conditionalQuestion.id && element.conditionalQuestion.name == conditionalQuestion.name && index < conditionalSkipArrayInputs.length) {
            count += 1;
          }
      });
      if (count > 1) {
        this.conditionalSkipQuestionRepeated = true;
        this.commonMethods.addToastforlongtime(false, 'Same Question is not allowed');
      } else {
        this.conditionalSkipQuestionRepeated = false;
      }
    }

    await this.choiceQuestionList.forEach(element => {
      if (this.conditionalSkipDetails.conditionalSkipArrayInputs == undefined || this.conditionalSkipDetails.conditionalSkipArrayInputs.length == 0) {
        this.conditionalSkipDetails.conditionalSkipArrayInputs = [{ choiceQuestionList: [] }];
        this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].choiceQuestionList.push(element);
      } else {
        if (this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].choiceQuestionList == undefined) {
          this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].choiceQuestionList = [];
        }
        this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].choiceQuestionList.push(element);
      }
    });

    if (conditionalQuestion != undefined) {
      if (conditionalQuestion?.questionChoice == "Choice") {
        this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].choiceQuestionList = [{ choiceQuestionOption: null, choiceQuestionOptionValue: null }];

        if (this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalSkipChoiceOptionList == undefined) {
          this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalSkipChoiceOptionList = [];
        } else {
          this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalSkipChoiceOptionList = [];
        }
        let quesAnsTempChoice = conditionalQuestion.value.split(',');
        await quesAnsTempChoice.forEach(element1 => {
          if (element1.includes('=')) {
            this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalSkipChoiceOptionList.push({ label: element1.split('=')[0], value: element1.split('=')[1] });
          } else if (element1.includes('-')) {
            this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalSkipChoiceOptionList.push({ label: element1.split('-')[0], value: element1.split('-')[1] });
          }
        });
      }
      if (conditionalQuestion?.questionChoice == "Yes/No") {
        if (this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalSkipChoiceYesNoList == undefined) {
          this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalSkipChoiceYesNoList = [];
        } else {
          this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalSkipChoiceYesNoList = [];
        }
        let quesAnsTempYesNo = conditionalQuestion.value.split(',');
        quesAnsTempYesNo.forEach(element => {
          if (element.includes('=')) {
            this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalSkipChoiceYesNoList.push({ label: element.split('=')[0], value: element.split('=')[1] });
          }
          if (element.includes('-')) {
            this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalSkipChoiceYesNoList.push({ label: element.split('-')[0], value: element.split('-')[1] });
          }
        });
      }
    }

    // Remove duplicates
    this.conditionalSkipQuestionListEdit = await this.conditionalSkipQuestionListEdit.reduce((accumalator, current) => {
      if (
        !accumalator.some(
          (item) => item.id === current.id && item.name === current.name
        )
      ) {
        accumalator.push(current);
      }
      return accumalator;
    }, []);
    this.conditionalSkipChoiceOptionList = this.conditionalSkipChoiceOptionList.reduce((accumalator, current) => {
      if (
        !accumalator.some(
          (item) => item.label === current.label && item.value === current.value
        )
      ) {
        accumalator.push(current);
      }
      return accumalator;
    }, []);
    this.conditionalSkipChoiceYesNoList = this.conditionalSkipChoiceYesNoList.reduce((accumalator, current) => {
      if (
        !accumalator.some(
          (item) => item.label === current.label && item.value === current.value
        )
      ) {
        accumalator.push(current);
      }
      return accumalator;
    }, []);

  }

  conditionalSkipValueChangeAdditional(choiceQuestionList, cs) {
    // this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalValue = choiceQuestionList.map(x=>x.choiceQuestionOption+'-'+x.choiceQuestionOptionValue).join(",");
    this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalValue = choiceQuestionList.map(x => x.choiceQuestionOption + '=' + x.choiceQuestionOptionValue).join(",");
  }

  async removeconditionalSkipAdditional(c, ai, choiceQuestionList, conditionalSkipChoiceOptionList) {
    this.conditionalSkipDetails.conditionalSkipArrayInputs[c].choiceQuestionList.splice(ai, 1);

    let tempConditionalValue = [];
    await choiceQuestionList.forEach(element => {
      conditionalSkipChoiceOptionList.forEach(element1 => {
        if (element.choiceQuestionOption == element1.label) {
          tempConditionalValue.push(element1);
        }
      });
    });

    this.conditionalSkipChoiceQuestionValueRepeated = await choiceQuestionList.some(user => {
      let counter = 0;
      for (const iterator of choiceQuestionList) {
        if (iterator.choiceQuestionOption === user.choiceQuestionOption) {
          counter += 1;
        }
      }
      if (counter > 1) {
        this.commonMethods.addToastforlongtime(false, 'Same Question choice value is not allowed');
      }
      return counter > 1;
    });
    // this.conditionalSkipDetails.conditionalSkipArrayInputs[c].conditionalValue = tempConditionalValue.map(x=>x.label+'-'+x.value).join(",");
    this.conditionalSkipDetails.conditionalSkipArrayInputs[c].conditionalValue = tempConditionalValue.map(x => x.label + '=' + x.value).join(",");


    // let tempseprateconditionalValue = this.conditionalSkipDetails.conditionalSkipArrayInputs[c].conditionalValue.split(',');
    // tempseprateconditionalValue = tempseprateconditionalValue.reduce((accumalator, current) => {
    //   if (
    //     !accumalator.some(
    //       (item) => item === current
    //     )
    //   ) {
    //     accumalator.push(current);
    //   }
    //   return accumalator;
    // }, []);
    // this.conditionalSkipDetails.conditionalSkipArrayInputs[c].conditionalValue = tempseprateconditionalValue.map(x => x).join(",");
    return true;
  }


  // *************************************** Edit Evaluation Form Conditional Skip Functions *****************************
  minMaxWarningMessageEdit: any = '';
  minMaxValueValidationIndexI: any = null;
  minMaxValueValidationIndexJ: any = null;
  async minMaxWarningMessageFuncionEdit(val, min, max, i, j) {

    if (min?.toString().split('.')[1]?.length > 1) {
      min = parseFloat(min).toFixed(2);
    } else if (min?.toString().split('.')[1]?.length == 1) {
      min = parseFloat(min).toFixed(1);
    } else {
      // return element.defaultanswer = val;
    }

    if (max?.toString().split('.')[1]?.length > 1) {
      max = parseFloat(max).toFixed(2);
    } else if (max?.toString().split('.')[1]?.length == 1) {
      max = parseFloat(max).toFixed(1);
    } else {
      // return element.defaultanswer = val;
    }

    // setTimeout(() => {
    this.evaluationModel.questionsList[i].Topics.questions[j].topicQuestionValueMinimumEdit = parseFloat(min);
    this.evaluationModel.questionsList[i].Topics.questions[j].topicQuestionValueMaximumEdit = parseFloat(max);
    // }, 100);


    this.minMaxValueValidationIndexI = i;
    this.minMaxValueValidationIndexJ = j;
    if (val == 'max') {
      if (max < min) {
        this.minMaxWarningMessageEdit = 'Maximum value must be greater than or equal to Minimum value';
      } else {
        this.minMaxWarningMessageEdit = '';
      }
    }
    if (val == 'min') {
      if (min > max) {
        this.minMaxWarningMessageEdit = 'Minimum value must be less than or equal to Maximum value';
      } else {
        this.minMaxWarningMessageEdit = '';
      }
    }
    this.evaluationModel.questionsList[i].Topics.questions[j].questionValue = min?.toString() + '-' + max?.toString();
    let countQA = 0;
    await this.evaluationModel.questionsList.forEach((elementT: any, inxI) => {
      elementT.Topics.questions.forEach((elementQ, inxJ) => {
        if (elementQ.questionChoice != 'Comments' && (elementQ.questionValue == null || elementQ.questionValue == '' || elementQ.questionValue == undefined || elementQ.questionValue?.includes('null') || elementQ.questionValue?.includes('undefined'))) {
          countQA = countQA + 1;
        }

      });
    });
    if (countQA == 0) {
      this.disabledConditionalDisplayOption = false;
    } else {
      this.disabledConditionalDisplayOption = true;
    }
  }

  topicQuestionValueMinimumEdit: any = null;
  topicQuestionValueMaximumEdit: any = null;
  topicQuestionValueYesEdit: any = null;
  topicQuestionValueNoEdit: any = null;
  async yesNoQuestionTypeFuncionEdit(yes, no, i, j) {
    // this.evaluationModel.questionsList[i].Topics.questions[j].questionValue = 'Yes-'+yes?.toString()+','+ 'No-'+no?.toString();
    this.evaluationModel.questionsList[i].Topics.questions[j].questionValue = 'Yes=' + yes?.toString() + ',' + 'No=' + no?.toString();
    let countQA = 0;
    await this.evaluationModel.questionsList.forEach((elementT: any) => {
      elementT.Topics.questions.forEach(elementQ => {
        if (elementQ.questionChoice != 'Comments' && (elementQ.questionValue == null || elementQ.questionValue == '' || elementQ.questionValue == undefined || elementQ.questionValue?.includes('null') || elementQ.questionValue?.includes('undefined'))) {
          countQA = countQA + 1;
        }
      });
    });
    if (countQA == 0) {
      this.disabledConditionalDisplayOption = false;
    } else {
      this.disabledConditionalDisplayOption = true;
    }
  }

  topicQuestionChoiceArrayInputsEdit: any = [];
  async addtopicQuestionChoiceEdit(val, i, j, itemEdit) {
    // console.log('itemEdit', itemEdit);

    // val.questionValue = null;
    let count = 0;
    // if(itemEdit != undefined) {
    //   this.evaluationModel.questionsList.forEach(elementTopic => {
    //     elementTopic.Topics.questions.forEach(elementQuest => {
    //       if(elementQuest.conditionalSkipDetails?.conditionalList != undefined) {
    //         elementQuest.conditionalSkipDetails.conditionalList.forEach(elementCSQ => {
    //           let choiceArray;
    //           if(elementCSQ.conditionalQuestion?.id == itemEdit.questionId && elementCSQ.conditionalQuestion?.questionChoice == itemEdit.questionChoice) {
    //                 count = count + 1;
    //                 this.commonMethods.addToastforlongtime(false, 'This question choice and value is used in conditional skip. Please remove that question and try again.');
    //                 return true;
    //           }

    //         });
    //       }

    //     });
    //   });
    // }
    this.disabledConditionalDisplayOption = true;
    let countQA = 0;
    await this.evaluationModel.questionsList.forEach((elementT: any) => {
      elementT.Topics.questions.forEach(elementQ => {
        if (elementQ.questionChoice != 'Comments' && (elementQ.questionValue == null || elementQ.questionValue == '' || elementQ.questionValue == undefined || elementQ.questionValue?.includes('null') || elementQ.questionValue?.includes('undefined'))) {
          countQA = countQA + 1;
        }
        // Intiate the default value
        if (elementQ.questionChoice == 'Choice' || elementQ.questionChoice == 'Yes/No') {
          if (elementQ?.defaultanswer == null || elementQ?.defaultanswer == '') {
            elementQ.defaultanswer = '';
          }
        }
      });
    });
    if (countQA == 0) {
      this.disabledConditionalDisplayOption = false;
    } else {
      this.disabledConditionalDisplayOption = true;
    }
    if (count == 0) {
      this.topicQuestionChoiceArrayInputsEdit = [];
      let questionsObj = { topicQuestionChoiceQuestionEdit: null, topicQuestionChoiceValueEdit: null };
      if (val == 1) {
        this.topicQuestionChoiceArrayInputsEdit.push(questionsObj);
      } else {
        if (this.topicQuestionChoiceArrayInputsEdit.length === 0) {
          this.topicQuestionChoiceArrayInputsEdit.push(questionsObj);
        }
      }
      this.topicQuestionChoiceArrayInputsEdit.forEach(element => {
        if (this.evaluationModel.questionsList[i].Topics.questions[j].topicQuestionChoiceArrayInputsEdit == undefined) {
          this.evaluationModel.questionsList[i].Topics.questions[j].topicQuestionChoiceArrayInputsEdit = [];
          this.evaluationModel.questionsList[i].Topics.questions[j].topicQuestionChoiceArrayInputsEdit.push(element);
        } else {
          if (this.evaluationModel.questionsList[i].Topics.questions[j].topicQuestionChoiceArrayInputsEdit.length < 2) {
            this.evaluationModel.questionsList[i].Topics.questions[j].topicQuestionChoiceArrayInputsEdit.push(element);
          } else if (val == 1) {
            this.evaluationModel.questionsList[i].Topics.questions[j].topicQuestionChoiceArrayInputsEdit.push(element);
          }
        }
      });
      // console.log(this.evaluationModel.questionsList[i].Topics.questions.topicQuestionChoiceArrayInputsEdit);
      // console.log(this.evaluationModel.questionsList);
    }
  }

  checkAlreadyExisitinQuestionType(itemEdit) {
    // console.log('itemEdit', itemEdit);
  }


  async removetopicQuestionChoiceEdit(ch, i, j, topicQuestionChoiceArrayInputsEdit, choice, defaultanswer) {
    let count = 0;
    let findChoice = choice.topicQuestionChoiceQuestionEdit + '-' + choice.topicQuestionChoiceValueEdit;
    await this.evaluationModel.questionsList[i].Topics.questions.forEach(element => {
      if (element.conditionalSkipDetails?.conditionalList != undefined) {
        element.conditionalSkipDetails.conditionalList.forEach(element1 => {
          let choiceArray;
          if (element1.conditionalQuestion?.questionChoice == 'Choice' && element1.conditionalValue != undefined && element1.conditionalValue != '') {
            choiceArray = element1.conditionalValue.split(',');
            choiceArray.forEach(element2 => {
              if (element2 == findChoice) {
                count = count + 1;
                this.commonMethods.addToastforlongtime(false, 'This choice option is used another place.');
                return true;
              }
            });
          }

          if (defaultanswer != null) {
            if (defaultanswer == choice.topicQuestionChoiceQuestionEdit) {
              this.evaluationModel.questionsList[i].Topics.questions[j].defaultanswer = "";
            }
          }

        });
      }
    });

    // main Section of remove choice option
    if (count == 0) {
      this.evaluationModel.questionsList[i].Topics.questions[j].topicQuestionChoiceArrayInputsEdit.splice(ch, 1);
      // this.evaluationModel.questionsList[i].Topics.questions[j].questionValue = topicQuestionChoiceArrayInputsEdit.map(x=>x.topicQuestionChoiceQuestionEdit+'-'+x.topicQuestionChoiceValueEdit).join(",");
      this.evaluationModel.questionsList[i].Topics.questions[j].questionValue = topicQuestionChoiceArrayInputsEdit.map(x => x.topicQuestionChoiceQuestionEdit + '=' + x.topicQuestionChoiceValueEdit).join(",");
      return true;
    }

    let countQA = 0;
    await this.evaluationModel.questionsList.forEach((elementT: any) => {
      elementT.Topics.questions.forEach(elementQ => {
        if (elementQ.questionChoice != 'Comments' && (elementQ.questionValue == null || elementQ.questionValue == '' || elementQ.questionValue == undefined || elementQ.questionValue?.includes('null') || elementQ.questionValue?.includes('undefined'))) {
          countQA = countQA + 1;
        }
      });
    });
    if (countQA == 0) {
      this.disabledConditionalDisplayOption = false;
    } else {
      this.disabledConditionalDisplayOption = true;
    }
  }

  // ****************************** Edit Conditional Skip Detail Section  *****************************
  conditionalSkipArrayInputsEdit: any = [];
  conditionalSkipDetailsEdit: any = { allConditionMet: '', conditionalSkipArrayInputsEdit: [] };
  conditionalSkipQuestionListEdit: any = [];
  async addconditionalSkipEdit(val, i, j, itemEdit) {
    // console.log('val', val);
    // console.log('i', i);
    // console.log('j', j);
    // console.log('itemEdit', itemEdit);

    // if(val==0) {
    //   document.getElementById("EditModalOpen").click();
    // }

    let count = 0;
    if (this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit.length > 0) {
      await this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit.forEach(element => {
        if (element.conditionalQuestion != undefined && element.conditionalQuestion != null && element.conditionalValue != undefined && element.conditionalValue != null && element.conditionalValue != '' && (element.conditionalValue != '=' && element.conditionalValue != '-')) {
          count += 1;
        }
      });
    }
    if (count >= this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit.length || this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit.length == 0) {

      this.conditionalSkipQuestionRepeated = false;
      if (val == 0) {
        this.conditionalSkipChoiceYesNoList = [];
        this.conditionalSkipChoiceOptionList = [];
        this.conditionalSkipQuestionListEdit = [];
      }
      this.conditionalSkipArrayInputsEdit = [];

      // Edit Existing Questions & Add new Questions for Conditional Skip Option
      if (val == 0 && itemEdit != undefined && itemEdit.conditionalSkip && itemEdit.conditionalSkipDetails != undefined) {
        this.CurrentTopicIndexI = i;
        this.CurrentTopicIndexJ = j;
        this.conditionalSkipDetailsEdit = { conditionMet: 'All', conditionalSkipArrayInputsEdit: [] };
        this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit = itemEdit.conditionalSkipDetails.conditionalList;
        this.conditionalSkipDetailsEdit.conditionMet = itemEdit.conditionalSkipDetails.conditionMet;
        if (this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit == undefined) {
          let questionsObj = { conditionalQuestion: null, conditionalValue: null, choiceQuestionList: [] };
          this.conditionalSkipDetailsEdit.conditionMet = 'All';
          this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit = [];
          // this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit.push(questionsObj);
        }

        this.conditionalSkipQuestionListEdit = [];
        if (i >= 0) {
          this.evaluationModel.questionsList.forEach((element0, index0) => {
            element0.Topics.questions.forEach((element1, index1) => {
              let questionValue = { id: element1.questionId == undefined ? element1.questionid : element1.questionId, name: element1.question, questionChoice: element1.questionChoice, value: element1.questionValue };
              if (i == index0 && j == index1) {
              } else {
                if (this.conditionalSkipQuestionListEdit.indexOf(questionValue) == -1) {
                  if (questionValue.name != null && questionValue.name != undefined && questionValue.questionChoice != null && questionValue.questionChoice != undefined) {
                    this.conditionalSkipQuestionListEdit.push(questionValue);
                  }
                }
              }
            });
          });
        }

        await this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit.forEach((element, index) => {
          // Edit Modal Questions List for Conditional Skip Option


          // Edit Bind Number type values
          if (element.conditionalQuestion != null && element.conditionalQuestion?.questionChoice == 'Number' && element.conditionalValue != null) {
            if (element.conditionalValue != null && element.conditionalValue != undefined) {
              if (element.conditionalValue?.toString().includes('=')) {
                element.conditionalMinValue = element.conditionalValue.split('=')[0];
                element.conditionalMaxValue = element.conditionalValue.split('=')[1];
              }
              if (element.conditionalValue?.toString().includes('-')) {
                element.conditionalMinValue = element.conditionalValue.split('-')[0];
                element.conditionalMaxValue = element.conditionalValue.split('-')[1];
              }
            }
          }

          // Edit Bind Yes/No type values
          if (this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[index].conditionalSkipChoiceYesNoList == undefined) {
            this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[index].conditionalSkipChoiceYesNoList = [];
          } else {
            this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[index].conditionalSkipChoiceYesNoList = [];
          }
          if (element.conditionalQuestion != null && element.conditionalQuestion?.questionChoice == 'Yes/No') {
            if (element.conditionalValue != null && element.conditionalValue != undefined) {
              if (element.conditionalValue?.includes('=')) {
                element.conditionalYesNoValue = element.conditionalValue.split('=')[0];
              }
              if (element.conditionalValue?.includes('-')) {
                element.conditionalYesNoValue = element.conditionalValue.split('-')[0];
              }
            }


            let quesAnsTempYesNo = element.conditionalQuestion.value.split(',');
            quesAnsTempYesNo.forEach(element2 => {
              if (element2.includes('=')) {
                this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[index].conditionalSkipChoiceYesNoList.push({ label: element2.split('=')[0], value: element2.split('=')[1] });
              }
              if (element2.includes('-')) {
                this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[index].conditionalSkipChoiceYesNoList.push({ label: element2.split('-')[0], value: element2.split('-')[1] });
              }
            });
          }

          // Edit Bind Choice type values
          if (element.conditionalQuestion != null && element.conditionalQuestion?.questionChoice == 'Choice') {

            this.conditionalSkipChoiceOptionList = [];
            let tempsubQuestionValue = [];
            if (element.conditionalSkipChoiceOptionList == undefined) {
              element.conditionalSkipChoiceOptionList = [];
            }

            if (element.conditionalValue != '' && element.conditionalValue != null) {
              tempsubQuestionValue = element.conditionalValue.split(',');
            } else {
              tempsubQuestionValue = [];
            }

            if (element.choiceQuestionList == undefined) {
              element.choiceQuestionList = [];
            }
            element.choiceQuestionList = [];
            tempsubQuestionValue.forEach(element1 => {
              if (element1.includes('=')) {
                element.choiceQuestionList.push({ choiceQuestionOption: element1.split('=')[0] });
              } else if (element1.includes('-')) {
                element.choiceQuestionList.push({ choiceQuestionOption: element1.split('-')[0] });
              }
            });
          }
        });

      } else {
        // console.log('val==1', );
        // Add new Questions for Conditional Skip Option
        let questionsObj = { conditionalQuestion: null, conditionalValue: null, choiceQuestionList: [] };
        if (val === 1) {
          this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit.push(questionsObj);

          // Edit Modal Questions List for Conditional Skip Option
          this.conditionalSkipQuestionListEdit = [];
          if (i >= 0) {
            await this.evaluationModel.questionsList.forEach((element0, index0) => {
              element0.Topics.questions.forEach((element, index) => {
                let questionValue = { id: element.questionId == undefined ? element.questionid : element.questionId, name: element.question, questionChoice: element.questionChoice, value: element.questionValue };
                if (this.CurrentTopicIndexI == index0 && this.CurrentTopicIndexJ == index) {
                } else {
                  if (this.conditionalSkipQuestionListEdit.indexOf(questionValue) == -1) {
                    if (questionValue.name != null && questionValue.name != undefined && questionValue.questionChoice != null && questionValue.questionChoice != undefined) {
                      this.conditionalSkipQuestionListEdit.push(questionValue);
                    }
                  }
                }
              });
            });

          }
        } else {
          // console.log('val==1 && Else');
          this.conditionalSkipQuestionListEdit = [];

          this.CurrentTopicIndexI = i;
          this.CurrentTopicIndexJ = j;
          this.conditionalSkipDetailsEdit = { conditionMet: 'All', conditionalSkipArrayInputsEdit: [] };
          if (itemEdit.conditionalSkipDetails != undefined && itemEdit.conditionalSkipDetails.conditionalList != undefined) {
            await itemEdit.conditionalSkipDetails.conditionalList.forEach(element => {
              this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit.push(element);
            });
          } else {
            // this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit.push(questionsObj);
          }


          this.conditionalSkipQuestionListEdit = [];
          if (i >= 0) {
            await this.evaluationModel.questionsList.forEach((element0, index0) => {
              element0.Topics.questions.forEach((element, index) => {
                let questionValue = { id: element.questionId, name: element.question, questionChoice: element.questionChoice, value: element.questionValue };
                if (i == index0 && j == index) {
                } else {
                  if (this.conditionalSkipQuestionListEdit.indexOf(questionValue) == -1) {
                    if (questionValue.name != null && questionValue.name != undefined && questionValue.questionChoice != null && questionValue.questionChoice != undefined) {
                      this.conditionalSkipQuestionListEdit.push(questionValue);
                    }
                  }
                }
              });
            });
          }
        }
      }

      // Remove Duplicates Sections
      this.conditionalSkipQuestionListEdit = await this.conditionalSkipQuestionListEdit.reduce((accumalator, current) => {
        if (
          !accumalator.some(
            (item) => item.id === current.id && item.name === current.name
          )
        ) {
          accumalator.push(current);
        }
        return accumalator;
      }, []);

      this.conditionalSkipChoiceYesNoList = await this.conditionalSkipChoiceYesNoList.reduce((accumalator, current) => {
        if (
          !accumalator.some(
            (item) => item.label === current.label && item.value === current.value
          )
        ) {
          accumalator.push(current);
        }
        return accumalator;
      }, []);

      this.conditionalSkipChoiceOptionList = await this.conditionalSkipChoiceOptionList.reduce((accumalator, current) => {
        if (
          !accumalator.some(
            (item) => item.label === current.label && item.value === current.value
          )
        ) {
          accumalator.push(current);
        }
        return accumalator;
      }, []);

      await this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit.forEach((elementI, indexI) => {
        this.conditionalSkipQuestionListEdit.forEach(elementQ => {
          if (elementQ.questionChoice == elementI.conditionalQuestion?.questionChoice && elementQ.id == elementI.conditionalQuestion?.id) {
            // elementI.conditionalQuestion.value = elementQ.value;
            this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[indexI].conditionalQuestion = elementQ;
            // let tempQuestionValue = elementQ.value.split(',');
            let tempQuestionValue = [];
            elementI.conditionalSkipChoiceOptionList = [];
            if (elementQ.value?.indexOf(',') > -1) {
              tempQuestionValue = elementQ.value.split(',');
            } else {
              if (elementQ.value != undefined || elementQ.value != null) {
                tempQuestionValue = [elementQ.value];
              } else {
                tempQuestionValue = [];
              }
            }
            tempQuestionValue.forEach(elementQV => {
              if (elementI.conditionalQuestion?.questionChoice == "Choice") {
                if (elementQV.includes('=')) {
                  elementI.conditionalSkipChoiceOptionList.push({ label: elementQV.split('=')[0], value: elementQV.split('=')[1] });
                } else if (elementQV.includes('-')) {
                  elementI.conditionalSkipChoiceOptionList.push({ label: elementQV.split('-')[0], value: elementQV.split('-')[1] });
                }

              }
            });
          }
        });
      });
    } else {
      // this.invalidSupportConditionalInputs = 'Conditional skip option must be one valid question and answer';
      this.commonMethods.addToastforlongtime(false, 'Conditional skip option must be one valid question and answer.');

    }
    // console.log('this.conditionalSkipDetailsEdit', this.conditionalSkipDetailsEdit);
  }

  async saveConditionalSkipEdit() {
    let count = 0;
    if (this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit.length > 0) {
      await this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit.forEach(element => {
        if (element.conditionalQuestion != undefined && element.conditionalQuestion != null && element.conditionalValue != undefined && element.conditionalValue != null && element.conditionalValue != '' && (element.conditionalValue != '=' && element.conditionalValue != '-')) {
          count += 1;
        }
      });
    }

    if (count >= this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit.length || this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit.length == 0) {
      // this.invalidSupportConditionalInputs = '';
      let conditionalSkipDetails = {
        conditionMet: this.conditionalSkipDetailsEdit.conditionMet,
        conditionalList: this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit
      };
      if (this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit.length == 0 || this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit == undefined && this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit == null) {
        this.evaluationModel.questionsList[this.CurrentTopicIndexI].Topics.questions[this.CurrentTopicIndexJ].conditionalSkip = false;
      }
      this.evaluationModel.questionsList[this.CurrentTopicIndexI].Topics.questions[this.CurrentTopicIndexJ].conditionalSkipDetails = conditionalSkipDetails;
      document.getElementById('createModalClose1').click();
    } else {
      // this.invalidSupportConditionalInputs = 'Conditional skip option must be one valid question and answer';
      this.commonMethods.addToastforlongtime(false, 'Conditional skip option must be one valid question and answer (OR) Remove this Question.');
    }
  }

  QustionChoiceAnswerValue: boolean = false;
  ChoiceInputCount: any = 0;
  async choiceQuestionTypeFuncionEdit(topicQuestionChoiceArrayInputs, i, j) {
    // this.evaluationModel.questionsList[i].Topics.questions[j].questionValue = await topicQuestionChoiceArrayInputs.map(x=>x.topicQuestionChoiceQuestionEdit + '-' + x.topicQuestionChoiceValueEdit).join(",");
    this.evaluationModel.questionsList[i].Topics.questions[j].questionValue = await topicQuestionChoiceArrayInputs.map(x => x.topicQuestionChoiceQuestionEdit + '=' + x.topicQuestionChoiceValueEdit).join(",");
    let countQA = 0;
    await this.evaluationModel.questionsList.forEach((elementT: any) => {
      elementT.Topics.questions.forEach(elementQ => {
        if (elementQ.questionChoice != 'Comments' && (elementQ.questionValue == null || elementQ.questionValue == '' || elementQ.questionValue == undefined || elementQ.questionValue?.includes('null') || elementQ.questionValue?.includes('undefined'))) {
          countQA = countQA + 1;
        }
      });
    });
    if (countQA == 0) {
      this.disabledConditionalDisplayOption = false;
    } else {
      this.disabledConditionalDisplayOption = true;
    }

    // Find duplicate Question choice answer value
    this.ChoiceInputCount = 0;
    await topicQuestionChoiceArrayInputs.some(user => {
      for (const iterator of topicQuestionChoiceArrayInputs) {
        if (iterator.topicQuestionChoiceQuestionEdit == user.topicQuestionChoiceQuestionEdit
          // || iterator.topicQuestionChoiceValueEdit == user.topicQuestionChoiceValueEdit
        ) {
          this.ChoiceInputCount += 1;
        }
      }
      if (this.ChoiceInputCount >= topicQuestionChoiceArrayInputs.length + 1) {
        this.QustionChoiceAnswerValue = true;
        // this.commonMethods.removeToaster(true, '');
        // this.commonMethods.clear();
        // this.commonMethods.addToastforlongtime(false, 'Same Question choice answer label');
        this.messageService.clear();
        this.messageService.add({ key: 'tc', severity: 'info', summary: 'Same Question choice answer label', life: 5000 });
        setTimeout(() => {
          this.messageService.clear();
        }, 5000);
      } else {
        this.QustionChoiceAnswerValue = false;
        this.messageService.clear();
        // this.commonMethods.addToastforshorttime(false, 'Same Question choice answer value is not allowed');
      }
      return this.ChoiceInputCount >= topicQuestionChoiceArrayInputs.length + 1;
    });


  }


  async removeconditionalSkipEdit(c, conditionalSkipArrayInputsEdit, choiceQuestionList, conditionalSkipChoiceOptionList) {
    this.conditionalSkipQuestionRepeated = false;
    await this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit.splice(c, 1);

    let tempConditionalValue = [];
    if (choiceQuestionList != undefined && choiceQuestionList != undefined) {

      choiceQuestionList.forEach(element => {
        conditionalSkipChoiceOptionList?.forEach(element1 => {
          if (element.choiceQuestionOption == element1.label) {
            tempConditionalValue.push(element1);
          }
        });
      });
    }

    if (tempConditionalValue != undefined && tempConditionalValue.length > 0 && this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit.length > c) {
      // this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[c].conditionalValue = tempConditionalValue.map(x=>x.label+'-'+x.value).join(",");
      this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[c].conditionalValue = tempConditionalValue.map(x => x.label + '=' + x.value).join(",");
    }
    if (conditionalSkipArrayInputsEdit != undefined) {
      // setTimeout(() => {
      // Find Repeated values
      this.conditionalSkipQuestionRepeated = await conditionalSkipArrayInputsEdit.some(user => {
        let counter = 0;
        for (const iterator of conditionalSkipArrayInputsEdit) {
          if (iterator.conditionalQuestion?.id === user.conditionalQuestion?.id && iterator.conditionalQuestion?.name === user.conditionalQuestion?.name) {
            counter += 1;
          }
        }
        if (counter > 1) {
          this.commonMethods.addToastforlongtime(false, 'Same Question is not allowed');
        }
        return counter > 1;
      });

    }

    return true;
  }

  async removeconditionalSkipAdditionalEdit(c, ai, choiceQuestionList, conditionalSkipChoiceOptionList) {
    this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[c].choiceQuestionList.splice(ai, 1);
    let tempConditionalValue = [];
    await choiceQuestionList.forEach(element => {
      conditionalSkipChoiceOptionList.forEach(element1 => {
        if (element.choiceQuestionOption == element1.label) {
          tempConditionalValue.push(element1);
        }
      });
    });

    this.conditionalSkipChoiceQuestionValueRepeated = await choiceQuestionList.some(user => {
      let counter = 0;
      for (const iterator of choiceQuestionList) {
        if (iterator.choiceQuestionOption === user.choiceQuestionOption) {
          counter += 1;
        }
      }
      if (counter > 1) {
        this.commonMethods.addToastforlongtime(false, 'Same Question choice value is not allowed');
      }
      return counter > 1;
    });

    // this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[c].conditionalValue = tempConditionalValue.map(x=>x.label+'-'+x.value).join(",");
    this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[c].conditionalValue = tempConditionalValue.map(x => x.label + '=' + x.value).join(",");

    return true;
  }


  keyPressOption: boolean = false;
  async omit_special_char(event) {
    // if(event.charCode==8)
    this.keyPressOption = true;
    // else
    // this.keyPressOption = false;
    var k;
    k = event.charCode;
    if ((k > 32 && k < 45) || k == 47 || (k > 57 && k < 65) || (k > 90 && k < 95) || k == 96 || (k > 122 && k < 127)) {
      return await event.preventDefault();
    }
  }

  // async RemoveSpecialCharacters(val)
  // {   
  //   if(val!=null && val.length>1 && !this.keyPressOption){
  //       const res = await val.replace(/[^a-zA-Z0-9--._-_ - ]/g, "");
  //       // setTimeout(() => {
  //       this.evaluationModel.evaluationRoomName =res;
  //     // }, 50);
  //     }
  //   this.keyPressOption = false;

  // }

  onPaste(event) {
    if (event) {
      const trimmedText = event.replace(/[`~!@#$%^&*()|+\=?;:%'",.<>\{\}\[\]\\\/]/gi, '');
      (<HTMLInputElement>document.getElementById('evaluationnameid')).value = trimmedText;
      this.evaluationModel.evaluationRoomName = trimmedText
    }
  }
  choiceQuestionListEdit: any = [];
  // conditionalSkipQuestionRepeated: boolean = false;
  async addSCBQuestionChoiceListEdit(val, cs, conditionalQuestion, conditionalSkipArrayInputsEdit) {
    // console.log('cs', cs);
    // console.log('conditionalQuestion', conditionalQuestion);
    // console.log('conditionalSkipArrayInputsEdit', conditionalSkipArrayInputsEdit);
    // console.log(this.conditionalSkipQuestionListEdit);

    if (conditionalSkipArrayInputsEdit != undefined) {
      let count = 0;
      // Same Question is not allowed Find block
      await conditionalSkipArrayInputsEdit.forEach((element, index) => {
        if (element.conditionalQuestion.id == conditionalQuestion.id && element.conditionalQuestion.name == conditionalQuestion.name && index < conditionalSkipArrayInputsEdit.length) {
          count += 1;
          // break;
        }
      });
      if (count > 1) {
        this.conditionalSkipQuestionRepeated = true;
        this.commonMethods.addToastforlongtime(false, 'Same Question is not allowed');
      } else {
        this.conditionalSkipQuestionRepeated = false;
      }
    }

    this.choiceQuestionList = [];
    let questionsObj = { choiceQuestionOption: null, choiceQuestionOptionValue: null };

    if (val === 1) {
      this.choiceQuestionList.push(questionsObj);
    } else {
      if (this.choiceQuestionList.length === 0) {
        this.choiceQuestionList.push(questionsObj);
      }
    }

    await this.choiceQuestionList.forEach(element => {
      if (this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit == undefined) {
        // debugger
        // console.log(this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit);
        this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit = [];
        this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit = { choiceQuestionList: [] };
        this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].choiceQuestionList.push(element);
      } else {
        if (this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].choiceQuestionList == undefined || this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].choiceQuestionList.length == 0) {
          this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].choiceQuestionList = [];
          this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].choiceQuestionList.push(element);

        } else {
          if (val === 1) {
            this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].choiceQuestionList.push(element);
          }
        }
      }
    });

    if (conditionalQuestion != undefined) {
      // debugger
      if (conditionalQuestion?.questionChoice == "Choice") {
        this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].choiceQuestionList = [{ choiceQuestionOption: null, choiceQuestionOptionValue: null }];

        if (this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalSkipChoiceOptionList == undefined) {
          this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalSkipChoiceOptionList = [];
        } else {
          this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalSkipChoiceOptionList = [];
        }
        let quesAnsTempChoice = conditionalQuestion.value.split(',');
        await quesAnsTempChoice.forEach(element => {
          if (element.includes('=')) {
            this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalSkipChoiceOptionList.push({ label: element.split('=')[0], value: element.split('=')[1] });
          } else if (element.includes('-')) {
            this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalSkipChoiceOptionList.push({ label: element.split('-')[0], value: element.split('-')[1] });
          }

        });
      }
      if (conditionalQuestion?.questionChoice == "Yes/No") {
        if (this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalSkipChoiceYesNoList == undefined) {
          this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalSkipChoiceYesNoList = [];
        } else {
          this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalSkipChoiceYesNoList = [];
        }
        if (val == 0) {
          this.conditionalSkipChoiceYesNoList = [];
        }
        // let quesAnsTempYesNo = [{label:null, value: null}];
        let quesAnsTempYesNo = conditionalQuestion.value.split(',');
        // quesAnsTempYesNo.push(conditionalQuestion.value.split(',')[0]);
        // quesAnsTempYesNo.push(conditionalQuestion.value.split(',')[1]);
        quesAnsTempYesNo.forEach(element => {
          if (element.includes('=')) {
            this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalSkipChoiceYesNoList.push({ label: element.split('=')[0], value: element.split('=')[1] });
          }
          if (element.includes('-')) {
            this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalSkipChoiceYesNoList.push({ label: element.split('-')[0], value: element.split('-')[1] });
          }

        });
      }
    }

    // Remove Duplicates
    this.conditionalSkipChoiceOptionList = this.conditionalSkipChoiceOptionList.reduce((accumalator, current) => {
      if (
        !accumalator.some(
          (item) => item.label === current.label && item.value === current.value
        )
      ) {
        accumalator.push(current);
      }
      return accumalator;
    }, []);
    this.conditionalSkipChoiceYesNoList = this.conditionalSkipChoiceYesNoList.reduce((accumalator, current) => {
      if (
        !accumalator.some(
          (item) => item.label === current.label && item.value === current.value
        )
      ) {
        accumalator.push(current);
      }
      return accumalator;
    }, []);
    // console.log(this.conditionalSkipDetails.conditionalSkipArrayInputsEdit);
  }

  async conditionalSkipValueChangeAdditionalEdit(cs, choiceQuestionList, choiceQuestionOption, conditionalSkipChoiceOptionList) {
    // console.log('choiceQuestionList', choiceQuestionList);

    this.conditionalSkipChoiceQuestionValueRepeated = await choiceQuestionList.some(user => {
      let counter = 0;
      for (const iterator of choiceQuestionList) {
        if (iterator.choiceQuestionOption === user.choiceQuestionOption) {
          counter += 1;
        }
      }
      if (counter > 1) {
        this.commonMethods.addToastforlongtime(false, 'Same Question choice value is not allowed');
      }
      return counter > 1;
    });

    let tempConditionalValue = [];
    await choiceQuestionList.forEach(element => {
      conditionalSkipChoiceOptionList.forEach(element1 => {
        if (element.choiceQuestionOption == element1.label) {
          tempConditionalValue.push(element1);
        }
      });
    });
    // this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalValue = tempConditionalValue.map(x=>x.label+'-'+x.value).join(",");
    this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalValue = tempConditionalValue.map(x => x.label + '=' + x.value).join(",");

  }

  conditionalSkipValueChangeYesNoEdit(conditionalValue, cs, conditionalSkipChoiceYesNoList) {
    // console.log("conditionalValue", conditionalValue);
    conditionalSkipChoiceYesNoList.forEach(element => {
      if (element.label == conditionalValue) {
        // this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalValue = element.label+'-'+element.value;
        this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalValue = element.label + '=' + element.value;
      }
    });
  }

  conditionalSkipValueChangeEdit(minOrYes, maxOrNo, cs) {

    setTimeout(() => {
      if (minOrYes.toString().length >= 5 && minOrYes.toString().includes('.')) {
        if (minOrYes.toString().split('.')[1] > 1) {
          this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalMinValue = parseFloat(minOrYes).toFixed(2);
        } else if (minOrYes.toString().split('.')[1].length == 1) {
          this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalMinValue = parseFloat(minOrYes).toFixed(1);
        }
      } else {
        this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalMinValue = minOrYes;
      }

      if (maxOrNo.toString().length >= 5 && maxOrNo.toString().includes('.')) {
        if (maxOrNo.toString().split('.')[1] > 1) {
          this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalMaxValue = parseFloat(maxOrNo).toFixed(2);
        } else if (maxOrNo.toString().split('.')[1].length == 1) {
          this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalMaxValue = parseFloat(maxOrNo).toFixed(1);
        }
      } else {
        this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalMaxValue = maxOrNo;
      }
    }, 10);

    setTimeout(() => {
      // this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalValue = minOrYes + '= + maxOrNo;
      this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalValue =
        this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalMinValue + '=' + this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalMaxValue;
    }, 100);

  }

  restrictNegativeFloatKeys(event) {
    if ((event.keyCode == 45 || event.charCode == 45)
      // || (event.keyCode == 46 || event.charCode == 46)
    ) {
      event.preventDefault();
    }
  }


  async replaceNegativeFloatKeysCreate(val, i, j, answerType, ch) {
    // this.questionsList.forEach((data: any) => {
    this.evaluationModel.questionsList.forEach((data: any, index) => {
      data.Topics.questions.forEach((element, index1) => {
        if (index == i && index1 == j) {
          if (element.questionChoice == 'Number') {
            if (val != null || val !== undefined) {
              // val = Math.round(val);
              val = val.toString().replace(/-/g, '');
              // val = val.toString().replace(/\./g,'');
              if (answerType == 'min') {
                setTimeout(() => {
                  // return element.topicQuestionValueMinimum = parseInt(val);
                  if (val?.toString().split('.')[1]?.length > 1) {
                    return element.topicQuestionValueMinimum = parseFloat(val).toFixed(2);
                  } else if (val?.toString().split('.')[1]?.length == 1) {
                    return element.topicQuestionValueMinimum = parseFloat(val).toFixed(1);
                  } else {
                    // return element.topicQuestionValueMinimum = val;
                  }
                }, 10);
              } else if (answerType == 'max') {
                setTimeout(() => {
                  // return element.topicQuestionValueMaximum = parseInt(val);
                  if (val?.toString().split('.')[1]?.length > 1) {
                    return element.topicQuestionValueMaximum = parseFloat(val).toFixed(2);
                  } else if (val?.toString().split('.')[1]?.length == 1) {
                    return element.topicQuestionValueMaximum = parseFloat(val).toFixed(1);
                  } else {
                    // return element.topicQuestionValueMaximum = val;
                  }
                }, 10);
              } else { }

            }
          } else if (element.questionChoice == 'Yes/No') {
            if (val != null || val !== undefined) {
              // val = Math.round(val);
              val = val.toString().replace(/-/g, '');
              // val = val.toString().replace(/\./g,'');
              if (answerType == 'yes') {
                setTimeout(() => {
                  // return element.topicQuestionValueYes = parseInt(val);
                  if (val?.toString().split('.')[1]?.length > 1) {
                    return element.topicQuestionValueYes = parseFloat(val).toFixed(2);
                  } else if (val?.toString().split('.')[1]?.length == 1) {
                    return element.topicQuestionValueYes = parseFloat(val).toFixed(1);
                  } else {
                    // return element.topicQuestionValueYes = val;
                  }
                }, 10);
              } else if (answerType == 'no') {
                setTimeout(() => {
                  // return element.topicQuestionValueNo = parseInt(val);
                  if (val?.toString().split('.')[1]?.length > 1) {
                    return element.topicQuestionValueNo = parseFloat(val).toFixed(2);
                  } else if (val?.toString().split('.')[1]?.length == 1) {
                    return element.topicQuestionValueNo = parseFloat(val).toFixed(1);
                  } else {
                    // return element.topicQuestionValueNo = val;
                  }
                }, 10);
              } else { }

            }
          } else if (element.questionChoice == 'Choice') {
            if (val != null || val !== undefined) {
              // val = Math.round(val);
              val = val.toString().replace(/-/g, '');
              // val = val.toString().replace(/\./g,'');
              // if(answerType=='yes') {
              setTimeout(() => {
                // if (val.toString().length >= 5 && val.toString().includes('.')) {
                // return element.topicQuestionChoiceArrayInputs[ch].topicQuestionChoiceValue = parseFloat(val).toFixed(2);
                if (val?.toString().split('.')[1]?.length > 1) {
                  return element.topicQuestionChoiceArrayInputs[ch].topicQuestionChoiceValue = parseFloat(val).toFixed(2);
                } else if (val?.toString().split('.')[1]?.length == 1) {
                  return element.topicQuestionChoiceArrayInputs[ch].topicQuestionChoiceValue = parseFloat(val).toFixed(1);
                } else {
                  // return element.topicQuestionChoiceArrayInputs[ch].topicQuestionChoiceValue = val;
                }
                // } else {
                //   return element.topicQuestionChoiceArrayInputs[ch].topicQuestionChoiceValue = val;
                // }
              }, 10);
              // } else {}

            }
          }
        }
      });
    });
  }

  async replaceNegativeFloatKeys(val, i, j, answerType, ch) {
    // this.questionsList.forEach((data: any) => {
    this.evaluationModel.questionsList.forEach((data: any, index) => {
      data.Topics.questions.forEach((element, index1) => {
        if (index == i && index1 == j) {
          if (element.questionChoice == 'Number') {
            if (val != null || val !== undefined) {
              // val = Math.round(val);
              val = val?.toString().replace(/-/g, '');
              // val = val.toString().replace(/\./g,'');
              if (answerType == 'min') {
                setTimeout(() => {
                  // return element.topicQuestionValueMinimumEdit = parseInt(val);
                  if (val?.toString().split('.')[1]?.length > 1) {
                    return element.topicQuestionValueMinimumEdit = parseFloat(val).toFixed(2);
                  } else if (val?.toString().split('.')[1]?.length == 1) {
                    return element.topicQuestionValueMinimumEdit = parseFloat(val).toFixed(1);
                  } else {
                    // return element.topicQuestionValueMinimumEdit = val;
                  }
                }, 10);
              } else if (answerType == 'max') {
                setTimeout(() => {
                  // return element.topicQuestionValueMaximumEdit = parseInt(val);
                  if (val?.toString().split('.')[1]?.length > 1) {
                    return element.topicQuestionValueMaximumEdit = parseFloat(val).toFixed(2);
                  } else if (val?.toString().split('.')[1]?.length == 1) {
                    return element.topicQuestionValueMaximumEdit = parseFloat(val).toFixed(1);
                  } else {
                    // return element.topicQuestionValueMaximumEdit = val;
                  }
                }, 10);
              } else { }

            }
          } else if (element.questionChoice == 'Yes/No') {
            if (val != null || val !== undefined) {
              // val = Math.round(val);
              val = val.toString().replace(/-/g, '');
              // val = val.toString().replace(/\./g,'');
              if (answerType == 'yes') {
                setTimeout(() => {
                  // return element.topicQuestionValueYesEdit = parseInt(val);
                  if (val?.toString().split('.')[1]?.length > 1) {
                    return element.topicQuestionValueYesEdit = parseFloat(val).toFixed(2);
                  } else if (val?.toString().split('.')[1]?.length == 1) {
                    return element.topicQuestionValueYesEdit = parseFloat(val).toFixed(1);
                  } else {
                    // return element.topicQuestionValueYesEdit = val;
                  }
                }, 10);
              } else if (answerType == 'no') {
                setTimeout(() => {
                  // return element.topicQuestionValueNoEdit = parseInt(val);
                  if (val?.toString().split('.')[1]?.length > 1) {
                    return element.topicQuestionValueNoEdit = parseFloat(val).toFixed(2);
                  } else if (val?.toString().split('.')[1]?.length == 1) {
                    return element.topicQuestionValueNoEdit = parseFloat(val).toFixed(1);
                  } else {
                    // return element.topicQuestionValueNoEdit = val;
                  }
                }, 10);
              } else { }

            }
          } else if (element.questionChoice == 'Choice') {
            if (val != null || val !== undefined) {
              // val = Math.round(val);
              val = val.toString().replace(/-/g, '');
              // val = val.toString().replace(/\./g,'');
              // if(answerType=='yes') {
              setTimeout(() => {
                // return element.topicQuestionChoiceArrayInputsEdit[ch].topicQuestionChoiceValueEdit = parseInt(val);
                if (val?.toString().split('.')[1]?.length > 1) {
                  return element.topicQuestionChoiceArrayInputsEdit[ch].topicQuestionChoiceValueEdit = parseFloat(val).toFixed(2);
                } else if (val?.toString().split('.')[1]?.length == 1) {
                  return element.topicQuestionChoiceArrayInputsEdit[ch].topicQuestionChoiceValueEdit = parseFloat(val).toFixed(1);
                } else {
                  // return element.topicQuestionChoiceArrayInputsEdit[ch].topicQuestionChoiceValueEdit = val;
                }
              }, 10);
              // } else {}

            }
          }
        }
      });
    });
  }


  async replaceNegativeFloatKeysDefaultAnswerCreate(val, i, j) {
    // this.questionsList.forEach((data: any) => {
    this.evaluationModel.questionsList.forEach((data: any, index) => {
      data.Topics.questions.forEach((element, index1) => {
        if (index == i && index1 == j) {
          if (element.questionChoice == 'Number') {
            if (val != null || val !== undefined) {
              // val = Math.round(val);
              val = val.toString().replace(/-/g, '');
              // val = val.toString().replace(/\./g,'');
              // if (answerType == 'min') {
              setTimeout(() => {
                if (val?.toString().split('.')[1]?.length > 1) {
                  return element.defaultanswer = parseFloat(val).toFixed(2);
                } else if (val?.toString().split('.')[1]?.length == 1) {
                  return element.defaultanswer = parseFloat(val).toFixed(1);
                } else {
                  // return element.defaultanswer = val;
                }
              }, 10);
              // }

            }
          }
        }
      });
    });
  }

  async replaceNegativeFloatKeysDefaultAnswerEdit(val, i, j) {
    // this.questionsList.forEach((data: any) => {
    this.evaluationModel.questionsList.forEach((data: any, index) => {
      data.Topics.questions.forEach((element, index1) => {
        if (index == i && index1 == j) {
          if (element.questionChoice == 'Number') {
            if (val != null || val !== undefined) {
              // val = Math.round(val);
              val = val?.toString().replace(/-/g, '');
              // val = val.toString().replace(/\./g,'');
              // if (answerType == 'min') {
              setTimeout(() => {
                if (val?.toString().split('.')[1]?.length > 1) {
                  return element.defaultanswer = parseFloat(val).toFixed(2);
                } else if (val?.toString().split('.')[1]?.length == 1) {
                  return element.defaultanswer = parseFloat(val).toFixed(1);
                } else {
                  // return element.defaultanswer = val;
                }
              }, 10);
              // }

            }
          }
        }
      });
    });
  }

  // ********* Remove Condition in the callHydrationCondition overlay panel ******
  removeConditionCreate(i, fieldName) {
    this.metricValueErr = false
    this.addConditionErr = false
    this.metricOptionErr = false

    if (fieldName.toLowerCase() == 'removecreate') {
      if (this.evaluationModel.callHydrationCondition.length == 0) {
        return false;

      }
      else {
        this.evaluationModel.callHydrationCondition.splice(i, 1);
        this.isDisableMetrics.splice(i, 1)
        // return true;
      }
      if (this.evaluationModel.callHydrationCondition.length > 1) {
        this.metricNameIndex = 0
        for (let item of this.metricOption) {
          let metricVar = this.evaluationModel.callHydrationCondition.filter(e => e.metricName == item.value)
          if (metricVar.length >= 2) {
            this.metricOptionErr = true
            this.metricNameIndex = i
            this.isAddDisable = true
            this.isDisableDone = true
            return
          }
          else {
            this.metricOptionErr = false
            this.isAddDisable = false
            this.isDisableDone = false
            this.errBetween = false
            this.errSameValue = false;
            this.metricConditionErr = false
          }

        }
      }
      else{
        this.isAddDisable = false
        this.isDisableDone = false
        this.errBetween = false
        this.errSameValue = false;
        this.metricConditionErr = false
      }
    }
    else {
      if (this.evaluationModel.callHydrationCondition.length == 0) {
        return false;
      }
      else {
        this.evaluationModel.callHydrationCondition.splice(i, 1);
        this.isDisableMetrics.splice(i, 1)
        // return true;
      }
      if (this.evaluationModel.callHydrationCondition.length > 1) {
        this.metricNameIndex = 0
        for (let item of this.metricOption) {
          let metricVar = this.evaluationModel.callHydrationCondition.filter(e => e.metricName == item.value)
          if (metricVar.length >= 2) {
            this.metricOptionErr = true
            this.metricNameIndex = i
            this.isAddDisable = true
            this.isDisableDone = true
            return
          }
          else {
            this.metricOptionErr = false
            this.isAddDisable = false
            this.isDisableDone = false
            this.errBetween = false
            this.errSameValue = false;
            this.metricConditionErr = false
          }
        }
      }
      else{
        this.isAddDisable = false
        this.isDisableDone = false
        this.errBetween = false
        this.errSameValue = false;
        this.metricConditionErr = false
      }
    }
  }

  // ********* Add Condition in the callHydrationCondition overlay panel ******
  addConditionCreate(fieldName,i) {
     if (this.evaluationModel.callHydrationCondition.length < this.metricOption.length) {
      for(let element of this.evaluationModel.callHydrationCondition){
        if(element.metricConditionOperator == null &&  element.metricConditionalValue == null){
              if(element.metricValue.length == 0){
                    this.addConditionErr = true
                      this.metricValueErr = false
                      this.metricOptionErr = false
                      this.metricConditionErr = false
                      setTimeout(() => {
                        this.addConditionErr = false
                      }, 4000);
                      return
              } 
              else{
                this.addConditionErr = false
              }
        }
        else{
              if((element.metricConditionOperator != null && element.metricConditionalValue == null) || (element.metricConditionOperator == null && element.metricConditionalValue != null)){
                      this.addConditionErr = true;
                      this.metricConditionErr = false
                      setTimeout(() => {
                        this.addConditionErr = false
                      }, 4000);
                      return;
              }
              else if(element.metricConditionOperator != null && element.metricConditionalValue != null){
                    this.addConditionErr = false
                    this.metricValueErr = false
                    this.metricOptionErr = false
              }
        }
      }
      this.metricOptionErr = false
      this.isDisableDone = false
      if (fieldName.toLowerCase() == 'createcondition') {
        let conditionCreateObj = { metricName: null, metricValue: [],metricConditionOperator:null,metricConditionalValue:null  };
        this.evaluationModel.callHydrationCondition.push(conditionCreateObj);

      }
      else {
        let conditionEditObj = { metricName: null, metricValue: [],metricConditionOperator:null,metricConditionalValue:null };
        this.evaluationModel.callHydrationCondition.push(conditionEditObj);
      }
    }
    else {
      this.isAddDisable = false
    }

    if (this.evaluationModel.callHydrationCondition.length == this.metricOption.length) {
      this.isAddDisable = true
    }
    else {
      this.isAddDisable = false
    }

    this.isDisableMetrics.push(false)
  }

  metricConditionErr:boolean = false
  // ******** save and Error Validation  in the callhydrationcondition overlay panel ******
  addDefinition(event?, defaultEvent?) {
    for (let item of this.evaluationModel.callHydrationCondition) {
      if(item.metricName != null && item.metricName != undefined){
      for (let ele of this.metricOption) {
        if(!item.metricName.toLowerCase().includes('time')){
          if (ele.value == item.metricName) {
            if (item.metricValue.length > 0) {
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
          if((item.metricConditionOperator != null && item.metricConditionalValue == null) || (item.metricConditionOperator == null && item.metricConditionalValue != null) || (item.metricConditionOperator == null && item.metricConditionalValue == null)){
            this.metricConditionErr = true
            this.metricValueErr = false
            this.addConditionErr = false
            break;
          }
          else{
            this.metricConditionErr = false
          }
            
        }
        
      }
    }

      if (this.metricValueErr || this.metricConditionErr) {
        break;
      }
    }

    // overlay panel to show /hide the panel based on condition and event
    if (defaultEvent != undefined && event != undefined) {
      if (this.metricValueErr == true || this.metricOptionErr == true || this.addConditionErr == true || this.errBetween == true || this.errSameValue == true || this.metricConditionErr == true) {
        defaultEvent.show(event);
      }
      else {
        this.metricValueErr = false;
        this.metricOptionErr = false
        this.addConditionErr = false
        defaultEvent.hide(event);
      }
    }
  }

  //********* get the Metric Value Dropdown data ************ 
  getMetricValue() {
    this.partitionService.getCustomDataOption(this.getPlatformValue).subscribe(
      (data: any) => {
        this.metricValue = data;
      },
      (error) => {
        console.log(error)
      }
    )
  }

  // ******* Bind the Metric Value to DropDown ****
  getMetricValueData(item) {
    if (this.metricValue[item] != undefined && this.metricValue[item].length > 0) {
      this.metricValueOption = this.metricValue[item];
    }
    else {
      this.metricValueOption = [];
    }
  }

  // ******* get the MetricName DropDown data ******
  getHydrationDropDownList() {
    this.evaluationService.getHydrationDropDownList().subscribe(
      (data: any) => {
        this.metricOption = data.filter(ele => ele.platformId === this.getPlatformValue.toString())[0].callHydrationList
      },
      (error) => {
        console.log(error);
      }
    )
  }

  // *******get the Current PlatformId *****
  getPlatform() {
    return new Promise((resolve, reject) => {
      this.preferenceService.getPlatformDetail.subscribe(
        (data: any) => {
          this.getPlatformValue = data.platformId
          resolve(data)
        },
        (error) => {
          console.log(error);
          reject(error);
        })
    })
  }

  //********** Disable the metricvalue and metricoption for Create and Edit in Dynamic way */
  metricOnChange(item, index, fieldName) {
    if (fieldName.toLowerCase() == 'createmetric') {
      if (item.length > 0) {
        this.isDisableMetrics[index] = true;
        this.addConditionErr = false
        this.metricValueErr = false
      }
      else {
        this.isDisableMetrics[index] = false
      }
    }
    else {
      if (item.length > 0 ) {
        this.isDisableMetrics[index] = true;
        this.addConditionErr = false
        this.metricValueErr = false
      }
      else {
        this.isDisableMetrics[index] = false
      }
    }
  }
  //******** Validate the MetricName is already exist in the dropdown of overlaypanel ******
  metricNameValidation(item, i) {
    this.errBetween = false
    this.errSameValue = false;
    this.isAddDisable = false;
    this.isDisableDone = false;
    this.metricConditionErr = false
    this.getMetricItem = item;
    if (this.evaluationModel.callHydrationCondition.length > 1) {
      const metricVar = this.evaluationModel.callHydrationCondition.filter(s => s.metricName == this.getMetricItem)
      if (metricVar.length >= 2) {
        this.metricOptionErr = true
        this.isAddDisable = true
        this.metricValueErr = false
        this.metricNameIndex = i
        this.isDisableDone = true
      }
      else {
        this.metricOptionErr = false
        this.isAddDisable = false
        this.isDisableDone = false
      }
    }

    if(this.getMetricItem.toLowerCase().includes('time')){
      this.evaluationModel.callHydrationCondition.forEach((element,index) => {
        if(index == i){
          element.metricConditionOperator = null
        }
      });
    }

    if (this.evaluationModel.callHydrationCondition.length == this.metricOption.length) {
      this.isAddDisable = true
    }

  }

  operatorDDL:any
  getConditionJSON(){
    this.myPlaybookService.getConditionsJson().subscribe((data: any) => {
     this.operatorDDL = data.MetricOperation.filter(s=> s.value != '=');
    })
  }

  conditionOperatorChange(item,i){
      this.errSameValue = false;
      this.metricConditionErr = false
      this.isAddDisable = false;
       this.isDisableDone = false;
      this.errBetween = false;
      if(item == '>=<=' || item == '>' || item == '<'){
        this.evaluationModel.callHydrationCondition.forEach((element,index) => {
            if(index == i){
              element.metricConditionalValue = null
            }
        });
      }
  } 

  errBetween:boolean = false;
  errSameValue:boolean = false;
  metricBetweenValidation(){
    let conditionValue:any= [];
    conditionValue = this.evaluationModel.callHydrationCondition
    this.metricValueErr = false;
    this.errBetween = false;
    this.errSameValue = false;
    this.metricConditionErr = false
    for(let element of conditionValue){
        if(element.metricConditionOperator == '>=<=' && element.metricConditionOperator != null ){
          if(element.metricConditionalValue.includes('-')){
          let split = element.metricConditionalValue.split('-');
                if( parseInt(split[0]) != parseInt(split[1]) && split[1] != "" && split[0] != "" && parseInt(split[0]) < parseInt(split[1])){
                      this.errBetween = false
                      this.errSameValue = false;
                      this.isAddDisable = false;
                      this.isDisableDone = false;
                }
                else{
                  if( parseInt(split[0]) == parseInt(split[1])){
                      this.errSameValue = true
                      this.isAddDisable = true
                      this.errBetween = false
                      this.isDisableDone = true
                  }
                  else if(parseInt(split[0]) > parseInt(split[1])){
                      this.errBetween = true
                      this.isAddDisable = true
                      this.errSameValue = false
                      this.isDisableDone = true
                  }
                  else{
                    this.errBetween = true
                    this.errSameValue = false
                    this.isAddDisable = true
                    this.isDisableDone = true
                  }
                break;
                }
          } 
          else{
                    this.isAddDisable = true;
                   this.isDisableDone = true;
                    this.errBetween = true;
          }  
        }
    }
  }
  

  ConditionalSkipCheckMaxvalueCreate(numberValue, cs, condition, minmaxtype) {
    let minmax;
    if (numberValue != null || numberValue != 'null' || numberValue !== undefined || numberValue !== 'undefined') {
      if (condition.conditionalQuestion.value?.includes('=')) {
        minmax = condition.conditionalQuestion.value.split('=');
      }
      if (condition.conditionalQuestion.value?.includes('-')) {
        minmax = condition.conditionalQuestion.value.split('-');
      }
    }

    setTimeout(() => {
      if (minmax[1] < numberValue && minmaxtype == 'min') {
        if (numberValue.toString().length >= 5 && numberValue.toString().includes('.')) {
          this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMinValue = parseFloat(minmax[1]).toFixed(2);
        } else {
          this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMinValue = parseInt(minmax[1]);
        }
      } else {
        if (numberValue.toString().length >= 5 && numberValue.toString().includes('.') && minmaxtype == 'min') {
          this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMinValue = parseFloat(numberValue).toFixed(2);
        } else if (minmaxtype == 'min') {
          this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMinValue = parseInt(numberValue);
        }
      }
      if (minmax[1] < numberValue && minmaxtype == 'max') {
        if (numberValue.toString().length >= 5 && numberValue.toString().includes('.')) {
          this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMaxValue = parseFloat(minmax[1]).toFixed(2);
        } else {
          this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMaxValue = parseInt(minmax[1]);
        }
      } else {
        if (numberValue.toString().length >= 5 && numberValue.toString().includes('.') && minmaxtype == 'max') {
          this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMaxValue = parseFloat(numberValue).toFixed(2);
        } else if (minmaxtype == 'max') {
          this.conditionalSkipDetails.conditionalSkipArrayInputs[cs].conditionalMaxValue = parseInt(numberValue);
        }
      }
    }, 100);

  }

  ConditionalSkipCheckMaxvalueEdit(numberValue, cs, condition, minmaxtype) {
    let minmax;
    if (numberValue != null || numberValue != 'null' || numberValue !== undefined || numberValue !== 'undefined') {
      if (condition.conditionalQuestion.value?.includes('=')) {
        minmax = condition.conditionalQuestion.value.split('=');
      }
      if (condition.conditionalQuestion.value?.includes('-')) {
        minmax = condition.conditionalQuestion.value.split('-');
      }
    }

    setTimeout(() => {
      if (minmax[1] < numberValue && minmaxtype == 'min') {
        if (numberValue.toString().length >= 5 && numberValue.toString().includes('.')) {
          this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalMinValue = parseFloat(minmax[1]).toFixed(2);
        } else {
          this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalMinValue = parseInt(minmax[1]);
        }
      } else {
        if (numberValue.toString().length >= 5 && numberValue.toString().includes('.') && minmaxtype == 'min') {
          this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalMinValue = parseFloat(numberValue).toFixed(2);
        } else if (minmaxtype == 'min') {
          this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalMinValue = parseInt(numberValue);
        }
      }
      if (minmax[1] < numberValue && minmaxtype == 'max') {
        if (numberValue.toString().length >= 5 && numberValue.toString().includes('.')) {
          this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalMaxValue = parseFloat(minmax[1]).toFixed(2);
        } else {
          this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalMaxValue = parseInt(minmax[1]);
        }
      } else {
        if (numberValue.toString().length >= 5 && numberValue.toString().includes('.') && minmaxtype == 'max') {
          this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalMaxValue = parseFloat(numberValue).toFixed(2);
        } else if (minmaxtype == 'max') {
          this.conditionalSkipDetailsEdit.conditionalSkipArrayInputsEdit[cs].conditionalMaxValue = parseInt(numberValue);
        }
      }
    }, 100);

  }

  removeQuestionsDefaultValueEdit(i, j) {
    this.evaluationModel.questionsList.forEach(elementTopic => {
      elementTopic.Topics.questions.forEach(elementQuest => {
        this.evaluationModel.questionsList[i].Topics.questions[j].defaultanswer = null;
      });
    });
  }

    formLevelDossierIdList: any = [];
    //get Config FormDossier Id
    getConfigFormDossierId() {
        this.evaluationService.getConfigFormDossierIdList(this.getPlatformValue).subscribe((data: any) => {
          this.formLevelDossierIdList = data;
        },
        (error) => {
          console.log(error);
          this.commonMethods.addToastforlongtime(false, error.error);
        })
    }
    
    validateMetricName(metricName){
        if(metricName != null && metricName.toLowerCase().includes("time")){
            return true;
        }
    }

}
