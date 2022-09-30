export class ScheduleImportModel {
  public scheduleId: string = null;
  public scheduleName: string = null;
  public scheduleFrequency: string = "10 10 * * ? *";
  public scheduleImportLocation: string = null;
  public scheduleSourceRegion: string = "us-east-1";
  public scheduleImportType: string = "ADD";
}

