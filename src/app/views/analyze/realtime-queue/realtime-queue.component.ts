import { Component, OnInit } from '@angular/core';
import { RealTimeService } from './realtime-queue.service';
import { CommonMethods } from '../../../common/common.components';
import { UserData } from '../../../user'
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-realtime-queue',
  templateUrl: './realtime-queue.component.html',
  styleUrls: ['./realtime-queue.component.css']
})
export class RealtimeQueueComponent implements OnInit {
  
  queueList:any=[]
  CHAT_URL:string = ""
  constructor(public realtimeService: RealTimeService,private commonMethods: CommonMethods,private spinnerService: NgxSpinnerService) {
    this.commonMethods.dynamicBackgroundColorChange('default');
    // this.getQueueList();
    this.getLoadedKibanaData();
    this.columnFilter();
   
   }
 
  ngOnInit(): void {
    // let cID = "1785542363"
    // let cID = UserData.customerId;
    // let channelURL = "wss://xl2fggg4z7.execute-api.us-east-1.amazonaws.com/prod?customerID="+ cID
    // this.queueDatafromChannel(channelURL)
    
  }
  
  getQueueList(){
    let val=[{
      agent: "XYZ",
      state: "Active",
      duration: "00:45"
    },
    {
      agent: "XYZ",
      state: "Active",
      duration: "00:45"
    },
    {
      agent: "XYZ",
      state: "Active",
      duration: "00:45"
    }]
    this.queueList = val
    
  }
  
 
  // queueDatafromChannel(url){
  //   this.CHAT_URL = url
  //   this.realtimeService.connect(this.CHAT_URL).map(
  //     (response) => {
  //       let data = JSON.parse(response.data);
  //       console.log(data)
  //         // return {
  //         //   topicName: data.topicName,
  //         //   version: data.version,
  //         //   eventBody: data.eventBody,
  //         //   metadata: data.metadata
  //         // };
  //       }
  //     );
  // }
  
  columnList:any = [];
  selectedColumn:any = [];
  columnFilter(){
    this.columnList = [
      // {field: 'QueueName', header: 'Queue Name'},
      {field: 'mediaType', header: 'Media Type'},
      {field: 'nOffered', header: 'Offered', class: "textRight"},
      {field: 'tHandle_Count', header: 'Handled',class: "textRight"},
      {field: 'oServiceLevel_ratio', header: 'Service Level %', class: "textRight"},
      {field: 'tHandle_Avg', header: 'AHT', class: "textRight"},
      {field: 'tHandle_Sum', header: 'Handle Time', class: "textRight"},
      {field: 'tAbandon_Count', header: 'Abandoned', class: "textRight"},
      {field: 'tAbandon_Avg', header: 'Time to Abandon', class: "textRight"},
      {field: 'tAcw_Avg', header: 'ACW', class: "textRight"},
      {field: 'tHeld_Avg', header: 'Avg Hold Time', class: "textRight"},
      {field: 'tTalkComplete_Avg', header: 'ATT', class: "textRight"},
      {field: 'tWait_Avg', header: 'AWT', class: "textRight"},
      // {field: 'attributes_Publication', header: 'Attribute'},
      // {field: 'address', header: 'Caller ID'},
      // {field: 'tWait_Count', header: 'Calls Waiting'},
      // {field: 'tWait_Max', header: 'Max Wait Time'},
      // {field: 'tAlert_Count', header: 'Calls Missed'},
      // {field: 'oInteracting_Count', header: 'Interacting'},
      // {field: 'oServiceLevel_target', header: 'Service Level'}
      
    ]
   
    this.selectedColumn = this.columnList;
  }
 
 get selectedColumns(): any[] {
    return this.selectedColumn;
    
  }

  set selectedColumns(val: any[]) {
    //restore original order
     this.selectedColumn = this.columnList.filter(col => val.includes(col));
   
  }

  
  queueDDList:any = [];
  selectedQueues:any = [];
  serviceClose:any;
  arrfilter:any = [];
  queueDatafromChannel(url){
    this.CHAT_URL = url
    let arrList = [];
    let arr = [];
    arrList = this.kibanaData;
    this.serviceClose = this.realtimeService.connect(this.CHAT_URL).subscribe(
      (response) => {
        let data = JSON.parse(response.data);
        if(data.QueueName != undefined && data.nOffered != undefined && data.oServiceLevel_ratio != undefined){
        arrList.push(data)
        arr = arrList.filter(( item, index, inputArray ) => {
          return inputArray.map(el => el.QueueName).lastIndexOf(item.QueueName) == index;
       });
      
        this.queueList = arr;
        this.arrfilter= arr;
        // console.log(this.queueList)
        this.queueDDList = [];
        // this.filter(this.selectedQueues)
        this.queueList.forEach(element => {
          if(element.QueueName != undefined){
            let val = {
              label : element.QueueName,
              value: element.QueueName
            }
            this.queueDDList.push(val)
            // console.log(this.queueDDList)
          }
        });
        this.onChangefilter(this.selectedQueues)
      
        }
      },
      (error)=>{
         console.log(error)
      }
    );
  }
  
  onChangefilter(val){
    if(val.length > 0){
      let temp = this.arrfilter.filter(col => val.includes(col.QueueName))
      this.queueList = temp
    }
    else{
      this.queueList = this.arrfilter
    }
    
  }
  

  kibanaData:any = [];
  getLoadedKibanaData(){
    // let customerID = 1785542363;
    let customerID = UserData.customerId
    this.spinnerService.show();
    this.realtimeService.getLoadedKibanaData(customerID).subscribe(
      (data:any)=>{
        this.queueList = data.QueueStats;
        this.kibanaData = data.QueueStats;
        this.arrfilter = data.QueueStats;
        this.queueDDList = [];
        
        this.queueList.forEach(element => {
          if(element.QueueName != undefined){
            let val = {
              label : element.QueueName,
              value: element.QueueName
            }
            this.queueDDList.push(val)
          }
        });
        this.spinnerService.hide();
        // let cID = "1785542363"
        let cID = UserData.customerId;
        let channelURL = "wss://xl2fggg4z7.execute-api.us-east-1.amazonaws.com/prod?customerID="+ cID
        this.queueDatafromChannel(channelURL);
      },
      (error)=>{
        console.log(error);
        this.spinnerService.hide();
      }
    )
  }

  // getLoadedKibanaData(){
  //   this.spinnerService.show();
  //   let options;
  //       options = {
  //           method: 'GET', 
  //       };
  //       const request = async () =>{
  //       const response = await fetch('https://hornbicig3.execute-api.us-east-1.amazonaws.com/prod/api/getReportFromKibana?customerID=1785542363', options);
  //           let data = await response.json();
  //           // console.log(data);
        
  //       this.queueList = data.QueueStats;
  //       this.kibanaData = data.QueueStats;
  //       this.arrfilter = data.QueueStats;
  //       this.queueDDList = [];
        
  //       this.queueList.forEach(element => {
  //         if(element.QueueName != undefined){
  //           let val = {
  //             label : element.QueueName,
  //             value: element.QueueName
  //           }
  //           this.queueDDList.push(val)
  //         }
  //       });
  //       this.spinnerService.hide();
  //       let cID = "1785542363"
  //       // let cID = UserData.customerId;
  //       let channelURL = "wss://xl2fggg4z7.execute-api.us-east-1.amazonaws.com/prod?customerID="+ cID
  //       this.queueDatafromChannel(channelURL);
  //     }
  //   request();
  // }

   closeWebsocket() {
    // this also caused the websocket connection to be closed
    this.serviceClose.unsubscribe();
    this.realtimeService.close()
  }
  ngOnDestroy() {
    this.closeWebsocket()
  }
}
