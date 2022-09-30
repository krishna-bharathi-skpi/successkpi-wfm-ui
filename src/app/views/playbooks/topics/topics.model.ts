export class TopicModel {
        topicId:number;
        topicName: string=null;
        channel: string="All" ;
        topicDescription:string=null;
        topicPhrases=[] ;
        tags=[] ;
        active: boolean = true;
        timeBased: boolean = false;
        startTime: number = 0;
        endTime: number = 0;
        detectiontype:string = 'range'
}
    