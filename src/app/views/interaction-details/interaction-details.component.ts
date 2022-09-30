import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { utils } from '../../config';
import { EvaluationWorkspaceService } from '../evaluations/evaluation-workspace/evaluation-workspace.service';
import { HttpClient } from '@angular/common/http';
import { CommonMethods } from '../../common/common.components';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { InteractionService } from './interaction-details.service';
import { UserData } from '../../user';
import { environment } from '../../../environments/environment';
import { forkJoin } from 'rxjs';
import * as moment from 'moment';

declare var $: any;
declare var require: any
//import WaveSurfer from 'wavesurfer.js';
import WaveSurfer from 'wavesurfer.js/dist/wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.js'
import MarkersPlugin from 'wavesurfer.js/src/plugin/markers/index.js'
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js'
import { EvaluationWorkspaceNacdService } from '../evaluations/evaluation-workspace-nacd/evaluation-workspace-nacd.service';

@Component({
  selector: 'app-interaction-details',
  templateUrl: './interaction-details.component.html',
  styleUrls: ['./interaction-details.component.css']
})
export class InteractionDetailsComponent implements OnInit {
  items1: MenuItem[];
  tabMenuName: string = "Transcript";
  ws: any;
  audioUrl: string = 'null';
  localLang = 'english';
  convID: string = '';
  getTopicReport: any = []
  getTopicReportTime: any = []
  sentiment_data: any
  sentenceSentiment: any = null;
  sentimentBySentence_data: any;
  constructor(public evService: EvaluationWorkspaceService, private http: HttpClient,
    private commonMethods: CommonMethods, private activatedRoute: ActivatedRoute, private spinnerService: NgxSpinnerService,
    private interactionService: InteractionService, public ew_NACDservice: EvaluationWorkspaceNacdService) {

    this.commonMethods.dynamicBackgroundColorChange('default');
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['conversationid']) {
        // console.log("IF")
        this.convID = params['conversationid'];
      }
      else {
        // console.log("ELSE")
        this.convID = params['contactid'];
      }
    });
  }

  ngOnInit(): void {

    // this.items1 = [
    //   {
    //     label: '', command: (event) => {
    //       this.tabMenuName = "Transcript"
    //     }
    //   },
    //   {
    //     label: '', command: (event) => {
    //       this.tabMenuName = "Topics"
    //     }
    //   }
    // ];

    // this.evaluationTabValue();
    this.getReportObj();
  }
  //evaluation tabs
  evaluationTabs() {
    return new Promise((resolve, reject) => {
      this.ew_NACDservice.evaluationTabs().subscribe(
        (data: any) => {
          resolve(data);
        }, (err) => {
          reject(err)
        })
    })

  }
  // localLang:any;
  evaluationTabValue() {
    this.evaluationTabs().then((res) => {
      if (localStorage.getItem("language") != null && typeof (localStorage.getItem("language")) != 'undefined') {
        this.localLang = localStorage.getItem("language")
      }
      this.items1[0].label = res[this.localLang]['Transcript']
      this.items1[1].label = res[this.localLang]['Topics']
    }).catch((err) => {
      this.items1[0].label = 'Transcript'
      this.items1[1].label = 'Topics'
    })
  }
  /*Audio Interaction Player Functions ------------------------------------------------------------------------------------------- */
  refreshBtn(flag: boolean = true) {

    $('#play-btn,i').removeClass('fa-pause');
    $('#mute').find('i').removeClass('fa-volume-up fa-volume-off');
    $('#mute').find('i').toggleClass('fa-volume-up');
    $('#play-btn').attr("value", "play");
    if (flag) {
      this.audioPlayerInit();
    }
    else {
      // this.audioUrl = environment.uiUrl + '/' + 'assets/mp3/0917.mp3';
      if (this.audioEndpoint != null) {
        this.audioUrl = this.audioEndpoint;
      }
      if (this.audioEndpoint == null || this.report_data.ReportData.result.data.root == null) {
        this.audioUrl = environment.uiUrl + '/' + 'assets/mp3/0917.mp3';
      }
      this.audioPlayerInit();

    }

  }

// *********************************************************
  //playerDisplayCategoriesArr: any[] = [{name: 'Note Indicators', key: 'Note'},{name: 'ColorBy Channel', key: 'Color'}, {name: 'Sentiment Bar', key: 'Sentiment'}, {name: 'Topic tags', key: 'Topic'}];
  playerDisplayCategories: any[] = [{name: 'ColorBy Channel', key: 'Color', checked: true,}, {name: 'Sentiment Bar', key: 'Sentiment', checked: true,}, {name: 'Topic tags', key: 'Topic', checked: true,}];
  playerSelectedCategories:any[] = this.playerDisplayCategories
  //add this when conversation loads
  isAvailable = true;
  isTopics:boolean = true 
  checkPlayerValue(keyId,selectedKey: any, event){
    //console.log(keyId, selectedKey, event)
    if(keyId == 'Color'){
      $('.wavesurfer-region').toggle()
    }
    if(keyId == 'Note'){
      $('.wavesurfer-marker .flag-image').toggle()
    }
    if(keyId == 'Sentiment'){
      $('.wavesurfer-marker .sentimentMarker').toggle('fast',()=>{
        if($('wave').hasClass('noafter')){
          $('wave').removeClass('noafter');
        }
        else
        $('wave').addClass('noafter');
      })

    }
    if(keyId == 'Topic'){
      this.isTopics = event

      if($("#audio-spectrum").hasClass('autoHeight')){
        $("#audio-spectrum").removeClass('autoHeight')
        $(".evalDetailsBottom").css({'height': '250px'})
      }
      else{
        $("#audio-spectrum").addClass('autoHeight')
        $(".evalDetailsBottom").css({'height': this.hasAutoHeight})
      }
      $('.wavesurfer-marker .topicMarker').toggle()
    }
  }

  checkPlayerSpeed(speedId,speedKey: number, event){
    this.selectedIndex = speedKey;

    this.playbackIndex = speedId
    this.ws.setPlaybackRate(this.playbackIndex);
  }

// *********************************************************
  index: any;
  activeTab: MenuItem;
  regionsDataArr = [];
  NotesPlayerData: any = [];
  TopicsPlayerData: any = [];
  SentimentPlayerData:any = []
  conversid: string = '';
  addedValue: any;
  previousTopic: any
  nextTopic:any
  currentTopic:any
  previousTime: any
  nextTime:any
  currentTime:any
  imgWidth: number
  hasAutoHeight: any = '300px'
  localValue: number;
  disableMute: boolean = false; 
  playbackSpeed: Array<String> = ['0.5', '0.8', '1.0', '1.2', '1.5', '2.0'];
  playbackIndex: string = '1.0'
  selectedIndex: number = 2
  playRateSpeedSelected:any[] = this.playbackSpeed

  NotesData: any = [];
  selectedNoteIndex: any

  //Sentiment by sentence marker placement
  getSentimentPlayerData() {
    this.SentimentPlayerData = [];
    //console.log(this.SentimentPlayerData)
    if (this.audioUrl != '' && this.audioUrl != 'null' && this.audioUrl != environment.uiUrl + '/' + 'assets/mp3/0917.mp3') {
      //if(this.sentiment_data.ReportData == undefined){
        //if(this.sentiment_data?.ReportData?.result?.data?.root != null && this.sentenceSentiment != null){
        //console.log(this.sentiment_data, this.sentenceSentiment)
        if(this.sentiment_data.ReportData.result.data.root != null){
        this.sentenceSentiment.forEach((element: any) => {
        if(element.sentiment == 'POSITIVE'){
          element.color = '#285943'
        }
        else if(element.sentiment == 'NEGATIVE'){
          element.color = '#FC5130'
        }
        else if(element.sentiment == 'NEUTRAL'){
          element.color = '#D8D8D8'
        }
        //parseFloat(element.end_time) - (element.start_time)
        this.imgWidth = Math.round((parseFloat(element.end_time) - parseFloat(element.start_time)) * 100) / 100 
        let img = new Image(this.imgWidth, 15);
        let sentiByData: any = {};
        //img.src = "../assets/img/transparent.gif"
        img.src = "http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif"
        img.className = 'sentiment-image';
        img.style.backgroundColor = element.color
        sentiByData.markerElement = img
        sentiByData.time = parseFloat(element.start_time);
        sentiByData.color = 'rgba(216,216,216,0.26)';
        sentiByData.position = 'bottom';
        sentiByData.label = " "
        this.SentimentPlayerData.push(sentiByData);
      });
      }
    }
  }

  //Topics marker placement
  getTopicsPlayerData(){
    this.TopicsPlayerData = [];
    //console.log(this.TopicsPlayerData)
    this.addedValue = {}
    if(this.audioUrl != '' && this.audioUrl != 'null' && this.audioUrl != environment.uiUrl + '/' + 'assets/mp3/0917.mp3'){
      this.getTopicRandomColor()
      this.getTopicReportTime.forEach((element: any, index) => {
        //this.addedValue[element.time] = (this.addedValue[element.time] || 0) + 1
        
        let newarray=[]
        for(let i=index;i<this.getTopicReportTime.length;i++){
          if(element.topic.split(" |")[0] == this.getTopicReportTime[i].topic.split(" |")[0]
              && element.time == this.getTopicReportTime[i].time
          ){
            newarray.push({"time":element.time,"topic":element.topic.split("|")[0],"count":newarray.length+1})
          }
        }

        let addedCounterTime = Object.values(this.addedValue)
        let img = new Image(15, 15);
        let topics: any = {};
        img.src = "http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif"
        img.className = 'topic-image';
        img.style.backgroundColor = element.color
        topics.markerElement = img
        topics.time = parseFloat(element.time);
        topics.color = element.color;
        topics.position = 'bottom';
        //topics.label = element.topic
        //console.log(addedCounterTime)
        newarray.forEach((ele)=>{
          //console.log("COUNT",ele, ele.count)
          topics.label = ele.topic
        })
        this.TopicsPlayerData.push(topics);
      }); 
    }
  }

  getTopicRandomColor(){
    let colors = ["#256676", "#34F50E", "#941483", "#5EBF72", "#1932BF", "#A9E81A", "#BC0542", "#4AD9E1", "#713529", "#BFCD8E", "#3D4E92", "#C5D5F0", "#1C5F1E", "#FCC2FB", "#6108E8", "#F3D426", "#F365E7", "#3A91FB", "#F6BB86", "#997CFB", "#B77529", "#FF6B97", "#FD5917", "#4D4815", "#B97EAC"]
    let counter = 0;
    this.addedValue = {}
    this.getTopicReportTime.forEach((element,index) => {
      for(let i=index;i<this.getTopicReportTime.length;i++){
        if(element.topic.split(' |')[0].trim() == this.getTopicReportTime[i].topic.split(' |')[0].trim()){
          //console.log(element, element.color)
          if(element.color == undefined){
          //  element.code = arr[i].code = counter;
           element.color = this.getTopicReportTime[i].color = colors[counter];
           ++counter;
          }
          else{
            this.getTopicReportTime[i].color = element.color; 
          //  arr[i].code = element.code;
          }
        }
      }
    });
    //console.log(this.getTopicReportTime)
  }

  addMarker(options: any) {
    options.forEach((opt)=>{
    return this.ws.markers.add(opt);
    })
  }


  getRegions() {
    this.regionsDataArr = [];
    if(this.audioUrl != '' && this.audioUrl != 'null' && this.audioUrl != environment.uiUrl + '/' + 'assets/mp3/0917.mp3'){
      this.transcriptTab?.forEach((element: any) => {
        let regionsData: any = {}
        this.conversid = element.contact_id;
        regionsData.start = parseFloat(element.start_time);
        regionsData.end = parseFloat(element.end_time);
        regionsData.loop = false;
        regionsData.drag = false;
        if (element.channel == "Agent" || element.channel == "AGENT") {
          regionsData.color = 'hsla(196, 84%, 56%, 1)'//"#30BCED";
        }
        else if (element.channel == "Customer" || element.channel == "CUSTOMER") {
          regionsData.color =  'hsla(139, 53%, 74%, 1)'  //"#98DFAF";
        }
        this.regionsDataArr.push(regionsData);
      });
    }
} 

addTopicMarker(){
  if(this.getTopicReportTime[0]?.topic == 'N/A'){
    //this.playerSelectedCategories = [{name: 'ColorBy Channel', key: 'Color'}, {name: 'Sentiment Bar', key: 'Sentiment'}];
    $("#audio-spectrum").addClass('sized')
    $(".evalDetailsBottom").css({'height': '280px'})
    return false;
  }
  else{
    this.addMarker(this.TopicsPlayerData)
    //this.playerSelectedCategories = [{name: 'ColorBy Channel', key: 'Color'}, {name: 'Sentiment Bar', key: 'Sentiment'}, {name: 'Topic tags', key: 'Topic'}];
    $("#audio-spectrum").removeClass('sized')
    $(".evalDetailsBottom").css({'height': '250px'})
  }
}

addSentimentMarker(){
  if(this.sentiment_data?.ReportData?.result?.data?.root != null){
    this.addMarker(this.SentimentPlayerData)
  }
  else {
    //console.log("noafter should add")
   $('wave').addClass('noafter');
   return false
  }
}

getVolumeSlider(){
  let volumeSlider: HTMLElement = document.querySelector("#volumeSlider") as HTMLElement
  const handleVolumeChange = e => {
    // Set volume as input value divided by 100
    // NB: Wavesurfer only excepts volume value between 0 - 1
    const volume:any = e.target.value / 100
    this.ws.setVolume(volume)
    // Save the value to local storage so it persists between page reloads
    localStorage.setItem("audio-player-volume", volume)
  }
  const setVolumeFromLocalStorage = () => {
    // Retrieves the volume from local storage, or falls back to default value of 50
    let localValue = localStorage.getItem("audio-player-volume")
    let volume:any = this.localValue * 100 || 50
    volumeSlider.innerHTML = volume
  }
  window.addEventListener("load", setVolumeFromLocalStorage)
  volumeSlider.addEventListener("input", handleVolumeChange)

  $("#mute").hover(function(){
    $(".volume-slider").toggle()
    //this.ws.getVolume()
  })

  const currentTime = document.querySelector("#currentTime")
  const totalDuration = document.querySelector("#totalDuration")    

  const formatTimecode = seconds => {
    return new Date(seconds * 1000).toISOString().substr(11, 8)
  }
      // Wavesurfer event listeners
  this.ws.on("ready", () => {
    // Set wavesurfer volume
    //this.ws.setVolume(volumeSlider.value / 100)
    // Set audio track total duration
    const duration = this.ws.getDuration()
    totalDuration.innerHTML = formatTimecode(duration)
    //reset time to 0 when new convId selected
    currentTime.innerHTML = formatTimecode(0)
  })
  // Sets the timecode current timestamp as audio plays
  this.ws.on("audioprocess", () => {
    const time = this.ws.getCurrentTime()
    currentTime.innerHTML = formatTimecode(time)
    $('.play-1x').on('click', function () {
      console.log("playback 1", this.ws)
      //this.ws.setPlaybackRate(1);
    });
  })

}

// doublePlaybackSpeed(playbackIndex) {
//   if (playbackIndex === 5) {
//    this.playbackIndex = 0;
//    this.ws.setPlaybackRate(this.playbackSpeed[this.playbackIndex]);
//   } else {
//    this.playbackIndex = playbackIndex + 1;
//    this.ws.setPlaybackRate(this.playbackSpeed[this.playbackIndex]);
//   }
//  }


  audioPlayerInit() {
    if(this.audioUrl != '' && this.audioUrl != 'null' ){
    if (typeof (this.ws) == 'object' && typeof (this.ws.destroy) == 'function') {
      this.ws.destroy();
    }
    
    this.getRegions();
    this.getTopicsPlayerData();
    this.getSentimentPlayerData();

    this.ws = WaveSurfer.create({
      container: '#audio-spectrum',
      waveColor: '#525252',
      progressColor: '#424232',
      backend: 'MediaElement',
      autoCenter: true,
      partialRender: false,
      removeMediaElementOnDestroy: false,
      height: 140,
      barHeight: 0.5, // the height of the wave
      barRadius: 2,
      barWidth: 1,
      barGap: null,
      responsive: true,
      fluid: true,
      plugins: [
        TimelinePlugin.create({
          container: '#wave-timeline'
        }),
        CursorPlugin.create({
          showTime: true,
          opacity: 1,
          customShowTimeStyle: {
            'background-color': '#000',
            color: '#fff',
            padding: '0px',
            'font-size': '12px',
          }
        }),
        RegionsPlugin.create({
          regions: this.regionsDataArr,
          //attributes: {label:"Tag1"}
        }),
        MarkersPlugin.create({
          //markers: this.NotesPlayerData,
        }),
      ],
    });

    if (typeof (this.ws) == 'object') {
      let resAudioLoad = this.ws.load(this.audioUrl);
      //Add sentiment by sentence data
      this.addSentimentMarker()
      //Add topic data
      this.addTopicMarker()
      
      this.getVolumeSlider()

      $(".flag-image").parent('div').siblings('div').addClass("noteMarkerDiv")
      $(".sentiment-image").parent('div').addClass("sentimentMarker")
      $(".sentiment-image").parent('div').siblings('div').addClass("sentimentMarkerDiv")
      $(".topic-image").parent('div').addClass("topicMarker")
      $(".topic-image").parent('div').siblings('div').addClass("topicMarkerDiv")
      $(".topicMarkerDiv").parent('marker').addClass("topic-wavesurfer-marker")
      $(".topicMarker").hover(function() {
        $(this).toggleClass("indexActive")
        $(this).parent( ".topic-wavesurfer-marker" ).toggleClass("overflow-show");
        //$(this).find("span").toggleClass("topic-span")
          // .next()
          //   .stop( true, true )
          //   .slideToggle();
      })
      // if (resAudioLoad.xhr.status != 200 && resAudioLoad.xhr.status != 206 && resAudioLoad.xhr.status != 304) {
      //   this.audioUrl = utils.uiUrl + '/' + 'assets/mp3/0917.mp3';
      //   this.ws.load(this.audioUrl)
      //   // this.commonMethods.addToastforlongtime(false, 'Access Denied')
      // }
    }
    // reset play icon after -- Finished playing
    if(this.audioUrl != '' && this.audioUrl != 'null') {
      this.ws.on('finish', function() {
        $('#play-btn,i').removeClass('fa-pause');
        $('#play-btn').attr("value", "play");
        //console.log('Finished playing');
      });
    }
  }
  
  }

  playandpause() {
    if (typeof (this.ws) == 'object' && typeof (this.ws.play) == 'function' && typeof (this.ws.pause) == 'function') {
      $('#play-btn').find('i').toggleClass('fa-pause');
      if ($('#play-btn').attr("value") == "play") {
        $('#play-btn').attr("value", "pause");
        this.ws.play();
      } else {
        $('#play-btn').attr("value", "play");
        this.ws.pause();
      }
    }
  }


  skipForward() {
    if (typeof (this.ws) == 'object' && typeof (this.ws.skipForward) == 'function') {
      this.ws.skipForward(10);
    }
  }
  skipBackward() {
    if (typeof (this.ws) == 'object' && typeof (this.ws.skipBackward) == 'function') {
      this.ws.skipBackward(10);
    }
  }

  volumeChange() {
    const volumeSlider = document.querySelector("#volumeSlider")
    if (typeof (this.ws) == 'object' && typeof (this.ws.toggleMute) == 'function') {
      $('#mute').find('i').toggleClass('fa-volume-up fa-volume-off');
      this.ws.toggleMute();
      const isMuted = this.ws.getMute()
      
      if (isMuted) {
        // volumeIcon.src = "assets/icons/mute.svg"
        //volumeSlider.disabled = true
        this.disableMute = true
      } else {
        // volumeSlider.disabled = false
        // volumeIcon.src = "assets/icons/volume.svg"
        this.disableMute = false
      }
    }
  }
  
  getReportObj(){
    this.spinnerService.show();
    this.getTranscriptData();
    const mstr = JSON.parse(localStorage.getItem("mstrAuthToken"));
    let Obj1 = {
      customerId: UserData.customerId,
      cookie: mstr['cookie'],
      conversationid: this.convID,
      ReportNo: "1",
      X_MSTR_AuthToken: mstr['authToken']
    }
    let Obj2 = {
      customerId: UserData.customerId,
      cookie: mstr['cookie'],
      conversationid: this.convID,
      ReportNo: "2",
      X_MSTR_AuthToken: mstr['authToken']
    }
    let Obj3 = {
      customerId: UserData.customerId,
      cookie: mstr['cookie'],
      conversationid: this.convID,
      ReportNo: "3",
      X_MSTR_AuthToken: mstr['authToken']
    }
    const Report1 = this.interactionService.GetReportData(Obj1);
    const Report2 = this.interactionService.GetReportData(Obj2);
    const Report3 = this.interactionService.GetReportData(Obj3);
    forkJoin([Report1,Report2,Report3]).subscribe(
      (data:any)=>{
          this.GetReportData(data[0]);
          this.GetReportDataTopic(data[1]);
          this.GetReportDataSentiment(data[2]);
          this.spinnerService.hide();
      },
      (error)=>{
        console.log(error);
        this.spinnerService.hide();
      }
    )
  }
  
  report_data: any;
  audioEndpoint: string = null;
  topic_report: any;
  topicsTitle: any;
  mstrToken: any;
  GetReportData(data:any) {
    this.report_data = data;
    if (this.report_data.ReportData.result.data.root != null) {
      this.audioEndpoint =
        this.report_data.ReportData.result.data.root.children[0].children[0].children[0].children[0].children[0].element.name;
      this.getSignedURL(this.audioEndpoint);
    }
    //this.refreshBtn(false);
    //this.getTranscriptData();
  }

  GetReportDataTopic(data:any) {
    let topicData = [];
    this.topic_report = data;
    if (this.topic_report.ReportData.result.data.root != null) {
      this.topicsTitle = this.topic_report.ReportData.result.data.root.children[0].children[0].children
      this.getTopicReport = this.topic_report.ReportData.result.data.root.children[0].children[0].children;
      this.getTopicReportTime = topicData;
      //console.log(this.getTopicReport, this.getTopicReportTime)
          this.getTopicReport.forEach(topic => {
            topic.children.forEach(topicTime => {
                const topicDetail = {
                  time: topicTime.element.name,
                  topic: topic.element.name
                }
                topicData.push(topicDetail);
                topicData.sort(this.commonMethods.compareValues('time'))
            });
          });
    }
  }

  
  agentSentiment: any = null;
  customerSentiment: any = null;
  GetReportDataSentiment(data:any) {
    this.sentiment_data = data
    if (this.sentiment_data.ReportData.result.data.root != null) {
      if(this.sentiment_data.ReportData.result.data.root.children[0].children[0] != undefined){
        this.agentSentiment = this.sentiment_data.ReportData.result.data.root.children[0].children[0].children[0].element.name.toLowerCase();
      }
      if(this.sentiment_data.ReportData.result.data.root.children[0].children[1] != undefined){
        this.customerSentiment = this.sentiment_data.ReportData.result.data.root.children[0].children[1].children[0].element.name.toLowerCase();
      }

    //sentiment by sentence
    let sentimentBy_Data = [];
    if(this.sentiment_data.ReportData.result.data.root.children[0].children[0] != undefined){
      this.sentimentBySentence_data = this.sentiment_data.ReportData.result.data.root.children[0].children
      this.sentenceSentiment = sentimentBy_Data
      //console.log(this.sentenceSentiment)
      this.sentimentBySentence_data.forEach(item => {
        item.children.forEach(sentiItem => {
          if(sentiItem.children != null) {
            const sentimentDetail = {
              sentiment: sentiItem.element.name,
              start_time: sentiItem.children[0].element.name,
              end_time: sentiItem.children[0].children[0].element.name
            }
            sentimentBy_Data.push(sentimentDetail);
          }
            //sentimentBy_Data.sort(this.commonMethods.compareValues('start_time'))
        });
      });
    }
    }
  }

  transcriptTab: any = [];
  getTranscriptData() {
    this.ew_NACDservice.getTranscribeData(this.convID).subscribe(
      (data: any) => {
        if(data[0]?.from_user_emailid==undefined) {
          this.transcriptTab = data.sort(this.commonMethods.compareValues('start_time'));
        } else {
          this.transcriptTab = data;
          this.transcriptTab.forEach(element => {
            // element.start_time = this.datePipe.transform(element.start_time, 'MM/dd/yyyy hh:mm a');
            element.start_time = moment(element.start_time).format("MM/dd/yyyy hh:mm a");
          });
        }
      },
      (error) => {
        console.log(error);
        this.transcriptTab = [];
        this.spinnerService.hide();
      }
    )
  }

  getSignedURL(URL) {
    // console.log("Signed URL Invoke")
    var regExp = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (regExp.test(URL)) {
      this.ew_NACDservice.getEvaluateObj(URL).subscribe(
        (data: any) => {
          //  console.log("URL",data);
          this.audioUrl = data.url
          this.refreshBtn();
        }
      )
    }

  }

  findTopic_Audio(topic) {
    // if (typeof (this.ws) == 'object') {
    //   this.ws.setCurrentTime(topic.startTime);
    // }
    if (typeof (topic.startTime) == 'string') {
      topic.startTime = parseInt(topic.startTime.replace('s', ''))
    }
    if (typeof (this.ws) == 'object') {
      this.ws.setCurrentTime(topic.startTime);
    }
  }

  trancriptSF(time) {
    if (typeof (time) == 'string') {
      time = parseInt(time.replace('s', ''))
    }
    if (typeof (this.ws) == 'object') {
      this.ws.setCurrentTime(time);
    }
  }



}
