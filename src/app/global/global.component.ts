import { Component, OnInit } from '@angular/core';
import { Url } from 'url';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css']
})
export class GlobalComponent {

  language: any;
  getDropdwn: any;
  getLangValue: any;
  MstrWebCode: string = '1033';
  languageDropdownChange: any;
  mstrPreference = null;
  hiddenSections='path'
  rolePermissions:any;
  previousPath:any = null;
  microstrategylogouturl:string="https://insight-usw2.successkpi.com/Analytics/servlet/mstrWeb?evt=3008&src=mstrWeb.3008"
  currentPlatformID: any = 0;
  cancelProfile:any
  
  constructor() {
   }

  // ngOnInit(): void {
  // }

}
