import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var require: any;
import { utils } from '../../../config';
import { MenuItem } from 'primeng/api';
import { CommonMethods } from '../../../common/common.components';
import { KeyQuestionsService } from '../../analyze/key-questions/key-questions.service';
import { MstrTokenService } from '../../../services/mstrtoken.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EvaluationWorkspaceService } from '../evaluation-workspace/evaluation-workspace.service';
import UserData from '../../../user';
import { LoginService } from '../../login/login.service';
import { InteractionService } from '../../interaction-details/interaction-details.service';
import { EvaluateSaveModel, NotesModel } from '../evaluation-workspace/evaluation-workspace.model';
import { GlobalComponent } from '../../../global/global.component';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { EvaluationWorkspaceNacdService } from '../evaluation-workspace-nacd/evaluation-workspace-nacd.service';
import { PreferenceService } from '../../settings/successkpi-setting/successkpi-setting.service';

import WaveSurfer from 'wavesurfer.js/dist/wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.js'
import MarkersPlugin from 'wavesurfer.js/src/plugin/markers/index.js'
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js'
import * as moment from 'moment';
import { ClipboardService } from 'ngx-clipboard';

declare var microstrategy: any;
@Component({
  selector: 'app-manage-dispute',
  templateUrl: './manage-dispute.component.html',
  styleUrls: ['./manage-dispute.component.css']
})
export class ManageDisputeComponent implements OnInit {
  audioUrl: string = 'null';
  ws: any;
  items1: MenuItem[];
  tabMenuName: string = "Transcript";
  totalScore: number = 0;
  totalQues: number = 0;
  totalNotes: number = 0;
  totalCountQues: number = 0;
  totalCountNotes: number = 0;
  public notesModel: NotesModel;
  public evaluatesaveModel: EvaluateSaveModel;
  // evaluation_coach: boolean = false;
  disableqa: boolean = false;
  disablecoach: boolean = false;
  evaluatorDropdown: any = [];
  selectedEvaluator: string = "";
  ismoderator: boolean = false;
  allowResubmit: boolean = false;
  convCategory: string = null;
  category: string = "";
  resubmitEnable: boolean = false;
  isloadSpinner: boolean = false;
  currentContact: string = "";
  currentAgent: string = "";
  DossierId: any = null;
  projectID: any = null;
  currentEvaluationId: string = "";
  videoUrl: any = [];
  subscription_DossierID: Subscription;
  subscription_ValidateReportID: Subscription;
  subscription_mstrValidToken: Subscription;
  sentiment_data: any
  sentenceSentiment: any = null;
  sentimentBySentence_data: any;
  getTopicReportTime: any = []

  constructor(private mstrTokenService: MstrTokenService, private spinnerService: NgxSpinnerService, public keyQuestionsService: KeyQuestionsService, private commonMethods: CommonMethods,
    public evService: EvaluationWorkspaceService, private loginService: LoginService, private interactionService: InteractionService, public global: GlobalComponent, public ew_NACDservice: EvaluationWorkspaceNacdService, private preferenceService: PreferenceService,private _clipboardService: ClipboardService) {
    this.getEvalFromDB();
    this.roleslist();
    this.commonMethods.dynamicBackgroundColorChange('default');
    this.notesModel = new NotesModel();
    this.evaluatesaveModel = new EvaluateSaveModel();
  }

  ngOnInit(): void {
    this.getPlatformValidation().then(() => {
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

    })
    this.getEvaluationDossiers();

    // this.getEvaluationDossiers(this.convCategory, '');
    // this.onChangeEvaluationDDl();
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

  }

  // doublePlaybackSpeed(playbackIndex) {
  //   if (playbackIndex === 5) {
  //    this.playbackIndex = 0;
  //    this.ws.setPlaybackRate(this.playbackSpeed[this.playbackIndex]);
  //   } else {
  //    this.playbackIndex = playbackIndex + 1;
  //    this.ws.setPlaybackRate(this.playbackSpeed[this.playbackIndex]);
  //   }
  // }

  audioPlayerInit() {
    if (this.audioUrl != '' && this.audioUrl != 'null' && this.audioUrl != environment.uiUrl + '/' + 'assets/mp3/0917.mp3') {
      if (typeof (this.ws) == 'object' && typeof (this.ws.destroy) == 'function') {
        this.ws.destroy();
      }
      
      this.getRegions();
      this.getNotesPlayerData();
      this.getTopicsPlayerData();
      this.getSentimentPlayerData();
      //console.log("region called")
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
      if (this.audioUrl != '' && this.audioUrl != 'null') {
        this.ws.on('finish', function () {
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

  getTimePlayer: any;
  getTimeMediaPlayer() {
    setTimeout(() => {
      let time = this.ws.getCurrentTime().toString();
      this.getTimePlayer = time
      // this.getTimePlayer = time[0].padStart(2, "0") + ":" + time[1].slice(0,2);
      // console.log(this.getTimePlayer);
    }, 10);

  }

  notesPopup: boolean = false;
  addnotes() {
    if (this.notesPopup == false) {
      this.notesModel = new NotesModel();
      this.notesPopup = true;
    }
    else {
      this.notesPopup = false;
    }
  }
  closenotes() {
    this.notesPopup = false
    this.notesModel = new NotesModel();
    this.errValNotes = false;
    this.conversationID = false;
    this.errTime = false;
  }

  // getMstrConfig() {
  //   return new Promise((resolve, reject) => {
  //   this.subscription =  this.keyQuestionsService.getMstrConfig().subscribe(
  //       (data: any) => {
  //         resolve(data)
  //       },
  //       (error) => {
  //         console.log(error);
  //         reject(error)
  //         this.commonMethods.addToastforlongtime(false, error.error)
  //       })
  //   })
  // }

  disputeURL: string = null;
  // getEvaluationDossiers(convID, formName) {
  //   // this.getDossierID().then((res) => {
  //   //       this.dossierTable();
  //   // })
  //   this.disputeURL = ""
  //   this.spinnerService.show();
  //   this.getMstrConfig().then((configId: any) => {
  //     this.validateMstrReportId(configId.project_id, configId.manage_dispute_dossierId).then((validId: any) => {
  //           if(Object.keys(configId).length){
  //       //  let convID = null;
  //           this.disputeURL = configId.Mstr_Manage_Dispute;
  //             this.disputeURL = this.disputeURL.replace("{{mstrServer}}", configId.mstrServer);
  //             this.disputeURL = this.disputeURL.replace("{{project}}", configId.project);
  //             this.disputeURL = this.disputeURL.replace("{{documentID}}", configId.manage_dispute_dossierId);
  //             this.disputeURL = this.disputeURL + '&valuePromptAnswers=' + convID + "%5e" + formName;
  //             this.disputeURL = this.disputeURL + '&hiddensections=' + this.global.hiddenSections;
  //             this.disputeURL = this.disputeURL + '&usrSmgr=' + localStorage.getItem('_mstrweb');
  //             this.disputeURL = this.disputeURL + '&share=1';
  //         }
  //         else{
  //           this.commonMethods.addToastforlongtime(false, 'No Reports Found');
  //         }
  //       })
  //        this.spinnerService.hide();
  //     }
  //   ),
  //   (error)=>{
  //     console.log(error);
  //     this.commonMethods.addToastforlongtime(false, error.error);
  //     this.spinnerService.hide();
  //   }
  // }

  // DossierId: any;
  // projectID: any;
  // getDossierID() {
  //   return new Promise((resolve, reject) => {
  //     this.spinnerService.show();
  //     this.keyQuestionsService.getMstrConfig().subscribe(
  //       (data: any) => {
  //         this.DossierId = typeof (data.manage_dispute_dossierId) != 'undefined' ? data.manage_dispute_dossierId : null;
  //         this.projectID = data.project_id;
  //         this.spinnerService.show();
  //         resolve(data)
  //       },
  //       (error) => {
  //         reject(error);
  //         console.log(error);
  //         this.spinnerService.hide();
  //         this.commonMethods.addToastforlongtime(false, "Invalid Dossier URL")
  //       }
  //     )
  //   })
  // }

  AllEvalData: any = []
  getEvalFromDB() {
    this.AllEvalData = [];
    return new Promise((resolve, reject) => {
      this.ew_NACDservice.getEvaluationForms().subscribe(
        (data: any) => {
          if (data.length > 0 || data != undefined || data != null) {
            data.forEach(element => {
              let LabelObj = {
                label: element.evaluationRoomName,
                value: element.evaluationId
              }
              this.AllEvalData.push(LabelObj);
            });
            resolve(this.AllEvalData);
          }
          this.EvalItemDDL = this.AllEvalData;

        },
        (err) => {
          console.log(err)
          reject(err)
        }
      )
    })
  }

  EvalItemDDL: any = [];
  // mstrIdToken: any;
  // idToken: any;
  istableGet: boolean = true;
  // dossier1: any = null;
  // dossierFilterList: any;
  // conversationItem:any = ['All'];

  // dossierTable() {
  //   this.EvalItemDDL = [];

  //   this.conversationItem = ['All'];
  //   this.convCategory = '';
  //   this.category = ""

  //   let EvalRes: any = []
  //   try {
  //     this.getEvalFromDB().then((response) => {
  //       EvalRes = response
  //     })
  //     let projectID = this.projectID;
  //     let dossierID = this.DossierId
  //     this.mstrIdToken = localStorage.getItem("mstrIdToken");
  //     this.mstrIdToken = JSON.parse(this.mstrIdToken);
  //     this.idToken = "?idToken=" + this.mstrIdToken['x-mstr-identitytoken'];

  //     let projectUrl = environment.mstr_Url + projectID;
  //     let dossierUrl = projectUrl + '/' + dossierID + this.idToken;
  //     let refershbtn = document.getElementById('refresh-btn-dossier');
  //     this.spinnerService.show();
  //     let filterList = [
  //       {
  //         "name": "Conversation ID", 
  //         "selections": [
  //           {"id": "f55539cb-fe08-4860-ae7d-edb2f6e3549e"}
  //         ]
  //       }
  //     ];
  //     if (this.mstrIdToken['x-mstr-identitytoken'] == undefined) {
  //       this.spinnerService.hide();
  //     }
  //     setTimeout(() => {
  //       this.spinnerService.hide();
  //     }, 10000);
  //     microstrategy.dossier.create({
  //       placeholder: document.getElementById("dossierContainer1"),
  //       url: dossierUrl,
  //       enableResponsive: false,
  //       errorHandler: function () {
  //         this.spinnerService.hide()
  //       }.bind(this),
  //       filterFeature: {
  //         enabled: false
  //       },
  //       filters: filterList
  //     }).then(function (dossier) {
  //       this.dossier1 = dossier;
  //       this.dossier1.filterClearAll();
  //       this.dossier1.getFilterList().then(function (filterList) {
  //         this.dossierFilterList = filterList
  //         for (var i = 0; i < filterList.length; i++) {
  //           var filter = filterList[i];
  //           var availableFilterName = filter.filterName;
  //           var availableFilterKey = filter.filterKey;
  //           // console.log("availableFilterName",availableFilterName);
  //           // console.log("availableFilterKey",availableFilterKey);

  //           if (availableFilterName == "Evaluation Room") {

  //             let availableFilterItems = [];
  //             availableFilterItems = filter.filterDetail.items;
  //             availableFilterItems.forEach(element => {
  //               EvalRes.forEach(dbItem => {
  //                 if (dbItem.label == element.name) {
  //                   let labelVal = {
  //                     label: element.name,
  //                     value: element.value
  //                   }
  //                   if (this.localRole.toLowerCase() != 'admin' && this.roleEvalForm != null) {
  //                     if (dbItem.value == this.roleEvalForm) {
  //                       this.EvalItemDDL.unshift(labelVal)
  //                     }
  //                     else {
  //                       this.EvalItemDDL.push(labelVal);
  //                     }
  //                   }
  //                   else {
  //                     this.EvalItemDDL.push(labelVal);
  //                   }
  //                 }
  //               });

  //             });
  //             // console.log( this.EvalItemDDL)
  //             this.category = this.EvalItemDDL[0].value;
  //             let selections = [];
  //             let filterInfoObj = {
  //               key: availableFilterKey
  //             };
  //             let selectionObj = {
  //               name: "Evaluation Room",
  //               value: this.category,
  //             };
  //             selections.push(selectionObj);
  //             let filterDataObj = {
  //               selections: selections,
  //               filterInfo: filterInfoObj
  //             }
  //             if (this.category.length == 0 || this.category == null) {
  //               this.dossier1.filterClear(filterDataObj);
  //             }
  //             else {
  //               this.dossier1.filterSelectMultiAttributes(filterDataObj);
  //             }


  //           }
  //           // else if (availableFilterName == "Conversation ID") {
  //           //   let availableFilterItems = [];
  //           //   availableFilterItems = filter.filterDetail.items;
  //           //   availableFilterItems.forEach(element => {
  //           //     this.conversationItem.push(element.name);
  //           //   });
  //           // }
  //           refershbtn.click();
  //           this.AgentDDL = true;
  //         }
  //         this.getEvalutionItems();
  //         this.spinnerService.hide();

  //         refershbtn.addEventListener('click', function (e) {
  //           this.totalScore = 0;
  //           this.totalQues = 0;
  //           this.totalNotes = 0;
  //           for (var i = 0; i < filterList.length; i++) {
  //             var filter = filterList[i];
  //             var availableFilterName = filter.filterName;
  //             var availableFilterKey = filter.filterKey;

  //             if (availableFilterName == "Evaluation Room") {
  //               let ele_val = '';
  //               let selections = [];
  //               let filterInfoObj = {
  //                 key: availableFilterKey
  //               };
  //               this.EvalItemDDL.forEach(element => {

  //                 if (this.selectedLabel == undefined || this.selectedLabel == null) {
  //                   this.selectedLabel = this.selectlabelDB
  //                 }
  //                 if (element.label == this.selectedLabel) {
  //                   ele_val = element.value
  //                 }
  //               });
  //               let selectionObj = {
  //                 name: "Evaluation Room",
  //                 value: ele_val
  //               };
  //               selections.push(selectionObj);
  //               let filterDataObj = {
  //                 selections: selections,
  //                 filterInfo: filterInfoObj
  //               }
  //               if (this.category.length == 0 || this.category == null) {
  //                 this.dossier1.filterClear(filterDataObj);
  //               } else {
  //                 this.dossier1.filterSelectMultiAttributes(filterDataObj);
  //               }
  //             }

  //             this.onChangeEvalution();
  //             this.AgentDDL = true;
  //             this.coachFlag = true;
  //             this.saveFlagDisable = false;
  //           }

  //         }.bind(this));

  //       }.bind(this));
  //       var selectHandler = function (e) {
  //         var selectionName = null;
  //         let selectionObjConvId: any;
  //         for (var i = 0; i < e.graphics.length; i++) {
  //           var selection = e.graphics[i];
  //           selectionName = selection[0].n;
  //           if (selectionName != 'Conversation ID') {
  //             return false
  //           }
  //           var selectionValue = selection[0].vid;
  //           var selectionText = selection[0].v;
  //           selectionObjConvId = {
  //             name: selectionName,
  //             value: selectionValue,
  //             text: selectionText
  //           }
  //         }
  //         this.currentContact = selectionObjConvId.text;
  //         this.spinnerService.hide();
  //         this.totalScore = 0;
  //         this.totalQues = 0;
  //         this.totalNotes = 0;
  //         this.getTopicReport = [];
  //         this.transcriptTab = [];
  //         this.getTranscribeData(this.currentContact);
  //         this.getEvalTopic(this.currentContact);
  //         this.getNotes(this.currentContact);

  //       }.bind(this);

  //       dossier.registerEventHandler(
  //         "onGraphicsSelected",
  //         selectHandler);
  //     }.bind(this)).catch((e) => {
  //       this.spinnerService.hide();
  //     }).finally(function () {
  //       setTimeout(() => {
  //         this.spinnerService.hide();
  //       }, 10000);
  //     }.bind(this));
  //   }
  //   catch (e) {
  //     console.log(e);
  //     this.spinnerService.hide();
  //   }
  // }

  localRole: any;
  roleEvalForm: any = null;
  roleslist() {
    this.localRole = UserData.role
    this.loginService.getroles(this.localRole).subscribe(
      (data: any) => {
        // console.log(data)
        if (data.roleEvaluationFormID != null || data.roleEvaluationFormID != undefined) {
          this.roleEvalForm = data.roleEvaluationFormID;
          // console.log(this.roleEvalForm)
        }

      }, (error) => {
        console.log('error', error);
      }
    )
  }

  evaluateUserDDL: any;
  evaluaterUser: any;
  selectlabelDB: any;
  selectedEvalItem: any;
  evaluationItem = [];
  questionsList: Object[];
  evalRoomData: any;
  evalRoomName: any;
  selectedLabel: any;

  getEvalutionItems() {
    // console.log("EvaluationItem")
    let evalUser = null;
    let quesarr = [];
    let notesarr = [];
    return new Promise((resolve, reject) => {
      this.ew_NACDservice.getEvaluationForms().subscribe((data: any) => {
        // console.log(data)
        this.evaluationItem = data;
        this.istableGet = false;
        if (this.evaluationItem.length > 0) {
          this.EvalItemDDL.forEach(element => {
            if (element.value == this.category) {
              this.selectlabelDB = element.label;
            }
          });
          // console.log(this.selectlabelDB)
          this.evaluationItem.forEach(element => {
            if (element.evaluationRoomName == this.selectlabelDB) {
              this.selectedEvalItem = element;
              // console.log("IF",this.selectedEvalItem)
              // this.category = element;
              this.evalRoomName = element.evaluationRoomName;
              this.questionsList = element.questionsList;
              this.questionsList.forEach((data: any) => {
                data.Topics.questions.forEach(element => {
                  if (element.questionChoice == "Choice" || element.questionChoice == "Yes/No") {
                    element.answerdata = null;
                    element.questionData = this.templatetoAns(element.questionValue);
                  }
                  if (element.questionChoice == "Choice" || element.questionChoice == "Yes/No" || element.questionChoice == "Number") {
                    quesarr.push(element)
                    this.totalCountQues = quesarr.length
                    // console.log(this.totalCountQues)
                  }
                  if (element.questionChoice == "Comments") {
                    notesarr.push(element)
                    this.totalCountNotes = notesarr.length
                    // console.log(this.totalCountNotes)
                  }
                });
              })
            }
          });
          resolve(true);
        }
      }, (err) => {
        reject(err)
        this.commonMethods.addToastforlongtime(false, err.error)
        // this.istableGet=false;
        console.log(err);
        this.spinnerService.hide();
      })
    })
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

  onChangeEvalution() {
    let quesarr = [];
    let notesarr = [];
    this.EvalItemDDL.forEach(element => {
      if (element.value == this.category) {
        this.selectedLabel = element.label;
      }
    });
    this.evalRoomData = null;
    // console.log(this.evaluationItem)
    this.evaluationItem.forEach(element => {
      if (element.evaluationRoomName === this.selectedLabel) {
        this.evalRoomData = element
      }

    });
    // this.refreshBtn(false)
    // console.log(this.evalRoomData)
    if (this.evalRoomData != null || this.evalRoomData != undefined) {
      this.evalRoomName = this.evalRoomData.evaluationRoomName
      this.evalRoomData.questionsList.forEach(data => {
        data.Topics.questions.forEach(element => {
          if (element.questionChoice == "Choice" || element.questionChoice == "Yes/No") {
            element.answerdata = null;
            element.questionData = this.templatetoAns(element.questionValue);
          }
          // else {
          //   element.numberValue = "";
          // }
          if (element.questionChoice == "Choice" || element.questionChoice == "Yes/No" || element.questionChoice == "Number") {
            quesarr.push(element)
            this.totalCountQues = quesarr.length
            // console.log(this.totalCountQues)
          }
          if (element.questionChoice == "Comments") {
            notesarr.push(element)
            this.totalCountNotes = notesarr.length
            // console.log(this.totalCountNotes)
          }
        });

      })
      // this.category = this.evalRoomData
      this.selectedEvalItem = this.evalRoomData
      this.questionsList = this.selectedEvalItem.questionsList;
      // this.getEvaluationAns();
    }
    else {
      this.evalRoomName = null;
      this.questionsList = null
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
  getReportEvalname: any = null;
  labelVal: any = {}
  agentDDLform: any = [];
  getQueueLoopAgent: any = [];
  // currentContact: string = "";
  evalFormAgent: any;
  getEvalTopic(conversationID) {
    this.mstrToken = localStorage.getItem("mstrAuthToken");
    let mstr = JSON.parse(this.mstrToken);
    let agentDDL = [];
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
      ReportNo: "3",
      X_MSTR_AuthToken: mstr['authToken']
    }
    // this.agentDDLform = [];
    // this.evalFormAgent = "";
    agentDDL = [];
    let topicData = [];
    this.interactionService.GetReportData(params).subscribe(
      (data: any) => {
        if (data.ReportData.result.data.root != null) {
          this.audioEndpoint = data.ReportData.result.data.root.children[0].children[0].children[0].children[0].children[0].children[0].children[0].element.name;
          this.getTopicReport = data.ReportData.result.data.root.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children;
          this.getReportEvalname = data.ReportData.result.data.root.children[0].children[0].children[0].element.name;
          this.getQueueLoopAgent = data.ReportData.result.data.root.children[0].children[0].children[0].children
          this.getQueueLoopAgent.forEach(id => {
            id.children.forEach(item1 => {
              item1.children.forEach(item => {
                let labelValue = {
                  label: item.element.formValues.DESC,
                  value: item.element.formValues.ID,
                  queueDetail: {
                    name: item1.element.name,
                    id: id.element.name
                  }

                }
                agentDDL.push(labelValue);
              });
            });
          });

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


          // if (this.convCategory != null || this.convCategory != "") {
          //   this.agentDDLform = agentDDL
          //   // this.evalFormAgent = this.agentDDLform[0].value;
          //   // this.getManageDisputeEvaluationDetail();
          // }
          // else {
          //   agentDDL = [];
          //   this.agentDDLform = [];
          // }

          this.getSignedURL(this.audioEndpoint);
        }
        this.refreshBtn(false)
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
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

  // reloadInteractions() {
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
  // }

  errValNotes: boolean = false;
  conversationID: boolean = false;
  errTime: boolean = false;
  saveNotes() {
    this.notesModel.conversationid = this.convCategory;
    this.notesModel.time = this.getTimePlayer;
    this.notesModel.customerId = UserData.customerId;
    if (this.notesModel.notes == '' || this.notesModel.notes == null) {
      this.errValNotes = true;

    }
    else {
      this.errValNotes = false;
    }
    if (this.notesModel.conversationid == '' || this.notesModel.conversationid == null) {
      this.conversationID = true;

    }
    else {
      this.conversationID = false;
    }
    if (this.notesModel.time == '' || this.notesModel.time == null) {
      this.errTime = true;

    }
    else {
      this.errTime = false;
    }
    if (this.conversationID || this.errValNotes || this.errTime) {
      return
    }

    this.ew_NACDservice.saveNotes(this.notesModel).subscribe(
      (data: any) => {
        this.notesPopup = false;
        this.getNotes();
        this.notesModel = new NotesModel();
        this.errValNotes = false;
        this.conversationID = false;
        this.errTime = false;
        this.commonMethods.addToastforlongtime(true, 'Notes Saved');
      },
      (error) => {
        console.log(error);
      }
    )

  }

  allNotes: any = [];
  getNotes() {
    this.ew_NACDservice.getNotes(this.currentContact).subscribe(
      (data: any) => {
        this.allNotes = data.message.sort(this.commonMethods.compareValues('time'))
        this.refreshBtn()
        this.playerSelectedCategories = this.playerDisplayCategories
        this.playbackIndex = '1.0';  
        this.selectedIndex = 2;
        if($("#audio-spectrum").hasClass('autoHeight')){
          //console.log("before toggle called")
            $("#audio-spectrum").removeClass('autoHeight')
          }
          this.isTopics = true
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
      }
    )
  }

  itemConvID: any = null;
  itemId: any = null;
  deletepopup(item) {
    this.itemConvID = item.conversationid;
    this.itemId = item.id;
  }
  deleteNotes() {
    this.ew_NACDservice.deleteNotes(this.itemConvID, this.itemId).subscribe(
      (data: any) => {
        this.commonMethods.addToastforlongtime(true, 'Notes Deleted');
        this.getNotes();
        this.itemConvID = null;
        this.itemId = null;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  // resultConvID:any;
  // searchConversation(event) {
  //   this.resultConvID = this.conversationItem.filter(a => a.toLowerCase().includes(event.query.toLowerCase()))
  // }

  // OnchangeConversation() {
  //   for (var i = 0; i < this.dossierFilterList.length; i++) {
  //     var filter = this.dossierFilterList[i];
  //     var availableFilterName = filter.filterName;
  //     var availableFilterKey = filter.filterKey;
  //     if (availableFilterName == "Conversation ID") {
  //       let selections = [];
  //       let filterInfoObj = {
  //         key: availableFilterKey
  //       };
  //       let availableFilterItems = filter.filterDetail.items;
  //       let selectedVal = ""
  //       availableFilterItems.forEach(element => {
  //         if (element.name == this.convCategory) {
  //           selectedVal = element.value
  //         }
  //       });
  //       let selectionObj = {
  //         name: "Conversation ID",
  //         value: selectedVal,
  //       };
  //       selections.push(selectionObj);
  //       let filterDataObj = {
  //         selections: selections,
  //         filterInfo: filterInfoObj
  //       }
  //       if (selectedVal == '' || selectedVal.toLowerCase() == "all") {
  //         this.dossier1.filterClear(filterDataObj);
  //       }
  //       else {
  //         this.dossier1.filterSelectMultiAttributes(filterDataObj);
  //       }
  //     }
  //   }
  // }

  // EmptyFun() {
  //   if (this.convCategory == null || this.convCategory == '') {
  //     this.convCategory = 'All';
  //     this.OnchangeConversation();
  //   }
  // }

  AgentDDL: boolean = false;
  onChangeBlur() {
    this.evalRoomName = null;
    this.questionsList = [];
    this.AgentDDL = false;
    // this.agentDDLform = [];
    this.totalCountQues = 0;
    this.totalCountNotes = 0;
    this.totalQues = 0;
    this.totalNotes = 0;
    this.totalScore = 0;
    this.refreshBtn(false)
    this.notesPopup = false;
    this.playerSelectedCategories = this.playerDisplayCategories
    this.playbackIndex = '1.0';  
    this.selectedIndex = 2;
    if($("#audio-spectrum").hasClass('autoHeight')){
      //console.log("before toggle called")
        $("#audio-spectrum").removeClass('autoHeight')
      }
    // this.evaluatesaveModel = new EvaluateSaveModel();
  }

  // isloadSpinner:boolean = false;
  // ReloadData(){
  //   if(this.isloadSpinner == false){
  //     document.getElementById('dossierContainer1').style.display = 'none';
  //     this.isloadSpinner = true;
  //     let tableId = document.getElementById('dossierContainer1');
  //     microstrategy.dossier.destroy({placeholder: tableId});
  //   }
  //   this.dossierTable();
  //   this.spinnerService.hide();
  //   setTimeout(() => {
  //     this.isloadSpinner = false;
  //     document.getElementById('dossierContainer1').style.display = 'block';
  //   }, 7000);
  // }

  currentContactEvaluationId: any = null;
  currentContactEvaluationRoom: any = '';

  getManageDisputeEvaluationDetail() {
    this.spinnerService.show();
    this.ew_NACDservice.getManageDisputeEvaluationDetail(this.currentEvaluationId).subscribe(
      (data: any) => {
        //  console.log("data",data)
        if (data != null) {
          this.agentDDLform = [];
          this.currentContact = data.conversationid;
          this.convCategory = data.conversationid;
          this.currentContactEvaluationId = data.eval_id;
          this.currentContactEvaluationRoom = data.eva_room;
          let labelValue = {
            label: data.agentdetail[0]?.label,
            value: data.agentdetail[0]?.value,
            queueDetail: {
              name: data.agentdetail[0]?.label,
              id: data.agentdetail[0]?.value
            }

          }
          this.agentDDLform.push(labelValue);
          // this.agentDDLform = data.agentdetail[0];
          // this.agentDDLform = data.agentdetail[0];
          this.evalFormAgent = data.agentdetail[0]?.value;
          this.evaluatorDropdown = [];
          this.ismoderator = data.ismoderator;
          this.setEvaluationFormQA(data.eva_room);
          data.evaluatordetail.forEach(element => {
            this.evaluatorDropdown.push(element);
          });
          this.selectedEvaluator = (this.evaluatorDropdown.length > 0) ? this.evaluatorDropdown[0].value : "";

          if (!this.currentContact?.includes('NON-ACD')) {
            this.spinnerService.show();
            this.getTranscribeData(this.currentContact);
            this.getEvalTopic(this.currentContact);
            this.getNotes();
            this.getEvaluationAns();
          } else {
            this.allNotes = [];
            this.getEvaluationAns();
            this.refreshBtn(false)
          }

        }
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
      }
    )
  }

  saveFlagDisable: boolean = false;
  resetQuesList: any = [];
  eval_Status: string = "";
  // coachFlag: boolean = true;
  async getEvaluationAns() {
    // this.spinnerService.show();
    this.ew_NACDservice.getEvaluationAns(this.currentContact, this.currentContactEvaluationId, this.evalFormAgent, this.currentContactEvaluationRoom, this.selectedEvaluator).subscribe(
      async (data: any) => {
        //  console.log("data",data)
        if (data != null) {
          this.resubmitEnable = false;
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
                    if (element?.displaytype?.value != "radio" && element.answerdata?.Score != null && element.answerdata?.Score.toString().includes('.')) {
                      elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
                    } else {
                      // elementQD.value.Score = elementQD.value.Score;
                      elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
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
                      // element.answerdata = element.answerdata;
                      element.questionData.forEach((quesData, indexQD) => {
                        if (quesData.value.Answer == element.answerdata || quesData.value.Answer == element.answerdata?.Answer) {
                          element.answerdata = quesData?.value;
                        }
                      });
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

              this.questionsList?.forEach((elementT: any) => {
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
                          // if(element?.displaytype?.value != "radio" && element.answerdata?.Score != null && element.answerdata?.Score.toString().includes('.')) {
                          if (element.answerdata?.Score != null && element.answerdata?.Score?.toString().includes('.')) {
                            elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
                          } else {
                            // elementQD.value.Score = elementQD.value.Score;
                            elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
                          }
                        } else {

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
                          // elementQ.answerdata = element.answerdata;
                          element.questionData.forEach((quesData, indexQD) => {
                            if (quesData.value.Answer == element.answerdata || quesData.value.Answer == element.answerdata?.Answer) {
                              elementQ.answerdata = quesData?.value;
                            }
                          });
                        }
                      }

                    } else if (elementQ.questionChoice == 'Number') {
                      if (elementQ.answerdata == undefined) {
                        if ((element.defaultanswer != null || element.defaultanswer != undefined) && (element.numberValue == null || element.numberValue == '')) {
                          // elementQ.numberValue = parseInt(element.defaultanswer);
                          elementQ.numberValue = element.defaultanswer;
                        } else {
                          // if((element.numberValue?.toString().split('.')[1] !='0' && element.numberValue?.toString().split('.')[1]!='00') ) {
                          //   elementQ.numberValue = parseFloat(element.numberValue).toFixed(1);
                          // } else {
                          //   elementQ.numberValue = parseInt(element.numberValue);
                          // }
                          if ((data[0].evaluation_status == 'InComplete' || data[0].evaluation_status == 'Incomplete') && (element.defaultanswer != null || element.defaultanswer != undefined)) {
                            elementQ.numberValue = element.defaultanswer;
                          } else {
                            elementQ.numberValue = element.numberValue;
                          }
                        }
                      }
                    } else if (elementQ.questionChoice == 'Comments') {
                      elementQ.answerdata = element.answerdata;
                    }
                  }
                  // console.log('elementQ', elementQ);
                });
              });
            });
          })

          this.resetQuesList = this.questionsList;
          this.eval_Status = data[0].evaluation_status;
          this.disableqa = (data[0].disableqa === undefined || data[0].disableqa === null) ? false : data[0].disableqa;
          this.disablecoach = (data[0].disablecoach === undefined || data[0].disablecoach === null) ? false : data[0].disablecoach;
          this.allowResubmit = data[0].allowResubmit

          await this.questionsList?.forEach((dataques: any, topicJ) => {
            dataques.Topics.questions.forEach((element, quesI) => {

              // Replace Undefiend object value to Empty string
              if (element.questionData != undefined && element.questionData != null) {
                element.questionData.forEach(elementlabel => {
                  elementlabel.label = elementlabel.label.replace(' (undefined)', '');
                });
              }

              if (element.questionChoice == "Choice" || element.questionChoice == "Yes/No") {
                element.questionData = this.templatetoAns(element.questionValue);
                if (element.questionData != undefined) {
                  element?.questionData.forEach(elementQD => {
                    if (elementQD.value?.Score != null || elementQD.value?.Score != '') {
                      if (element?.displaytype?.value != "radio" && element.answerdata?.Score != null && element.answerdata?.Score.toString().includes('.')) {
                        elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
                      } else {
                        elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
                      }
                    }
                  });
                }
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
          // this.evaluatesaveModel.evaluation_coach = data[0].evaluation_coach
          this.CalculateScore();
          if (data[0].evaluation_status != undefined || data[0].evaluation_status != null) {
            if (data[0].evaluation_status.toLowerCase() === 'complete') {
              // this.coachFlag = false;
              this.saveFlagDisable = true;
            }
            else {
              // this.coachFlag = true
              this.saveFlagDisable = false;
            }
          }
          this.spinnerService.hide();
        }
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
      }
    )
  }

  CalculateScore() {
    let total_S = 0;
    let total_Q = 0;
    let total_N = 0;
    this.questionsList?.forEach((data: any) => {
      data.Topics.questions.forEach(element => {

        // if (element.questionChoice == "Choice") {
        //   if (element.answerdata != undefined && element.answerdata != null) {
        //     if (element.answerdata.Score != undefined && element.answerdata.Score != null) {
        //       total_S += parseInt(element.answerdata.Score)
        //     }
        //     else if (element.answerdata.Score == null || element.answerdata.Score == "") {
        //       element.answerdata.Score = 0
        //       total_S += element.answerdata.Score
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
          // if (element.numberValue != null || element.numberValue != undefined && element.numberValue != "") {
          //   total_S += parseInt(element.numberValue)
          //   total_Q += 1
          // }
          if (element.numberValue != null && element.numberValue != undefined && element.numberValue != "") {
            // if(element.numberValue.isNaN()  || NaN. isNaN(element.numberValue)) {
            if (element.numberValue.toString().includes('.')) {
              // || element.numberValue.isNaN()
              total_S += element.numberValue == null || element.numberValue == undefined ? 0 : parseFloat(parseFloat(element.numberValue).toFixed(2));
            } else {
              total_S += element.numberValue == null || element.numberValue == undefined ? 0 : parseInt(element.numberValue);
            }
            // }

            total_Q += 1;
          } else {
            total_S += 0;
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
      this.totalScore = parseFloat(parseFloat(finalFloatValue[0] + '.' + finalFloatValue[1].substring(0, 2)).toFixed(2));
    } else {
      this.totalScore = total_S;
    }
    // this.totalScore = total_S;
    this.totalQues = total_Q;
    this.totalNotes = total_N;
  }

  resetModel() {
    // console.log(this.eval_Status.toLowerCase())
    if (this.convCategory == "" || this.convCategory == null) {
      this.commonMethods.addToastforlongtime(false, 'Please select interactions to reset the evaluation');
    }
    else if (this.eval_Status.toLowerCase() === 'incomplete' && (this.convCategory != "" || this.convCategory != null)) {
      this.commonMethods.addToastforlongtime(false, 'Selected interaction has no record');
    }
    else {
      document.getElementById('modalOpen').click();
    }
  }

  resetData() {
    this.questionsList = this.resetQuesList;
    this.spinnerService.show();
    let type;

    if (this.currentContact.includes('NON-ACD')) {
      type = 'NON-ACD';
    } else {
      type = 'ACD';
    }
    this.ew_NACDservice.resetEvalData(this.selectedEvaluator, type).subscribe(
      (data: any) => {
        this.questionsList.forEach((data: any) => {
          data.Topics.questions.forEach(element => {
            if (element.questionChoice == "Choice") {
              if (element.answerdata != undefined && element.answerdata != null) {
                if (element.answerdata.Score != undefined && element.answerdata.Score != null) {
                  element.answerdata = null
                }
              }
            }
            if (element.questionChoice == "Yes/No") {
              if (element.answerdata != undefined && element.answerdata != null) {
                if (element.answerdata.Score != undefined && element.answerdata.Score != null) {
                  element.answerdata = null
                }
              }
            }
            if (element.questionChoice == "Number") {
              if (element.numberValue != null || element.numberValue != undefined && element.numberValue != "") {
                element.numberValue = null;
              }
            }
            if (element.questionChoice == "Comments") {
              if (element.answerdata != null || element.answerdata != undefined && element.answerdata != "") {
                element.answerdata = null
              }
            }
          });
        })
        this.totalNotes = 0;
        this.totalScore = 0;
        this.totalQues = 0;
        this.resetQuesList = [];
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(true, data.result);
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
      }
    )
  }

  loading: boolean = false;
  saveAgentName: any = null;
  evaluationWorkSpaceSave(status) {
    if (this.convCategory == null || this.convCategory == "") {
      this.commonMethods.addToastforlongtime(false, 'Please select interactions for evaluation');
      return;
    }
    else {
      if (status === "Complete" || status === "Resubmit") {
        let count = 0;
        this.questionsList.forEach((data: any) => {
          data.Topics.questions.forEach(element => {

            if (element.questionMandatory == true && !element.conditionalSkip) {
              if (element.questionChoice == "Comments") {
                if (element.answerdata == null || element.answerdata == undefined || element.answerdata == "") {
                  // this.commonMethods.addToastforlongtime(false, ' Please fill the require(*) answer for the questions');
                  count = count + 1;
                  return;
                }
              } else if (element.questionChoice == "Choice" || element.questionChoice == "Yes/No" && !element.conditionalSkip) {

                if (element.answerdata == null || element.answerdata == undefined && element?.displaytype?.value == "radio") {
                  // if (element.answerdata.Answer == null) {
                  count = count + 1;
                  // this.commonMethods.addToastforlongtime(false, ' Please fill the require(*) answer for the questions');
                  // return;
                  // }
                } else {
                  if ((element?.displaytype?.value != "radio" || element?.displaytype?.value == undefined) && (element.answerdata?.Answer == null || element.answerdata?.Answer == undefined)) {
                    count = count + 1;
                    // this.commonMethods.addToastforlongtime(false, ' Please fill the require(*) answer for the questions');
                    // return;
                  }

                }
              } else {
                if (element.numberValue == null || element.numberValue == "" || element.numberValue == undefined && !element.conditionalSkip) {
                  // this.commonMethods.addToastforlongtime(false, ' Please fill the require(*) answer for the questions');
                  count = count + 1;
                  // return;
                }
              }
            }
          })
        })
        if (count > 0) {
          this.commonMethods.addToastforlongtime(false, 'Please provide responses to all the mandatory questions (marked “*”)');
          return;
        } else {
          this.questionsList.forEach((data: any) => {
            data.Topics.questions.forEach(element => {
              if (element?.displaytype?.value == "radio") {
                element.questionData.forEach((quesData, indexQD) => {
                  if (quesData.value.Answer == element.answerdata) {
                    element.answerdata = quesData?.value;
                  }
                });
              }
            })
          })
        }
        this.saveAgentName = this.agentDDLform.filter(s => s.value == this.evalFormAgent)[0];
        // console.log(this.selectedEvalItem);
        this.evaluatesaveModel.evaluationId = this.selectedEvalItem.evaluationId;
        this.evaluatesaveModel.evaluationRoomName = this.selectedEvalItem.evaluationRoomName;
        this.evaluatesaveModel.strategyId = this.selectedEvalItem.strategyId;
        this.evaluatesaveModel.strategyName = this.selectedEvalItem.strategyName;
        this.evaluatesaveModel.questionsList = this.questionsList;
        this.evaluatesaveModel.contactId = this.convCategory;
        this.evaluatesaveModel.queue_name = this.saveAgentName?.queueDetail?.name;
        this.evaluatesaveModel.queueid = this.saveAgentName?.queueDetail?.id;
        this.evaluatesaveModel.agent_name = this.saveAgentName?.label;
        this.evaluatesaveModel.evaluationReportRoom = this.getReportEvalname;
        // this.evaluatesaveModel.status = status;
        this.evaluatesaveModel.status = 'Complete';
        this.evaluatesaveModel.userid = this.evalFormAgent;
        this.evaluatesaveModel.evaluation_interactions_id = this.selectedEvaluator;
        if (status == 'Resubmit') {
          this.evaluatesaveModel.evaluatestaus = 'Resubmit';
        } else {
          // this.evaluatesaveModel.evaluatestaus = 'Submit';
        }
        // this.evaluatesaveModel.evaluation_coach=this.evaluation_coach;
        this.loading = true;
        this.spinnerService.show();
        this.ew_NACDservice.evaluationWorkSpaceSave(this.evaluatesaveModel).subscribe(
          (data: any) => {
            this.questionsList.forEach((evItem: any) => {
              evItem.Topics.questions.forEach(ques => {
                ques.numberValue = "";
                ques.answerdata = null;
              });
            });
            this.loading = false;
            this.evaluatesaveModel = new EvaluateSaveModel();
            // this.convCategory = ''
            // this.getTopicReport = [];
            // this.transcriptTab = [];
            // this.allNotes = [];
            // this.evalFormAgent = "";
            // this.agentDDLform = [];
            this.totalScore = 0;
            this.totalQues = 0;
            this.totalNotes = 0;
            this.disableqa = false;
            this.disablecoach = false;
            // this.evaluatorDropdown = [];
            // this.selectedEvaluator = ""
            this.ismoderator = false;
            this.allowResubmit = false;
            // this.evaluatesaveModel.evaluation_coach = false;
            this.eval_Status = "";
            // this.refreshBtn(false);
            if (data.result == 'No data available!') {
              this.commonMethods.addToastforlongtime(false, 'Record not found');
            }
            else {
              this.commonMethods.addToastforlongtime(true, data.result);
            }
            this.spinnerService.hide();
          }, (err) => {
            this.loading = false;
            this.spinnerService.hide();
            this.commonMethods.addToastforlongtime(false, err.error)

          })

      }
      if (status === "In Progress") {

        this.saveAgentName = this.agentDDLform.filter(s => s.value == this.evalFormAgent)[0];

        this.evaluatesaveModel.evaluationId = this.selectedEvalItem.evaluationId;
        this.evaluatesaveModel.evaluationRoomName = this.selectedEvalItem.evaluationRoomName;
        this.evaluatesaveModel.strategyId = this.selectedEvalItem.strategyId;
        this.evaluatesaveModel.strategyName = this.selectedEvalItem.strategyName;
        this.evaluatesaveModel.questionsList = this.questionsList;
        this.evaluatesaveModel.contactId = this.convCategory;
        this.evaluatesaveModel.queue_name = this.saveAgentName?.queueDetail?.name;
        this.evaluatesaveModel.queueid = this.saveAgentName?.queueDetail?.id;
        this.evaluatesaveModel.agent_name = this.saveAgentName?.label;
        this.evaluatesaveModel.evaluationReportRoom = this.getReportEvalname;
        this.evaluatesaveModel.status = status;
        this.evaluatesaveModel.userid = this.evalFormAgent;
        this.evaluatesaveModel.evaluation_interactions_id = this.selectedEvaluator;
        this.loading = true;
        this.spinnerService.show();
        this.ew_NACDservice.evaluationWorkSpaceSave(this.evaluatesaveModel).subscribe(
          (data: any) => {
            this.questionsList.forEach((evItem: any) => {
              evItem.Topics.questions.forEach(ques => {
                ques.numberValue = "";
                ques.answerdata = null;
              });
            });
            this.loading = false;
            this.evaluatesaveModel = new EvaluateSaveModel();
            // this.convCategory = ''
            // this.getTopicReport = [];
            // this.transcriptTab = [];
            // this.allNotes = [];
            // this.evalFormAgent = "";
            // this.agentDDLform = [];
            this.totalScore = 0;
            this.totalQues = 0;
            this.totalNotes = 0;
            this.disableqa = false;
            this.disablecoach = false;
            // this.evaluatorDropdown = [];
            // this.selectedEvaluator = ""
            this.ismoderator = false;
            this.allowResubmit = false;
            this.eval_Status = "";
            // this.evaluatesaveModel.evaluation_coach = false;
            // this.refreshBtn(false);
            if (data.result == 'No data available!') {
              this.commonMethods.addToastforlongtime(false, 'Record not found');
            }
            else {
              this.commonMethods.addToastforlongtime(true, data.result);
            }
            this.spinnerService.hide();
          }, (err) => {
            this.loading = false;
            this.spinnerService.hide();
            this.commonMethods.addToastforlongtime(false, err.error)

          })
      }
      if (status === "Reject") {
        let count = 0;
        this.questionsList.forEach((data: any) => {
          data.Topics.questions.forEach(element => {

            if (element.questionMandatory == true && !element.conditionalSkip) {
              if (element.questionChoice == "Comments") {
                if (element.answerdata == null || element.answerdata == undefined || element.answerdata == "") {
                  // this.commonMethods.addToastforlongtime(false, ' Please fill the require(*) answer for the questions');
                  count = count + 1;
                  return;
                }
              } else if (element.questionChoice == "Choice" || element.questionChoice == "Yes/No" && !element.conditionalSkip) {

                if (element.answerdata == null || element.answerdata == undefined && element?.displaytype?.value == "radio") {
                  // if (element.answerdata.Answer == null) {
                  count = count + 1;
                  // this.commonMethods.addToastforlongtime(false, ' Please fill the require(*) answer for the questions');
                  // return;
                  // }
                } else {
                  if ((element?.displaytype?.value != "radio" || element?.displaytype?.value == undefined) && (element.answerdata?.Answer == null || element.answerdata?.Answer == undefined)) {
                    count = count + 1;
                    // this.commonMethods.addToastforlongtime(false, ' Please fill the require(*) answer for the questions');
                    // return;
                  }

                }
              } else {
                if (element.numberValue == null || element.numberValue == "" || element.numberValue == undefined && !element.conditionalSkip) {
                  // this.commonMethods.addToastforlongtime(false, ' Please fill the require(*) answer for the questions');
                  count = count + 1;
                  // return;
                }
              }
            }
          })
        })
        // if (count > 0) {
        //   this.commonMethods.addToastforlongtime(false, 'Please provide responses to all the mandatory questions (marked “*”)');
        //   return;
        // }
        this.saveAgentName = this.agentDDLform.filter(s => s.value == this.evalFormAgent)[0];
        this.evaluatesaveModel.evaluationId = this.selectedEvalItem.evaluationId;
        this.evaluatesaveModel.evaluationRoomName = this.selectedEvalItem.evaluationRoomName;
        this.evaluatesaveModel.strategyId = this.selectedEvalItem.strategyId;
        this.evaluatesaveModel.strategyName = this.selectedEvalItem.strategyName;
        this.evaluatesaveModel.questionsList = this.questionsList;
        this.evaluatesaveModel.contactId = this.convCategory;
        this.evaluatesaveModel.queue_name = this.saveAgentName?.queueDetail?.name;
        this.evaluatesaveModel.queueid = this.saveAgentName?.queueDetail?.id;
        this.evaluatesaveModel.agent_name = this.saveAgentName?.label;
        this.evaluatesaveModel.evaluationReportRoom = this.getReportEvalname;
        // this.evaluatesaveModel.status = status;
        this.evaluatesaveModel.status = 'Complete';
        this.evaluatesaveModel.userid = this.evalFormAgent;
        this.evaluatesaveModel.evaluation_interactions_id = this.selectedEvaluator;
        if (status == 'Reject') {
          this.evaluatesaveModel.evaluatestaus = 'Reject';
        }
        this.loading = true;
        this.spinnerService.show();
        this.ew_NACDservice.evaluationWorkSpaceSave(this.evaluatesaveModel).subscribe(
          (data: any) => {
            this.questionsList.forEach((evItem: any) => {
              evItem.Topics.questions.forEach(ques => {
                ques.numberValue = "";
                ques.answerdata = null;
              });
            });
            this.loading = false;
            this.evaluatesaveModel = new EvaluateSaveModel();
            this.totalScore = 0;
            this.totalQues = 0;
            this.totalNotes = 0;
            this.disableqa = false;
            this.disablecoach = false;
            this.ismoderator = false;
            this.allowResubmit = false;
            // this.evaluatesaveModel.evaluation_coach = false;
            this.eval_Status = "";
            if (data.result == 'No data available!') {
              this.commonMethods.addToastforlongtime(false, 'Record not found');
            }
            else {
              this.commonMethods.addToastforlongtime(true, data.result);
            }
            this.spinnerService.hide();
          }, (err) => {
            this.loading = false;
            this.spinnerService.hide();
            this.commonMethods.addToastforlongtime(false, err.error)

          })

      }
    }
  }

  isSearchBtn: boolean = true;
  isClearBtn: boolean = true;
  isenableipt: boolean = false;
  searchFilter() {
    // console.log("Check 1")
    let convID = (this.convCategory != "" || this.convCategory != null) ? this.convCategory : null;
    // console.log("Check 1",convID);
    if (this.convCategory != "" || this.convCategory != null) {
      this.isSearchBtn = true;
      this.isClearBtn = false;
      this.isenableipt = true;
    }
    this.spinnerService.show();
    this.getEvalDDLDataSet(convID).then(res => {
      if (this.evalDDLList.length > 0) {
        this.getEvalutionItems().then(res1 => {
          this.getEvalTopic(convID);
          this.getTranscribeData(convID);
          this.getNotes();
        });
      }
      else {
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, "No Evaluation form for this Conversation ID")
      }
    });


    // console.log("Check 2")
  }


  evalDDLList: any = [];
  getEvalDDLDataSet(conversationID) {
    // console.log("enter");

    let mstrToken = localStorage.getItem("mstrAuthToken");
    let mstr = JSON.parse(mstrToken);
    let params = {
      customerId: UserData.customerId,
      cookie: mstr['cookie'],
      conversationid: conversationID,
      ReportNo: "8",
      X_MSTR_AuthToken: mstr['authToken']
    }
    this.evalDDLList = [];
    this.EvalItemDDL = [];

    // let EVAL_ROOM_ATTR_ID = "DDE816B04D79A02924C166801409F192";
    var EVAL_ROOM_ATTR_ID = localStorage.getItem('EVAL_ROOM_ATTR_ID');
    // console.log("EVAL_ROOM_ATTR_ID", EVAL_ROOM_ATTR_ID);

    return new Promise((resolve, reject) => {
      this.interactionService.GetReportData(params).subscribe(
        (data: any) => {
          if (data.ReportData.result.data.root != null) {

            // data.ReportData.result.data.root.children[0].children.forEach(element => {
            data.ReportData.result.data.root.children.forEach(element => {
              // console.log("*****************************")
              // console.log(element)

              // // element.children[0].children[0].children[0].children[0].children[0].children[0].children.forEach(item => {
              //   element.children[0].children[0].children[0].children[0].children[0].children.forEach(item => {


              var result = this.findNode(EVAL_ROOM_ATTR_ID, element);
              this.AllEvalData.forEach(element => {
                if (element.label == result?.element?.name) {
                  let labelVal = {
                    label: result.element.name,
                    value: result.element.id
                  }
                  if (this.localRole.toLowerCase() != 'admin' && this.roleEvalForm != null) {
                    if (element.value == this.roleEvalForm) {
                      this.evalDDLList.unshift(labelVal)
                    }
                    else {
                      this.evalDDLList.push(labelVal);
                    }
                  }
                  else {
                    this.evalDDLList.push(labelVal);
                  }
                  // this.evalDDLList.push(labelVal);
                }
              });
              // }

            });
            // console.log(this.evalDDLList)
            if (this.evalDDLList.length > 0) {
              this.EvalItemDDL = this.evalDDLList.filter((v, i, a) => a.findIndex(t => t.label == v.label && t.value == v.value) === i);
              this.category = this.EvalItemDDL[0].value;
              let EvalformName = this.evalDDLList.filter(s => s.value == this.category)[0].label;
              // this.getEvaluationDossiers(conversationID , EvalformName);
              this.AgentDDL = true;
            }
            else {
              this.EvalItemDDL = [];
              // this.getEvaluationDossiers(null , "");
            }
            resolve(true);
          } else {
            this.spinnerService.hide();
            this.commonMethods.addToastforlongtime(false, "No Evaluation found for CoversationID");
          }
        },
        (error) => {
          reject(error)
          console.log(error);
          this.spinnerService.hide();
        }
      )
    })

  }


  findNode(id, currentNode) {
    var i,
      currentChild,
      result;
    // console.log("id", id);
    // console.log("currentNode", currentNode);
    // console.log("currentNode.element.id.indexOf(id)>-1", currentNode.element.id.indexOf(id)>-1);

    if (currentNode.element.id.indexOf(id) > -1) {
      return currentNode;
    } else {

      // Use a for loop instead of forEach to avoid nested functions
      // Otherwise "return" will not work properly
      for (i = 0; i < currentNode.children?.length; i += 1) {
        currentChild = currentNode.children[i];

        // Search in the current child
        // console.log("currentChild", currentChild);
        // console.log("result", result);
        result = this.findNode(id, currentChild);

        // Return the result if the node has been found
        if (result !== false) {
          return result;
        }
      }

      // The node has not been found and we have no more options
      return false;
    }
  }


  LoadWorkspace() {
    let EvalformName = this.evalDDLList.filter(s => s.value == this.category)[0].label;
    // this.getEvaluationDossiers(this.convCategory , EvalformName);
    this.onChangeEvalution();
    this.AgentDDL = true;
  }

  changeBtnEvent(value) {
    // console.log(value)
    if (value != "" || value != null) {
      this.isClearBtn = false;
      this.isSearchBtn = false;
    }
    else {
      if (value.trim() == "" || value == null) {
        this.isClearBtn = true;
        this.isSearchBtn = true;
      }
    }
  }

  ClearBtn() {
    this.convCategory = "";
    this.isClearBtn = true;
    this.isSearchBtn = true;
    this.isenableipt = false;
    this.evalDDLList = [];
    this.EvalItemDDL = [];
    this.onChangeBlur();
    this.audioEndpoint = null;
    this.getTopicReport = [];
    this.allNotes = [];
    this.transcriptTab = [];
    this.videoUrl = [];
    this.refreshBtn(false);
    // this.getEvaluationDossiers(null , "");
    this.spinnerService.hide();
  }

  textAreaKeys(event) {
    if ((event.keyCode == 13 || event.charCode == 13) || (event.keyCode == 124 || event.charCode == 124) || (event.keyCode == 92 || event.charCode == 92) || (event.keyCode == 47 || event.charCode == 47)) {
      event.preventDefault();
    }
  }

  async ReplaceSlashFuctionEvaluationForm(feedback, j, i) {
    // this.questionsList.forEach((data: any) => {
    this.questionsList.forEach((data: any, index1) => {
      data.Topics.questions.forEach((element, index) => {

        if (index1 == j && index == i) {
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
              }, 10);
            }
          }
        }


      });
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
                if (elementCSQuest.conditionalQuestion?.id == elementQuestAns.questionId) {
                  // if(elementCSQuest.conditionalQuestion?.id == elementQuestAns.questionId && elementCSQuest.conditionalQuestion?.id!=undefined && elementQuestAns.questionId!=undefined) {

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
                if (elementCSQuest.conditionalQuestion?.id == elementQuestAns.questionId || elementCSQuest.conditionalQuestion?.id == elementQuestAns.questionid) {
                  if (elementCSQuest.conditionalQuestion.questionChoice == elementQuestAns.questionChoice && elementQuestAns.questionChoice == 'Number') {
                    // const getConditionalValues = elementCSQuest.conditionalValue.split('-');
                    let getConditionalValues;
                    if (elementCSQuest.conditionalValue?.toString().includes('=')) {
                      getConditionalValues = elementCSQuest.conditionalValue.split('=');
                    }
                    if (elementCSQuest.conditionalValue?.toString().includes('-')) {
                      getConditionalValues = elementCSQuest.conditionalValue.split('-');
                    }

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


  ConditionalSkipCheckMaxvalue(numberValue, j, i, quesValue) {
    let minmax;
    if (quesValue != null || quesValue !== undefined) {
      if (quesValue?.includes('=')) {
        minmax = quesValue.split('=');
      }
      if (quesValue?.includes('-')) {
        minmax = quesValue.split('-');
      }
    }
    let finalAnsMax;
    if (numberValue < minmax[0] || minmax[1] < numberValue) {
      setTimeout(() => {
        // this.questionsList.forEach((data: any, index) => {
        //   data.Topics.questions.forEach((element, index1) => {

        if (numberValue > minmax[1]) {
          if (numberValue.toString().length >= 5 && numberValue.toString().includes('.')) {
            finalAnsMax = parseFloat(parseFloat(minmax[1]).toFixed(2));
          } else {
            finalAnsMax = minmax[1];
          }
        }
        //  else if ( numberValue < minmax[0] ) {
        //   if (numberValue.toString().length >= 5 && numberValue.toString().includes('.')) {
        //     finalAnsMax = parseFloat(parseFloat(minmax[0]).toFixed(2));
        //   } else {
        //     finalAnsMax = minmax[0];
        //   }
        // } 
        else {
          if (numberValue.toString().length >= 5 && numberValue.toString().includes('.')) {
            finalAnsMax = parseFloat(parseFloat(numberValue).toFixed(2));
          } else {
            finalAnsMax = numberValue;
          }
        }


        this.questionsList.forEach((data: any, jindex) => {
          data.Topics.questions.forEach((element, iindex) => {
            if (j == jindex && i == iindex) {
              element.numberValue = parseFloat(parseFloat(finalAnsMax).toFixed(2));
            }
          });
        });
      }, 100);
    } else {
      // numberValue = parseFloat(parseFloat(numberValue).toFixed(2));
      setTimeout(() => {

        this.questionsList.forEach((data: any, jindex) => {
          data.Topics.questions.forEach((element, iindex) => {
            if (j == jindex && i == iindex) {
              element.numberValue = parseFloat(parseFloat(numberValue).toFixed(2));
              // element.numberValue = parseFloat(numberValue).toFixed(2);
            }
          });
        });
      }, 100);
    }

  }

  // validateMstrReportId(projectID,documentID) {
  //   let params = {
  //     dossierId: documentID,
  //     reportType: "55",
  //     AuthToken: JSON.parse(localStorage.getItem('mstrAuthToken')),
  //     projectId: projectID
  //   }
  //   return new Promise((resolve, reject) => {
  //     this.keyQuestionsService.validateMstrReportId(params).subscribe(
  //       (data: any) => {
  //         if (data['isSuccess'].toLowerCase() == 'failed') {
  //           this.commonMethods.addToastforlongtime(false, 'There is an error in configuration. Please connect with support team to correct the configuration error');
  //         }
  //          resolve(data)
  //       },
  //       (error) => {
  //         console.log(error);
  //         if (error.error['isSuccess'].toLowerCase() == 'failed') {
  //           this.commonMethods.addToastforlongtime(false, 'There is an error in configuration. Please connect with support team to correct the configuration error');
  //         }
  //         reject(error);
  //         this.spinnerService.hide();
  //       })
  //   })
  // }


  onChangeEvaluationDDl() {
    this.AgentDDL = true;
    // this.coachFlag = true;
    this.saveFlagDisable = false;
    this.evalFormAgent = '';
    this.selectedEvaluator = '';
    this.isloadSpinner = true;
    const getTableId = document.getElementById('dossierContainer1');
    if (this.category != "" && this.category != null) {
      if (!!document.getElementById('dossierContainer1')) {
        getTableId.style.display = 'none'
        microstrategy.dossier.destroy({ placeholder: getTableId });
      }
      this.mstrValidToken().then((isTrue) => {
        this.workspaceTable().then(() => {
          this.isloadSpinner = false;
          getTableId != undefined ? getTableId.style.display = 'block' : null;
          this.setEvaluationFormQA(this.category)
        })
      })
    }
    // if(this.agentDDLform.length == 0 || this.agentDDLform.length == 1) {
    //   this.getCustomDataDDL();
    // }
  }

  //***  Intial Load of Dossier Evaluation ***/
  getEvaluationDossiers() {
    this.spinnerService.show();
    // this.getEvalutionItems().then((evalFormRes: any[]) => {
    // if (evalFormRes.length > 0) {
    // this.formatEvaluationFormDDL(evalFormRes);
    this.getDossierID().then(() => {
      this.validateMstrReportId().then((validIdRes: any) => {
        if (validIdRes['isSuccess'].toLowerCase() == 'success') {
          this.category = this.EvalItemDDL.length == 1 ? this.EvalItemDDL[0].value : "";
          // if (this.category != "" && this.category != null) {
          this.isloadSpinner = true
          this.mstrValidToken().then((isres) => {
            if (isres) {
              this.isloadSpinner = false;
            }
            this.workspaceTable();
          })
          // }
          // else {
          //   this.spinnerService.hide();
          //   this.isloadSpinner = false;
          // }
        }
      })
    })
    // }
    // else {
    //   this.spinnerService.hide();
    // }
    // })
  }

  //*****  get the Microstrategy Dossier ID *****
  getEvaluationIDreport: any;
  getDossierID() {
    return new Promise((resolve, reject) => {
      this.spinnerService.show();
      this.subscription_DossierID = this.keyQuestionsService.getMstrConfig().subscribe(
        (data: any) => {
          this.DossierId = typeof (data.manage_dispute_dossierId) != 'undefined' ? data.manage_dispute_dossierId : null;
          this.projectID = data.project_id;
          this.getEvaluationIDreport = data.Report10;
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
  //Load the Microstrategy Dossier
  async workspaceTable() {
    // if (this.category != "" && this.category != null) {
    try {
      this.spinnerService.show();
      const projectID = this.projectID != null ? this.projectID : null;
      const dossierID = this.DossierId != null ? this.DossierId : null;
      const mstrAuthToken = JSON.parse(localStorage.getItem('mstrAuthToken'))
      const mstrIdToken = JSON.parse(localStorage.getItem("mstrIdToken"))['x-mstr-identitytoken']
      const projectUrl = environment.mstr_Url + projectID;
      const dossierUrl = projectUrl + '/' + dossierID;
      if (mstrIdToken == undefined) {
        this.spinnerService.hide();
      }
      setTimeout(() => {
        this.spinnerService.hide();
      }, 10000);

      let promptsAnswers = {
        'Agent Name Value': UserData.userName
      };

      // await this.getInstanceIDfromMSTR(projectID, dossierID, mstrAuthToken, this.category).then((DossierInstance) => {
      const getDossierDOMobj = document.getElementById("disputeManage1");
      if (typeof (getDossierDOMobj) != 'undefined' && getDossierDOMobj != null && getDossierDOMobj.id == 'disputeManage1') {

      await this.interactionService.dossierPromptWorkflow(mstrIdToken, projectID, dossierID, promptsAnswers).then(jsonRes => {
        microstrategy.dossier.create({
        placeholder: document.getElementById("disputeManage1"),
        url: dossierUrl,
        // instance: DossierInstance,
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
          }).then(function () {
              return jsonRes['authToken'];
          })
        },
      }).then((dossier) => {
        this.getEvalutionItems();
        dossier.getFilterList().then(function (filterList) {
          // this.setEvaluationFormQA(this.category);

          //Select conversation ID handler
          dossier.registerEventHandler(
            "onGraphicsSelected",
            this.conversationIdselectHandler);
          this.AgentDDL = true;
          this.spinnerService.hide();
        }.bind(this));
      }).catch((e) => {
        this.spinnerService.hide();
      }).finally(function () {
        setTimeout(() => {
          this.spinnerService.hide();
        }, 10000);
      }.bind(this));
      })
    }
    } catch (e) {
      console.log(e);
      this.spinnerService.hide();
    }
    // }
    // else {
    //   this.category = "";
    //   this.spinnerService.hide();
    // }
  }



  conversationIdselectHandler = (e) => {
    let selectionName = null;
    let selectionObjConvId: any;
    for (let i = 0; i < e.graphics.length; i++) {
      let selection = e.graphics[i];
      // single attribute selection:
      selectionName = selection[0].n;
      if (selectionName != 'Evaluation ID') {
        return false
      }
      // this.spinnerService.show();
      let selectionValue = selection[0].vid;
      let selectionText = selection[0].v;
      selectionObjConvId = {
        name: selectionName,
        value: selectionValue,
        text: selectionText
      }
    }
    this.currentEvaluationId = selectionObjConvId.text != undefined ? selectionObjConvId.text : "";

    // this.getEvaluationID(this.currentEvaluationId);

    this.totalScore = 0;
    this.totalQues = 0;
    this.totalNotes = 0;
    this.getTopicReport = [];
    this.transcriptTab = [];
    this.activeTab = this.items1[0];
    this.tabMenuName = "Transcript"
    this.videoUrl = [];
    this.notesPopup = false;
    // if (!this.currentContact?.includes('NON-ACD')) {
    //   // this.nonACDAgentDropdown = false;
    //   this.spinnerService.show();
    //   this.getTranscribeData(this.currentContact);
    //   this.getEvalTopic(this.currentContact);
    //   this.getNotes();
    this.getManageDisputeEvaluationDetail();
    // } else {
    //   this.allNotes = [];
    //   this.refreshBtn(false)
    // }
  }

  getEvaluationID(conversationID) {
    this.mstrToken = localStorage.getItem("mstrAuthToken");
    let mstr = JSON.parse(this.mstrToken);
    let agentDDL = [];
    let params = {
      customerId: UserData.customerId,
      cookie: mstr['cookie'],
      conversationid: conversationID,
      ReportNo: '4',
      X_MSTR_AuthToken: mstr['authToken']
    }
    // this.agentDDLform = [];
    // this.evalFormAgent = "";
    // agentDDL = [];
    this.interactionService.GetReportData(params).subscribe(
      (data: any) => {
        if (data.ReportData.result.data.root != null) {
          this.audioEndpoint = data.ReportData.result.data.root.children[0].children[0].children[0].children[0].children[0].children[0].children[0].element.name;
          this.getTopicReport = data.ReportData.result.data.root.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children;
          this.getReportEvalname = data.ReportData.result.data.root.children[0].children[0].children[0].element.name;
          this.getQueueLoopAgent = data.ReportData.result.data.root.children[0].children[0].children[0].children
          this.getQueueLoopAgent.forEach(id => {
            id.children.forEach(item1 => {
              item1.children.forEach(item => {
                let labelValue = {
                  label: item.element.formValues.DESC,
                  value: item.element.formValues.ID,
                  queueDetail: {
                    name: item1.element.name,
                    id: id.element.name
                  }

                }
                agentDDL.push(labelValue);
              });
            });
          });


          // if (this.convCategory != null || this.convCategory != "") {
          //   this.agentDDLform = agentDDL
          //   this.evalFormAgent = this.evalFormAgent;
          //   // this.evalFormAgent = this.agentDDLform[0].value;
          // } else {
          //   agentDDL = [];
          //   this.agentDDLform = [];
          // }

          // this.getSignedURL(this.audioEndpoint);
        }
        this.refreshBtn(false)
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
      }
    )
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

   reloadWorkspace() {
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

  //set Evaluation form Question Answers
  setEvaluationFormQA(category) {
    let quesarr = [];
    let notesarr = [];
    if (category != "" && category != null) {
      const evalQuesList = this.evaluationItem.filter(element => element.evaluationRoomName == category)[0]
      this.selectedEvalItem = evalQuesList;
      this.evalRoomName = evalQuesList?.evaluationRoomName;
      // this.currentEvaluationDetails = { evalRoomId: evalQuesList.evaluationId, evalRoomName: evalQuesList.evaluationRoomName, evalRoomIsNonACD: evalQuesList.isNonACD == undefined ? false : evalQuesList.isNonACD };
      evalQuesList?.questionsList.map((data: any) => {
        data.Topics.questions.map(elementQ => {
          // if(elementQ.questionData != undefined && elementQ.questionData != null) {
          //   elementQ.questionData.forEach(elementQlabel => {
          //     elementQlabel.label = elementQlabel.label.replace(' (undefined)', '')
          //   });
          // }
          if (elementQ.conditionalSkipQuestion == undefined) {
            elementQ.conditionalSkipQuestion = true;
          }
          if (elementQ.conditionalSkip && elementQ.conditionalSkipDetails != undefined) {
            elementQ.conditionalSkipQuestion = false;
          }
          if (elementQ.questionChoice == "Choice" || elementQ.questionChoice == "Yes/No") {
            elementQ.answerdata = null;
            elementQ.questionData = this.templatetoAns(elementQ.questionValue);
          }
          if (elementQ.questionChoice == "Choice" || elementQ.questionChoice == "Yes/No" || elementQ.questionChoice == "Number") {
            quesarr.push(elementQ)
            this.totalCountQues = quesarr.length
          }
          if (elementQ.questionChoice == "Comments") {
            notesarr.push(elementQ)
            this.totalCountNotes = notesarr.length
          }
        });
        if (data.topicShowHide == undefined) {
          data.topicShowHide = true;
        } else {
          data.topicShowHide = true;
        }
      });
      this.questionsList = evalQuesList?.questionsList;
    }
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
  myEvaluationAcceptDispute: any;
  getPlatformValidation() {
    return new Promise((resolve, reject) => {
      this.preferenceService.getPlatformDetail.subscribe((data: any) => {
        this.platformId = data.platformId;
        this.isMediaScreen = data.isMediaScreen != undefined ? data.isMediaScreen : false;
        this.myEvaluationAcceptDispute = data;
        resolve(data)
      },
        (error) => {
          reject(error)
          console.log(error);
        })
    })
  }

  ReloadData() {
    if (!!document.getElementById('disputeManage1')) {
      if (this.isloadSpinner == false) {
        document.getElementById('disputeManage1').style.display = 'none';
        this.isloadSpinner = true;
        const tableId = document.getElementById('disputeManage1');
        microstrategy.dossier.destroy({ placeholder: tableId });
      }
      this.workspaceTable();
      this.spinnerService.hide();
      setTimeout(() => {
        this.isloadSpinner = false;
        document.getElementById('disputeManage1').style.display = 'block';
      }, 7000);
    }
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
    if (this.subscription_mstrValidToken) {
      this.subscription_mstrValidToken.unsubscribe();
    }
    if (this.subscription_ValidateReportID) {
      this.subscription_ValidateReportID.unsubscribe();
    }

    const getDossierDOMobj = document.getElementById("disputeManage1");
    if (typeof (getDossierDOMobj) != 'undefined' && getDossierDOMobj != null) {
      getDossierDOMobj.style.display = 'none'
      if(getDossierDOMobj.id == 'disputeManage1'){
        microstrategy.dossier.destroy({ placeholder: getDossierDOMobj });
      }
       getDossierDOMobj.remove();
    }
  }

}
