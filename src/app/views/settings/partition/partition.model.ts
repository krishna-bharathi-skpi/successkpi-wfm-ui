export class PartitionsModel {
    public partitionName: string = "";
    public dataPartitionList:any = [new DataModel()];
    public platformId: string = "";
    public platformName: string = "";
}

export class DataModel {
    dataLabel:string = "";
    dataValue:string = "";
    dataList: []   
}