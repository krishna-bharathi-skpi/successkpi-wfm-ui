export class RolesModel{
    public roleName: string = null;
    public roleDescription: string = null;
    public isHomedashboard: string = "company";
    public homeDashboardId: string = null; 
    public iskeyQuestions: string = "company";
    public keyQuestions = null;
    public successkpiFeatures={
        "home":{
            "homeDashboard":{
                "isView": false,
                "isViewEdit": false 
            },
            "help":{
                "isView": false
            },
            "commandCenter":{
                "isView": false
            }
        },
        "analytics":{
            "keyQuestion":{
                "isView": false,
                "isViewEdit": false
            },
            "scheduleDelivery": {
                "isView": false,
                "isViewEdit": false
            },
            "scheduleImport": {
                "isView": false,
                "isViewEdit": false
            },
            "realtimeReport": {
                "isQueueStatsView": false,
                "isQueueStatusView": false,
                "isAgentStatsView": false,
                "isAgentStatusView": false
            },
            "sharedDashboard":{
                "isView": false,
                "isViewEdit": false
            },
            "customReports":{
                "isView": true,
                "isViewEdit": false
            },
            "publicReports":{
                "isView": false,
                "isViewEdit": true
            },
            "subscription":{
                "isView": false,
                "isViewEdit": false
            },
            "sharedSubscriptions":{
                "isView": false,
                "isViewEdit": false
            },
            "contactSubscriptions":{
                "isView": false,
                "isViewEdit": false
            },
            "help":{
                "isView": false
            },
            "myReports":{
                "isViewEdit": false
            }
        },
        "evaluate":{
            "evaluationWorkspace":{
                "isView": false,
                "isViewEdit": false
            },
            "evaluationWorkspaceNacd":{
                "isView": false,
                "isViewEdit": false
            },
            "coachingWorkspace":{
                "isView": false,
                "isViewEdit": false
            },
            "manageDispute":{
                "isView": false,
                "isViewEdit": false
            },
            "evaluationFroms":{
                "isView": false,
                "isViewEdit": false
            },
            "myEvaluation":{
                "isView": false
            },
            "myTeamEvaluation":{
                "isView": false
            },
            "myCoachingSessions":{
                "isView": false
            },
            "interactions":{
                "isView": false
            },
            "newInteractions":{
                "isView": false
            },
            "ai_ml_Scoring":{
                "isView": false,
                "isViewEdit": false
            },
            "help":{
                "isView": false
            }  
        },
        "playbooks":{
            "myPlaybooks":{
                "isView": false,
                "isViewEdit": false
            },
            "topics":{
                "isView": false,
                "isViewEdit": false
            },
            "moments":{
                "isView": false,
                "isViewEdit": false
            },
            "themes":{
                "isView": false,
                "isViewEdit": false
            },
            "actions":{
                "isView": false,
                "isViewEdit": false
            },
            "phraseRecommendation": {
				"isView": false,
                "isViewEdit": false
			},
            "redactions":{
                "isView": false,
                "isViewEdit": false
            },
            "customPhrases":{
                "isView": false,
                "isViewEdit": false
            },
            "help":{
                "isView": false
            } 
        },
        "settings":{
            "profile":{
                "isView": false,
                "isChangePwd": false
            },
            "platformSettings":{
                "isView": false,
                "isViewEdit": false
            },
            "dataPartition":{
                "isView": false,
                "isViewEdit": false
            },
            "preferences":{
                "isView": false,
                "isViewEdit": false
            },
            "roles":{
                "isView": false,
                "isViewEdit": false
            },
            "users":{
                "isView": false,
                "isViewEdit": false
            },
            "topicDetection":{
                "isView": false,
                "isViewEdit": false
            }
        },
        "agents":{
            "dispositionCoding":{
                "isView": false,
                "isViewEdit": false
            },
            "myPerformance":{
                "isView": false
            },
            "myEvaluations":{
                "isView": false
            },
            "mySchedule":{
                "isView": false
            }
        },
        "work":{
            "serviceQuality":{
                "isView": false,
                "isViewEdit": false
            },
            "forecasting":{
                "isView": false,
                "isViewEdit": false
            },
            "schedule":{
                "isView": false,
                "isViewEdit": false
            }
        }
    }
    public dataAccess:any = [new DataModel()];
    public roleEvaluationFormID: string = null;
    public istopReports: string = "company";
    public istopApps: string = "company";
    public topReports:ReportModel[] = [];
    public topApps:ApplicationModel[] = [];
}

export class ReportModel {
    reportName:any = null;
    reportID:any = null;
}
export class ApplicationModel {
    appName:any = null;
    appObj:any = null;
}
export class DataModel {
        dataLabel:string = "";
        dataValue:string = "";
        dataList: []   
}

// export class ApplicationModel {
//     appName:any = null;
//     appObj:any = null;
//     appObjURL:any = null;
// }