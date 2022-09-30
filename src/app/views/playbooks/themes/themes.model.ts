export class ThemesModel{
  public strategyId: number;
  public strategyName: string = null;
  public strategyDescription: string=null;
  public topicScore=[{
     "topicId": null,
     "score": 0, 
     "defaultScore": 0,
     "isDefaultScore": false,
     "isOccurrence": false}];
  public active: boolean = true;
} 