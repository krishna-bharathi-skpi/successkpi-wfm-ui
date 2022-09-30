import { Component, OnInit } from '@angular/core';
import { CommonMethods } from '../../../common/common.components';
import { RealTimeService } from '../realtime-queue/realtime-queue.service';
import { UserData } from '../../../user'
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-realtime-queue-status',
  templateUrl: './realtime-queue-status.component.html',
  styleUrls: ['./realtime-queue-status.component.css']
})
export class RealtimeQueueStatusComponent implements OnInit {

  queueList:any=[]
  CHAT_URL:string = ""
  constructor(public realtimeService: RealTimeService,private commonMethods: CommonMethods,private spinnerService: NgxSpinnerService) { 
    this.commonMethods.dynamicBackgroundColorChange('default');
    this.getLoadedKibanaData();
    this.columnFilter();
  }

  ngOnInit(): void {
    // let cID = "1785542363"
    // let cID = UserData.customerId;
    // let channelURL = "wss://xl2fggg4z7.execute-api.us-east-1.amazonaws.com/prod?customerID="+ cID
    // this.queueDatafromChannel(channelURL)
  }
  
  columnList:any = [];
  selectedColumn:any = [];
  columnFilter(){
    
    this.columnList = [
      {field: 'mediaType', header: 'Media Type'},
      {field: 'oInteracting_Count', header: 'Interacting', class: "textRight"},
      {field: 'oWaiting_Count', header: 'Waiting', class: "textRight"},
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
        // console.log(data)
        if(data.QueueName != undefined && data.oInteracting_Count != undefined && data.oWaiting_Count != undefined){
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
      // let arrfilter= this.queueList
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
    let customerID = UserData.customerId;
    this.spinnerService.show();
    this.realtimeService.getLoadedKibanaData(customerID).subscribe(
      (data:any)=>{
        this.queueList = data.QueueStatus;
        this.kibanaData = data.QueueStatus;
        this.arrfilter = data.QueueStatus;
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
        // let cID = "1785542363";
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
  //           console.log(data);
        
  //       this.queueList = data.QueueStatus;
  //       this.kibanaData = data.QueueStatus;
  //       this.arrfilter = data.QueueStatus;
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
