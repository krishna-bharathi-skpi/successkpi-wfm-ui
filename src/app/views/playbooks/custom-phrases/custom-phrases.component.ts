import { Component, OnInit } from '@angular/core';
import { customPhrasesModel } from './custom-phrases.model';
import { CustomPhrasesService } from './custom-phrases.service';
import { CommonMethods } from '../../../common/common.components';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalComponent } from '../../../global/global.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-custom-phrases',
  templateUrl: './custom-phrases.component.html',
  styleUrls: ['./custom-phrases.component.css']
})
export class CustomPhrasesComponent implements OnInit {
  phraseAdd: any = [];
  public customModel: customPhrasesModel;
  errorValidation = { customPhrasesError: null }
  customPhrasesForm: FormGroup;
  isSubmit: boolean = false;


  constructor(private customService: CustomPhrasesService, private commonMethods: CommonMethods, 
    private fb: FormBuilder,public global: GlobalComponent,private spinnerService: NgxSpinnerService) {
    this.customModel = new customPhrasesModel();
    this.getCustomPhrases();
  }

  ngOnInit() {
    this.getCustomPhrases();
    this.commonMethods.dynamicBackgroundColorChange('white')
  }

  //*********************************************************/add phrases/*********************************************************

  addPhrase() {
    if (this.customModel.customDicObj.customVocabulary.length == 0) {
      let phrasesObje = { phrases: null, soundsLike: null, displayAs: null };
      this.customModel.customDicObj.customVocabulary.push(phrasesObje);
    }
    else {
      let phrasesObje = { phrases: null, soundsLike: null, displayAs: null };
      this.customModel.customDicObj.customVocabulary.push(phrasesObje);
    }
  }

  //*********************************************************/remove phrase/*********************************************************
  removephrase(i) {
    // if (this.customModel.customDicObj.customVocabulary.length == 1) { return false }
    // else {
      this.customModel.customDicObj.customVocabulary.splice(i, 1);
    //   return true;
    // }
  }
  //*********************************************************/keyPressSpaceRemove/*********************************************************
  keyPressSpaceRemove(event: any) {
    let test = /^[a-z]+$/i
    var key = event.keyCode;
    if ((key > 64 && key < 91) || (key > 96 && key < 123) || key == 8 || key == 45 || key == 46) {
      return true;
    }
    else {
      event.preventDefault();
    }
  }

  //*********************************************************/save & get CustomPhrases/*********************************************************
  loading:boolean = false;
  saveCustomPhrases() {
    this.errorValidation = { customPhrasesError: null }
    let errorCustom = this.customPhrasesValidation(JSON.parse(JSON.stringify(this.customModel.customDicObj.customVocabulary)));
    if (typeof (errorCustom) == 'undefined') {
      this.loading =  true;
      this.spinnerService.show();
      this.customService.saveCustomPhrases(this.customModel.customDicObj).subscribe((data: any) => {
        this.commonMethods.addToastforlongtime(true, 'Custom Phrases updated');
        this.loading =  false;
        this.spinnerService.hide();
      }, (error) => {
        this.loading =  false;
        console.log('error', error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      });
    }
  }

  getCustomPhrases() {
    this.spinnerService.show();
    this.isSubmit = false
    this.customModel.customDicObj = { customVocabulary: [], dictionaryStatus: null };
    this.customService.getCustomPhrases().subscribe((data: any) => {

      if (data.customVocabulary != undefined) {
        this.customModel.customDicObj = data;
      }
      this.spinnerService.hide();
      // else {
      //   this.customModel = new customPhrasesModel();
      // }
    }, (error) => {
      console.log('error', error);
      this.commonMethods.addToastforlongtime(false, error.error);
      this.spinnerService.hide();
    });
  }

  //*********************************************************/validation CustomPhrases/*********************************************************
  customPhrasesValidation(vObj) {
    for (let i = vObj.length - 1; i > -1; i--) {
      if ((vObj[i].phrases == null || (typeof (vObj[i].phrases) == "string" ? vObj[i].phrases.trim() : vObj[i].phrases) == "")
        || (vObj[i].soundsLike == null || (typeof (vObj[i].soundsLike) == "string" ? vObj[i].soundsLike.trim() : vObj[i].soundsLike) == "")
        || (vObj[i].displayAs == null || (typeof (vObj[i].displayAs) == "string" ? vObj[i].displayAs.trim() : vObj[i].displayAs) == "")) {
        this.errorValidation.customPhrasesError = 'Please enter the all fields'
        return this.isSubmit = true
      }
    }
  }

  keyPressOption: boolean = false;
  async omit_special_char(event) {
    this.keyPressOption = true;
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    //  console.log(k);
    if ((k > 32 && k < 45) || k == 47 || (k > 57 && k < 65) || (k > 90 && k < 95) || k == 96 || (k > 122 && k < 127)) {
      return await event.preventDefault();
    }
  }

}
