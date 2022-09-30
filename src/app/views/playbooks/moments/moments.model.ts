export class MomentModel {
    momentName:string = "";
    momentDescription:string = "";
    momentChannel:string = "Customer";
    detectionTime_Type:string = "absolute";
    momentCategory_Type:string = "OverTalk";
    moment_Threshold:number= 0;
    moment_SentimentType:string = "Positive";
    absolute_startTimeMinutes: number = 0;
    absolute_startTimeSeconds: number = 0;
    absolute_endTimeMinutes: number = 0;
    absolute_endTimeSeconds: number = 0;
    relative_startTime:number = 0
    relative_endTime:number = 0;
    momentTags:Array<string> = [];
    momentActive:boolean = false;
}
