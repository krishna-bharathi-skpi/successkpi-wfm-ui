// new interaction .ts

import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var require: any
import WaveSurfer from 'wavesurfer.js/dist/wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.js'
import MarkersPlugin from 'wavesurfer.js/src/plugin/markers/index.js'
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js'
// let WaveSurfer = require('../../../../assets/audioscript/wavesurfer.js');
// let TimelinePlugin = require('../../../../assets/audioscript/plugin/wavesurfer.timeline.js');
// let CursorPlugin = require('../../../../assets/audioscript/plugin/wavesurfer.cursor.js');
import { utils } from '../../../config';
import { MenuItem } from 'primeng/api';
import { EvaluationWorkspaceService } from '../evaluation-workspace/evaluation-workspace.service';
import { CommonMethods } from '../../../common/common.components';
import { UserData } from '../../../user';
import { InteractionService } from '../../interaction-details/interaction-details.service';
import { ActionsService } from '../../playbooks/actions/actions.service';
import { EvaluationFormsService } from '../evaluation-forms/evaluation-forms.service';
import { MstrTokenService } from '../../../services/mstrtoken.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { KeyQuestionsService } from '../../analyze/key-questions/key-questions.service';
import { InteractionsService } from './new-interaction.service';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { EvaluationWorkspaceNacdService } from '../evaluation-workspace-nacd/evaluation-workspace-nacd.service';

declare var microstrategy: any;
@Component({
  selector: 'app-new-interactions',
  templateUrl: './new-interactions.component.html',
  styleUrls: ['./new-interactions.component.css']
})
export class NewInteractionsComponent implements OnInit {
  audioUrl: string = 'null';
  ws: any;
  items1: MenuItem[];
  tabMenuName: string = "Transcript";
  handleDetails: any = [];
  isAudioPlayerShow: boolean = true;
  isInteractionGrid: boolean = true;
  mstrAuthToken: any;
  subscription_DossierID: Subscription;
  subscription_ValidateReportID: Subscription;
  subscription_mstrValidToken: Subscription;

  sentiment_data: any
  sentenceSentiment: any = null;
  sentimentBySentence_data: any;

  constructor(public evService: EvaluationWorkspaceService, private commonMethods: CommonMethods,
    private interactionService: InteractionService, private actionsService: ActionsService, private evaluationService: EvaluationFormsService,
    private mstrTokenService: MstrTokenService, private spinnerService: NgxSpinnerService, public keyQuestionsService: KeyQuestionsService, public inter_Service: InteractionsService, public ew_NACDservice: EvaluationWorkspaceNacdService) {
    this.items1 = [
      {
        label: 'Transcript', command: (e) => {
          this.tabMenuName = "Transcript"
          e.originalEvent = this.handleChange(e.item)
        }
      },
      {
        label: 'Topics', command: (e) => {
          this.tabMenuName = "Topics"
          e.originalEvent = this.handleChange(e.item)
        }
      }
    ];
    this.getEvalDDL();
    this.getInteractionDossiers();
    this.commonMethods.dynamicBackgroundColorChange('default');
  }

  ngOnInit(): void {
    this.mstrAuthToken = JSON.parse(localStorage.getItem("mstrAuthToken"));
    this.handleDetails = [
      {
        handleTime: "N/A",
        callDuration: "N/A",
        talkTime: "N/A",
        waitTime: "N/A",
        acwTime: "N/A",
        holdTime: "N/A"
      }
    ]
    this.interactionDetails = [
      {
        eval_room: "N/A",
        eval_user: "N/A",
        eval_status: "N/A",
        agent: "N/A"
      }
    ]
  }

  refreshBtn(flag: boolean = true) {

    $('#play-btn,i').removeClass('fa-pause');
    $('#mute').find('i').removeClass('fa-volume-up fa-volume-off');
    $('#mute').find('i').toggleClass('fa-volume-up');
    $('#play-btn').attr("value", "play");
    if (flag) {
      this.audioPlayerInit();
    }
    else {
      this.audioUrl = environment.uiUrl + '/' + 'assets/mp3/0917.mp3';
      this.audioPlayerInit();
    }
  }

  playerDisplayCategories: any[] = [{name: 'ColorBy Channel', key: 'Color'}, {name: 'Sentiment Bar', key: 'Sentiment'}, {name: 'Topic tags', key: 'Topic'}];
  playerSelectedCategories:any[] = this.playerDisplayCategories

  // playRateSpeed: any[] = [
  //   { key: "0.5", code: "half-x" },
  //   { key: "0.8", code: "one-eight-x" },
  //   { key: "1.0", code: "one-x" },
  //   { key: "1.2", code: "one-two-x" },
  //   { key: "1.5", code: "one-half-x" },
  //   { key: "2.0", code: "double-x" }
  // ];
  

  isTopics:boolean = true 
  checkPlayerValue(keyId,selectedKey: any, event){
    //console.log(keyId, selectedKey, event)
    if(keyId == 'Color'){
      $('.wavesurfer-region').toggle()
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
playbackIndex: string
selectedIndex: number;
playRateSpeedSelected:any[] = this.playbackSpeed

  handleChange(e) {
    this.activeTab = e;

    if($("#audio-spectrum").hasClass('autoHeight')){
      $(".evalDetailsBottom").css({'height': this.hasAutoHeight})
      //$("::ng-deep.evalDetailsBottom").attr('style', 'height: ' + this.hasAutoHeight + ' !important');
      $(".evalDetailsBottom").addClass('autoHeight1')
    }
    else{
      $(".evalDetailsBottom").removeClass('autoHeight1')
    }  
  }

//Sentiment by sentence marker placement
getSentimentPlayerData() {
  this.SentimentPlayerData = [];
  //console.log(this.sentiment_data)
  if (this.audioUrl != '' && this.audioUrl != 'null' && this.audioUrl != environment.uiUrl + '/' + 'assets/mp3/0917.mp3') {
    //if(this.sentiment_data.ReportData == undefined){
      if(this.sentiment_data?.ReportData?.result?.data?.root != null){
        //console.log(this.sentiment_data)
        if(this.sentiment_data != null){
        // console.log(
        //   this.sentenceSentiment,
        //   this.sentiment_data?.ReportData?.result?.data?.root != null, this.sentenceSentiment != null,
        //   this.sentiment_data?.ReportData?.result?.data?.root != null && this.sentenceSentiment != null
        // )
      this.sentenceSentiment?.forEach((element: any) => {
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
}

  //Topics marker placement
  getTopicsPlayerData(){
    this.TopicsPlayerData = [];
    //console.log(this.TopicsPlayerData)
    this.addedValue = {}
    //console.log(this.getTopicReportTime)
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

        let img = new Image(15, 15);
        let topics: any = {};
        img.src = "http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif"
        img.className = 'topic-image';
        img.style.backgroundColor = element.color
        topics.markerElement = img
        topics.time = parseFloat(element.time);
        topics.color = element.color;
        topics.position = 'bottom';
        newarray.forEach((ele)=>{
          topics.label = ele.topic
        })
        this.TopicsPlayerData.push(topics);
      }); 
    }
    //console.log(this.TopicsPlayerData)
  }

  addMarker(options: any) {
    options.forEach((opt)=>{
    return this.ws.markers.add(opt);
    })
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
  }  

  getRegions() {
    this.regionsDataArr = [];
    if (this.audioUrl != '' && this.audioUrl != 'null' && this.audioUrl != environment.uiUrl + '/' + 'assets/mp3/0917.mp3') {
      this.transcriptTab.forEach((element: any) => {
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
          regionsData.color = 'hsla(139, 53%, 74%, 1)'  //"#98DFAF";
        }
        this.regionsDataArr.push(regionsData);
      });
    }
  }

  addTopicMarker(){
    if(this.getTopicReportTime[0].topic == 'N/A'){
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
    })

    //change playback speed
    // $('.play-quarterx').on('click', function () {
    //   this.ws.setPlaybackRate(0.25);
    // });
    // $('.play-halfx').on('click', function () {
    //   this.ws.setPlaybackRate(0.5);
    // });
    // $('.play-1x').on('click', function () {
    //   this.ws.setPlaybackRate(1);
    // });
    // $('.play-2x').on('click', function () {
    //   this.ws.setPlaybackRate(2);
    // });

//     //new function for speed audio	
// 	var speedlist = document.getElementById("speedlist");
// 	speedlist.addEventListener("change",changeSpeed);
	
//     function changeSpeed(event){
// 		audio.playbackRate = event.target.value;
// 	} 
// }

// $('.play-1x').on('click', function () {
//   console.log("playback 1", this.ws)
//   this.ws.setPlaybackRate(1);
// });

  }

// doublePlaybackSpeed(playbackIndex) {
//   if (playbackIndex === 5) {
//    this.playbackIndex = '0';
//    this.ws.setPlaybackRate(this.playbackSpeed[this.playbackIndex]);
//   } else {
//    this.playbackIndex = playbackIndex + 1;
//    this.ws.setPlaybackRate(this.playbackSpeed[this.playbackIndex]);
//   }
//  }

  audioPlayerInit() {
    if (this.audioUrl != '' && this.audioUrl != 'null' && this.audioUrl != environment.uiUrl + '/' + 'assets/mp3/0917.mp3') {
        // console.log(this.ws);
        if (typeof (this.ws) == 'object' && typeof (this.ws.destroy) == 'function') {
        // if(this.ws.destroy!=null ) {
          this.ws.destroy();
        // }
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
            markers: this.NotesPlayerData,
          }),
        ],
      });

      if (typeof (this.ws) == 'object' && this.audioUrl.trim() != "") {
        let resAudioLoad = this.ws.load(this.audioUrl);

        //Add sentiment by sentence data
      this.addSentimentMarker()
      //Add topic data
      this.addTopicMarker()

      this.getVolumeSlider()
      //this.playbackRate()

      $(".sentiment-image").parent('div').addClass("sentimentMarker")
      $(".sentiment-image").parent('div').siblings('div').addClass("sentimentMarkerDiv")
      $(".topic-image").parent('div').addClass("topicMarker")
      $(".topic-image").parent('div').siblings('div').addClass("topicMarkerDiv")
      $(".topicMarkerDiv").parent('marker').addClass("topic-wavesurfer-marker")
      $(".topicMarker").hover(function() {
        $(this).toggleClass("indexActive")
        $(this).parent( ".topic-wavesurfer-marker" ).toggleClass("overflow-show");
      })
        // if (resAudioLoad.xhr.status != 200 && resAudioLoad.xhr.status != 206 && resAudioLoad.xhr.status != 304) {
        //   this.audioUrl = environment.uiUrl + '/' + 'assets/mp3/0917.mp3';
        //   this.ws.load(this.audioUrl)
        //   // this.commonMethods.addToastforlongtime(false, 'Access Denied')
        // }
      }
      // reset play icon after -- Finished playing
      if (this.audioUrl != '' && this.audioUrl != 'null') {
        this.ws.on('finish', function () {
          $('#play-btn,i').removeClass('fa-pause');
          $('#play-btn').attr("value", "play");
          //console.log('Finished playing');
        });
        
      }
    }
    else {
        if (typeof (this.ws) == 'object' && typeof (this.ws?.destroy) == 'function' && this.ws?.destroy !=null) {
        // if(this.ws.destroy!=null ) {
          setTimeout(() => {
            this.ws.destroy();
          }, 2500);
        // }
      }
      // if(this.ws && this.ws.destroy() ) {
      //   this.ws.destroy();
      // }
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

  // GetDoosierid and project id from config 
  DossierId: any = "";
  projectID: any = "";
  getDossierID() {
    return new Promise((resolve, reject) => {
      this.spinnerService.show();
      this.subscription_DossierID = this.keyQuestionsService.getMstrConfig().subscribe(
        (data: any) => {
          // console.log(data)
          this.DossierId = typeof (data.interaction_dossierId) != 'undefined' ? data.interaction_dossierId : null;
          this.projectID = data.project_id;
          this.spinnerService.show();
          resolve(data)
        },
        (error) => {
          reject(error);
          console.log(error);
          this.spinnerService.hide();
          this.commonMethods.addToastforlongtime(false, "Invalid Dossier URL")
        }
      )
    })
  }

  getInteractionDossiers() {
    this.getDossierID().then((res) => {
      this.validateMstrReportId().then((validIdRes: any) => {
        if (validIdRes['isSuccess'].toLowerCase() == 'success') {
      // this.getmstrInstanceID().then(res1 =>{
      //   this.sendDataTOmstr().then(res12 =>{
      this.mstrValidToken().then(() => {
        this.interactionTable();
      })
      //   })
      // })
      }
    })
    })
  }

  // Dossier table for interactions
  currentContact: string = "";
  selectedConvId: any = [];
  async interactionTable() {
    try {
      const projectID = this.projectID != "" ? this.projectID : null;
      const dossierID = this.DossierId != "" ? this.DossierId : null;
      const mstrIdToken = JSON.parse(localStorage.getItem("mstrIdToken"))
      const projectUrl = environment.mstr_Url + projectID;
      const dossierUrl = projectUrl + '/' + dossierID;
      this.spinnerService.show();
      const idToken = mstrIdToken['x-mstr-identitytoken'];
      if (mstrIdToken['x-mstr-identitytoken'] == undefined) {
        this.spinnerService.hide();
      }
      setTimeout(() => {
        this.spinnerService.hide();
      }, 10000);
      const getDossierDOMobj = document.getElementById("dossierContainer1");
      if (typeof (getDossierDOMobj) != 'undefined' && getDossierDOMobj != null && getDossierDOMobj.id == 'dossierContainer1') {
        await this.interactionService.dossierPromptWorkflow(idToken, projectID, dossierID, null).then(jsonRes => {

      microstrategy.dossier.create({
        placeholder: document.getElementById("dossierContainer1"),
        url: dossierUrl,
        // instance: this.dossierInstanceID,
        instance: jsonRes['instance'],
        enableResponsive: false,
        errorHandler: function () {
          this.spinnerService.hide()
        }.bind(this),
        dockedFilter: {
          dockedPosition: "left",
          canClose: false,
          dockChangeable: false,
          isDocked: true
        },
        enableCustomAuthentication: true,
        customAuthenticationType: microstrategy.dossier.CustomAuthenticationType.AUTH_TOKEN,
        getLoginToken: function () {
          return new Promise(function (resolve, reject) {
            resolve(jsonRes['authToken'])
          }).then(function (identityToken) {
            return jsonRes['authToken'];
          })
        },
      }).then(function (dossier) {
        this.spinnerService.hide();
        var selectHandler = function (e) {
          var selectionName = null;
          let selectionObjConvId: any;
          for (var i = 0; i < e.graphics.length; i++) {
            var selection = e.graphics[i];
            //single attribute selection:						
            selectionName = selection[0].n;
            if (selectionName != 'Conversation ID') {
              return false
            }
            // this.spinnerService.show();
            var selectionValue = selection[0].vid;
            var selectionText = selection[0].v;
            selectionObjConvId = {
              name: selectionName,
              value: selectionValue,
              text: selectionText
            }
          }
          this.spinnerService.show();
          this.currentContact = selectionObjConvId?.text;
          this.getTranscribeData(this.currentContact);
          this.getEvalTopic(this.currentContact);
          this.gethandleDetails(this.currentContact);
          this.getInteractionDetails(this.currentContact);
          if(this.currentContact != null && this.currentContact != undefined && this.currentContact != "") {
            this.selectedConvId.push(this.currentContact);
          }
          this.selectedConvId = this.selectedConvId.filter((v, i, a) => a.findIndex(t => t == v) === i);

        }.bind(this);

        dossier.registerEventHandler(
          "onGraphicsSelected",
          selectHandler);
      }.bind(this)).finally(function () {
        setTimeout(() => {
          this.spinnerService.hide();
        }, 10000);
      }.bind(this));
    });
    }
    }
    catch (e) {
      console.log(e);
      this.spinnerService.hide();
    }
  }

  transcriptTab: any = [];
  getTranscribeData(conversationID) {
    this.ew_NACDservice.getTranscribeData(conversationID).subscribe(
      (data: any) => {
        // console.log(data)
        if(data[0]?.from_user_emailid==undefined) {
          this.transcriptTab = data.sort(this.commonMethods.compareValues('start_time'));
        } else {
          this.transcriptTab = data;
          this.transcriptTab.forEach(element => {
            // element.start_time = this.datePipe.transform(element.start_time, 'MM/dd/yyyy hh:mm a');
            element.start_time = moment(element.start_time).format("MM/dd/yyyy hh:mm a");
          });
        }
      }, (error) => {
        this.spinnerService.hide();
        this.transcriptTab = [];
        console.log(error);
        // this.commonMethods.addToastforlongtime(false, error.error);
      }
    )
  }

  audioEndpoint: any = null;
  getTopicReport: any= [];
  getTopicReportTime: any= [];
  getEvalTopic(conversationID) {
    let params = {
      customerId: UserData.customerId,
      cookie: this.mstrAuthToken['cookie'],
      conversationid: conversationID,
      ReportNo: "6",
      X_MSTR_AuthToken: this.mstrAuthToken['authToken']
    }
    let params1 = {
      customerId: UserData.customerId,
      cookie: this.mstrAuthToken['cookie'],
      conversationid: conversationID,
      ReportNo: "9",
      X_MSTR_AuthToken: this.mstrAuthToken['authToken']
    }
    
    let topicData = [];
    this.refreshBtn(false)
    this.interactionService.GetReportData(params).subscribe(
      (data: any) => {
        // console.log(data)
        if (data.ReportData.result.data.root != null) {
          this.audioEndpoint = data.ReportData.result.data.root.children[0].children[0].children[0].children[0].children[0].children[0].children[0].element.name;
          this.getTopicReport = data.ReportData.result.data.root.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children;
          this.getTopicReportTime = topicData;
          //this.getTopicReport = this.getTopicReport.sort(this.commonMethods.compareValues('time'))
          // console.log(this.audioEndpoint)
          this.getSignedURL(this.audioEndpoint);
          
          this.getTopicReportTime = topicData;
          this.getTopicReport.forEach(topic => {
            topic.children.forEach(topicTime => {
                const topicDetail = {
                  time: topicTime.element.name,
                  topic: topic.element.name.split(' |')[0]
                }
                topicData.push(topicDetail);
                topicData.sort(this.commonMethods.compareValues('time'))
            });
          });
        }
      },
      (error) => {
        this.spinnerService.hide();
        console.log(error);
      }
    )

    let sentimentBy_Data = [];
    this.interactionService.GetReportData(params1).subscribe(
      (data: any) => {
        if (data.ReportData.result.data.root != null) {
          this.sentiment_data = data
          //if(this.sentiment_data.ReportData.result.data.root.children[0].children[0] != undefined){
            this.sentimentBySentence_data = data.ReportData.result.data.root.children[0].children
            //console.log(this.sentimentBySentence_data)
            this.sentimentBySentence_data.forEach(item => {
              item.children.forEach(sentiItem => {
                  const sentimentDetail = {
                    sentiment: sentiItem.element.name,
                    start_time: sentiItem.children[0].element.name,
                    end_time: sentiItem.children[0].children[0].element.name
                  }
                  sentimentBy_Data.push(sentimentDetail);
                  this.sentenceSentiment = sentimentBy_Data
                  //topicData.sort(this.commonMethods.compareValues('time'))
              });
            });
          // }
        }
        // else{
        //   this.spinnerService.hide();
        // }
        // this.refreshBtn(false)
        this.getSignedURL(this.audioEndpoint);
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
      }
    )
  }

  handleData: any;
  gethandleDetails(conversationID) {
    let params = {
      customerId: UserData.customerId,
      cookie: this.mstrAuthToken['cookie'],
      conversationid: conversationID,
      ReportNo: "5",
      X_MSTR_AuthToken: this.mstrAuthToken['authToken']
    }
    let handleParams = {};
    this.handleDetails = [];
    handleParams = {
      handleTime: "0",
      callDuration: "0",
      talkTime: "0",
      waitTime: "0",
      acwTime: "0",
      holdTime: "0"
    }
    this.handleDetails.push(handleParams)
    this.spinnerService.show();
    this.interactionService.GetReportData(params).subscribe(
      (data: any) => {
        // console.log(data)
        if (data.ReportData.result.data.root != null) {
          // this.handleData = data.ReportData.result.data.root.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].metrics;
          // console.log(this.handleData)
          let val = data.ReportData.result.data.root.children[0].children[0].children[0].children
          this.handleDetails = [];
          val.forEach(element => {
            this.handleData = element.children[0].children[0].children[0].children[0].metrics
            // console.log(this.handleData)
            handleParams = {};
            handleParams = {
              handleTime: this.handleData['Handle Time'].fv,
              callDuration: this.handleData['Interaction Duration'].fv,
              talkTime: this.handleData['Talk Time'].fv,
              waitTime: this.handleData['Wait Time'].fv,
              acwTime: this.handleData['ACW Time'].fv,
              holdTime: this.handleData['Hold Time'].fv,
            }
            this.handleDetails.push(handleParams)
          });

          // console.log(this.handleDetails)
          this.spinnerService.hide();
        }
        else {
          this.handleDetails = [];
          let params = {
            handleTime: "N/A",
            callDuration: "N/A",
            talkTime: "N/A",
            waitTime: "N/A",
            acwTime: "N/A",
            holdTime: "N/A"
          }
          this.handleDetails.push(params)
          this.spinnerService.hide();
        }
      },
      (error) => {
        this.spinnerService.hide();
        console.log(error);
      }
    )
  }

  getSignedURL(URL) {
    var regExp = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (regExp.test(URL)) {
      this.ew_NACDservice.getEvaluateObj(URL).subscribe(
        (data: any) => {
          this.audioUrl = data.url
          setTimeout(() => {
            //console.log("setTimeOut called")
            this.refreshBtn(true);
          }, 2500);
        }
      )
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

  EvalformDDL: any = []
  getEvalDDL() {
    this.actionsService.getEvaluationItems().subscribe(
      (data: any) => {
        this.EvalformDDL = data;
      }, (error) => {
        console.log(error.error)
        this.commonMethods.addToastforlongtime(false, error.error)
      })
    this.userEvaluatorDDL();
  }

  usersDDL: any = [];
  userEvaluatorDDL() {
    this.evaluationService.userEvaluatorDDL().subscribe(
      (data: any) => {
        this.usersDDL = data;
      },
      (error) => {
        console.log(error);
      }

    )
  }

   reloadInteractions() {
    this.mstrTokenService.refreshMSTRSession();
  //   this.spinnerService.show();
  //   this.mstrTokenService.ReloadWorkspace().subscribe(
  //     (data: any) => {
  //       // console.log(data)
  //       this.mstrTokenService.recreateMSTRsession(data);
  //       this.spinnerService.hide();
  //       window.location.reload();

  //     },
  //     (error) => {
  //       console.log(error);
  //       this.spinnerService.hide();
  //     }
  //   )
   }

  interactionDetails: any = [];
  getInteractionDetails(convID) {
    this.interactionDetails = [
      {
        eval_room: "N/A",
        eval_user: "N/A",
        eval_status: "N/A",
        agent: "N/A"
      }
    ]
    let params = {}
    //reset tabs
    this.activeTab = this.items1[0]
    this.tabMenuName = "Transcript"
    this.playerSelectedCategories = this.playerDisplayCategories
    this.playbackIndex = '1.0';  
    this.selectedIndex = 2;
    if($("#audio-spectrum").hasClass('autoHeight')){
        $("#audio-spectrum").removeClass('autoHeight')
      }

    this.inter_Service.getInteractionDetails(convID, UserData.customerId).subscribe(
      (data: any) => {
        // this.interactingDetails = data.evaluationdetail
        let val = data.evaluationdetail
        // console.log(val);
        if (val.length > 0) {
          this.interactionDetails = []
          val.forEach(element => {
            // console.log(element.evaluationdetail);
            element.evaluationdetail.forEach(item => {
              params = {
                eval_room: item.evaluation_room,
                eval_user: item.evaluator_username,
                eval_status: item.evaluation_status,
                agent: item.agent_id
              }
              this.interactionDetails.push(params)
            });
          });
          this.disableSend = false;
        }
        else {
          this.interactionDetails = []
          this.interactionDetails = [
            {
              eval_room: "N/A",
              eval_user: "N/A",
              eval_status: "N/A",
              agent: "N/A"
            }
          ]
          this.disableSend = false;
        }

        // console.log(this.interactionDetails);
      },
      (error) => {
        this.spinnerService.hide();
        console.log(error);
      }
    )
  }

  evaluatorModel: string = "";
  evaluationModel: string = ""
  disableSend: boolean = true;
  sendWorkspace() {
    // if(this.currentContact == "" ||this.currentContact == null){
    //   this.commonMethods.addToastforlongtime(false,'Select Conversationid from the dossier')
    // }
    if (this.selectedConvId.length == 0) {
      this.commonMethods.addToastforlongtime(false, 'Select atleast one converstion Id for the interactions')
      return;
    }
    else if (this.evaluationModel == "" || this.evaluationModel == null) {
      this.commonMethods.addToastforlongtime(false, 'Select an evaluation form')
    }
    else {
      // this.disableSend = false;
      if (this.selectedConvId.length > 0) {
        let eval_name = "";
        let eval_form = "";
        if (this.evaluatorModel == "" || this.evaluatorModel == null) {
          eval_name = null
        }
        else {
          eval_name = this.usersDDL.filter(s => s.value == this.evaluatorModel)[0].label
        }
        if (this.evaluationModel == "" || this.evaluationModel == null) {
          eval_form = null;
        }
        else {
          eval_form = this.EvalformDDL.filter(s => s.value == this.evaluationModel)[0].label
        }
        let params = {
          customer_id: UserData.customerId,
          conversationid: this.selectedConvId,
          evaluation_room: eval_form,
          evaluator_username: eval_name,
        }
        // console.log(params)
        this.spinnerService.show()
        this.inter_Service.sendWorkspace(params).subscribe(
          (data:any)=>{
          //  console.log(data)
           this.commonMethods.addToastforlongtime(true, 'Interaction details sent to Evaluation Workspace')
           this.currentContact = "";
           this.evaluationModel = "";
           this.evaluatorModel = ""
           this.disableSend = true;
           this.interactionDetails = [];
           this.interactionDetails=[
            {
              eval_room: "N/A",
              eval_user: "N/A",
              eval_status: "N/A",
              agent: "N/A"
            }
          ]
          this.handleDetails=[];
          this.handleDetails=[
            {
             handleTime: "N/A",
             callDuration: "N/A",
             talkTime: "N/A",
             waitTime: "N/A",
             acwTime: "N/A",
             holdTime: "N/A"
           }
          ]
         this.transcriptTab = [];
         this.getTopicReport = [];
         this.getTopicReportTime = [];
         //reset tabs
          this.activeTab = this.items1[0]
          this.tabMenuName = "Transcript"
          this.playerSelectedCategories = this.playerDisplayCategories
          this.playbackIndex = '1.0';  
          this.selectedIndex = 2;
          if($("#audio-spectrum").hasClass('autoHeight')){
              $("#audio-spectrum").removeClass('autoHeight')
            }
         this.spinnerService.hide()
         this.selectedConvId = [];
         this.refreshBtn(false)
          },
          (error) => {
            console.log(error.error);
            this.spinnerService.hide();
            this.commonMethods.addToastforlongtime(false, error.error.Message)
          }
        )
      }
    }

  }

  // sendDataTOmstr(){
  //   return new Promise((resolve,reject)=>{
  //     let token = localStorage.getItem('mstrAuthToken');
  //     token = JSON.parse(token)
  //     let params = {
  //       xmstrAuthTokenParam: token['authToken'],
  //       mstrSessionStateParam: localStorage.getItem('_mstrweb'),
  //       projectIdParam: this.projectID,
  //       projectNameParam: localStorage.getItem('mstrProject'),
  //       dossierIdParam: this.DossierId,
  //       dossierInstanceIdParam: this.dossierInstanceID.mid,
  //       cookieParam : token['cookie']
  //     }
  //     this.ew_NACDservice.sendDataTOmstr(params).subscribe(
  //       (data:any)=>{
  //         // console.log("SetInstance",data);
  //         resolve(data)
  //       },
  //       (error)=>{
  //         console.log(error);
  //         reject(error);
  //         this.spinnerService.hide();
  //       }
  //     )
  //   })

  // }

  // dossierInstanceID:any;
  // getmstrInstanceID(){
  //   return new Promise((resolve,reject)=>{
  //     let token = localStorage.getItem('mstrAuthToken');
  //     token = JSON.parse(token)
  //     let params = {
  //       xmstrAuthTokenParam: token['authToken'],
  //       cookieParam : token['cookie'],
  //       projectIdParam: this.projectID,
  //       dossierIdParam: this.DossierId
  //     }
  //     this.ew_NACDservice.getMSTRInstanceID(params).subscribe(
  //       (data:any)=>{
  //         this.dossierInstanceID = data;
  //         // console.log("instanceID",this.dossierInstanceID);
  //         resolve(data);
  //       },
  //       (error)=>{
  //         console.log(error);
  //         reject(error);
  //         this.spinnerService.hide();
  //       }
  //     )
  //   })

  // }

  isloadSpinner: boolean = false;
  ReloadData() {
    if (!!document.getElementById('dossierContainer1')) {
      if (this.isloadSpinner == false) {
        document.getElementById('dossierContainer1').style.display = 'none';
        this.isloadSpinner = true;
        let tableId = document.getElementById('dossierContainer1');
        microstrategy.dossier.destroy({ placeholder: tableId });
      }
      this.interactionTable();
      this.spinnerService.hide();
      setTimeout(() => {
        this.isloadSpinner = false;
        document.getElementById('dossierContainer1').style.display = 'block';
      }, 7000);
    }
  }

  deleteSelectedObj(msg) {
    let tempCreateEvaluator = JSON.parse(JSON.stringify(this.selectedConvId));
    const index: number = this.selectedConvId.indexOf(msg);
    if (index !== -1) {
      tempCreateEvaluator.splice(index, 1);
      this.selectedConvId = tempCreateEvaluator;
    }
  }

  onChangeAudioLoader(isToggle) {
    if (isToggle) {
      if (this.audioUrl != 'null' && this.audioUrl != environment.uiUrl + '/' + 'assets/mp3/0917.mp3' && this.audioUrl != '') {
        this.refreshBtn();
      }
    }
  }

  mstrValidToken() {
    const idToken = JSON.parse(localStorage.getItem("mstrIdToken"))['x-mstr-identitytoken'];
    const authToken = JSON.parse(localStorage.getItem('mstrAuthToken'))
    const params = {
      ID_TOKEN: idToken,
      AUTH_TOKEN: authToken
    }
    return new Promise((resolve, reject) => {
      this.subscription_mstrValidToken = this.ew_NACDservice.mstrValidToken(params).subscribe(
        (data: any) => {
          if (data.isSuccess.toLowerCase() === 'success' && data.result !== 'valid identity token') {
            localStorage.removeItem('mstrIdToken');
            const setIdToken = {
              'x-mstr-identitytoken': data.result
            }
            localStorage.setItem('mstrIdToken', JSON.stringify(setIdToken))
          }
          else if (data.isSuccess.toLowerCase() === 'success' && data.result === 'NA') {
            this.mstrTokenService.refreshMSTRSession();
          }
          else {
            if (data.isSuccess.toLowerCase() === 'failed' && (data.result.toLowerCase() === 'invalid access token' || data.result === "The user's session has expired, please reauthenticate")) {
              // this.commonMethods.addToastforlongtime(false,'Mstr session has Expired,Please wait for a moment...')
              this.mstrTokenService.refreshMSTRSession();
            }
          }
          resolve(true)
        },
        (error) => {
          console.log(error)
          reject(error)
          this.spinnerService.hide();
        })
    })

  }

  validateMstrReportId() {
    let params = {
      dossierId: this.DossierId,
      reportType: "55",
      AuthToken: JSON.parse(localStorage.getItem('mstrAuthToken')),
      projectId: this.projectID
    }
    return new Promise((resolve, reject) => {
      this.subscription_ValidateReportID = this.keyQuestionsService.validateMstrReportId(params).subscribe(
        (data: any) => {
          if (data['isSuccess'].toLowerCase() == 'failed'  && data.result.toLowerCase() != "the user's session has expired, please reauthenticate") {
            this.commonMethods.addToastforlongtime(false, 'There is an error in configuration. Please connect with support team to correct the configuration error');
          }
          else{
            if (data['isSuccess'].toLowerCase() == 'failed' && data.result.toLowerCase() == "the user's session has expired, please reauthenticate") {
              this.mstrTokenService.refreshMSTRSession();
            }
          }
           resolve(data)
        },
        (error) => {
          console.log(error);
          if (error.error['isSuccess'].toLowerCase() == 'failed'  && error.error['result'].toLowerCase() != "the user's session has expired, please reauthenticate") {
            this.commonMethods.addToastforlongtime(false, 'There is an error in configuration. Please connect with support team to correct the configuration error');
          }
          else{
            if (error.error['isSuccess'].toLowerCase() == 'failed' && error.error['result'].toLowerCase() == "the user's session has expired, please reauthenticate") {
              this.mstrTokenService.refreshMSTRSession();
            }
          }
          reject(error);
          this.spinnerService.hide();
        })
    })
  }

   // !!! keep this ngOnDestroy method at last ,please verify if anybody work on this component !!!
   ngOnDestroy() {
    if (this.subscription_DossierID) {
      this.subscription_DossierID.unsubscribe();
    }
    if (this.subscription_mstrValidToken) {
      this.subscription_mstrValidToken.unsubscribe();
    }
    if (this.subscription_ValidateReportID) {
      this.subscription_ValidateReportID.unsubscribe();
    }

    const getDossierDOMobj = document.getElementById("dossierContainer1");
    if (typeof (getDossierDOMobj) != 'undefined' && getDossierDOMobj != null) {
      getDossierDOMobj.style.display = 'none'
      if(getDossierDOMobj.id == 'dossierContainer1'){
        microstrategy.dossier.destroy({ placeholder: getDossierDOMobj });
      }
      getDossierDOMobj.remove();
    }
  }
}






