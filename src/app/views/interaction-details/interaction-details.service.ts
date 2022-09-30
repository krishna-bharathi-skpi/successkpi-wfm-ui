import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import utils from '../../config';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor(private http:HttpClient) { }
  
  GetReportData(reportData):Observable<any>{
    let url=utils.pathPhase11+"/api/getmicrostrategyreportdata";
    return this.http.post(url,reportData)
  }

        //Workflow to answer the prompt and render the dossier
        async dossierPromptWorkflow(mstrIdToken, mstrProjectID, mstrDossierID, promptsAnswers) {
          return new Promise((res, rej) => {
            const optionsDelegate = {
              method: 'POST',
              credentials: 'include' as RequestCredentials,
              headers: {
                'content-type': 'application/json',
                "accept": "application/json"
              },
              body: JSON.stringify({
                "loginMode": -1,
                "identityToken": mstrIdToken
              })
            }
      
            // fetch('https://insight-euc1.successkpi.de/AnalyticsLibrary' + '/api/auth/delegate', optionsDelegate)
            fetch(environment.mstr_report_Url + '/api/auth/delegate', optionsDelegate)
            .then(response => {
              // debugger
              let authToken = response.headers.get('x-mstr-authtoken')
              // console.log('authTokenNew :: ', authToken);
      
              const options = {
                method: 'POST',
                credentials: 'include' as RequestCredentials,
                headers: {
                  'content-type': 'application/json',
                  "accept": "application/json",
                  "x-mstr-authtoken": authToken,
                  "x-mstr-projectid": mstrProjectID,
                }
              }
              fetch(environment.mstr_report_Url + '/api/dossiers/' + mstrDossierID + '/instances', options)
              .then(response => {
                response.json().then(json => {
                  let instance = json;
                  // console.log('instance :: ', instance);
      
                  const options = {
                    method: 'GET',
                    credentials: 'include' as RequestCredentials,
                    headers: {
                      //'Cookie': mstrCookie,
                      'content-type': 'application/json',
                      "accept": "application/json",
                      "x-mstr-authtoken": authToken,
                      "x-mstr-projectid": mstrProjectID,
                    }
                  }
                  fetch(environment.mstr_report_Url + '/api/documents/' + mstrDossierID + '/instances/' + instance.mid + '/prompts', options)
                  .then(response => {
                    response.json().then(json => {
                      let promptList = json;
                      // console.log('promptList :: ', promptList);
                      if (promptList.length > 0) {
                        let promptAnswersList = {
                          prompts: []
                        };
                        promptList.forEach(prompt => {
                          if (promptsAnswers[prompt.name]) {
                            //Build prompt answer object
                            promptAnswersList.prompts.push(
                                {
                                  "key": prompt.key,
                                  "type": "VALUE",
                                  "answers": promptsAnswers[prompt.name]
                                }
                            );
                          }
                        });
                        const options = {
                          method: 'PUT',
                          credentials: 'include' as RequestCredentials,
                          headers: {
                            //'Cookie': mstrCookie,
                            'content-type': 'application/json',
                            "accept": "application/json",
                            "x-mstr-authtoken": authToken,
                            "x-mstr-projectid": mstrProjectID,
                          },
                          body: JSON.stringify(promptAnswersList)
                        }
                        fetch(environment.mstr_report_Url + '/api/documents/' + mstrDossierID + '/instances/' + instance.mid + '/prompts/answers', options)
                        .then(response => {
                          let jsonRes = {
                            'instance': instance,
                            'authToken': authToken
                          };
                          res(jsonRes);
                        })
                      } else {
                        let jsonRes = {
                          'instance': instance,
                          'authToken': authToken
                        };
                        res(jsonRes);
                      }
                    })
                  })
                })
              });
            });
          })
        }
 
}
