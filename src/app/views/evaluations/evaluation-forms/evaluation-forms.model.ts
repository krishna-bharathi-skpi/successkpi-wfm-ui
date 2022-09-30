export class EvaluationModel {
    public evaluationRoomName: string = null;
    public evaluationRoomDesc: string = null;
    public strategyId: string = null;
    public evaluationId: string = null;
    public questionsList: any[] = [new CategoryModel()];
    public userEvaluator: any = [];
    public userModerator: any = [];
    public userCoaches: any = [];
    public lockAfterSubmit: boolean = false;
    public allowResubmit: boolean = false;
    // public allowCoaches: boolean = true;
    public coachCategories: any = [];
    // public automaticHydrationDetail: any = {
    //     hydrationCall: true,
    //     rulebasedDetail: {
    //         rulebased: 'percentage',
    //         percentage: {
    //             send: null, duration: '',
    //         },
    //         rule: {
    //             send: null, duration: '',
    //         },
    //     }
    // };
    public automaticcallhydration: boolean = true;
    public rulebased: string = 'percentage';
    public sendcalls: number = null;
    public callsforworkspace: string = '';
    public ruletype: string = '';
    public isNonACD: boolean = false;
    public conditionMetrics: string = 'all';
    public callHydrationCondition: any =  [];
    public formLevelDossierId: any;
    
}
export interface CategoryInput {
    score: number;
    topicId: string;
    Topics: any;
}


export class CategoryModel {
    score: number = 10;
    topicId: string = "t-new-category";
    Topics: any = {
        customerId: "test",
        questions: [
            {
                questionId: null,
                question: null,
                questionChoice: null,
                questionValue: null,
                questionDescription: null,
                questionMandatory: false,
                displaytype: null,
                defaultanswer: null,
                hyperlinkDisplayType: null,
                hyperlinkUrl: null
            }
        ],
        topicId: "t-new-category",
        topicName: "No name"
    };
}

