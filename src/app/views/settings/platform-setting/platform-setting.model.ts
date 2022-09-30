export class PlatformSettingModel {
    public dataLocations: any = [];
    public configId: string = "";
    public accountId: string = "";
    public keyRoleRatio: string = 'Key';
    public accessKey: string = "None";
    public channel: string = "All"
    public secretKey: string = "None";
    public instanceId: string = "";
    public interval: number = 5;
    public queueNameArn = []
    public realTimeFlag: Boolean = false;
    public queues: Boolean = false;
    public roleArn: string = "";
    public callrecording: string = "None";
    public connectRecodingLocation: string = ""
    public cxCenterName: string = "";
    public cusTimeZone: string = "America/New_York";
    public awsRegion: string = "us-east-1";
    public SKPI_Recording: Boolean = false;
    public Agent_Username:any = [];
    public Dialing_Number:any = [];
    public Instance_id:any = [];
    public Queue_Name:any = [];
    public Agent_Username_Flag: Boolean = false;
    public Dialing_Number_Flag: Boolean = false;
    public Instance_id_Flag: Boolean = false;
    public Queue_Name_Flag: Boolean = false;

    // public allowAgentFeedback: Boolean = false;
    // public accept: Boolean = false;
    // public dispute: Boolean = false;


    //Gensys pureClound
    public clientID: string = "";
    public clientSecret: string = "";
    public ivrType: Boolean = true;
    public acdType: Boolean = true;
    public SpeechtxtType: Boolean = false;
    public qmType: Boolean = false;
    public voiceChannel: Boolean = false;
    public chatChannel: Boolean = false;
    public emailChannel: Boolean = false;
    public Attribute: Boolean = false;
    public realtimeQueuesOrUsers: string = "";
    public isSkpiWaitTime: Boolean = false;
    public isRecording: Boolean = false;
    public isSkpiIVRTime:Boolean = false;
    public genesysOrgId: string = "";
    public callRecordingOption:string = "API"
    public outboundCampaign:Boolean = false;
    public WFMSuccesskpi:Boolean=false;
    //Contact center-others --sftp
    public hostname: string = "";
    public port: string = "";
    public username: string = "";
    public password: string = "";

    //contact drop down 
    public platformId: number;
    public platformName: string = "";

    //contact switch
    public swithcontact: string = "aws";

    //Contact center-others --aws s3

    public recodingLocation: string = null
    public channelawsS3: string = "All"
    public ctrDetails: string = null
    public ivrCallDetails: string = null
    public agentactivityDetails: string = null
    public accountIdAwsS3: string = null
    public keyRoleRatioAwsS3: string = "Key"
    public accessKeyAwsS3: string = ""
    public secretKeyAwsS3: string = ""
    public genesysHistorcalInterval: number = 30;
    public genesysRealTimeInterval: number = 5;
    public genesysRealTimeFlag: Boolean = false;
    //Contact Center Languages, Genesys, Amazon
    public languageCode: string = "en-US";
    public genesysRegion: number = 1;
    public textDataLocations = []
    public ccOtherDataLocations = []
    public isWfmActive: Boolean = false; 
    public percentTranscription: number = 100;

    // Contact Center UJET
    public domainName: string = "";
    public dataSyncMethod: string = "s3";

    //Talkdesk
    public talkdeskHistorical:Boolean = false;
    
};