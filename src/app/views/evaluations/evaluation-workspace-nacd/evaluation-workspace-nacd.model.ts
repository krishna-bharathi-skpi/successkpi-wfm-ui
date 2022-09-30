export class EvaluateSaveModel {
    public evaluationId: string = null;
    public evaluationRoomName: string = null;
    public strategyId: string = null;
    public strategyName: string = null;
    public contactId: string = null;
    public evaluationReportRoom: string = null;
    public questionsList: Array<Object> = null;
    public queue_name: string = null;
    public agent_name: string = null;
    public status: string=null;
    // public evaluation_coach:boolean=false;
    public queueid:string = null;
    public userid: string = null;
    public evaluation_interactions_id: string = "";
    public Type: string = '';


}

export class NotesModel{
    public customerId:string = null;
    public conversationid:string = null ;
    public time:string = null;
    public notes:string = null;
}