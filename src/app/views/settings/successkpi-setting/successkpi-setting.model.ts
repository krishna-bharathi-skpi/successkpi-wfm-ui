export class PreferenceModel {
    public platformId: number;
    public platformName: string = null;
    public imageUrl: string = null;
    public imageName: string = null;
    public image: string = null;
    public imageNewOrExt: boolean = false;
    public isLogoChecked: string = "default";
    public dashboardId:string=null;
    public allowAgentFeedback: Boolean = false;
    public accept: Boolean = false;
    public dispute: Boolean = false;
    public speakerLabelValue:number = 2;
    public callAnalyticsType:string = null;
    public languageDetection:string = "Specific Language Detection";
    public lanuageDetectionOption:any = [];
    public audioIdentificationType: string = "Channel Detection";
}