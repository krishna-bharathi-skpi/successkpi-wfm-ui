import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {ThemesModel} from './themes.model';
import {ThemeService} from '../themes/themes.service';
import { from } from 'rxjs';
import { CommonMethods } from '../../../common/common.components';
import { GlobalComponent } from '../../../global/global.component';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit {
  selectedThemes:any
  themes:any;
  submittedThemeEdit= false;
  submittedThemeCreate= false;
  themeEditForm:FormGroup;
  themeCreateForm:FormGroup;
  validationError = {topicError : null}

  createOrEdit_theme:string='list';
  topicList : any[];
  cards:any[];
  searchThemeName:string="";
  allcards:any=[];
  public themeModel : ThemesModel;
  loading:boolean = false;
  constructor(private formBuilder:FormBuilder,private themeService : ThemeService,
    private commonMethods: CommonMethods,public global: GlobalComponent,private spinnerService: NgxSpinnerService) { 
    this.themeModel= new ThemesModel();
  }

  ngOnInit(): void {
     this.themeForms();
     this.addTopicEdit();
     this.getTopics();
     this.getThemeItems();
     this.commonMethods.dynamicBackgroundColorChange('default');
  }

  //********************************************************Forms validation********************************************************
  themeForms() {
    this.themeEditForm = this.formBuilder.group({
      editThemeName: ['', Validators.required],
    })
    this.themeCreateForm = this.formBuilder.group({
      createThemeName: ['', Validators.required],
    })
  }
  get validationThemeEdit(){ return this.themeEditForm.controls; }
  get validationThemeCreate(){ return this.themeCreateForm.controls; }

  addTopicEdit() {
    if (this.themeModel.topicScore.length == 0) {
      let topicEdit = { topicId: null,isDefaultScore:false, defaultScore:0,score: 0 ,isOccurrence:false };
      this.themeModel.topicScore.push(topicEdit);
    }
    else {
      let topicEdit = { topicId: null,isDefaultScore:false,defaultScore:0, score: 0 ,isOccurrence:false};
      this.themeModel.topicScore.push(topicEdit);
    }
  }

  //delete edit topic
  removeTopicEdit(i) {   
    // this.themeModel.topicScore.splice(i, 1);
    // return true;
    if (this.themeModel.topicScore.length == 1) {
      return false;
    }else{
    this.themeModel.topicScore.splice(i, 1);
    return true;
    }
  }

//add create topic
  addTopicCreate() {
    if (this.themeModel.topicScore.length == 0) {
      let topicCreate = { topicId: null,isDefaultScore:false, defaultScore:0, score: 0, isOccurrence:false};
      this.themeModel.topicScore.push(topicCreate);
    }
    else {
      let topicCreate = { topicId: null,isDefaultScore:false, defaultScore:0, score: 0 ,isOccurrence:false};
      this.themeModel.topicScore.push(topicCreate);
    }
  }
  
  //delete create topic
  removeTopicCreate(j) {
    if (this.themeModel.topicScore.length == 1) {
      return false;
    }else{
    this.themeModel.topicScore.splice(j, 1);
    return true;
    }
  }

  // Get Topic in themes
  getTopics(){
    this.themeService.getTopics().subscribe(
      (data:any)=>{
        this.topicList=data;
        // console.log("Topic",this.topicList);
      },
      (error)=>{
        console.log(error);
        this.commonMethods.addToastforlongtime(false, error.error);
      }
    );
  }

  // Theme Create
  createTheme(){
    // let createValidation=this.validations(JSON.parse(JSON.stringify(this.themeModel)));
    let createValidation=this.validations();
    
    if(createValidation){
      this.submittedThemeCreate=true;
      return
    }
    else if(this.themeCreateForm.valid){
      this.submittedThemeCreate=false;
      this.createOrEdit_theme='create';
      // console.log(this.themeModel);
      this.loading = true;
      this.spinnerService.show();
      this.themeService.createTheme(this.themeModel).subscribe(
      (data:any)=>{
        this.themeModel = new ThemesModel();
        this.getThemeItems();
        this.createOrEdit_theme = "list";
        this.commonMethods.dynamicBackgroundColorChange('default');
        this.commonMethods.addToastforlongtime(true, 'Theme saved');
        this.spinnerService.hide();
        this.loading = false;
      },
      (error)=>{
        this.loading = false;
        console.log(error);
        this.commonMethods.addToastforlongtime(false, error.error);
        this.spinnerService.hide();
      })
    }
  }


  validations(){
    let conditionFilter = this.themeModel.topicScore.filter((o: any) => {
      o.topicId = typeof (o.topicId) == 'string' ? o.topicId.trim() : o.topicId;
      return o.defaultScore == null || o.score == null || (o.topicId == null || o.topicId == '')
    })
   
      if (conditionFilter.length > 0) {
        this.validationError.topicError = 'Please enter all fields'
        // this.submittedThemeCreate=false;
        return true;
      }
      else return false;
    }
    
  // editValidations(){
    
  //     let conditionFilter = this.themeModel.topicScore.filter((o: any) => {
  //       o.topicId = typeof (o.topicId) == 'string' ? o.topicId.trim() : o.topicId;
  //       return o.defaultScore == null || o.score == null || (o.topicId == null || o.topicId == '')
  //     })
     
  //       if (conditionFilter.length > 0) {
  //         this.validationError.topicError = 'Please select an Conditions'
  //         console.log(this.validationError.topicError);
  //         // this.submittedThemeCreate=false;
  //       }
  //     }
  //   

  // getTheme Item from themes
  getThemeItems(){
    this.spinnerService.show();
    this.themeService.getThemeItems().subscribe(
      (data:any)=>{
       this.cards=data.Items;
       this.allcards=data.Items;
       this.spinnerService.hide();
      },
      (error)=>{
        console.log(error);
        this.commonMethods.addToastforlongtime(false, error.error);
        this.spinnerService.hide();
      })
  }

  // Edit card 
  editTheme(themeCard){
    this.themeModel = JSON.parse(JSON.stringify(themeCard));
    this.createOrEdit_theme = "edit";
    this.commonMethods.dynamicBackgroundColorChange('white');
    
  }

  // Cancel in create
  createCancel(){
    this.submittedThemeCreate = false;
    this.themeModel= new ThemesModel();
    this.themeForms();
    this.createOrEdit_theme='list';
    this.themeCreateForm.reset();
    this.commonMethods.dynamicBackgroundColorChange('default');
  }
  editCancel(){
    this.submittedThemeEdit = false;
    this.themeModel= new ThemesModel();
    this.themeForms();
    this.createOrEdit_theme='list';
    this.themeEditForm.reset();
    this.commonMethods.dynamicBackgroundColorChange('default');
  }

  // create theme
  createNewTheme(){
    this.themeModel = new ThemesModel();
    this.themeForms();
    this.createOrEdit_theme='create';
    this.commonMethods.dynamicBackgroundColorChange('white');
  }

  // Update theme
  updateTheme(){
    let editValidation=this.validations();
    if( editValidation){
      this.submittedThemeEdit=true;
      return
    }
    else if(this.themeEditForm.valid){
      this.submittedThemeEdit=false;
      // console.log(this.themeModel);
      this.loading = true;
      this.spinnerService.show();
      this.themeService.updateTheme(this.themeModel.strategyId,this.themeModel).subscribe(
      (data:any)=>{
        this.themeModel = new ThemesModel();
        this.getThemeItems();
        this.createOrEdit_theme = "list";
        this.commonMethods.addToastforlongtime(true, 'Theme updated');
        this.commonMethods.dynamicBackgroundColorChange('default');
        this.spinnerService.hide();
        this.loading = false;
      },
      (error)=>{
        this.loading = false;
        console.log(error);
        this.commonMethods.addToastforlongtime(false, error.error);
        this.spinnerService.hide();
      })
    }
  }

  // Delete theme
  deleteTheme(){
    this.spinnerService.show();
    this.themeService.deleteTheme(this.themeModel.strategyId).subscribe(
      (data:any)=>{
        this.getThemeItems();
        this.createOrEdit_theme = "list";
        this.commonMethods.dynamicBackgroundColorChange('default');
        this.commonMethods.addToastforlongtime(true, 'Theme deleted');
        this.spinnerService.hide();
      },
      (error)=>{
        console.log(error);
        this.commonMethods.addToastforlongtime(false, error.error);
        this.spinnerService.hide();
      }
    )
  }
  // Search
  searchTheme(){
    this.cards=this.allcards.filter(item=> item.strategyName.toLowerCase().includes(this. searchThemeName.toLowerCase()))
  }
  
  // Toggle switch
  toggleTheme(themeCard){
    // let isactive = themeCard.active
    this.themeService.toggleTheme({active: themeCard.active, themeId: themeCard.strategyId}).subscribe(
      (data:any)=>{
        // console.log("active", data)
      },
      (error) => {
        console.log(error);
        this.commonMethods.addToastforlongtime(false, error.error);
      }
    )
  }

    
  keyPressOption: boolean = false;
  async omit_special_char(event)
  {   
    this.keyPressOption = true;
    var k;  
     k = event.charCode;  
       if((k > 32 && k < 45) || k == 47 || (k > 57 && k < 65) || (k > 90 && k < 95) ||  k == 96 || (k > 122 && k < 127)) {
        return await event.preventDefault();
       }
  }
  
  
// RemoveSpecialCharacters(val)
// {   
//     if(val!=null && val.length>1 && !this.keyPressOption){
//       const res = val.replace(/[^a-zA-Z0-9--._-_ - ]/g, "");
//       // setTimeout(() => {
//       this.themeModel.strategyName =res;
//     // }, 50);
//     }
//     this.keyPressOption = false;
//   }

onPaste(event) {
  if(event){
     const trimmedText = event.replace(/[`~!@#$%^&*()|+\=?;:%'",.<>\{\}\[\]\\\/]/gi, '');
     (<HTMLInputElement>document.getElementById('themenameid')).value = trimmedText;
     this.themeModel.strategyName = trimmedText
  }
}

}
