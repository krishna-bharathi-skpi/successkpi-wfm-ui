import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TopicService } from './topics.service';
import { TopicModel } from './topics.model';
import { CommonMethods } from '../../../common/common.components';
import { GlobalComponent } from '../../../global/global.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Parser } from 'json2csv';
import { csv2json } from 'csvjson-csv2json';
@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  channel: any;
  selectedChannel: any;
  submittedTopicEdit = false;
  submittedTopicCreate = false;
  topicEditForm: FormGroup;
  topicCreateForm: FormGroup;

  TemptopicModeltopicPhrases: any = [];
  languageList: any = [
    { label: 'English', value: 'English' },
    { label: 'Japanese', value: 'Japanese' },
    { label: 'German', value: 'German' }];
  language: any = "";
  paragraph: any = "";
  resultKeyPhrase: any = [];

  createEdit_Topic: string = "list";
  cards: any = [];
  tags = [];
  topicPhrases: []
  alerts: string = "";
  searchTopicName: string = "";
  allcards: any = [];
  newPharase: any = [];
  searchKey: string = "";
  public topicModel: TopicModel;
  loading: boolean = false;
  startTimeMinutes: number;
  startTimeSeconds: number;
  endTimeMinutes: number;
  endTimeSeconds: number;
  templateTopicCards: any = [];
  topicTemplateList: object;
  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private topicService: TopicService, private commonMethods: CommonMethods, public global: GlobalComponent, private spinnerService: NgxSpinnerService) {
    this.topicModel = new TopicModel();
    //  this.createTopic();
    this.commonMethods.dynamicBackgroundColorChange('default');

  }
  @ViewChild('importfile') importfile: ElementRef;
  ngOnInit(): void {
    this.topicForms();
    this.GetTopicsItems();
    this.getChannelDropDownList();

  }

  topicForms() {
    this.topicEditForm = this.formBuilder.group({
      editTopicName: ['', Validators.required],
      editChannelName: ['', Validators.required],

    })
    this.topicCreateForm = this.formBuilder.group({
      createTopicName: ['', Validators.required],
      createChannelName: ['', Validators.required]
    })
  }

  get validationTopicEdit() { return this.topicEditForm.controls; }
  get validationTopicCreate() { return this.topicCreateForm.controls; }

  onSubmitEditTopic() {
    this.submittedTopicEdit = true;
    if (this.topicEditForm.invalid) {
      return
    }
  }
  onSubmitCreateTopic() {
    this.submittedTopicCreate = true;
    if (this.topicCreateForm.invalid) {
      return
    }
  }
  // Create Topic
  createTopic() {
    if (this.topicCreateForm.invalid || this.checkTime()) {
      this.submittedTopicCreate = true;
    }
    else if (this.topicModel.topicPhrases.length == 0) {
      this.submittedTopicCreate = true;
      return;
    }
    else {
      this.submittedTopicCreate = false;
      this.loading = true;
      this.spinnerService.show();
      this.topicService.createTopic(this.topicModel).subscribe(
        (data: any[]) => {
          this.topicModel = new TopicModel();
          this.createEdit_Topic = "list";
          this.commonMethods.dynamicBackgroundColorChange('default');
          this.GetTopicsItems();
          this.commonMethods.addToastforlongtime(true, 'Topic saved');
          this.loading = false;
          this.spinnerService.hide();
        },
        (error) => {
          this.loading = false;
          console.log(error);
          this.commonMethods.addToastforlongtime(false, error.error);
          this.spinnerService.hide();
        });
    }

  }


  // import Topic (SP-602)
  importTopic() {
    let file = this.importfile.nativeElement.files[0];
    let filedata: any;
    if (file) {
      const reader = new FileReader();
      reader.readAsText(this.importfile.nativeElement.files[0])
      reader.onload = () => {
        filedata = reader.result;
        let jsondata = csv2json(filedata, { parseNumbers: true, parseJSON: true });
        this.topicModel = jsondata[0];
         this.topicModel.topicDescription ? this.onPaste(this.topicModel.topicDescription,'topicdescription') : this.topicModel.topicName ? this.onPaste(this.topicModel.topicName,'topicname') : null ;
        if (this.topicModel.startTime > 0) {
          this.startTimeMinutes = Math.floor(this.topicModel.startTime / 60);
          this.startTimeSeconds = this.topicModel.startTime % 60;
        }
        else {
          this.startTimeMinutes = null;
          this.startTimeSeconds = null;
        }
        if (this.topicModel.endTime > 0) {
          this.endTimeMinutes = Math.floor(this.topicModel.endTime / 60);
          this.endTimeSeconds = this.topicModel.endTime % 60;
        }
        else {
          this.endTimeMinutes = null;
          this.endTimeSeconds = null;
        }
      }
    } else {
      this.commonMethods.addToastforlongtime(false, 'File must be a CSV')
    }
  }


  // export Topic (SP-602)
  exportTopic() {
    let data = new TopicModel();
    data.active = this.topicModel.active;
    data.topicDescription = this.topicModel.topicDescription;
    data.channel = this.topicModel.channel;
    data.topicName = this.topicModel.topicName;
    data.topicPhrases = this.topicModel.topicPhrases;
    data.tags = this.topicModel.tags;
    data.timeBased = this.topicModel.timeBased;
    data.startTime = this.topicModel.startTime;
    data.endTime = this.topicModel.endTime;
    let parser = new Parser();
    let csvdata = parser.parse(data);
    let a = document.createElement("a");
    let file = new Blob([csvdata], { type: 'text/csv' });
    a.href = URL.createObjectURL(file);
    a.download = "topic_" + data.topicName + ".csv";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  // Tags in topic while edit
  addTextTagUpdate(text2: string) {
    if (text2) {
      let duplicate = false;
      this.topicModel.tags.forEach(item => {
        if (item == text2) {
          duplicate = true;
        }
      })
      if (!duplicate) {
        this.topicModel.tags.push(text2);
      } else {
        // this.alerts = "";
        // this.alerts = "Avoid entering same data";
        // this.commonMethods.addToastforlongtime(false, 'Avoid Entering Same Data');
      }
    }
  }
  // tag in topic while create
  addText2(text2: string) {
    if (text2) {
      let duplicate = false;
      this.topicModel.tags.forEach(item => {
        if (item == text2) {
          duplicate = true;

        }
      })
      if (!duplicate) {
        this.topicModel.tags.push(text2);
      } else {
        // this.commonMethods.addToastforlongtime(false, 'Avoid Entering Same Data');
        // this.alerts = "";
        // this.alerts = "Avoid entering same data";
      }
    }
  }

  // Keyphrase in topic create
  addTextPhraseUpdate(newtext1: string) {
    if (newtext1) {
      let duplicate = false;
      this.topicModel.topicPhrases.forEach(item => {
        if (item.toLowerCase() == newtext1.toLowerCase()) {
          duplicate = true;

        }
      })
      if (!duplicate) {
        this.topicModel.topicPhrases.push(newtext1.toLowerCase());
        this.TemptopicModeltopicPhrases = this.topicModel.topicPhrases;
      } else {
        // this.commonMethods.addToastforlongtime(false, 'Avoid Entering Same Data');
      }
    }
  }

  // key phrase in topic while edit
  addText(newtext: string) {
    if (newtext) {
      let duplicatedata = false;
      this.topicModel.topicPhrases.forEach(items => {
        if (items.toLowerCase() == newtext.toLowerCase()) {
          duplicatedata = true;
        }
      })
      if (!duplicatedata) {
        this.topicModel.topicPhrases.push(newtext.toLowerCase());
        this.TemptopicModeltopicPhrases = this.topicModel.topicPhrases;
      } else {
        // this.commonMethods.addToastforlongtime(false, 'Avoid Entering Same Data');
      }
    }
  }
  // tage delete in create
  deleteMsg(msg: string) {
    const index: number = this.topicModel.tags.indexOf(msg);
    if (index !== -1) {
      this.topicModel.tags.splice(index, 1);
    }
  }

  // keyphrase delete in create
  deletePhrases(msg: string) {
    const index: number = this.topicModel.topicPhrases.indexOf(msg);
    if (index !== -1) {
      this.topicModel.topicPhrases.splice(index, 1);
      this.TemptopicModeltopicPhrases = this.topicModel.topicPhrases;
    }
  }
  //edit delete keyphrase
  deletePhrasescreation(msg: string) {
    const index: number = this.topicModel.topicPhrases.indexOf(msg);
    if (index !== -1) {
      this.topicModel.topicPhrases.splice(index, 1);
      this.TemptopicModeltopicPhrases = this.topicModel.topicPhrases;
    }
  }
  // edit tag in topic
  deleteMsgEdit(msg: string) {
    const index: number = this.topicModel.tags.indexOf(msg);
    if (index !== -1) {
      this.topicModel.tags.splice(index, 1);
    }
  }
  // Get topic in cards
  GetTopicsItems() {
    this.spinnerService.show();
    this.topicService.GetTopicsItems().subscribe(
      (data: any[]) => {
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
  openTestKeyphrasePopup(data: any, popup) {
    document.getElementById('testKeyphraseOpen').click();
    this.language = '';
    this.paragraph = '';
    this.resultKeyPhrase = [];
    this.submittedTestKeyphrase = false;
  }
  openTestKeyphraseCreatePopup(data: any, popup) {
    document.getElementById('testKeyphraseCreateOpen').click();
    this.language = '';
    this.paragraph = '';
    this.resultKeyPhrase = [];
    this.submittedTestKeyphrase = false;
  }
  submittedTestKeyphrase: boolean = false;
  testKeyphrase() {
    this.resultKeyPhrase = [];
    this.submittedTestKeyphrase = true;
    if (this.topicModel.topicPhrases.length == 0 || this.language == '' || this.paragraph == '') {
      return;
    }
    this.spinnerService.show();
    let data = {
      topicPhrases: this.topicModel.topicPhrases,
      language: this.language,
      paragraph: this.paragraph
    }
    this.topicService.testKeyphrase(data).subscribe(
      (data: any) => {
        if (data != null) {
          this.topicModel.topicPhrases.forEach(element => {
            let filterdata = data.topicPhrases.filter((val) => val == element);
            this.resultKeyPhrase.push({ value: element, isExists: filterdata.length > 0 ? true : false })
          });
        }
        this.submittedTestKeyphrase = false;
        this.spinnerService.hide();
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
        this.submittedTestKeyphrase = false;
        this.commonMethods.addToastforlongtime(false, error.error);
      }
    )
  }
  //  Edit Topic
  editTopic(topicCard) {
    this.commonMethods.dynamicBackgroundColorChange('white');
    this.topicModel = JSON.parse(JSON.stringify(topicCard));
    this.createEdit_Topic = "edit";
    this.TemptopicModeltopicPhrases = this.topicModel.topicPhrases;
    if (this.topicModel.timeBased && !this.topicModel.detectiontype) {
      this.topicModel.detectiontype = 'range';
    }
    if (this.topicModel.startTime > 0) {
      this.startTimeMinutes = Math.floor(this.topicModel.startTime / 60);
      this.startTimeSeconds = this.topicModel.startTime % 60;
    }
    else {
      this.startTimeMinutes = 0;
      this.startTimeSeconds = 0;
    }
    if (this.topicModel.endTime > 0) {
      this.endTimeMinutes = Math.floor(this.topicModel.endTime / 60);
      this.endTimeSeconds = this.topicModel.endTime % 60;
    }
    else {
      this.endTimeMinutes = 0;
      this.endTimeSeconds = 0;
    }
  }

  // Delete
  deleteTopic() {
    this.spinnerService.show();
    this.topicService.deleteTopic(this.topicModel.topicId).subscribe(
      (data: any) => {
        this.createEdit_Topic = "list";
        this.commonMethods.dynamicBackgroundColorChange('default');
        this.GetTopicsItems();
        this.commonMethods.addToastforlongtime(true, 'Topic deleted');
        this.spinnerService.hide();
      },
      (error) => {
        console.log(error);
        this.commonMethods.addToastforlongtime(false, error.error);
        this.spinnerService.hide();
      });
  }

  //  update
  updateTopic() {
    if (this.topicEditForm.invalid || this.checkTime()) {
      this.submittedTopicEdit = true;
    }
    else if (this.topicModel.topicPhrases.length == 0) {
      this.submittedTopicEdit = true;
      return;
    }
    else {
      this.submittedTopicEdit = false;
      this.loading = true;
      this.spinnerService.show();
      //fix for SP-837
      if (this.topicModel.timeBased === undefined) {
        this.topicModel.timeBased = false;
        this.topicModel.startTime = 0;
        this.topicModel.endTime = 0;
      }
      this.topicService.updateTopic(this.topicModel.topicId, this.topicModel).subscribe(
        (data: any) => {
          // console.log(data);
          this.topicModel = new TopicModel();
          this.GetTopicsItems();
          this.createEdit_Topic = "list";
          this.commonMethods.dynamicBackgroundColorChange('default');
          this.commonMethods.addToastforlongtime(true, 'Topic updated');
          this.spinnerService.hide();
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          console.log(error);
          this.commonMethods.addToastforlongtime(false, error.error);
          this.spinnerService.hide();
        }
      )
    }
  }

  createCancel() {
    this.commonMethods.dynamicBackgroundColorChange('default');
    this.topicModel = new TopicModel();
    this.topicForms();
    this.createEdit_Topic = 'list';
    this.submittedTopicCreate = false;
    this.topicCreateForm.reset();
  }
  editCancel() {
    this.commonMethods.dynamicBackgroundColorChange('default');
    this.topicModel = new TopicModel();
    this.topicForms();
    this.createEdit_Topic = 'list';
    this.submittedTopicEdit = false;
    this.topicEditForm.reset();
  }
  // create new topic
  createNewTopic() {
    this.commonMethods.dynamicBackgroundColorChange('white');
    this.topicModel = new TopicModel();
    this.topicForms();
    this.createEdit_Topic = 'create';
    this.topicCreateForm.reset();
    this.submittedTopicCreate = false;
    this.startTimeMinutes = null;
    this.startTimeSeconds = null;
    this.endTimeMinutes = null;
    this.endTimeSeconds = null;
  }
  // search

  searchTopic() {
    // console.log("search",this.searchPlaybookName);
    this.cards = this.allcards.filter(item => item.topicName?.toLowerCase().includes(this.searchTopicName?.toLowerCase()))
  }

  searchKeyPhrases() {

    this.topicModel.topicPhrases = this.TemptopicModeltopicPhrases.filter(item => item.toLowerCase().includes(this.searchKey.toLowerCase()));
  }

  // toggle on/off
  toggleTopic(topicCard) {
    this.topicService.toggleTopic({ active: topicCard.active, topicId: topicCard.topicId }).subscribe(
      (data: any) => {
        // this.GetTopicsItems();
      },
      (error) => {
        console.log(error);
        this.commonMethods.addToastforlongtime(false, error.error);
      }
    )
  }

  //get Channel DropDown
  getChannelDropDownList() {
    this.topicService.getChannelDropDownList().subscribe(
      (data: any) => {
        this.channel = data
      },
      (error) => {
        console.log(error);
        this.commonMethods.addToastforlongtime(false, error.error);
      }
    )

  }

  //Time based Detection ( SP-319 )
  onChangeTime() {
    this.topicModel.startTime = this.startTimeMinutes * 60 + this.startTimeSeconds;
    this.topicModel.endTime = this.endTimeMinutes * 60 + this.endTimeSeconds;

  }

  timeToggle() {
    if (this.topicModel.timeBased === true) {
      this.topicModel.startTime = this.startTimeMinutes * 60 + this.startTimeSeconds;
      this.topicModel.endTime = this.endTimeMinutes * 60 + this.endTimeSeconds;
    }
    else {
      this.topicModel.startTime = 0;
      this.topicModel.endTime = 0;
    }

  }

  checkTime() {
    if (this.topicModel.startTime > this.topicModel.endTime && this.topicModel.endTime != 0 && this.topicModel.timeBased && this.topicModel.detectiontype == 'range') {
      this.commonMethods.addToastforlongtime(false, "Please Enter Valid time Values");
      return true;
    }
    else {
      return false;
    }
  }


  // Topic Templates (SP-419)
  getTopicTemplateItems() {
    this.loading = true;
    this.spinnerService.show();
    this.topicService.getTopicTemplateItems().subscribe(
      (data: any) => {
        this.templateTopicCards = data;
        this.spinnerService.hide();
        this.loading = false;
        this.createEdit_Topic = 'template'
        this.commonMethods.dynamicBackgroundColorChange('default');
      },
      (error) => {
        console.log(error);
        this.commonMethods.addToastforlongtime(false, error.error);
        this.spinnerService.hide();
        this.loading = false;
      }
    )
  }
  viewTemplate(templateCard) {
    this.commonMethods.dynamicBackgroundColorChange('white');
    this.topicTemplateList = JSON.parse(JSON.stringify(templateCard));
  }

  copyTemplate(templateTopicModel) {
    this.topicModel = templateTopicModel;  // Use this line for tranfering data in real implementation
    this.loading = true;
    this.spinnerService.show();
    this.topicService.createTopic(this.topicModel).subscribe(
      (data: any[]) => {
        this.topicModel = new TopicModel();
        this.createEdit_Topic = "list";
        this.commonMethods.dynamicBackgroundColorChange('default');
        this.GetTopicsItems();
        this.commonMethods.addToastforlongtime(true, 'Template Topic has beed saved in Your Topics Library');
        this.loading = false;
        this.spinnerService.hide();
      },
      (error) => {
        this.loading = false;
        console.log(error);
        this.commonMethods.addToastforlongtime(false, error.error);
        this.spinnerService.hide();
      });
  }

  backtoListTemplate() {
    this.createEdit_Topic = 'template';
    this.commonMethods.dynamicBackgroundColorChange('default');
  }

  keyPressOption: boolean = false;
  async omit_special_char(event) {
    this.keyPressOption = true;
    var k;
    k = event.charCode;  
    if ((k > 32 && k < 45) || k == 47 || (k > 57 && k < 65) || (k > 90 && k < 95) || k == 96 || (k > 122 && k < 127) || event.key === "Backspace") {
      return await event.preventDefault();
    }
  }


  //  RemoveSpecialCharacters(val,fieldName) {
  //   if(fieldName.toLowerCase() == 'topicname'){
  //     if (val != null && val != '' && val.length > 1 && !this.keyPressOption) {
  //       console.log("Entered",typeof(val))
  //       this.topicModel.topicName = ''
  //       const res = val.replace(/[^a-zA-Z0-9--._-_ - ]/g, "");
  //       // setTimeout(() => {
  //        // this.topicModel.topicName = res;
  //       //  (<HTMLInputElement>document.getElementById('bindingId')).value = res;
  //       // }, 50);
  //     }
  //     this.keyPressOption = false;

  //   }
  //   else {
  //       if (val != null && val.length > 1 && !this.keyPressOption) {
  //           const res = val.replace(/[^a-zA-Z0-9--._-_ - ]/g, "");
  //           // setTimeout(() => {
  //             this.topicModel.topicDescription = res;
  //           // }, 50);
  //       }
  //       this.keyPressOption = false;
  //   }
    
  // }

  onPaste(event,fieldName) {
    if(fieldName.toLowerCase() == 'topicname'){
       if(event){
          const trimmedText = event.replace(/[`~!@#$%^&*()|+\=?;:%'",.<>\{\}\[\]\\\/]/gi, '');
          (<HTMLInputElement>document.getElementById('topicnameid')).value = trimmedText;
          this.topicModel.topicName = trimmedText
       }
      }else
      {
        const trimmedText = event.replace(/[`~!@#$%^&*()|+\=?;:%'",.<>\{\}\[\]\\\/]/gi, '');;
          (<HTMLInputElement>document.getElementById('topicdescriptionid')).value = trimmedText;
          this.topicModel.topicDescription = trimmedText
      }
  }


}
