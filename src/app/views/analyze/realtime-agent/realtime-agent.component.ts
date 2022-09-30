import { Component, OnInit } from '@angular/core';
import { CommonMethods } from '../../../common/common.components';
import { RealTimeService } from '../realtime-queue/realtime-queue.service';
import { UserData } from '../../../user'
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-realtime-agent',
  templateUrl: './realtime-agent.component.html',
  styleUrls: ['./realtime-agent.component.css']
})
export class RealtimeAgentComponent implements OnInit {
  agentList:any=[]
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
      // {field: 'QueueName', header: 'Queue Name'},
      {field: 'tAlert_Sum', header: 'Offered', class: "textRight"},
      {field: 'tAnswered', header: 'Answered', class: "textRight"},
      {field: 'tHandle_Avg', header: 'AHT', class: "textRight"},
      {field: 'tHandle_Sum', header: 'Handle Time', class: "textRight"},
      {field: 'tTalkComplete_Avg', header: 'ATT', class: "textRight"},
      {field: 'tHeldComplete_Avg', header: 'Avg Hold Time', class: "textRight"},
      {field: 'tAcw_Avg', header: 'ACW', class: "textRight"},    
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


  agentDDList:any = [];
  selectedAgent:any = [];
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
        if(data.UserName != undefined && data.intervalStart != undefined && data.mediaType != undefined){
        arrList.push(data)
        arr = arrList.filter(( item, index, inputArray ) => {
          return inputArray.map(el => el.UserName).lastIndexOf(item.UserName) == index;
       });
      
        this.agentList = arr;
        this.arrfilter= arr;
        // console.log(this.agentList)
        this.agentDDList = [];
        // this.filter(this.selectedAgent)
        this.agentList.forEach(element => {
          if(element.UserName != undefined){
            let val = {
              label : element.UserName,
              value: element.UserName
            }
            this.agentDDList.push(val)
          }
        });
        this.onChangefilter(this.selectedAgent)
      
        }
      },
      (error)=>{
         console.log(error)
      }
      );
  }
  
  onChangefilter(val){
    if(val.length > 0){
      let temp = this.arrfilter.filter(col => val.includes(col.UserName))
      this.agentList = temp;
    }
    else{
      this.agentList =  this.arrfilter;
    }
    
  }
  
  kibanaData:any = [];
  getLoadedKibanaData(){
    // let customerID = 1785542363;
    let customerID = UserData.customerId;
    this.spinnerService.show();
    this.realtimeService.getLoadedKibanaData(customerID).subscribe(
      (data:any)=>{
        this.agentList = data.AgentStats;
        this.kibanaData = data.AgentStats;
        this.arrfilter = data.AgentStats;
        this.agentDDList = [];
        
        this.agentList.forEach(element => {
          if(element.UserName != undefined){
            let val = {
              label : element.UserName,
              value: element.UserName
            }
            this.agentDDList.push(val)
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
  //           // console.log(data);
        
  //       this.agentList = data.AgentStats;
  //       this.kibanaData = data.AgentStats;
  //       this.arrfilter = data.AgentStats;
  //       this.agentDDList = [];
        
  //       this.agentList.forEach(element => {
  //         if(element.UserName != undefined){
  //           let val = {
  //             label : element.UserName,
  //             value: element.UserName
  //           }
  //           this.agentDDList.push(val)
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
