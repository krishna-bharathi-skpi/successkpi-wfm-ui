import { Component, OnInit, ViewChild } from '@angular/core';
declare var $: any;
declare var require: any;
// let WaveSurfer = require('../../../../assets/audioscript/wavesurfer.js');
// let TimelinePlugin = require('../../../../assets/audioscript/plugin/wavesurfer.timeline.js');
// let CursorPlugin = require('../../../../assets/audioscript/plugin/wavesurfer.cursor.js');
import { utils } from '../../../config';
import { MenuItem } from 'primeng/api';
import { KeyQuestionsService } from '../../analyze/key-questions/key-questions.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MstrTokenService } from '../../../services/mstrtoken.service';
import { CommonMethods } from '../../../common/common.components';
declare var microstrategy: any;
import * as moment from 'moment';
import { InteractionService } from '../../interaction-details/interaction-details.service';
import { EvaluationWorkspaceService } from '../evaluation-workspace/evaluation-workspace.service';
import { UserData } from '../../../user';
import { LoginService } from '../../login/login.service';
import { CoachingModel } from './coaching-workspace.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalComponent } from '../../../global/global.component';
import { PartitionService } from '../../settings/partition/partition.service';
import { PreferenceService } from '../../settings/successkpi-setting/successkpi-setting.service';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';

//import WaveSurfer from 'wavesurfer.js';
import WaveSurfer from 'wavesurfer.js/dist/wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.js'
import MarkersPlugin from 'wavesurfer.js/src/plugin/markers/index.js'
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js'
import { EvaluationWorkspaceNacdService } from '../evaluation-workspace-nacd/evaluation-workspace-nacd.service';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-coaching-workspace',
  templateUrl: './coaching-workspace.component.html',
  styleUrls: ['./coaching-workspace.component.css']
})

export class CoachingWorkspaceComponent implements OnInit {
  followUPdate:Date;
  audioUrl: string = 'null';
  ws: any;
  items1: MenuItem[];
  tabMenuName: string = "Transcript";
  totalScore: number = 0;
  totalQues: number = 0;
  totalNotes: number = 0;
  totalCountQues: number = 0;
  totalCountNotes: number = 0;
  minDateValue: Date;
  public coachModel: CoachingModel;
  registerForm: FormGroup;
  submitted = false;
  subscription:Subscription;
  videoUrl: any = [];
  currentEvaluationDetails: any = { evalRoomId: null, evalRoomName: '', evalRoomIsNonACD: false };
  subscription_DossierID: Subscription;
  subscription_ValidateReportID: Subscription;
  subscription_mstrValidToken: Subscription;
  sentiment_data: any
  sentenceSentiment: any = null;
  sentimentBySentence_data: any;
  getTopicReportTime: any = []
  nonACDAgentDropdown: boolean = false;
  isEvaluationTabs:boolean = false;

  @ViewChild('closebutton') closebutton;
  constructor(private mstrTokenService: MstrTokenService,private spinnerService: NgxSpinnerService,public keyQuestionsService: KeyQuestionsService, private commonMethods: CommonMethods,
    public evService: EvaluationWorkspaceService, private interactionService: InteractionService,private loginService: LoginService,private formBuilder: FormBuilder,public global: GlobalComponent,
    private partitionService: PartitionService, private preferenceService: PreferenceService,private ew_NACDservice: EvaluationWorkspaceNacdService, private _clipboardService: ClipboardService) { 
      this.getFormValidate();

    this.commonMethods.dynamicBackgroundColorChange('default');
    this.roleslist();
    this.coachModel = new CoachingModel();
    this.followUPdate = new Date();
    this.followUPdate.setDate(this.followUPdate.getDate() + 14);
  }

  ngOnInit(): void {
    this.minDateValue = new Date();
    this.getPlatformValidation().then(() => {
      this.evaluationTabValue();
    })
    this.getEvaluationDossiers();
  }

  evaluationTabValue() {
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
      },
      {
        label: 'Notes', command: (e) => {
          this.tabMenuName = "Notes"
          e.originalEvent = this.handleChange(e.item)
        }
      },
      {
        label: 'Screen', command: (e) => {
          this.tabMenuName = "Screen"
          e.originalEvent = this.handleChange(e.item)
        }
      }
    ];

    if (!this.isMediaScreen) {
      this.items1 = this.items1.filter(element => element.label != 'Screen')
    }
    this.activeTab = this.items1[0]
  }

  coachFeedbackError: boolean = false;
  getFormValidate() {
    this.registerForm = this.formBuilder.group({
      coachCategory: ['', Validators.required],
      coachFeedback: ['']
    });
  }

  get f() { return this.registerForm.controls; }

  textAreaKeys(event) {
    if ((event.keyCode == 13 || event.charCode == 13) || (event.keyCode == 124 || event.charCode == 124) || (event.keyCode == 92 || event.charCode == 92) || (event.keyCode == 47 || event.charCode == 47)) {
      event.preventDefault();
    }
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

  // *********************************************************
  //playerDisplayCategoriesArr: any[] = [{name: 'Note Indicators', key: 'Note'},{name: 'ColorBy Channel', key: 'Color'}, {name: 'Sentiment Bar', key: 'Sentiment'}, {name: 'Topic tags', key: 'Topic'}];
  playerDisplayCategories: any[] = [{name: 'Note Indicators', key: 'Note'},{name: 'ColorBy Channel', key: 'Color'}, {name: 'Sentiment Bar', key: 'Sentiment'}, {name: 'Topic tags', key: 'Topic'}];
  playerSelectedCategories:any[] = this.playerDisplayCategories
  //add this when conversation loads
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
playbackIndex: string
selectedIndex: number;
playRateSpeedSelected:any[] = this.playbackSpeed

NotesData: any = [];
selectedNoteIndex: any

  hoverNotes() {
    this.ws.on('marker-click', (ele) => {
      //console.log(ele)
      if(ele.label === undefined){
        //console.log(ele.label)
        this.activeTab = this.items1[2]
        this.tabMenuName = this.items1[2].label
        this.selectedNoteIndex = this.NotesPlayerData.findIndex(x => x.time === ele.time);
      }
    })
  }

  handleChange(e) {
    this.activeTab = e;
    if (e.label == 'Screen' && this.currentContact != undefined && this.currentContact != '') {
      this.isMediaScreenLoader = true;
      if (this.platformId == 2 && this.isMediaScreen) {
        this.getVideoUrl(this.currentContact);
      }
    }
  }

  getNotesPlayerData() {
    this.NotesPlayerData = [];
    if (this.audioUrl != '' && this.audioUrl != 'null' && this.audioUrl != environment.uiUrl + '/' + 'assets/mp3/0917.mp3') {
      this.allNotes.forEach((element: any) => {
        let img = new Image(15, 15);
        let notes: any = {};
        img.src = "../assets/img/notes.svg"
        img.className = 'flag-image';
        notes.markerElement = img
        notes.time = parseFloat(element.time);
        notes.color = '#333';
        notes.position = 'top';
        this.NotesPlayerData.push(notes);
      });
    }
  }

  //Sentiment by sentence marker placement
  getSentimentPlayerData() {
    this.SentimentPlayerData = [];
    //console.log(this.sentiment_data)
    if (this.audioUrl != '' && this.audioUrl != 'null' && this.audioUrl != environment.uiUrl + '/' + 'assets/mp3/0917.mp3') {
      //if(this.sentiment_data.ReportData == undefined){
        //if(this.sentiment_data?.ReportData?.result?.data?.root != null && this.sentenceSentiment != null){
          //console.log(this.sentiment_data, this.SentimentPlayerData)
        if(this.sentiment_data != null){
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
        if (index > 0) {
          this.previousTopic = this.getTopicReportTime[index-1].topic.split(' |')[0].trim()
          //console.log("Previous: " + this.getTopicReportTime[index-1].topic);  
        }
        if (index < (this.getTopicReportTime.length - 1)) {
          this.nextTopic = this.getTopicReportTime[index+1].topic.split(' |')[0].trim()
          this.nextTime = this.getTopicReportTime[index+1].time
          //this.nextTopic = this.getTopicReportTime[index+1].topic.split(' |')[0].trim()
          //console.log("Next: " + this.getTopicReportTime[index+1].topic);
        }
        this.currentTopic = this.getTopicReportTime[index].topic.split(' |')[0].trim()
        this.currentTime = this.getTopicReportTime[index].time

        
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
        //regionsData.attributes = this.label
        //regionsData.attributes = {label:"Tag1"}

        this.regionsDataArr.push(regionsData);
      });
      //this.hoverNotes();
      // if(this.audioUrl != 'null' && this.transcriptTab.length > 0 ){
      //   this.hoverNotes();
      // }
    }
  }

  // createWrapper () {
  //   var prevSpectrogram = this.ws.container.querySelector('spectrogram');
  //   if (prevSpectrogram) {
  //       this.ws.container.removeChild(prevSpectrogram);
  //   }
  //   var wsParams = this.ws.params;
  //   this.ws.wrapper = this.ws.container.appendChild(
  //       document.createElement('spectrogram')
  //   );
  //   this.ws.drawer.style(this.ws.wrapper, {
  //       display: 'block',
  //       position: 'relative',
  //       userSelect: 'none',
  //       webkitUserSelect: 'none',
  //       height: this.ws.height + 'px'
  //   });
  //   if (wsParams.fillParent || wsParams.scrollParent) {
  //       this.ws.drawer.style(this.ws.wrapper, {
  //           width: '100%',
  //           overflowX: 'hidden',
  //           overflowY: 'hidden'
  //       });
  //   }
  //   var my = this;
  //   this.ws.wrapper.addEventListener('click', function (e) {
  //       e.preventDefault();
  //       var relX = 'offsetX' in e ? e.offsetX : e.layerX;
  //       my.ws.fireEvent('click', (relX / my.ws.scrollWidth) || 0);
  //   });
  // }

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
  //    this.playbackIndex = '0';
  //    this.ws.setPlaybackRate(this.playbackSpeed[this.playbackIndex]);
  //   } else {
  //    this.playbackIndex = playbackIndex + 1;
  //    this.ws.setPlaybackRate(this.playbackSpeed[this.playbackIndex]);
  //   }
  // }

  audioPlayerInit() {
    try {
      if (this.audioUrl != '' && this.audioUrl != 'null' && this.audioUrl != environment.uiUrl + '/' + 'assets/mp3/0917.mp3') {
          if (typeof (this.ws) == 'object' && typeof (this.ws.destroy) == 'function') {
            this.ws.destroy();
          }
          this.getRegions();
          this.getNotesPlayerData();
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
              }),
              MarkersPlugin.create({
                markers: this.NotesPlayerData,
              }),
            ],

        });

        //console.log(this.ws.markers) 
        if (typeof (this.ws) == 'object' && this.audioUrl.trim() != "") {
          let resAudioLoad = this.ws.load(this.audioUrl);
          this.hoverNotes();
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
          //   this.audioUrl = environment.uiUrl + '/' + 'assets/mp3/0917.mp3';
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
      else {
        if (typeof (this.ws) == 'object' && typeof (this.ws.destroy) == 'function') {
          this.ws.destroy();
        }
      }
    } catch (error) {
      console.log(error);
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

  getEvaluationDossiers() {
    this.spinnerService.show()
    this.getplatformValidate().then((platformId) => {
      this.getAgentDDL(platformId).then(() => {
        this.getEvaluationFormItems().then((response: any) => {
          this.getDossierID().then((res) => {
            this.validateMstrReportId().then((validIdRes: any) => {
              if (validIdRes['isSuccess'].toLowerCase() == 'success') {
                this.mstrValidToken().then((validToken) => {
                  if (validToken) {
                    if (response.length > 0) {
                      this.dossierTable();
                    }
                    else {
                      this.spinnerService.hide();
                    }
                  }
                })
              }
            })
          })
        })
      })
    })

  }

  DossierId: any;
  projectID: any;
  getDossierID() {
    return new Promise((resolve, reject) => {
      this.spinnerService.show();
      this.subscription_DossierID = this.keyQuestionsService.getMstrConfig().subscribe(
        (data: any) => {
          this.DossierId = typeof (data.coachingW_dossierId) != 'undefined' ? data.coachingW_dossierId : null;
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

  getEvaluationFormItems() {
    return new Promise((resolve, reject) => {
      this.ew_NACDservice.getEvaluationForms().subscribe(
        (data: any) => {
          this.evaluationItem = data;
          this.EvalItemDDL = [];
          if (data.length > 0 || data != undefined || data != null) {
            data.map(element => {
              let LabelObj = {
                label: element.evaluationRoomName,
                value: element.evaluationRoomName
              }
              this.EvalItemDDL.push(LabelObj);
            });
            resolve(data);
          }
          if (this.category == undefined || this.category == '' || this.category == null) {
            if (this.EvalItemDDL?.length > 0) {
              this.category = this.EvalItemDDL[0].value;
            }
          }
        },
        (err) => {
          console.log(err)
          reject(err)
          this.spinnerService.hide();
        }
      )

    })
  }

  currentContact: string = "";
  EvalItemDDL: any = [];
  category: any;
  agentItem:any=[];
  agentCategory:any;
  selectionHandle:any;
 async dossierTable() {
   this.spinnerService.show();
    try {
      const projectID = this.projectID;
      const dossierID = this.DossierId;
      const mstrIdToken = JSON.parse(localStorage.getItem("mstrIdToken"))['x-mstr-identitytoken']
      const projectUrl = environment.mstr_Url + projectID;
      const dossierUrl = projectUrl + '/' + dossierID;
      this.spinnerService.show();
      if (mstrIdToken == undefined) {
        this.spinnerService.hide();
      }
      setTimeout(() => {
        this.spinnerService.hide();
      }, 10000);
      const filterList = [
        {
          "name": "Agent Name",
          "selections": [
            { "name": this.agentCategory }
          ]
        },
        {
          "name": "Evaluation Rooms",
          "selections": [
            { "name": this.category }
          ]
        }
      ];

      let promptsAnswers = {
        'Evaluation Room Value': this.category,
        'Agent Name Value': this.agentCategory
        // 'Agent Name Prompt': this.agentCategory
      };
      await this.interactionService.dossierPromptWorkflow(mstrIdToken, projectID, dossierID, promptsAnswers).then(jsonRes => {
            microstrategy.dossier.create({
        placeholder: document.getElementById("dossierContainer1"),
        url: dossierUrl,
        // filters: filterList,
        instance: jsonRes['instance'],
        // instance: this.dossierInstanceID,
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
          }).then(function () {
              return jsonRes['authToken'];
          })
        },
      }).then(function (dossier) {
        dossier.getFilterList().then(function (filterList) {
          this.setEvaluationQA(this.category);
          this.spinnerService.hide();
        }.bind(this));

        const selectHandler = function (e) {
          let selectionName = null;
          let selectionObjConvId: any;
          for (var i = 0; i < e.graphics.length; i++) {
            let selection = e.graphics[i];
            selectionName = selection[0].n;
            if (selectionName != 'Conversation ID' && selectionName != 'Contact ID') {
              return false
            }
            let selectionValue = selection[0].vid;
            let selectionText = selection[0].v;
            selectionObjConvId = {
              name: selectionName,
              value: selectionValue,
              text: selectionText
            }
          }
          this.activeTab = this.items1[0];
          this.currentContact = selectionObjConvId==undefined?"":selectionObjConvId.text;
          this.playerSelectedCategories = this.playerDisplayCategories
          this.playbackIndex = '1.0';  
          this.selectedIndex = 2;
          if($("#audio-spectrum").hasClass('autoHeight')){
              $("#audio-spectrum").removeClass('autoHeight')
            }

        if (!this.currentContact?.includes('NON-ACD')) {
          this.getTranscribeData(this.currentContact);
          this.getEvalTopic(this.currentContact);
          this.getNotes(this.currentContact)
          this.nonACDAgentDropdown = false;
          this.isEvaluationTabs = false;
        } else {
          this.getEvalutionDetail(this.currentContact,this.agentLabelID) 
          this.allNotes = [];
          this.transcriptTab = [];
          this.videoUrl = [];
          this.audioUrl = '';
          this.getTopicReport = [];
          this.nonACDAgentDropdown = true;
          this.isEvaluationTabs = true;
          //this.getSignedURL("")
          this.refreshBtn(false)
        }





        }.bind(this);
        this.selectionHandle = selectHandler

        dossier.registerEventHandler(
          "onGraphicsSelected",
          selectHandler);
      }.bind(this)).finally(function () {
        setTimeout(() => {
          this.spinnerService.hide();
        }, 10000);
      }.bind(this));
    });
    } catch (e) {
      console.log(e);
      this.spinnerService.hide();
    }
  }

  async OnchangeAgentEvaluationForm() {
    this.categoryDisable = false;
    this.mstrValidToken().then((validToken) => {
      this.onChangeClear();
      if (validToken) {
        this.dossierTable();
      }
    })
  }
  onChangeClear() {
    this.interactionListData = [];
    // this.tempListArr = [];
    this.totalScore = 0;
    this.totalQues = 0;
    this.totalNotes = 0;
    this.currentContact = "";
    this.agentLabelID = null;
    this.tableIntList = false;
    this.agentDDLform = [];
    this.selectionHandle = null
    this.transcriptTab = [];
    this.videoUrl = [];
    this.allNotes = [];
    this.questionsList = null;
    this.getTopicReport = [];
    this.refreshBtn(false)
    this.nonACDAgentDropdown = false;
    this.isEvaluationTabs = false;
    this.playerSelectedCategories = this.playerDisplayCategories
    this.playbackIndex = '1.0';  
    this.selectedIndex = 2;
    if($("#audio-spectrum").hasClass('autoHeight')){
        $("#audio-spectrum").removeClass('autoHeight')
      }

  }
  transcriptTab: any = [];
  getTranscribeData(conversationID) {
    this.ew_NACDservice.getTranscribeData(conversationID).subscribe(
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
      }, (error) => {
        console.log(error);
        this.transcriptTab = [];
        this.spinnerService.hide();
      }
    )
  }

  mstrToken: any = null;
  audioEndpoint: any = null;
  getTopicReport: any = [];
  labelVal: any = {}
  agentDDLform: any = [];
  getQueueLoopAgent: any = [];
  agentLabelID: string = ""
  getEvalTopic(conversationID) {
    // console.log("conversationID", conversationID);

    this.mstrToken = localStorage.getItem("mstrAuthToken");
    let mstr = JSON.parse(this.mstrToken);
    let agentDDL = []
    let params = {
      customerId: UserData.customerId,
      cookie: mstr['cookie'],
      conversationid: conversationID,
      ReportNo: "4",
      X_MSTR_AuthToken: mstr['authToken']
    }
    let params1 = {
      customerId: UserData.customerId,
      cookie: mstr['cookie'],
      conversationid: conversationID,
      ReportNo: "9",
      X_MSTR_AuthToken: mstr['authToken']
    }
    this.agentDDLform = [];
    this.agentLabelID = "";
    agentDDL = [];
    this.spinnerService.show();
    let topicData = [];
    // console.log("params", params);
    this.interactionService.GetReportData(params).subscribe(
      (data: any) => {
        if (data.ReportData.result.data.root != null) {
          this.audioEndpoint = data.ReportData.result.data.root.children[0].children[0].children[0].children[0].children[0].children[0].children[0].element.name;
          this.getTopicReport = data.ReportData.result.data.root.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children;
          this.getQueueLoopAgent = data.ReportData.result.data.root.children[0].children[0].children[0].children

          this.getTopicReportTime = topicData;
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
          this.getQueueLoopAgent.forEach(element => {
            element.children[0].children.forEach(item => {
              let labelValue = {
                label: item.element.formValues.DESC,
                value: item.element.formValues.ID
              }
              agentDDL.push(labelValue);
            });
          });
          if (conversationID != null && conversationID != "") {
            this.agentDDLform = agentDDL;
            // console.log("this.agentCategory", this.agentCategory);
            // let label;
            let filterVal;
            if (this.agentCategory != '' && this.agentCategory != undefined && this.agentCategory != null) {
              // label = this.agentItem.filter(s => s.value == this.agentCategory?.value)[0]?.label;
              filterVal = this.agentDDLform.filter(s => s.label == this.agentCategory)[0]
            }

            // console.log("this.agentDDLform", this.agentDDLform);

            if (filterVal != undefined)
              this.agentLabelID = filterVal.value;
            this.getEvalutionDetail(conversationID, this.agentLabelID)
          }
          else {
            agentDDL = [];
            this.agentDDLform = [];
          }
          this.isEvaluationTabs = false;
          this.getSignedURL(this.audioEndpoint);
        }
        this.refreshBtn(false)
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error.Message);
      }
    )
    let sentimentBy_Data = [];
    this.interactionService.GetReportData(params1).subscribe(
      (data: any) => {
        if (data.ReportData.result.data.root != null) {
          this.sentiment_data = data
          //if(this.sentiment_data.ReportData.result.data.root.children[0] != undefined){
            this.sentimentBySentence_data = data.ReportData.result.data.root.children[0].children
            this.sentenceSentiment = sentimentBy_Data
            this.sentimentBySentence_data.forEach(item => {
              item.children.forEach(sentiItem => {
                  const sentimentDetail = {
                    sentiment: sentiItem.element.name,
                    start_time: sentiItem.children[0].element.name,
                    end_time: sentiItem.children[0].children[0].element.name
                  }
                  sentimentBy_Data.push(sentimentDetail);
                  //sentimentBy_Data.sort(this.commonMethods.compareValues('start_time'))
              });
            });
            this.isEvaluationTabs = false;
            this.getSignedURL(this.audioEndpoint);
          }
        this.refreshBtn(false)
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error.Message);
      }
    )
  }

  getSignedURL(URL) {
    var regExp = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (regExp.test(URL)) {
      this.ew_NACDservice.getEvaluateObj(URL).subscribe(
        (data: any) => {
          this.audioUrl = data.url
          this.refreshBtn();
          // setTimeout(() => {
          //   console.log("setTimeOut called")
          //   this.refreshBtn(true);
          // }, 2100);
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

   reloadInteractions() {
    this.mstrTokenService.refreshMSTRSession();
  //   this.spinnerService.show();
  //   this.mstrTokenService.ReloadWorkspace().subscribe(
  //     (data: any) => {
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

  localRole: any;
  roleEvalForm: any = null;
  roleslist() {
    this.localRole = UserData.role
    this.loginService.getroles(this.localRole).subscribe(
      (data: any) => {
        if (data.roleEvaluationFormID != null || data.roleEvaluationFormID != undefined) {
          this.roleEvalForm = data.roleEvaluationFormID;
        }

      }, (error) => {
        console.log('error', error);
      }
    )
  }

  CalculateScore() {
    let total_S = 0;
    let total_Q = 0;
    let total_N = 0;
    this.questionsList.forEach((data: any) => {
      data.Topics.questions.forEach(element => {
        // if (element.questionChoice == "Choice") {
        //   if (element.answerdata != undefined && element.answerdata != null) {
        //     if (element.answerdata.Score != undefined && element.answerdata.Score != null) {
        //       total_S += parseInt(element.answerdata.Score)
        //     }
        //     else if (element.answerdata.Score == null || element.answerdata.Score == "") {
        //       element.answerdata.Score = 0
        //       total_S += element.answerdata.Score;
        //     }
        //     if (element.answerdata.Answer != null) {
        //       total_Q += 1;
        //     }
        //   }
        // }
        // if (element.questionChoice == "Yes/No") {
        //   if (element.answerdata != undefined && element.answerdata != null) {
        //     if (element.answerdata.Score != undefined && element.answerdata.Score != null) {
        //       total_S += parseInt(element.answerdata.Score)
        //     }
        //     else if (element.answerdata.Score == null || element.answerdata.Score == "") {
        //       element.answerdata.Score = 0
        //       total_S += element.answerdata.Score;
        //     }
        //     if (element.answerdata.Answer != null) {
        //       total_Q += 1;
        //     }
        //   }
        // }

        if (element.questionChoice == "Choice") {
          if (element.answerdata != undefined && element.answerdata != null) {
            if (element.answerdata.Score != undefined && element.answerdata.Score != null) {
              if (element?.displaytype?.value == "radio") {
                element.questionData.forEach((quesData, indexQD) => {
                  if (quesData.value.Answer == element.answerdata) {
                    total_S += parseFloat(parseFloat(quesData.value.Score).toFixed(2));
                  }
                });
              } else {
                total_S += parseFloat(parseFloat(element.answerdata.Score).toFixed(2));
              }
            } else if (element.answerdata.Score == null || element.answerdata.Score == "") {
              if (element?.displaytype?.value == "radio") {
                element.questionData.forEach((quesData, indexQD) => {
                  if (quesData.value.Answer == element.answerdata) {
                    total_S += parseFloat(parseFloat(quesData.value.Score).toFixed(2));
                  }
                });
              } else {
                total_S += parseFloat(parseFloat(element.answerdata.Score).toFixed(2));
              }
            }
            if (element.answerdata.Answer != null || (element?.displaytype?.value == "radio" && element.answerdata != null)) {
              total_Q += 1;
            }
          }
        }
        if (element.questionChoice == "Yes/No") {
          if (element.answerdata != undefined && element.answerdata != null) {
            if (element.answerdata.Score != undefined && element.answerdata.Score != null) {
              if (element?.displaytype?.value == "radio") {
                element.questionData.forEach((quesData, indexQD) => {
                  if (quesData.value.Answer == element.answerdata) {
                    total_S += parseFloat(parseFloat(quesData.value.Score).toFixed(2));
                  }
                });
              } else {
                total_S += parseFloat(parseFloat(element.answerdata.Score).toFixed(2));
              }
            } else if (element.answerdata.Score == null || element.answerdata.Score == "") {
              if (element?.displaytype?.value == "radio") {
                element.questionData.forEach((quesData, indexQD) => {
                  if (quesData.value.Answer == element.answerdata) {
                    total_S += parseFloat(parseFloat(quesData.value.Score).toFixed(2));
                  }
                });
              } else {
                total_S += parseFloat(parseFloat(element.answerdata.Score).toFixed(2));
              }
            }
            if (element.answerdata.Answer != null || (element?.displaytype?.value == "radio" && element.answerdata != null)) {
              total_Q += 1;
            }
          }
        }


        if (element.questionChoice == "Number") {
          if (element.numberValue != null || element.numberValue != undefined && element.numberValue != "") {
            // total_S += parseInt(element.numberValue)
            total_S += parseFloat(parseFloat(element.numberValue).toFixed(2));
            total_Q += 1;
          }

        }
        if (element.questionChoice == "Comments") {
          if (element.answerdata != null || element.answerdata != undefined && element.answerdata != "") {
            total_N += 1;
          }
          if (element.answerdata == "") {
            total_N--;
          }

        }


      });
    })

    if (total_Q <= 0) {
      total_Q = 0
    }
    let finalFloatValue = total_S.toString().split(".");
    if (finalFloatValue[1]?.length > 2) {
      this.totalScore = parseFloat(parseFloat(finalFloatValue[0] + '.' + finalFloatValue[1]?.substring(0, 2)).toFixed(2));
    } else {
      this.totalScore = total_S;
    }
    // this.totalScore = total_S;
    this.totalQues = total_Q;
    this.totalNotes = total_N;
  }

  selectlabelDB: any;
  selectedEvalItem: any;
  evaluationItem: any = [];
  evalRoomName: any;
  questionsList: Object[];
  setEvaluationQA(category) {
    let quesarr = [];
    let notesarr = [];
    if(category != '' && category != null && category != undefined){
        if (this.evaluationItem.length > 0) {
          this.EvalItemDDL.forEach(element => {
            if (element.value == this.category) {
              this.selectlabelDB = element.label;
            }
          });
          this.evaluationItem.forEach(element => {
            if (element.evaluationRoomName == this.selectlabelDB) {
              this.selectedEvalItem = element;
              this.categoryDisable = false;
              this.evalRoomName = element.evaluationRoomName;
              this.questionsList = element.questionsList;
              this.currentEvaluationDetails = { evalRoomId: element.evaluationId, evalRoomName: element.evaluationRoomName, evalRoomIsNonACD: element.isNonACD == undefined ? false : element.isNonACD };

              // console.log(this.questionsList)
              this.questionsList.forEach((data: any) => {
                data.Topics.questions.forEach(element => {
                  if (element.questionChoice == "Choice" || element.questionChoice == "Yes/No") {
                    element.answerdata = null;
                    element.questionData = this.templatetoAns(element.questionValue);
                  }
                  if (element.questionChoice == "Choice" || element.questionChoice == "Yes/No" || element.questionChoice == "Number") {
                    quesarr.push(element)
                    this.totalCountQues = quesarr.length
                  }
                  if (element.questionChoice == "Comments") {
                    notesarr.push(element)
                    this.totalCountNotes = notesarr.length
                  }
                });
              })
            }
          })     
       }
      }
    }

  templatetoAns(val) {
    if (val != null || val != undefined) {
      var split = val.split(",");
      var Keyval = [];
      split.forEach(element => {
        var data = element.split("=");
        let valueDDL = data[0] + " " + "(" + data[1] + ")"
        let ObjVal = { Answer: data[0], Score: data[1] }
        Keyval.push({ label: valueDDL, value: ObjVal });
      });
      return Keyval;
    } else {
      return [];
    }
  }

  coachCategoryDDL: any = []
  categoryDisable: boolean = true;
  coachSessionStart(agentLabel, formLabel) {
    this.submitted = false;
    this.registerForm.reset();
    this.coachModel = new CoachingModel();
    this.coachCategoryDDL = [{
      label: 'Default',
      value: 'Default'
    }];
    setTimeout(() => {
      this.coachModel.coach_category = this.coachCategoryDDL[0].label;
    }, 200);

    this.categoryDisable = false;
    // console.log("this.agentItem", this.agentItem);
    // console.log("agentLabel", agentLabel);
    // let label= this.agentItem.filter(s => s.value == agentLabel)[0].label;
    this.coachModel.agent_name = agentLabel;
    // console.log("this.EvalItemDDL");
    // console.log(this.EvalItemDDL);
    // console.log(this.EvalItemDDL.length>0);
    let formValue;
    if ((formLabel != "" && formLabel != undefined) && this.EvalItemDDL.length > 0) {
      formValue = this.EvalItemDDL.filter(s => s.value == formLabel)[0].label;
    } else {
      formValue = "";
    }

    let val;
    if ((formValue != "" && formValue != undefined) && this.evaluationItem.length > 0) {
      val = this.evaluationItem.filter(s => s.evaluationRoomName == formValue)[0].coachCategories;
    } else {
      val = "";
    }
    let arrDDL = []
    if (val != undefined && val.length > 0) {
      arrDDL = [{
        label: 'Default',
        value: 'Default'
      }];
      val.forEach(element => {
        let params = {
          label: element,
          value: element
        }
        arrDDL.push(params)
      });
      this.coachCategoryDDL = arrDDL;
      // this.coachCategoryDDL = [];

      this.categoryDisable = false;
    }
    else {
      // this.categoryDisable = true;
      this.categoryDisable = false;
      arrDDL = [{
        label: 'Default',
        value: 'Default'
      }];
      this.coachCategoryDDL = arrDDL;
    }
  }


  evaluatorDropdown: any = [];
  eval_Interaction_ID: string = ""
  getEvalutionDetail(conversationID, agentID) {
    this.spinnerService.show();
    this.selectedEvalItem==undefined?this.selectedEvalItem={evaluationId:null}:this.selectedEvalItem;
    this.selectedEvalItem.evaluationId==undefined?null:this.selectedEvalItem.evaluationId;
    this.ew_NACDservice.getCoachingWorkspaceEvalutionDetail(conversationID, this.selectedEvalItem.evaluationId ,agentID, this.selectedEvalItem.evaluationRoomName, conversationID.includes('NON-ACD')?true:false).subscribe(
      (data: any) => {
        if (data != null) {
          this.evaluatorDropdown = [];
          data.evaluatordetail.forEach(element => {
            this.evaluatorDropdown.push(element);
          });
          if (conversationID != null || conversationID != "") {
            if (data.agentdetail!=undefined && data.agentdetail[0]?.label != null && data.agentdetail[0]?.value != null) {
              this.agentDDLform = data.agentdetail;
              this.agentLabelID = data.agentdetail[0]?.value;
            }
          }
          this.eval_Interaction_ID = (this.evaluatorDropdown.length > 0) ? this.evaluatorDropdown[0].value : "";
          this.getEvaluationAns(conversationID, agentID, this.eval_Interaction_ID);
          this.spinnerService.show();
        }
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
      }
    )
    //reset tabs
    this.activeTab = this.items1[0]
    this.tabMenuName = "Transcript"
    this.isEvaluationTabs = false;
    if(this.currentContact?.includes('NON-ACD')){
      this.allNotes = [];
      this.transcriptTab = [];
      this.videoUrl = [];
      this.audioUrl = ""
      this.getTopicReport = [];
      this.nonACDAgentDropdown = true;
      this.refreshBtn(false)
    }
  }

  interactionListData: any = [];
  // tempListArr:any = [];
  tableIntList: boolean = false;
  async getEvaluationAns(conversationID, agentID, interaction_ID) {
    this.totalScore = 0
    this.spinnerService.show();
    this.ew_NACDservice.getEvaluationAns(conversationID, this.selectedEvalItem.evaluationId, agentID, this.selectedEvalItem.evaluationRoomName, interaction_ID).subscribe(
      async (data: any) => {
        if (data != null) {
          // this.questionsList = data[0].questionsList;
          await data[0].questionsList.forEach((dataques: any, topicJ) => {
            dataques.Topics.questions.forEach((element, quesI) => {

              // Question data convert to float value
              if (element.questionData != undefined) {
                element?.questionData.forEach(elementQD => {
                  // if(elementQD.value?.Score!=null || elementQD.value?.Score!='') {
                  //   elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
                  // }
                  if (elementQD.value?.Score != null || elementQD.value?.Score != '') {
                    // elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
                    if (element?.displaytype?.value != "radio" && element.answerdata?.Score != null && element.answerdata?.Score.toString().includes('.')) {
                      elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
                    } else {
                      // elementQD.value.Score = elementQD.value.Score;
                      if(element.answerdata?.Score?.toString()?.split('.')[1]?.length>1) {
                        elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
                      } else if(element.answerdata?.Score?.toString()?.split('.')[1]?.length==1) {
                        elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(1).toString();
                      } else {
                        elementQD.value.Score = elementQD.value.Score;
                      }
                    }
                  }
                });
              }

              // Default value assigning block for Answer data
              if (element.questionid == element.questionid) {
                if (element.questionChoice != 'Number' && element.questionChoice != 'Comments') {

                  if (data[0].evaluation_status == 'InComplete' && (element.answerdata == null || (element.answerdata.Answer == null || element.answerdata.Score == null))) {
                    if ((element.defaultanswer != null || element.defaultanswer != undefined)
                    ) {
                      if (element?.displaytype?.value == "radio" && element.questionChoice == 'Choice') {
                        // element.answerdata = element.defaultanswer?.Answer;
                        if (element.answerdata?.Answer != undefined) {
                          element.answerdata = element.answerdata?.Answer;
                        } else {
                          element.answerdata = element.answerdata;
                        }
                      } else if (element?.displaytype?.value == "radio" && element.questionChoice == 'Yes/No') {
                        // element.answerdata = element.defaultanswer.Score;
                        // element.answerdata = element.defaultanswer.Answer;
                        if (element.answerdata?.Answer != undefined) {
                          element.answerdata = element.answerdata?.Answer;
                        } else {
                          element.answerdata = element.answerdata;
                        }
                      } else {
                        element.answerdata = element.defaultanswer;
                      }
                    } else {
                      // if(element?.displaytype?.value == "radio" && element.questionChoice == 'Choice') {
                      //   element.answerdata = element.answerdata?.Answer;
                      //   } else if(element?.displaytype?.value == "radio" && element.questionChoice == 'Yes/No') {
                      //     // element.answerdata = element.answerdata?.Score;
                      //     element.answerdata = element.answerdata?.Answer;
                      //   }  else {
                      //     element.answerdata = element.answerdata;
                      //   }
                    }
                  } else {
                    if (element?.displaytype?.value == "radio" && element.questionChoice == 'Choice') {
                      // element.answerdata = element.answerdata?.Answer;
                      if (element.answerdata?.Answer != undefined) {
                        element.answerdata = element.answerdata?.Answer;
                      } else {
                        element.answerdata = element.answerdata;
                      }
                    } else if (element?.displaytype?.value == "radio" && element.questionChoice == 'Yes/No') {
                      // element.answerdata = element.answerdata?.Score;
                      // element.answerdata = element.answerdata?.Answer;
                      if (element.answerdata?.Answer != undefined) {
                        element.answerdata = element.answerdata?.Answer;
                      } else {
                        element.answerdata = element.answerdata;
                      }
                    } else {
                      element.answerdata = element.answerdata;
                    }
                  }

                } else if (element.questionChoice == 'Number') {
                  // if(element.answerdata == undefined) {
                  //   if((element.defaultanswer != null || element.defaultanswer != undefined) && (element.numberValue == null || element.numberValue == '') ) {
                  //     element.numberValue = element.defaultanswer;
                  //   } else {
                  //     if((element.numberValue?.toString().split('.')[1] !='0' && element.numberValue?.toString().split('.')[1]!='00') ) {
                  //       element.numberValue = parseFloat(element.numberValue).toFixed(1);
                  //     } else {
                  //       element.numberValue = parseInt(element.numberValue);
                  //     }
                  //   }
                  // }
                  if ((data[0].evaluation_status == 'InComplete' || data[0].evaluation_status == 'Incomplete') && (element.defaultanswer != null || element.defaultanswer != undefined)) {
                    element.numberValue = element.defaultanswer;
                  } else {
                    element.numberValue = element.numberValue;
                  }
                } else if (element.questionChoice == 'Comments') {
                  element.answerdata = element.answerdata;
                }
              }

              this.questionsList.forEach((elementT: any) => {
                elementT.Topics.questions.forEach(elementQ => {
                  if (element.questionid == elementQ.questionid) {


                    // Question data convert to float value
                    if (elementQ.questionData != undefined) {
                      elementQ.questionData.forEach(elementQD => {
                        // if(elementQD.value?.Score!=null || elementQD.value?.Score!='') {
                        //   elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
                        // }
                        if (elementQD.value?.Score != null || elementQD.value?.Score != '') {
                          // elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
                          if (element?.displaytype?.value != "radio" && element.answerdata?.Score != null && element.answerdata?.Score.toString().includes('.')) {
                            elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
                          } else {
                            // elementQD.value.Score = elementQD.value.Score;
                            if(element.answerdata?.Score?.toString()?.split('.')[1]?.length>1) {
                              elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
                            } else if(element.answerdata?.Score?.toString()?.split('.')[1]?.length==1) {
                              elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(1).toString();
                            } else {
                              elementQD.value.Score = elementQD.value.Score;
                            }
                          }
                        }
                      });
                    }

                    // Default value assigning block for Conditional skip data
                    if (element.questionChoice != 'Number' && elementQ.questionChoice != 'Number' && element.questionChoice != 'Comments') {

                      if (data[0].evaluation_status == 'InComplete') {
                        if ((element.defaultanswer != null || element.defaultanswer != undefined)
                          // && data[0].evaluation_status == 'InComplete'
                        ) {
                          if (element?.displaytype?.value == "radio" && element.questionChoice == 'Choice') {
                            // elementQ.answerdata = element.defaultanswer?.Answer;
                            if (element.answerdata?.Answer != undefined) {
                              elementQ.answerdata = element.answerdata?.Answer;
                            } else {
                              elementQ.answerdata = element.answerdata;
                            }
                          } else if (element?.displaytype?.value == "radio" && element.questionChoice == 'Yes/No') {
                            // elementQ.answerdata = element.defaultanswer.Score;
                            // elementQ.answerdata = element.defaultanswer.Answer;
                            if (element.answerdata?.Answer != undefined) {
                              elementQ.answerdata = element.answerdata?.Answer;
                            } else {
                              elementQ.answerdata = element.answerdata;
                            }
                          } else {
                            elementQ.answerdata = element.defaultanswer;
                          }
                        } else {
                          // if(element?.displaytype?.value == "radio" && element.questionChoice == 'Choice') {
                          //   elementQ.answerdata = element.answerdata?.Answer;
                          //   } else if(element?.displaytype?.value == "radio" && element.questionChoice == 'Yes/No') {
                          //     // elementQ.answerdata = element.answerdata?.Score;
                          //     elementQ.answerdata = element.answerdata?.Answer;
                          //   }  else {
                          //     elementQ.answerdata = element.answerdata;
                          //   }
                        }
                      } else {
                        if (element?.displaytype?.value == "radio" && element.questionChoice == 'Choice') {
                          if (element.answerdata?.Answer != undefined) {
                            elementQ.answerdata = element.answerdata?.Answer;
                          } else {
                            elementQ.answerdata = element.answerdata;
                          }
                        } else if (element?.displaytype?.value == "radio" && element.questionChoice == 'Yes/No') {
                          // elementQ.answerdata = element.answerdata?.Score;
                          if (element.answerdata?.Answer != undefined) {
                            elementQ.answerdata = element.answerdata?.Answer;
                          } else {
                            elementQ.answerdata = element.answerdata;
                          }
                        } else {
                          elementQ.answerdata = element.answerdata;
                        }
                      }

                    } else if (elementQ.questionChoice == 'Number') {
                      // if(elementQ.answerdata == undefined) {
                      //   if((element.defaultanswer != null || element.defaultanswer != undefined) && (element.numberValue == null || element.numberValue == '') ) {
                      //     // elementQ.numberValue = parseInt(element.defaultanswer);
                      //     elementQ.numberValue = element.defaultanswer;
                      //   } else {
                      //     if((element.numberValue?.toString().split('.')[1] !='0' && element.numberValue?.toString().split('.')[1]!='00') ) {
                      //       elementQ.numberValue = parseFloat(element.numberValue).toFixed(1);
                      //     } else {
                      //       elementQ.numberValue = parseInt(element.numberValue);
                      //     }
                      //   }
                      // }
                      if ((data[0].evaluation_status == 'InComplete' || data[0].evaluation_status == 'Incomplete') && (element.defaultanswer != null || element.defaultanswer != undefined)) {
                        elementQ.numberValue = element.defaultanswer;
                      } else {
                        elementQ.numberValue = element.numberValue;
                      }
                    } else if (elementQ.questionChoice == 'Comments') {
                      elementQ.answerdata = element.answerdata;
                    }
                    // console.log("this.elementQ", elementQ);

                  }
                });
              });
            });
          })



          await data[0].questionsList.forEach((dataques: any, topicJ) => {
            dataques.Topics.questions.forEach((element, quesI) => {

              // Replace Undefiend object value to Empty string
              if (element.questionData != undefined && element.questionData != null) {
                element.questionData.forEach(elementlabel => {
                  elementlabel.label = elementlabel.label.replace(' (undefined)', '');
                  // elementlabel.value.Score = elementlabel.value.Score=='undefined' || elementlabel.value.Score==null?'0':elementlabel.value.Score;
                  // if(elementlabel.value.Score == undefined || elementlabel.value.Score == null) {
                  //   elementlabel.value.Score = 0;
                  // }
                });
              }

              if (element.questionChoice == "Choice" || element.questionChoice == "Yes/No") {
                element.questionData = this.templatetoAns(element.questionValue);
              }

              if (element.conditionalSkipQuestion == undefined) {
                element.conditionalSkipQuestion = true;
              }
              if (element.conditionalSkip && element.conditionalSkipDetails != undefined) {
                element.conditionalSkipQuestion = false;
              }
              // if(element.conditionalSkipQuestion == null && element.conditionalSkipQuestion == undefined ) {
              if (topicJ == 0 && quesI == 0) {
                if ((data[0].questionsList[0].Topics.questions[0]?.answerdata?.Answer != null && element.answerdata?.Score != null) || data[0].questionsList[0].Topics.questions[0]?.numberValue != null) {
                  this.conditionalSkipQuestionShow(topicJ, quesI, data[0].questionsList);
                } else {
                  this.conditionalSkipQuestionShow(topicJ, quesI, data[0].questionsList);
                  if (element?.conditionalSkipQuestion == undefined) {
                    // element.conditionalSkipQuestion = true;
                  }
                }
              } else {
                this.conditionalSkipQuestionShow(topicJ, quesI, data[0].questionsList);
              }


            });

            if (data.topicShowHide == undefined) {
              data.topicShowHide = true;
            } else {
              data.topicShowHide = true;
            }
            if (topicJ == 0) {
              dataques.topicShowHide = true;
            }
          })
          this.CalculateScore();

          let params = {
            conversationid: conversationID,
            evaluation_interactions_id: interaction_ID,
            evaluation_time: data[0].evaluation_time,
            evaluator_username: data[0].evaluator_username,
            total_score: this.totalScore
          }
          this.interactionListData.push(params)
          this.interactionListData = this.interactionListData.filter((v, i, a) => a.findIndex(t => t.conversationid == v.conversationid) === i)
          this.tableIntList = (this.interactionListData.length > 0) ? true : false;
          this.spinnerService.hide();
        }
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
      }
    )
  }

  allNotes: any = [];
  getNotes(conversationID) {
    this.ew_NACDservice.getNotes(conversationID).subscribe(
      (data: any) => {
        //this.allNotes = data.message;
        this.allNotes = data.message.sort(this.commonMethods.compareValues('time'))
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
      }
    )
  }

  deleteSelectedObj(msg) {
    let tempCreateEvaluator = JSON.parse(JSON.stringify(this.interactionListData));
    const index: number = this.interactionListData.indexOf(msg);
    if (index !== -1) {
      tempCreateEvaluator.splice(index, 1);
      this.interactionListData = tempCreateEvaluator;
    }
    this.tableIntList = (this.interactionListData.length > 0) ? true : false;
  }

  saveCoachingSession() {
    this.submitted = true;
    if (this.coachModel.feedback.length > 0)
      this.coachFeedbackError = false;
    else
      this.coachFeedbackError = true;
    if (this.registerForm.invalid || this.coachFeedbackError) {
      return;
    }
    else {
      // let dateFormat = moment(this.followUPdate).toISOString();
      let dateFormat = moment(this.followUPdate).format("MM/DD/YYYY");
      this.coachModel.actiondate = dateFormat;
      if (this.selectedEvalItem == undefined || this.selectedEvalItem.evaluationId == undefined) {
        // evaluationId: "1583969129931"
        // this.selectedEvalItem.evaluationId = "";

        this.selectedEvalItem = {
          allowResubmit: false,
          calltoAction: [],
          coachCategories: [],
          createdAt: null,
          createdBy: "",
          customerId: "",
          evaluationId: null,
          evaluationRoomDesc: null,
          evaluationRoomName: null,
          lockAfterSubmit: false,
          questionsList: [],
          strategyId: "",
          strategyName: "",
          updatedAt: null,
          updatedBy: "",
          userCoaches: [],
          userEvaluator: [],
          userModerator: []
        }
      }
      // console.log(this.selectedEvalItem);
      // console.log(this.selectedEvalItem.evaluationId);
      // if(this.selectedEvalItem.evaluationRoomName == undefined) {
      //   this.selectedEvalItem.evaluationRoomName = "";
      // }
      if (this.selectedEvalItem.evaluationId == null && this.category != undefined && this.category != '' && this.category != null) {
        this.coachModel.evaluationform_id = this.category;
        let currentEvaluation;
        this.EvalItemDDL.forEach(element => {
          if (element.value == this.category) {
            currentEvaluation = element.label;
          }
        });
        this.coachModel.evaluationform_name = currentEvaluation;
      } else {
        this.coachModel.evaluationform_id = this.selectedEvalItem.evaluationId;
        this.coachModel.evaluationform_name = this.selectedEvalItem.evaluationRoomName
      }

      this.coachModel.selected_eval_details = this.interactionListData;
      // this.coachModel.agent_id = this.agentIDfromFilter;

      if (this.agentCategory?.value == undefined) {
        this.TempAgent.forEach(element => {
          if (element.label == this.agentCategory) {
            this.coachModel.agent_id = element.value;
          }
        });
      } else {
        this.coachModel.agent_id = this.agentCategory.value;
      }

      this.spinnerService.show();
      this.ew_NACDservice.saveCoachDetails(this.coachModel).subscribe(
        (data: any) => {
          this.closebutton.nativeElement.click();
          this.interactionListData = [];
          this.submitted = false;
          this.registerForm.reset();
          this.coachModel = new CoachingModel();
          this.spinnerService.hide();
          this.followUPdate = new Date();
          this.followUPdate.setDate(this.followUPdate.getDate() + 14);
          this.commonMethods.addToastforlongtime(true, data.result);
        },
        (error) => {
          console.log(error);
          this.closebutton.nativeElement.click();
          this.spinnerService.hide();
          this.commonMethods.addToastforlongtime(false, error.error)
        }
      )

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
    console.log("reload called")
    this.interactionListData = [];
    this.questionsList = null;
    this.allNotes = [];
    this.transcriptTab = [];
    this.videoUrl = [];
    this.getTopicReport = [];
    this.currentContact = '';
    this.agentLabelID = null;
    this.totalScore = 0;
    this.totalQues = 0;
    this.totalNotes = 0;
    this.tableIntList = false;
    this.agentDDLform = [];
    this.selectionHandle = null
    this.refreshBtn(false);
    this.nonACDAgentDropdown = false;
    this.isEvaluationTabs = false;
    this.playerSelectedCategories = this.playerDisplayCategories
    this.playbackIndex = '1.0';  
    this.selectedIndex = 2;
    if($("#audio-spectrum").hasClass('autoHeight')){
        $("#audio-spectrum").removeClass('autoHeight')
      }

    if (this.agentItem?.length > 0) {
      this.agentCategory = this.agentItem[0].value;
    }
    if (this.EvalItemDDL?.length > 0) {
      this.category = this.EvalItemDDL[0].value;
    }
    if (!!document.getElementById('dossierContainer1')) {
      if (this.isloadSpinner == false) {
        document.getElementById('dossierContainer1').style.display = 'none';
        this.isloadSpinner = true;
        const tableId = document.getElementById('dossierContainer1');
        microstrategy.dossier.destroy({ placeholder: tableId });
      }
      this.dossierTable();
      this.spinnerService.hide();
      setTimeout(() => {
        this.isloadSpinner = false;
        document.getElementById('dossierContainer1').style.display = 'block';
      }, 7000);
    }
  }

  async ReplaceSlashFuction(feedback) {
    if (feedback != null && feedback != undefined && feedback != "" && feedback.length > 1) {
      // feedback = feedback.replace(/\//g, '');
      feedback = await feedback.replace(/\\n/g, '');
      feedback = await feedback.replace(/\//g, '');
      feedback = await feedback.replace(/\\/g, '');
      feedback = await feedback.replace(/\|/g, '');
      setTimeout(() => {
        this.coachModel.feedback = feedback;
      }, 10);
    }

  }


  async ReplaceSlashFuctionActionitem(feedback) {
    if (feedback != null && feedback != undefined && feedback != "" && feedback.length > 1) {
      // feedback = feedback.replace(/\//g, '');
      feedback = await feedback.replace(/\\n/g, '');
      feedback = await feedback.replace(/\//g, '');
      feedback = await feedback.replace(/\\/g, '');
      feedback = await feedback.replace(/\|/g, '');
      setTimeout(() => {
        this.coachModel.actionitem = feedback;
      }, 100);
    }
  }

  async ReplaceSlashFuctionEvaluationForm(feedback, i) {
    this.questionsList.forEach((data: any) => {
      data.Topics.questions.forEach((element, index) => {

        if (index == i) {
          if (element.questionChoice == "Comments") {
            // console.log(element.questionChoice);
            if (feedback != null || feedback != undefined) {
              // feedback = feedback.replace(/\//g, '');
              feedback = feedback.replace(/\\n/g, '');
              feedback = feedback.replace(/\//g, '');
              feedback = feedback.replace(/\\/g, '');
              feedback = feedback.replace(/\|/g, '');
              setTimeout(() => {
                return element.answerdata = feedback;
              }, 100);
            }
          }
        }


      });
    })
  }

  getplatformValidate() {
    return new Promise((resolve, reject) => {
      this.preferenceService.getPlatformDetail.subscribe(
        (data: any) => {
          resolve(data.platformId)
        }
      ),
        (error) => {
          reject(error)
          console.log(error)
          this.spinnerService.hide();
        }
    })
  }

  TempAgent: any = [];
  getAgentDDL(platformId) {
    return new Promise((resolve, reject) => {
      this.partitionService.getCustomDataOption(platformId).subscribe(
        (data: any) => {
          this.TempAgent = data.Agents;
          data.Agents.map(ele => {
            let lableValue = {
              label: ele.label,
              value: ele.label
            }
            this.agentItem.push(lableValue)
          })
          if ((this.agentCategory == '' || this.agentCategory == null) && this.agentItem?.length > 0) {
            this.agentCategory = this.agentItem[0].value;
          }
          resolve(true)
        },
        (error) => {
          reject(error)
          console.log(error)
          this.spinnerService.hide();
        }
      )
    })

  }

  async conditionalSkipQuestionShow(j, i, questionsList) {

    let countReset = 0;
    // Reset invalid Answers and their related values
    // if(countReset==0) {
    //   await this.tempraryResetData(j, i);
    // }
    // Get All Question with Answer in Evaluation Workspace
    let questionListAll = [];
    // questionListAll = questionsList;
    await questionsList?.forEach((elementT1) => {
      elementT1.Topics.questions.forEach(elementT2 => {
        questionListAll.push(elementT2);
      });
    });

    // Conditional Skip Question show/hide function
    // await questionListAll.forEach((elementQuestAns, indexT) => {
    await this.questionsList.forEach((elementTopic: any, indexTopic) => {
      let topicCount = 0;
      elementTopic.Topics.questions.forEach((elementQuest, indexQuestion) => {
        let count = 0;
        let conditionCheck = 0;

        //  First Qustion show Code block
        if (indexTopic == 0 && indexQuestion == 0) {
          if (elementQuest.conditionalSkipQuestion == undefined) {
            elementQuest.conditionalSkipQuestion = true;
            // && elementQuest.conditionalSkip && (elementQuest.conditionalSkipDetails.length==0 || elementQuest.conditionalSkipDetails==undefined)
          } else {
            elementQuest.conditionalSkipQuestion = true;
          }
        } else {
          if (elementQuest.conditionalSkipQuestion == undefined || elementQuest.conditionalSkip == false) {
            elementQuest.conditionalSkipQuestion = true;
          }
        }

        if (elementQuest.conditionalSkip && elementQuest.conditionalSkipDetails != null && elementQuest.conditionalSkipDetails !== undefined) {
          if (elementQuest.conditionalSkipDetails?.conditionMet == 'Any') {

            elementQuest.conditionalSkipDetails.conditionalList.forEach(elementCSQuest => {
              questionListAll.forEach((elementQuestAns, indexT) => {
                if (elementCSQuest.conditionalQuestion.id == elementQuestAns.questionId) {
                  // if(elementCSQuest.conditionalQuestion.id == elementQuestAns.questionId && elementCSQuest.conditionalQuestion.id!=undefined && elementQuestAns.questionId!=undefined) {

                  if (elementCSQuest.conditionalQuestion.questionChoice == elementQuestAns.questionChoice && elementQuestAns.questionChoice == 'Number') {
                    let getConditionalValues;
                    if (elementCSQuest.conditionalValue?.toString().includes('=')) {
                      getConditionalValues = elementCSQuest.conditionalValue.split('=');
                    }
                    if (elementCSQuest.conditionalValue?.toString().includes('-')) {
                      getConditionalValues = elementCSQuest.conditionalValue.split('-');
                    }
                    // if(elementQuest.conditionalSkip && (elementQuest.conditionalSkipDetails.conditionalList.length==0 || elementQuest.conditionalSkipDetails.conditionalList?.conditionalList==undefined)) {
                    //   count = count + 1;
                    // }
                    if (parseInt(elementQuestAns.numberValue) >= parseInt(getConditionalValues[0]) && parseInt(elementQuestAns.numberValue) <= parseInt(getConditionalValues[1])) {
                      count = count + 1;
                      conditionCheck = conditionCheck + 1;
                    } else {
                      conditionCheck = conditionCheck + 1;
                    }
                  }
                  if (elementCSQuest.conditionalQuestion.questionChoice == elementQuestAns.questionChoice && elementQuestAns.questionChoice == 'Choice') {
                    // if(elementQuest.conditionalSkip && (elementQuest.conditionalSkipDetails.conditionalList.length==0 || elementQuest.conditionalSkipDetails?.conditionalList==undefined)) {
                    //   count = count + 1;
                    // }
                    const getConditionalValues = elementCSQuest.conditionalValue.split(',');
                    let choiceCount = 0;
                    getConditionalValues.forEach(elementCSQVal => {
                      if (
                        // elementQuestAns.answerdata?.Answer+'='+elementQuestAns.answerdata?.Score == elementCSQVal || elementQuestAns.answerdata?.Answer+'-'+elementQuestAns.answerdata?.Score == elementCSQVal 
                        elementQuestAns.answerdata?.Answer == elementCSQVal.split('=')[0] || elementQuestAns.answerdata == elementCSQVal.split('=')[0]
                      ) {
                        choiceCount = choiceCount + 1;
                        if (choiceCount >= 1) {
                          count = count + 1;
                          conditionCheck = conditionCheck + 1;
                        }
                      } else {
                        conditionCheck = conditionCheck + 1;
                      }
                    });
                  }
                  if (elementCSQuest.conditionalQuestion.questionChoice == elementQuestAns.questionChoice && elementQuestAns.questionChoice == 'Yes/No') {
                    // if(elementQuest.conditionalSkip && (elementQuest.conditionalSkipDetails.conditionalList.length==0 || elementQuest.conditionalSkipDetails?.conditionalList==undefined)) {
                    //   count = count + 1;
                    // }
                    if (
                      //   elementCSQuest.conditionalValue == elementQuestAns.answerdata?.Answer+'='+elementQuestAns.answerdata?.Score || 
                      // elementCSQuest.conditionalValue == elementQuestAns.answerdata?.Answer+'-'+elementQuestAns.answerdata?.Score 
                      elementCSQuest.conditionalValue.split('=')[0] == elementQuestAns.answerdata?.Answer || elementCSQuest.conditionalValue.split('=')[0] == elementQuestAns.answerdata
                    ) {
                      count = count + 1;
                      conditionCheck = conditionCheck + 1;
                    } else {
                      conditionCheck = conditionCheck + 1;
                    }
                  }
                  if (elementCSQuest.conditionalQuestion.questionChoice == elementQuestAns.questionChoice && elementQuestAns.questionChoice == 'Comments') {
                    // if(elementQuest.conditionalSkip && (elementQuest.conditionalSkipDetails.conditionalList.length==0 || elementQuest.conditionalSkipDetails?.conditionalList==undefined)) {
                    //   count = count + 1;
                    // }
                    if (elementCSQuest.conditionalValue == elementQuestAns.answerdata) {
                      count = count + 1;
                      conditionCheck = conditionCheck + 1;
                    } else {
                      conditionCheck = conditionCheck + 1;
                    }
                  }
                }
              });
            });

            // Final Condition of Any condiion section
            if (count > 0 && conditionCheck > 0) {
              elementQuest.conditionalSkipQuestion = true;
            } else {
              if (count == 0 && conditionCheck > 0) {
                if (elementQuest.questionChoice != 'Number') {
                  elementQuest.answerdata = null;
                } else {
                  elementQuest.numberValue = null;
                }
                elementQuest.conditionalSkipQuestion = false;
              } else if (conditionCheck == 0) {
                if (elementQuest.questionChoice != 'Number') {
                  elementQuest.answerdata = null;
                } else {
                  elementQuest.numberValue = null;
                }
                elementQuest.conditionalSkipQuestion = false;
              } else {
                if (elementQuest.questionChoice != 'Number') {
                  elementQuest.answerdata = null;
                } else {
                  elementQuest.numberValue = null;
                }
                elementQuest.conditionalSkipQuestion = false;
              }
              this.CalculateScore();
            }
            if (elementQuest.conditionalSkip && (elementQuest.conditionalSkipDetails.conditionalList.length == 0 || elementQuest.conditionalSkipDetails.conditionalList[0]?.conditionalQuestion == null)) {
              elementQuest.conditionalSkipQuestion = true;
            }

          }

          if (elementQuest.conditionalSkipDetails?.conditionMet == 'All') {

            elementQuest.conditionalSkipDetails.conditionalList.forEach(elementCSQuest => {
              questionListAll.forEach((elementQuestAns, indexT) => {
                if (elementCSQuest.conditionalQuestion.id == elementQuestAns.questionId || elementCSQuest.conditionalQuestion.id == elementQuestAns.questionid) {
                  if (elementCSQuest.conditionalQuestion.questionChoice == elementQuestAns.questionChoice && elementQuestAns.questionChoice == 'Number') {
                    // const getConditionalValues = elementCSQuest.conditionalValue.split('-');
                    let getConditionalValues;
                    if (elementCSQuest.conditionalValue?.toString().includes('=')) {
                      getConditionalValues = elementCSQuest.conditionalValue.split('=');
                    }
                    if (elementCSQuest.conditionalValue?.toString().includes('-')) {
                      getConditionalValues = elementCSQuest.conditionalValue.split('-');
                    }
                    // console.log(elementQuest.conditionalSkip);
                    // console.log(elementQuest.conditionalSkipDetails);
                    // console.log(elementQuest.conditionalSkipDetails.length);

                    // if(elementQuest.conditionalSkip && (elementQuest.conditionalSkipDetails.conditionalList.length==0 || elementQuest.conditionalSkipDetails?.conditionalList==undefined)) {
                    //   count = count + 1;
                    // }
                    // && indexQuestion==0
                    // if( indexTopic ==1 && indexQuestion==0) {
                    //   console.log('getConditionalValues', getConditionalValues);
                    //   console.log('elementQuestAns', elementQuestAns);
                    //   console.log('test', parseInt(elementQuestAns.numberValue) >= parseInt(getConditionalValues[0]) && parseInt(elementQuestAns.numberValue) <= parseInt(getConditionalValues[1]));
                    // }

                    // if( parseInt(elementQuestAns.numberValue) >= parseInt(getConditionalValues[0]) && parseInt(elementQuestAns.numberValue) <= parseInt(getConditionalValues[1])) {
                    if (parseInt(elementQuestAns.numberValue) >= parseInt(getConditionalValues[0]) && parseInt(elementQuestAns.numberValue) <= parseInt(getConditionalValues[1])) {
                      count = count + 1;
                      conditionCheck = conditionCheck + 1;
                    } else {
                      conditionCheck = conditionCheck + 1;
                    }
                  }
                  if (elementCSQuest.conditionalQuestion.questionChoice == elementQuestAns.questionChoice && elementQuestAns.questionChoice == 'Choice') {
                    const getConditionalValues = elementCSQuest.conditionalValue.split(',');
                    let choiceCount = 0;
                    // if(elementQuest.conditionalSkip && (elementQuest.conditionalSkipDetails.conditionalList.length==0 || elementQuest.conditionalSkipDetails?.conditionalList==undefined)) {
                    //   count = count + 1;
                    // }
                    getConditionalValues.forEach(elementCSQVal => {
                      if (indexTopic == 0 && indexQuestion == 3) {
                        // console.log('elementQuestAns.answerdata?.Answer', elementQuestAns.answerdata?.Answer);
                        // console.log('elementCSQVal.split', elementCSQVal.split('=')[0]);
                        // console.log('Check', elementQuestAns.answerdata?.Answer == elementCSQVal.split('=')[0]);
                      }

                      if (elementQuestAns.answerdata?.Answer == elementCSQVal.split('=')[0] || elementQuestAns.answerdata == elementCSQVal.split('=')[0]) {
                        // elementQuestAns.answerdata?.Answer+'='+elementQuestAns.answerdata?.Score == elementCSQVal.split('=')[0]
                        choiceCount = choiceCount + 1;
                        if (choiceCount >= 1) {
                          count = count + 1;
                          conditionCheck = conditionCheck + 1;
                        }
                      } else {
                        conditionCheck = conditionCheck + 1;
                      }
                    });
                  }
                  if (elementCSQuest.conditionalQuestion.questionChoice == elementQuestAns.questionChoice && elementQuestAns.questionChoice == 'Yes/No') {
                    // if(elementQuest.conditionalSkip && (elementQuest.conditionalSkipDetails.conditionalList.length==0 || elementQuest.conditionalSkipDetails?.conditionalList==undefined)) {
                    //   count = count + 1;
                    // }
                    if (indexTopic == 1 && indexQuestion == 0) {
                      // console.log('test', elementCSQuest.conditionalValue == answerValueObjectYesNo?.Answer+'='+answerValueObjectYesNo?.Score);
                    }
                    if (
                      elementCSQuest.conditionalValue.split('=')[0] == elementQuestAns.answerdata?.Answer || elementCSQuest.conditionalValue.split('=')[0] == elementQuestAns.answerdata
                    ) {
                      count = count + 1;
                      conditionCheck = conditionCheck + 1;
                    } else {
                      conditionCheck = conditionCheck + 1;
                    }
                  }
                  if (elementCSQuest.conditionalQuestion.questionChoice == elementQuestAns.questionChoice && elementQuestAns.questionChoice == 'Comments') {
                    // if(elementQuest.conditionalSkip && (elementQuest.conditionalSkipDetails.conditionalList.length==0 || elementQuest.conditionalSkipDetails?.conditionalList==undefined)) {
                    //   count = count + 1;
                    // }
                    if (elementCSQuest.conditionalValue == elementQuestAns.answerdata) {
                      count = count + 1;
                      conditionCheck = conditionCheck + 1;
                    } else {
                      conditionCheck = conditionCheck + 1;
                    }
                  }
                }
              });
            });

            // Final Condition of Any condiion section

            if (count >= elementQuest.conditionalSkipDetails.conditionalList.length && conditionCheck > 0) {
              elementQuest.conditionalSkipQuestion = true;
              // console.log('conditionalSkipDetails', elementQuest);
            } else {
              if (count < elementQuest.conditionalSkipDetails.conditionalList.length && conditionCheck > 0
                // && (elementQuest.answerdata == null || (elementQuest.answerdata.Answer == null || elementQuest.answerdata.Score == null)) && (elementQuest.defaultanswer != null || elementQuest.defaultanswer != undefined) 
              ) {
                // if(elementQ.answerdata == null || (element.answerdata.Answer == null || element.answerdata.Score == null)) {
                //   if((element.defaultanswer != null || element.defaultanswer != undefined)) {
                if (elementQuest.questionChoice != 'Number') {
                  elementQuest.answerdata = null;
                } else {
                  elementQuest.numberValue = null;
                }
                elementQuest.conditionalSkipQuestion = false;
              } else if (conditionCheck == 0) {
                if (elementQuest.questionChoice != 'Number') {
                  elementQuest.answerdata = null;
                } else {
                  elementQuest.numberValue = null;
                }
                elementQuest.conditionalSkipQuestion = false;
              } else {
                if (elementQuest.questionChoice != 'Number') {
                  elementQuest.answerdata = null;
                } else {
                  elementQuest.numberValue = null;
                }
                elementQuest.conditionalSkipQuestion = false;
              }
              this.CalculateScore();
            }

            if (elementQuest.conditionalSkip && (elementQuest.conditionalSkipDetails.conditionalList.length == 0 || elementQuest.conditionalSkipDetails.conditionalList[0]?.conditionalQuestion == null)) {
              elementQuest.conditionalSkipQuestion = true;
            }

          }
        }

        // Topic show/hide count section
        if (elementQuest.conditionalSkipQuestion == true) {
          topicCount = topicCount + 1;
        }
      });

      // Topic show/hide section
      // if(topicCount >= elementTopic.Topics.questions.length) {
      if (topicCount > 0) {
        if (elementTopic.topicShowHide == undefined) {
          elementTopic.topicShowHide = true;
        } else {
          elementTopic.topicShowHide = true;
        }
      } else {
        if (elementTopic.topicShowHide == undefined) {
          elementTopic.topicShowHide = false;
        } else {
          elementTopic.topicShowHide = false;
        }
      }
      if (indexTopic == 0) {
        elementTopic.topicShowHide = true;
      }
    });

  }

  validateMstrReportId() {
    let params = {
      dossierId: this.DossierId,
      reportType: "55",
      AuthToken: JSON.parse(localStorage.getItem('mstrAuthToken')),
      projectId: this.projectID
    }
    return new Promise((resolve, reject) => {
      this.subscription_ValidateReportID =  this.keyQuestionsService.validateMstrReportId(params).subscribe(
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

  mstrValidToken() {
    const idToken = JSON.parse(localStorage.getItem("mstrIdToken"))['x-mstr-identitytoken'];
    const authToken = JSON.parse(localStorage.getItem('mstrAuthToken'))
    let params = {
      ID_TOKEN: idToken,
      AUTH_TOKEN: authToken
    }
    return new Promise((resolve, reject) => {
      this.subscription_mstrValidToken = this.ew_NACDservice.mstrValidToken(params).subscribe(
        (data: any) => {
          // console.log(data)
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
  isMediaScreenLoader: boolean = false;
  getVideoUrl(convID) {
    this.ew_NACDservice.getMediaUrl(convID).subscribe((data: any) => {
      this.videoUrl = data.url;
      this.isMediaScreenLoader = false;
      if (data.statusCode == 202) {
        this.isMediaScreenLoader = true;
        this.videoUrl = [];
        this.ew_NACDservice.getMediaUrl(convID).subscribe((param: any) => {
          this.videoUrl = param.url;
          this.isMediaScreenLoader = false;
        },
          (error) => {
            console.log(error);
            this.isMediaScreenLoader = false;
          })
      }
    },
      (error) => {
        console.log(error);
        this.isMediaScreenLoader = false;
      })
  }

  platformId: number;
  isMediaScreen: boolean = false;
  getPlatformValidation() {
    return new Promise((resolve, reject) => {
      this.preferenceService.getPlatformDetail.subscribe((data: any) => {
        this.platformId = data.platformId;
        this.isMediaScreen = data.isMediaScreen != undefined ? data.isMediaScreen : false;
        resolve(data)
      },
        (error) => {
          reject(error)
          console.log(error);
        })

    })
  }

  isCopy: boolean = false;
  indexTexti: any;
  indexTextj: any;

  tickFun(i, j, val) {
       this._clipboardService.copy(val);
      this.indexTexti = i;
      this.indexTextj = j;
      this.isCopy = true;
      setTimeout(() => {
        this.isCopy = false;
      }, 2000);
    }

   validateLink(displayAs,quesDesc,URL){
     if(displayAs != null && displayAs != undefined && quesDesc != null && quesDesc != undefined && displayAs != '' && quesDesc != ''){
        let displayAsMatch = quesDesc.match(displayAs)
        setTimeout(() => {
          if(!!document.getElementById('hyper')){
          const hyperlink = document.getElementById('hyper')
          const Link = URL.split('//').length == 1 ? "<a style='text-decoration: underline;color: #0000EE;' tooltip=\""+ "https://" + URL +"\" href=\""+ "https://" + URL+"\" target=\"_BLANK\">"+displayAsMatch[0]+"</a>" : "<a style='text-decoration: underline;color: #0000EE;' tooltip=\""+ URL +"\" href=\""+ URL+"\" target=\"_BLANK\">"+displayAsMatch[0]+"</a>";
          hyperlink.innerHTML = hyperlink.innerHTML.split(displayAsMatch[0]).join(Link)
          }
        }, 20);
     }
  }

   // !!! keep this ngOnDestroy method at last ,please verify if anybody work on this component !!!
  ngOnDestroy() {
    if (this.subscription_DossierID) {
      this.subscription_DossierID.unsubscribe();
    }
    if (this.subscription_ValidateReportID) {
      this.subscription_ValidateReportID.unsubscribe();
    }
    if (this.subscription_mstrValidToken) {
      this.subscription_mstrValidToken.unsubscribe();
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

