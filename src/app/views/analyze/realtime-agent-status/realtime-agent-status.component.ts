import { Component, OnInit } from '@angular/core';
import { CommonMethods } from '../../../common/common.components';
import { RealTimeService } from '../realtime-queue/realtime-queue.service';
import { UserData } from '../../../user';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-realtime-agent-status',
  templateUrl: './realtime-agent-status.component.html',
  styleUrls: ['./realtime-agent-status.component.css']
})
export class RealtimeAgentStatusComponent implements OnInit {
  agentList:any=[]
  CHAT_URL:string = ""
  constructor(public realtimeService: RealTimeService,private commonMethods: CommonMethods, private spinnerService: NgxSpinnerService) { 
    this.commonMethods.dynamicBackgroundColorChange('default');
    this.getLoadedKibanaData();
    this.columnFilter();
  }

  ngOnInit(): void {
    
    
  }
  
   
  columnList:any = [];
  selectedColumn:any = [];
  
  columnFilter(){
    
    this.columnList = [
      {field: 'Presence', header: 'Presence'},
      {field: 'routingStatus_status', header: 'Routing Status'},
      {field: 'routingStatus_startTime', header: 'Routing Start Time'},
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
  interacting_Count:number = 0;
  idle_Count:number = 0;
  offQueue_Count:number = 0;
  interactingArr:any = [];
  idleArr:any = [];
  offqueueArr:any = [];
  arrfilter:any = [];
  dateFormat:any;
  queueDatafromChannel(url){
    this.CHAT_URL = url
    let arrList = [];
    let arr = []
    arrList = this.kibanaData
    this.serviceClose = this.realtimeService.connect(this.CHAT_URL).subscribe(
      (response) => {
        let data = JSON.parse(response.data);
        // console.log(data)
        if(data.UserName != undefined && data.Presence != undefined){
        arrList.push(data)
        arr = arrList.filter(( item, index, inputArray ) => {
          return inputArray.map(el => el.UserName).lastIndexOf(item.UserName) == index;
       });
      
        this.agentList = arr;
        this.arrfilter= arr;
        // console.log(this.agentList)
        this.agentDDList = [];
        // this.filter(this.selectedAgent)
        this.idleArr = []
        this.offqueueArr = []
        this.interactingArr = []
        this.agentList.forEach(element => {
          if(element.UserName != undefined){
            let val = {
              label : element.UserName,
              value: element.UserName
            }
            this.agentDDList.push(val)
            // console.log(this.agentDDList.length);
          }
          
          if(element.routingStatus_status != undefined){
            if(element.routingStatus_status == "IDLE"){
              
              this.idleArr.push(element.routingStatus_status)
              
            }
            if(element.routingStatus_status == "OFF_QUEUE"){
            
              this.offqueueArr.push(element.routingStatus_status)
              
            }
            if(element.routingStatus_status == "INTERACTING"){
              
              this.interactingArr.push(element.routingStatus_status)
            
            }

          }
          this.idle_Count = this.idleArr.length
          this.offQueue_Count = this.offqueueArr.length
          this.interacting_Count = this.interactingArr .length
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
    let temp = [];
    if(val.length > 0){
      val.forEach(element => {
         this.arrfilter.forEach(col => {
           if(element == col.UserName){
            temp.push(col)
           }
         });
      });
      this.agentList = temp;
      this.idleArr = [];
      this.offqueueArr = [];
      this.interactingArr = [];
      this.agentList.forEach(element => {
        if(element.routingStatus_status != undefined){
          if(element.routingStatus_status == "IDLE"){
            
            this.idleArr.push(element.routingStatus_status)
            
          }
          if(element.routingStatus_status == "OFF_QUEUE"){
          
            this.offqueueArr.push(element.routingStatus_status)
            
          }
          if(element.routingStatus_status == "INTERACTING"){
            
            this.interactingArr.push(element.routingStatus_status)
          
          }
        }
        this.idle_Count = this.idleArr.length
        this.offQueue_Count = this.offqueueArr.length
        this.interacting_Count = this.interactingArr .length
      });
    }
    else{
      this.agentList =  this.arrfilter;
      this.idleArr = [];
      this.offqueueArr = [];
      this.interactingArr = [];
      this.agentList.forEach(element => {
        if(element.routingStatus_status != undefined){
          if(element.routingStatus_status == "IDLE"){
            
            this.idleArr.push(element.routingStatus_status)
            
          }
          if(element.routingStatus_status == "OFF_QUEUE"){
          
            this.offqueueArr.push(element.routingStatus_status)
            
          }
          if(element.routingStatus_status == "INTERACTING"){
            
            this.interactingArr.push(element.routingStatus_status)
          
          }
        }
        this.idle_Count = this.idleArr.length
        this.offQueue_Count = this.offqueueArr.length
        this.interacting_Count = this.interactingArr .length
      });
    }
    
  }
  
  routingStatusCard:boolean = true;
  onChangeColumn(val){
  //  console.log(val)
   let temp = val.filter(s => s.header == "Routing Status")
   if(temp.length == 0){
    this.routingStatusCard = false;
   }
   else{
    this.routingStatusCard = true;
   }
  //  console.log(temp)
  }

  closeWebsocket() {
    // this also caused the websocket connection to be closed
    this.serviceClose.unsubscribe();
    this.realtimeService.close()
  }
  ngOnDestroy() {
    this.closeWebsocket()
  }
  
  kibanaData:any = [];
  getLoadedKibanaData(){
    let customerID = UserData.customerId
    // let customerID = 1785542363;
    this.spinnerService.show();
    this.realtimeService.getLoadedKibanaData(customerID).subscribe(
      (data:any)=>{
        // console.log(data);
        this.agentList = data.AgentStatus;
        this.kibanaData = data.AgentStatus;
        this.arrfilter = data.AgentStatus;
        this.agentDDList = [];
        this.idleArr = [];
        this.offqueueArr = [];
        this.interactingArr = [];
        this.agentList.forEach(element => {
          if(element.UserName != undefined){
            let val = {
              label : element.UserName,
              value: element.UserName
            }
            this.agentDDList.push(val)
          }
          if(element.routingStatus_status != undefined){
            if(element.routingStatus_status == "IDLE"){
              
              this.idleArr.push(element.routingStatus_status)
              
            }
            if(element.routingStatus_status == "OFF_QUEUE"){
            
              this.offqueueArr.push(element.routingStatus_status)
              
            }
            if(element.routingStatus_status == "INTERACTING"){
              
              this.interactingArr.push(element.routingStatus_status)
            
            }
          }
          this.idle_Count = this.idleArr.length
          this.offQueue_Count = this.offqueueArr.length
          this.interacting_Count = this.interactingArr .length
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
  //       // }
        
   
  //   // this.realtimeService.getLoadedKibanaData().subscribe(
  //   //   (data:any)=>{
  //   //     // console.log(data)
  //       this.agentList = data.AgentStatus;
  //       this.kibanaData = data.AgentStatus;
  //       this.arrfilter = data.AgentStatus;
  //       this.agentDDList = [];
  //       this.idleArr = [];
  //       this.offqueueArr = [];
  //       this.interactingArr = [];
  //       this.agentList.forEach(element => {
  //         if(element.UserName != undefined){
  //           let val = {
  //             label : element.UserName,
  //             value: element.UserName
  //           }
  //           this.agentDDList.push(val)
  //         }
  //         if(element.routingStatus_status != undefined){
  //           if(element.routingStatus_status == "IDLE"){
              
  //             this.idleArr.push(element.routingStatus_status)
              
  //           }
  //           if(element.routingStatus_status == "OFF_QUEUE"){
            
  //             this.offqueueArr.push(element.routingStatus_status)
              
  //           }
  //           if(element.routingStatus_status == "INTERACTING"){
              
  //             this.interactingArr.push(element.routingStatus_status)
            
  //           }
  //         }
  //         this.idle_Count = this.idleArr.length
  //         this.offQueue_Count = this.offqueueArr.length
  //         this.interacting_Count = this.interactingArr .length
  //       });
  //       this.spinnerService.hide();
  //       let cID = "1785542363"
  //       // let cID = UserData.customerId;
  //       let channelURL = "wss://xl2fggg4z7.execute-api.us-east-1.amazonaws.com/prod?customerID="+ cID
  //       this.queueDatafromChannel(channelURL);
  //     }
  //     request();
  //   // )

  // }


}
