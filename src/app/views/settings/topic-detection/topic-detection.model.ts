export class TopicDtModel {
    fromDate = new Date();
    toDate = new Date();
    fromHour = "00";
    toHour = String((new Date).getHours().toString()).padStart(2, "0");
    jobType = "supervised";
}