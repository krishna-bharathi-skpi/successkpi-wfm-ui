export class ActionModel {
    public callActionId: string;
    public cfaName: string = null;
    public cfaDescription: string = null;
    public active: boolean = true;
    public actionType: string = 'EMAIL';
    public cfaSnsTopics = new SubscriptionModel();
}

export class SubscriptionModel {
    public emailRecipients: string = null;
    public emailSubject: string = null;
    public emailMessage: string = null;

    public smsPhoneNumbers: string = null;
    public smsTitle: string = null;
    public smsFromPhoneNumber: string = null;
    public smsMessage: string = null;


    public httpsEndurl: string = null;
    public httpsType: string = 'Post';
    public httpsParameters = [{
        Parametertype: 'variable',
        Key: null,
        Value: null,
    }];

    public lambdaArn: string = null;
    public evaluationId: any = null;
}
