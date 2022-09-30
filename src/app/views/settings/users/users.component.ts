import { Component, OnInit } from '@angular/core';
import { CommonMethods } from '../../../common/common.components';
import { UserService } from './users.service';
import { UserUpdateModel, UserCreateModel } from './users.model';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { GlobalComponent } from '../../../global/global.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Parser } from 'json2csv';
import { csv2json } from 'csvjson-csv2json';
import { ViewChild, ElementRef} from '@angular/core'
import { UserData } from '../../../user'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  roles: any=[];
  userDetails: string = "tableDatas";
  deactivebtn: boolean = false;

  userCreateModel: UserCreateModel;
  userUpdateModel: UserUpdateModel;
  createUser: FormGroup;
  updateUser: FormGroup;

  constructor(private commonMethods: CommonMethods, private userService: UserService,
    private formBuilder: FormBuilder, public global: GlobalComponent,private spinnerService: NgxSpinnerService) {
    this.commonMethods.dynamicBackgroundColorChange('white');
    this.userCreateModel = new UserCreateModel();
    this.userUpdateModel = new UserUpdateModel();
    // this.getCustomerPool();
    this.getRoleDDL();
    this.getPartitionDDL();
  }
  @ViewChild('importfile') importfile: ElementRef;

  ngOnInit(): void {
    // this.roles = [
    //   { label: 'Admin', value: 'Admin' },
    //   { label: 'Analyst', value: 'Analyst' }
    // ];
    let value={
      label: "All",
      value: "All"
    }
    this.patitionList.push(value);
    this.getUsers();
    this.createuserForm();
    this.updateuserForm();
    // this.getRoleDDL();


  }
  deactiveUser() {
    this.deactivebtn == false ? this.deactivebtn = true : this.deactivebtn = false;
  }

  createuserForm() {
    this.createUser = this.formBuilder.group(
      {
        userName: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        passwd: [null, [Validators.required, Validators.minLength(8)]],
        phone: [null, Validators.required],
      }
    )
  }//,Validators.pattern("[0-9]{0-10}")
  get validationCreateUser() { return this.createUser.controls; }
  submittedCreateUser = false;
  onSubmitCreate() {
    this.submittedCreateUser = true;
    if (this.createUser.invalid) {
      return
    }
  }

  updateuserForm() {
    this.updateUser = this.formBuilder.group(
      {
        userName: [null, Validators.required],
        email: [null, Validators.required],
        phone: [null, Validators.required],
      }
    )
  }
  get validationUpdateUser() { return this.updateUser.controls; }
  submittedEditUser = false;
  onSubmitEdit() {
    this.submittedEditUser = true;
    if (this.updateUser.invalid) {
      return
    }
  }

  breadCrumbBack(){
    this.submittedCreateUser = false;
    this.submittedEditUser = false;
    this.userCreateModel = new UserCreateModel();
    this.userUpdateModel = new UserUpdateModel();
    this.userDetails = 'tableDatas';
    this.createUser.reset();
    this.updateUser.reset();
    this.rolesError = false;
  }

  // get users data
  Users: any = [];
  userRole:any = [];
  roleValue:any;
  getUsers() {
    this.spinnerService.show();
    this.userService.getUsers().subscribe(
      (data: any) => {
        // this.Users = data;
        this.Users = data;
        this.searchUserName = ""
        // this.Users.forEach(element => {
        //   let value =this.roles.filter(s=>s.value == element.role)[0].label
        //   console.log(value);
        //   element.role = value
          
        // });
        
        this.tempUsers = data;
        this.spinnerService.hide();
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      })
  }
  // get customer loged data from customer pool 
  customerPoolUser: any;
  CustomerPoolEdit = false;
  // getCustomerPool(){
  //   this.userService.getCustomerPool().subscribe(
  //     (data:any)=>{
  //       this.customerPoolUser= data[0];
  //     },
  //     (error)=>{
  //       console.log(error);
  //       this.commonMethods.addToastforlongtime(false, error.error);
  //     })
  // }
  // edit table on user Name
  UserName: any;
  UserPool: boolean = false;
  editUser(user, type) {
    if (type == 'poolUser') {
      this.UserPool = true;
    }
    else {
      this.UserPool = false;
    }
    this.userUpdateModel = JSON.parse(JSON.stringify(user));
    // console.log(this.userUpdateModel)
    // this.userUpdateModel.role = this.roles.filter(s=>s.label == this.userUpdateModel.role)[0].value
    this.userDetails = 'userData';
    this.UserName = user.customerName
    this.userUpdateModel.datapartition = (this.userUpdateModel.datapartition != undefined && (this.userUpdateModel.datapartition != "" || this.userUpdateModel.datapartition != null)) ? this.userUpdateModel.datapartition : this.patitionList[0].value;
  }
  // save user when add
  loading: boolean = false;
  rolesError = false;
  partitionErr = false;
  saveUser() {
    // console.log("Save")
    if (this.userCreateModel.Role == '' || this.userCreateModel.Role.trim() == '') {
      this.rolesError = true;
    }
    else {
      this.rolesError = false;
    }
    if (this.userCreateModel.datapartition == '' || this.userCreateModel.datapartition.trim() == '') {
      this.partitionErr = true;
    }
    else {
      this.partitionErr = false;
    }
    if (this.createUser.invalid || this.rolesError == true || this.partitionErr == true) {
      this.submittedCreateUser = true;
      return
    }
    else {
      // this.loading = true;
      // this.userCreateModel.Role = this.roles.filter(s=> s.value == this.userCreateModel.Role)[0].label;
      this.spinnerService.show();
      this.userService.saveUser(this.userCreateModel).subscribe(
        (data: any) => {
          this.userCreateModel = new UserCreateModel();
          this.userDetails = 'tableDatas';
          this.getUsers();
          this.commonMethods.addToastforlongtime(true, 'User created');
          this.spinnerService.hide();
          // this.loading = false;
        },
        (error: any) => {
          // this.loading = false;
          console.log(error);
          if (error.error.indexOf('Invalid login') >= 0 || error.error.indexOf('Authentication unsuccessful') >= 0) {
            this.getUsers();
            this.userDetails = 'tableDatas';
            // this.loading = false;
          }
          else {
            // this.loading = false;
            this.userDetails = 'addUserData';
          }
          // this.userDetails = 'addUserData';
          this.spinnerService.hide();
          this.commonMethods.addToastforlongtime(false, error.error);
        })
    }
  }
  // update user
  updateUserdata() {
    // console.log("UPDATE")
    let userModeldata = this.userUpdateModel;

    if (this.updateUser.invalid) {
      this.submittedEditUser = true;
    }
    // this.loading = true;
    this.spinnerService.show();
    this.userService.updateUser(userModeldata).subscribe(
      (data: any) => {
        this.userUpdateModel = new UserUpdateModel();
        this.userDetails = 'tableDatas';
        this.getUsers();
        this.commonMethods.addToastforlongtime(true, 'User updated');
        this.spinnerService.hide();
      },
      (error) => {
        // this.loading = false;
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      })
  }

  // update pool user
  // updatePoolUser(){
  //   this.userService.updatePoolUser(
  //     {
  //       "access_Token": localStorage.getItem('accessToken'),
  //       "CustomerName": this.userUpdateModel.customerName,
  //       "CustomerAddress": this.userUpdateModel.customerAddress,
  //       "CompanyName": this.userUpdateModel.companyName,
  //       "phoneNumber": this.userUpdateModel.customerPhone,
  //     }).subscribe(
  //     (data:any)=>{
  //       this.userUpdateModel = new UserUpdateModel();
  //        this.userDetails = 'tableDatas';
  //        this.getCustomerPool();
  //        this.commonMethods.addToastforlongtime(true, 'User updated');
  //     },
  //     (error)=>{
  //       console.log(error);
  //       this.commonMethods.addToastforlongtime(false, error.error);
  //     });
  // }

  // delete user
  deleteUser() {
    this.spinnerService.show();
    this.userService.deleteUser(this.userUpdateModel).subscribe(
      (data: any) => {
        this.getUsers();
        this.userDetails = 'tableDatas';
        this.commonMethods.addToastforlongtime(true, 'User deleted');
        this.spinnerService.hide();
      },
      (error) => {
        console.log('error', error)
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      })
  }
  // create user(Add)
  addUser() {
    this.userCreateModel = new UserCreateModel();
    this.createuserForm();
    this.createUser.reset();
    this.userDetails = 'addUserData';
    this.rolesError = false;
    this.userCreateModel.datapartition = this.patitionList[0].value;
  }
  // create Cancel
  createCancel() {
    this.submittedCreateUser = false;
    this.userCreateModel = new UserCreateModel();
    this.getUsers();
    // this.getCustomerPool();
    this.userDetails = 'tableDatas'
    this.createUser.reset();
  }
  // update cancel
  updateCancel() {
    this.submittedEditUser = false;
    this.userUpdateModel = new UserUpdateModel();
    this.getUsers();
    // this.getCustomerPool();
    this.userDetails = 'tableDatas'
    this.updateUser.reset();
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  
  phno_valid:boolean= false;
  validateField(val){
    if(val.length < 12){
      this.phno_valid = true
    }
    else {
      this.phno_valid = false
    }
   
  }
  // search user
  tempUsers: any = [];
  searchUserName: string = '';
  searchUser() {
    this.Users = this.tempUsers.filter(item => item.customerName.toLowerCase().includes(this.searchUserName.toLowerCase()));
  }
  
  ddList:any;
  getRoleDDL(){
    this.userService.getRoleDDL().subscribe(
      (data:any)=>{
        // console.log(data);
         data.forEach(element => {
          this.roles.push(element);
        });
        this.getUsers();
      },
      (error) => {
        console.log('error', error)
      })
  }

  exportUser() {
    let data = [];
    this.Users.forEach((element,index) => {
      let params = {
        "S.No": index+1,
        "Name": element.customerName,
        "Email address": element.email,
        "Role": element.roleName,
        "Data partition": element.partitionName != undefined ? element.partitionName : 'All',
        "Phone number": element.customerPhone,
        "HomedashboardID": element.homeDashboardId,
        "Status": element.UserStatus
      }
      data.push(params)
    });

    let parser = new Parser();
    let csvdata = parser.parse(data);
    let a = document.createElement("a");
    let file = new Blob([csvdata], {type: 'text/csv'});
    a.href = URL.createObjectURL(file);
    a.download = "user_details.csv";
    a.click();
    URL.revokeObjectURL(a.href);
    this.commonMethods.addToastforlongtime(true,"User details downloaded!");
  }

  jsondata:any = []
  fileName:string = ""
  handleFileSelect(event) {
    let file = this.importfile.nativeElement.files[0];
    this.fileName = file.name
    let filedata: any;
    if (file) {
      const reader = new FileReader();
      reader.readAsText(this.importfile.nativeElement.files[0])
      reader.onload = () => {
        filedata = reader.result;
        this.jsondata = csv2json(filedata, { parseNumbers: true, parseJSON: true });
        
        this.jsondata.forEach(element => {
          if(element['Data partition'] == undefined){
            element['Data partition'] = 'All';
          }
            if(element.Name && element.Name != null){
                let res = element.Name.replace(/[^a-zA-Z0-9--._-_ - ]/g, "");
                  element.Name = res;
              }
          });
      }
    } else {
      this.commonMethods.addToastforlongtime(false, 'File must be a CSV')
    }
  }

  importUsers(){
    // console.log("IMPORT")
    if(this.fileName == "" || this.fileName == null){
      this.commonMethods.addToastforlongtime(false, 'You have not pick the csv file !')
    }
    else{
      let data = this.jsondata
      if(data.length >= 201){
        this.commonMethods.addToastforlongtime(false, '200 maximum users at a time !')
        this.importfile.nativeElement.value = "";
        this.fileName = "";
      }
      else{
        this.spinnerService.show();
        this.userService.importUsers(data).subscribe(
          (data:any)=>{
            this.commonMethods.addToastforlongtime(true,'We are processing all Users. Once job is completed, you will be notified on your email address with status of User Creation Job for each individual users')
            this.getUsers();
            this.spinnerService.hide();
          },
          (error)=>{
            console.log(error);
            this.spinnerService.hide();
          }
        )
        this.importfile.nativeElement.value = ""
        this.fileName = ""
      }
      
    }
    
  }

  CancelFile(){
    this.importfile.nativeElement.value = ""
    this.fileName = ""
  }

  patitionList:any= [];
  getPartitionDDL(){
    
    this.userService.getPartitionDDL().subscribe(
     (data:any)=>{
      //  console.log(data);
       data.forEach(element => {
         this.patitionList.push(element)
       });
     },
     (error) => {
       console.log('error', error)
    })    
  }

  syncUserDetails(){
    let cId= UserData.customerId;
    this.spinnerService.show();
    this.userService.syncUserDetails(cId).subscribe(
      (data:any)=>{
        // console.log("SYNC",data);
        setTimeout(() => {
          this.getUsers();
          setTimeout(() => {
            this.commonMethods.addToastforlongtime(true, "Sync user details successfully")
          }, 2000);
        }, 2000);
      },
      (error)=>{
        console.log(error);
        this.spinnerService.hide();
      }
    )
  }
  
  statusValue:string="";
  // confirmationMSG:string = "";
  userNameValue:any;
  getUserObj:any;
  openConfirmation(text,obj){
    // console.log(text);
    // this.confirmationMSG = "";
    this.userNameValue = {}
    this.getUserObj = obj;
    if(text == 'unconfirmed'){
      this.statusValue = text;
      this.userNameValue = obj.customerName;
      // this.confirmationMSG = "Are you sure you want to resend confirmation to" + " "+ obj.customerName + " " + "?";
    }
    if(text == 'confirmed'){
      this.statusValue = text;
      this.userNameValue = obj.customerName;
      // this.confirmationMSG = "Are you sure you want to reset password to" + " " + obj.customerName + " " + "?";
    }
   
    document.getElementById('modalopen').click();
  }
 
  resendConfirmation(){
    // console.log(this.getUserObj.email);
    let params = {
      email:this.getUserObj.email
    }
    this.spinnerService.show()
    this.userService.resendConfirmation(params).subscribe(
      (data:any)=>{
        // console.log(data);
        this.getUserObj = {};
        this.userNameValue = {};
        this.commonMethods.addToastforlongtime(true, "Resend verification link successfully");
        this.spinnerService.hide();
      },
      (error)=>{
        console.log(error);
        this.spinnerService.hide();
      }
    )
  }

  keyPressOption: boolean = false;
  async omit_special_char(event) {
    this.keyPressOption = true;
    var k;
    k = event.charCode;  
    if ((k > 32 && k < 45) || k == 47 || (k > 57 && k < 65) || (k > 90 && k < 95) || k == 96 || (k > 122 && k < 127)) {
      return await event.preventDefault();
    }
  }


//  async RemoveSpecialCharacters(val) {
//     if (val != null && val.length > 1 && !this.keyPressOption) {
//       const res = val.replace(/[^a-zA-Z0-9--._-_ - ]/g, "");
//       // setTimeout(() => {
//         this.userCreateModel.CustomerName = res;
//         this.userUpdateModel.customerName = res;
//       // }, 50);
//     }
//     this.keyPressOption = false;
//   }
    onPaste(event) {
      if(event){
        const trimmedText = event.replace(/[`~!@#$%^&*()|+\=?;:%'",.<>\{\}\[\]\\\/]/gi, '');
        (<HTMLInputElement>document.getElementById('usernameid')).value = trimmedText;
        this.userCreateModel.CustomerName = trimmedText;
        this.userUpdateModel.customerName = trimmedText
      }
    }
  
}
