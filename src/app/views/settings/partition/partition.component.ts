import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethods } from '../../../common/common.components';
import { GlobalComponent } from '../../../global/global.component';
import { PartitionsModel } from './partition.model';
import { PartitionService } from './partition.service';

@Component({
  selector: 'app-partition',
  templateUrl: './partition.component.html',
  styleUrls: ['./partition.component.css']
})
export class PartitionComponent implements OnInit {

  _partitionPage:string = 'partitionList';
  createEdit:any = "";
  public partitionModel: PartitionsModel;
  constructor(private commonMethods: CommonMethods,private partitionService: PartitionService,
    private spinnerService: NgxSpinnerService,public global: GlobalComponent) {
    this.commonMethods.dynamicBackgroundColorChange('white'); 
    // this.getdataPartitionS3();
    this.getData();
    this.partitionModel = new PartitionsModel();
  }

  ngOnInit(): void {
    this.getPartitionDB();
  }
  
  addEditPage(data,type){
    if(type=="create"){ 
      this._partitionPage = "create_edit";
      this.createEdit = type;
      this.partitionModel = new PartitionsModel();
      this.partitionModel.dataPartitionList = JSON.parse(JSON.stringify(this.dataAccessList))
    }
    else{
      this.partitionModel = JSON.parse(JSON.stringify(data));
      this._partitionPage = "create_edit";
      this.createEdit = type;
      if(this.partitionModel.dataPartitionList.length > 0 && this.partitionModel.dataPartitionList != undefined){
          // console.log("IF")
        let temArr=[];
        this.dataAccessList.forEach(element => {
          let arr = this.partitionModel.dataPartitionList.filter(s => s.dataLabel == element.dataLabel)
          // console.log(arr)
          if(arr.length == 0){
            temArr.push(element)
          }
        });
        if(temArr.length > 0){
          temArr.forEach(element => {
            this.partitionModel.dataPartitionList.push(element)
          });
        }
        this.partitionModel.dataPartitionList = JSON.parse(JSON.stringify(this.partitionModel.dataPartitionList))
      }
      else{
        // console.log("ELSE")
        this.partitionModel.dataPartitionList = JSON.parse(JSON.stringify(this.dataAccessList))
      }
    }
  }

  breadCrumbBack(){
    this._partitionPage = 'partitionList';
    this.partitionModel = new PartitionsModel();
    this.partitionNameERR = false;
    this.dataAccessErr = false;
  }
  
  getData(){
    this.getdataPartitionS3().then((res)=>{
      // console.log(res)
      this.getCustomDataDDL();
    })
  }
  dataAccessList:any=[]
  getPartitionValue:any;
  getdataPartitionS3(){
    return new Promise((resolve,reject)=>{
      this.partitionService.getdataPartitionS3().subscribe(
        (data:any)=>{
          // console.log(data)
          this.getPartitionValue = data;
           let arr = [];
           this.getPartitionValue.partitionsList.forEach(element => {
            element.dataList = []
            arr.push(element)
          });
          this.dataAccessList = arr;
          // this.getCustomDataDDL();
          resolve(data)
          
        },
        (error)=>{
          console.log(error);
          reject(error);
        }
      )
    })
    
  }
  
  // dataAccess get Multiselect DDL value from redshift api 
  ddl_custom_List:any=[];
  customList:any;
  getCustomDataDDL(){
    this.partitionService.getCustomDataOption(this.getPartitionValue.platformId).subscribe(
      (data:any)=>{
        if(data.Agents){
          data.Agents.forEach(element => {
            element.value = element.label
          });
        }
        this.customList = data
        // console.log(this.customList);
      },
      (error)=>{
        console.log(error)
      }
    )
  }

// dataAccess Multiselect DDL dynamic value loaded
  ddlModelValue(item){
    // console.log(item)
    this.ddl_custom_List = [];
    this.ddl_custom_List = this.customList[item];
  }

// Radio button onclick event for custom value
  onRadioSelect(value,label){
    // console.log(value)
    // if(value == 'all'){
      this.partitionModel.dataPartitionList.forEach(element => {
        if(value == 'custom'){
          if(element.dataLabel == label){
            element.dataList.forEach(item => {
              if(item.toLowerCase() == 'all'){
                element.dataList = []
              }
            });
          }
        }
          
      });
    // }
  }

  getStyle(i){
    if(i % 2 == 0) {
      return 'label-even'
    }  
    else {
      return 'label-odd'
    }
  }
  
  //VAlidation if custom selected , need to select ddl value for save and update
  dataAccessErr:boolean = false;
  partitionNameERR:boolean = false;
  validDataAccess(val){
    //  val = this.roleModel.dataAccess;
    for(let element of val){
      if(element.dataValue == 'custom'){
        if(element.dataList.length == 0){
          this.dataAccessErr = true;
          break;
        }
        else{
          this.dataAccessErr = false;
        }
      }
      else{
        this.dataAccessErr = false;
        if(element.dataList.length == 0){
          element.dataList = ['All']
        }
        else{
          element.dataList = ['All']
        }
      }
    }
  }

  // sendDataTOmstr(data){
  //  let arr = [];
  //  data.dataAccess.forEach(element => {
  //    let obj={
  //     mstrAttributeName: element.dataLabel,
  //     mstrAttributePermittedValues: element.dataList
  //    }
  //    arr.push(obj)
  //  });
   
  //  let paramsBody={
  //   mstrFilterDefJSONArray : arr,
  //   mstrFilterLogicalOperator : "AND",
  //   mstrFilterTargetProject : localStorage.getItem('mstrProject'),
  //   mstrUserGroupName : localStorage.getItem('_mgrp'),
  //   roleName: data.roleName
  //  }
  // //  console.log(JSON.stringify(paramsBody))
  //  this.partitionService.sendDataTOmstr(paramsBody).subscribe(
  //    (data:any)=>{
  //     // console.log(data)
  //    },
  //    (error)=>{
  //      console.log(error)
  //    }
  //  )
  // }

  deleteLabel(msg) {
    // console.log(msg)
    let temVal = JSON.parse(JSON.stringify(this.partitionModel.dataPartitionList));
    temVal.forEach(element => {
     const index: number = element.dataList.indexOf(msg);
    //  console.log(index)
    if (index !== -1) {
      element.dataList.splice(index, 1);
    }
    });
    this.partitionModel.dataPartitionList = temVal;
  }
  
  // Save partitin into DB
  savePartition(){
    this.validDataAccess(this.partitionModel.dataPartitionList)
    if(this.partitionModel.partitionName == "" || this.partitionModel.partitionName == null){
      this.partitionNameERR = true;
    }
    else{
      this.partitionNameERR = false;
    }

    if(this.partitionNameERR == true || this.dataAccessErr == true){
      return
    }
    else{
      this.partitionModel.platformName = this.getPartitionValue.platformName
      this.partitionModel.platformId = this.getPartitionValue.platformId
      this.spinnerService.show();
      this.partitionService.savePartition(this.partitionModel).subscribe(
        (data:any)=>{
          // console.log("Save",data);
          this.partitionNameERR = false;
          this.dataAccessErr = false;
          this.partitionModel = new PartitionsModel();
          this.getPartitionDB();
          this._partitionPage = 'partitionList';
          this.commonMethods.addToastforlongtime(true,'Partition created');
          this.spinnerService.hide();
        },
        (error)=>{
          console.log(error);
          this.spinnerService.hide();
          this.commonMethods.addToastforlongtime(false, error.error);
        }
      )
    }
    
  }
  
  // Update partitin into DB
  updatePartition(){
    this.validDataAccess(this.partitionModel.dataPartitionList)
    if(this.partitionModel.partitionName == "" || this.partitionModel.partitionName == null){
      this.partitionNameERR = true;
    }
    else{
      this.partitionNameERR = false;
    }

    if(this.partitionNameERR == true || this.dataAccessErr == true){
      return
    }
    else{
      this.partitionModel.platformName = this.getPartitionValue.platformName;
      this.partitionModel.platformId = this.getPartitionValue.platformId;
      this.spinnerService.show();
      this.partitionService.updatePartition(this.partitionModel).subscribe(
        (data:any)=>{
          // console.log("update",data);
          this.partitionNameERR = false;
          this.dataAccessErr = false;
          this.partitionModel = new PartitionsModel();
          this.getPartitionDB();
          this._partitionPage = 'partitionList';
          this.commonMethods.addToastforlongtime(true,'Partition updated');
          this.spinnerService.hide();
        },
        (error)=>{
          console.log(error);
          this.spinnerService.hide();
          this.commonMethods.addToastforlongtime(false, error.error);
        }
      )
    }
    
  }

  // Delete Partition FromDB
  deletePartition(){
    this.spinnerService.show();
    this.partitionService.deletePartition(this.partitionModel).subscribe(
      (data:any)=>{
        // console.log("delete",data)
        this.partitionModel = new PartitionsModel();
        this._partitionPage = 'partitionList';
        this.getPartitionDB();
        this.commonMethods.addToastforlongtime(true,'Partition deleted');
        this.spinnerService.hide();
      },
      (error)=>{
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      })
  }
  
   // Get the list of Partition data From DB
  getList:any=[];
  getPartitionDB(){
    this.spinnerService.show();
    this.partitionService.getPartitionDB().subscribe(
      (data:any)=>{
        // console.log(data);
        // if(data.length > 0){
          this.getList = data;
        // }
        this.spinnerService.hide();
      },
      (error)=>{
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      }
    )
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
  //       this.partitionModel.partitionName = res;
  //     // }, 50);
  //   }
  //   this.keyPressOption = false;
  // }
  onPaste(event) {
    if(event){
       const trimmedText = event.replace(/[`~!@#$%^&*()|+\=?;:%'",.<>\{\}\[\]\\\/]/gi, '');
       (<HTMLInputElement>document.getElementById('partitionnameid')).value = trimmedText;
       this.partitionModel.partitionName  = trimmedText
    }
  }
}
