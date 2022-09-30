export class MyPlaybookModel {
    public playBookId: number ;
    public playbookName: string= null;
    public playbookDescription: string = null;
    public strategyId: string = null;
    public callActionId: string = null;
    public callActionList = [{ callActionId: null }];
    public active: boolean = true;
    public cfaOperator: string = 'AND';
    public cfacondition: Array<Object> = [{
        "Condition": null,
        "Dimension": null,
        "Measure": null,
        "Theme":null,
        "Channel":null,
        "Metrics":null,
        // "measureFrom": null,
        // "measureTo": null
    }];
    public cfaLogic: string = null;
    public cfaAction: string = null;
    public filterConditionType: string = 'all';
    public filterConditions: any =  [];
}