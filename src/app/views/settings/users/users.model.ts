export class UserCreateModel {
    public Username: string = null;
    public CustomerName: string = null;
    public CustomerAddress: string = 'null';
    public phoneNumber: string = '+1';
    public CompanyName: string = 'null';
    public Role: string = "";
    public Password: string = null;
    public CreditCard: string = null;
    public datapartition:string = "";
};

export class UserUpdateModel {
    public userId: string = null;
    public companyName: string = 'null';
    public creditCard: string = null;
    public customerAddress: string = 'null';
    public customerId: string = null;
    public customerName: string = null;
    public customerPhone: string = null;
    public email: string = null;
    public role: string = null;
    public datapartition:string = "";

}