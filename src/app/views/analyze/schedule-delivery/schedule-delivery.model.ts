export class ScheduleModel {
  public scheduleId: string = null;
  public scheduleName: string = null;
  public scheduleFrequency: string = "10 10 * * ? *";
  public scheduleExportLocation: string = null;
  public scheduleDataFormat: string = "";
  public scheduleReportHandle: string = null;
  public objectType:string ="report";
}

