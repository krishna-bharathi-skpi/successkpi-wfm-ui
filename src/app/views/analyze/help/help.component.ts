import { Component, OnInit } from "@angular/core";
import { CommonMethods } from "../../../common/common.components";
import { HelpService } from '../../homes/help/help.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: "app-help",
  templateUrl: "./help.component.html",
  styleUrls: ["./help.component.css"],
})
export class HelpComponent implements OnInit {
  constructor(private commonMethods: CommonMethods,public helpService: HelpService,
    private spinnerService: NgxSpinnerService, private router: Router,) {
    this.getHelp();
  }

  ngOnInit(): void {
    this.commonMethods.dynamicBackgroundColorChange("white");
  }

  helpData:any=null;
  getHelp(){
    this.spinnerService.show();
    this.helpService.getS3AnalyzeHelp().subscribe(
      (data:any)=>{
        this.helpData = data;
        document.getElementById('analyze-help').innerHTML =  this.helpData;
        this.spinnerService.hide();
      },
      (error)=>{
        console.log(error);
        this.spinnerService.hide();
      })
  }

  interactionPage(){
    // this.router.navigateByUrl("/analytics/interaction-details");
    window.open("/#/analytics/interaction-details?conversationid=c8d32fbc-cd53-4371-b41f-9aa36db65152","_blank")
    this.commonMethods.dynamicBackgroundColorChange('default')
  }
}

 

