import { Component, OnInit } from '@angular/core';
import { CommonMethods } from '../../../common/common.components'
import { HelpService } from '../../homes/help/help.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor(private commonMethods: CommonMethods,public helpService: HelpService,private spinnerService: NgxSpinnerService) {
    this.getHelp();
   }

  ngOnInit(): void {
    this.commonMethods.dynamicBackgroundColorChange('white');
  }

  helpData:any=null;
  getHelp(){
    this.spinnerService.show();
    this.helpService.getS3PlaybookHelp().subscribe(
      (data:any)=>{
        this.helpData = data;
        document.getElementById('playbook-help').innerHTML =  this.helpData;
        this.spinnerService.hide();
      },
      (error)=>{
        console.log(error);
        this.spinnerService.hide();
      })
  }
}
