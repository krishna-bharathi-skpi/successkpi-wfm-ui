let configJson = {
    "evaluation": {
        "path": {
            "evaluation": "evaluation",
            "evaluationforms": "evaluation-forms",
            "evluationworkspace": "evaluation-workspace",
            "hydrationconditions":"hydration-conditions"
        },
        "jsonFile": {
            "questions": "questions.json",
            "tabMenu": "tabMenu.json",
            "callhydrationconditions":"call-hydration-conditions.json"
        }
    },
    "playbooks": {
        "path": {
            "playbooks": "playbooks",
            "myplaybooks": "myplaybooks",
            "topics": "topics",
            "actions": "actions",
            "conditions": "conditions",
            "channel": "channel",
            "actionType": "action-type",
            "httpType": "http-action-type",
            "moments": "moments"
        },
        "jsonFile": {
            "conditions": "conditions.json",
            "playbooktemplate": "playbook-template.json",
            "topictemplate": "topic-template.json",
            "channel": "channel.json",
            "actionType": "action-type.json",
            "httpsType": "https-actiontype.json",
            "momentType": "moment-type.json",
            "sentimentType": "sentiment-type.json",
            "filterConditions": "filter-conditions.json"
        }
    },
    "jsonFile": {
        "platformList": "contactcenter_platforms.json",
        "languagesList": "languages.json",
        "amazonDataLocation": "data_locations.json",
        "textDataLocation": "text_data_locations.json",
        "genesysRegion": "genesys_regions.json",
        "s3Script": "s3-permission-script.json",
        "s3ScriptScheduleDelivery": "s3-schedule-delivery-permission-script.json",
        "s3ScriptScheduleImport": "s3-schedule-import-permission-script.json",
        "roleAdmin": "admin_role.json",
        "awsRegions": "source_aws_region.json",
        "timeZones": "timeZones.json",
        "domainurlLivevox": "domainurl_livevox.json",
        "callAnalyticsType": "callAnalyticsType.json",
        "languageDetection": "languageDetection.json"
    },
    "settings": {
        "path":{
          "topicDetect": "topic-detection",
          "setting": "settings",
          "preference": "preference",
          "platformSettings": "platform-settings",
          "amazon": "amazon-connect",
          "genesys": "genesys-purecloud",
          "others": "other-contactcenters",
          "jobType": "job-type",
          "tableHead": "table-headers",
          "roles": "role"
        },
        "jsonFile": {
            "hoursList": "hours-DDL.json",
            "topAppDDL": "topApplication-level.json",
            "topAppObjDDL": "topApps-Object.json",
            "defaultApps": "topApps-companyLevel.json"
        }
    },
    "help": {
        "path": {
            "help": "help",
            "homeHelp": "home",
            "analyzeHelp": "analytics",
            "evaluateHelp": "evaluation",
            "playbookHelp": "playbooks"
        }
    }
   
}
export {configJson}



