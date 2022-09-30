import * as _ from "lodash";
import * as $ from 'jquery';
import { Injectable, RendererFactory2, Renderer2, Output, EventEmitter } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import {
  Routes, Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { HeaderService } from '../containers/header/header.service';
import { Observable, of, from } from 'rxjs';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { GlobalComponent } from '../global/global.component';
import * as CryptoJS from 'crypto-js';
import { utils } from '../../app/config';
import * as keys from '../common/keys.json';

@Injectable()
export class CommonMethods {
  private renderer: Renderer2;
  // @Output() lang: EventEmitter<any> = new EventEmitter();
  httpLocal: any;
  constructor(
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig, private rendererFactory: RendererFactory2,
    public headerService: HeaderService,
    private http: HttpClient, private handler: HttpBackend,
    public global: GlobalComponent, private router: Router) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.toastyConfig.theme = 'material';
    this.httpLocal = new HttpClient(handler);
    console.log(_);
  }

  listOfKeys: any = (keys as any).default;


  public addToastforlongtime(errorType: boolean, message: string) {
    var toastOptions: ToastOptions = {
      title: message,
      //  msg: message,
      showClose: true,
      timeout: 6000,
      theme: 'default',

      onAdd: (toast: ToastData) => {

      },
      onRemove: function (toast: ToastData) {

      }
    };

    // Add see all possible types in one shot 
    if (typeof message == 'string') {
      if (errorType) {

        this.toastyService.success(toastOptions);
      } else {
        this.toastyService.error(toastOptions);
      }
    }
  }

  public addToastforshorttime(errorType: boolean, message: string) {
    var toastOptions: ToastOptions = {
      title: message,
      //  msg: message,
      showClose: true,
      timeout: 0,
      theme: 'default',

      onAdd: (toast: ToastData) => {

      },
      onRemove: function (toast: ToastData) {

      }
    };

    // Add see all possible types in one shot 
    if (typeof message == 'string') {
      if (errorType) {

        this.toastyService.success(toastOptions);
      } else {
        this.toastyService.error(toastOptions);
      }
    }
  }

  public removeToaster(errorType: boolean, message: string) {
    var toastOptions: ToastOptions = {
      title: message,
      //  msg: message,
      showClose: true,
      timeout: 0,
      theme: 'default',

      // onAdd: (toast: ToastData) => {

      // },
      onRemove: function (toast: ToastData) {

      }
    };

    // Add see all possible types in one shot 
    if (typeof message == 'string') {
      if (errorType) {

        // this.toastyService.success(toastOptions);
      } else {
        // this.toastyService.error(toastOptions);
      }
    }
  }

  public dynamicBackgroundColorChange(flag: string = 'default') {
    if (flag == 'default') {
      this.renderer.removeClass(document.body, 'app-white');
      this.renderer.addClass(document.body, 'app-gray');

    }
    else if (flag == 'white') {
      this.renderer.removeClass(document.body, 'app-gray');
      this.renderer.addClass(document.body, 'app-white');
    }
    else {
      this.renderer.addClass(document.body, 'app');
    }
  }



  public compareValues(key, order = 'asc') {
    return function (a, b) {
      if (!a.hasOwnProperty(key) ||
        !b.hasOwnProperty(key)) {
        return 0;
      }
      if (typeof (a[key]) == 'string') {
        a[key] = parseInt(a[key].replace('s', ''))
      }
      if (typeof (b[key]) == 'string') {
        b[key] = parseInt(b[key].replace('s', ''))
      }
      const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ?
          (comparison * -1) : comparison
      );
    };
  }

  findRedirectPath(roleObj) {
    let path = null
    for (const key in roleObj) {
      if (path == null) {
        for (const Obj1 in roleObj[key]) {
          if (path == null) {
            for (const Obj2 in roleObj[key][Obj1]) {
              if (path == null) {
                if (roleObj[key][Obj1][Obj2]) {
                  path = key
                  break;
                }
              }
            }
          }
          else {
            break;
          }
        }

      }
      else {
        break
      }
    }
    return path;

  }
  encryptData(data) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), utils.encryptSecretKey).toString();
    } catch (e) {
      console.log(e);
    }
  }

  decryptMstrPwd(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, utils.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      } else {
        return null
      }
    } catch (e) {
      console.log(e);
    }
  }


  decryptData(data) {
    if (data) {
      try {
        const bytes = CryptoJS.AES.decrypt(data, utils.encryptSecretKey);
        if (bytes.toString()) {
          return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } else {
          this.clearLocalStorage();
          this.router.navigateByUrl('/login')
          return null
        }
      } catch (e) {
        this.clearLocalStorage();
        this.router.navigateByUrl('/login')
        console.log(e);
      }
    }
  }

  clearLocalStorage() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('mstrIdToken');
    localStorage.removeItem('mstrAuthToken');
    localStorage.removeItem("language");
    localStorage.removeItem("_&rp&");
    localStorage.removeItem("mstrPreference");
    localStorage.removeItem('_reftoken');
    localStorage.removeItem('_mstrweb');
    localStorage.removeItem('mstrProject');
    localStorage.removeItem('_mgrp');
    localStorage.removeItem('mstr_SR_FID');
    localStorage.removeItem('mstr_PR_FID');
  };


  tokenValidation() {
    let valid = true;
    for (const itr of this.listOfKeys.keys) {
      if (!localStorage.getItem(itr)) {
        valid = false;
      }
    }
    return valid;
  }


}
