import { Component, OnInit } from '@angular/core';
import { CommonMethods } from '../../../common/common.components';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { GlobalComponent } from '../../../global/global.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ViewChild, ElementRef} from '@angular/core'
import { UserService } from '../users/users.service';
import { UsersModel } from './genesys-users.model';
import { GenesysUserService } from './genesys-users.service';
import utils from '../../../config';
import { UserUpdateModel } from '../users/users.model';
import { csv2json } from 'csvjson-csv2json';

@Component({
  selector: 'app-genesys-users',
  templateUrl: './genesys-users.component.html',
  styleUrls: ['./genesys-users.component.css']
})
export class GenesysUsersComponent implements OnInit {

  roles: any=[];
  userDetails: string = "tableDatas";
  deactivebtn: boolean = false;

  userCreateModel: UsersModel;
  userUpdateModel: UserUpdateModel;
  createUser: FormGroup;
  updateUser: FormGroup;

  constructor(private commonMethods: CommonMethods, private userService: UserService, private genesysUserService: GenesysUserService,
    private formBuilder: FormBuilder, public global: GlobalComponent,private spinnerService: NgxSpinnerService) {
    this.commonMethods.dynamicBackgroundColorChange('white');
    this.userCreateModel = new UsersModel();
    this.userUpdateModel = new UserUpdateModel();
    // this.getCustomerPool();
    this.getRoleDDL();
    this.getPartitionDDL();
  }
  @ViewChild('importfile') importfile: ElementRef;

  ngOnInit(): void {
    // this.roles = [
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
 
  createuserForm() {
    this.createUser = this.formBuilder.group(
      {
        email: [null, [Validators.required, Validators.email]],
        phone: [null, Validators.required],
        role: [null, Validators.required],
        partition: [null, Validators.required]
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
        phone: [null, Validators.required]
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
    this.userCreateModel = new UsersModel();
    this.userUpdateModel = new UserUpdateModel();
    this.userDetails = 'tableDatas';
    this.createUser.reset();
    this.updateUser.reset();
    this.isemailEnable = false;
    this.issearchBtn = false;
  }
  
  creatEditType:string;
  isemailEnable:boolean = false;
  isPhEnable:boolean = true;
  addEditUser(value , type){
    if(type == 'create'){
      this.userCreateModel = new UsersModel();
      this.createuserForm();
      this.createUser.reset();
      this.submittedCreateUser = false;
      this.userDetails = 'addUserData';
      this.creatEditType = type;
      this.isemailEnable = false;
      this.issearchBtn = true;
      this.isPhEnable = true;
      this.userCreateModel.datapartition = this.patitionList[0].value;
    }
    else{
      this.userUpdateModel = JSON.parse(JSON.stringify(value));
      // console.log(this.userUpdateModel)
      this.submittedEditUser = false;
      this.userDetails = 'EdituserData';
      this.creatEditType = type;
      this.userUpdateModel.datapartition = (this.userUpdateModel.datapartition != undefined && (this.userUpdateModel.datapartition != "" || this.userUpdateModel.datapartition != null)) ? this.userUpdateModel.datapartition : this.patitionList[0].value;
    }
    
  }
  // get users data
  Users: any = [];
  userRole:any = [];
  roleValue:any;
  getUsers() {
    this.spinnerService.show();
    this.userService.getUsers().subscribe(
      (data: any) => {
        this.Users = data;
        this.searchUserName = "";
        this.tempUsers = data;
        this.spinnerService.hide();
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      })
  }

  
  // save user when add
  // loading: boolean = false;
  saveUser() {
     
    if (this.createUser.invalid) {
      this.submittedCreateUser = true;
    }
    else {
      // this.loading = true;
      let orgDetails = localStorage.getItem('g_obj');
      orgDetails = JSON.parse(orgDetails);
      this.userCreateModel.OrgId = orgDetails['orgId'] != undefined && (orgDetails['orgId'] != null ||  orgDetails['orgId'] != "") ? orgDetails['orgId'] : null;
      this.userCreateModel.CompanyName = orgDetails['orgName'] != undefined && (orgDetails['orgName'] != null || orgDetails['orgName'] != "") ? orgDetails['orgName'] : 'null';
      this.spinnerService.show();
      this.genesysUserService.saveUser(this.userCreateModel).subscribe(
        (data: any) => {
          this.userCreateModel = new UsersModel();
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

    if (this.updateUser.invalid) {
      this.submittedCreateUser = true;
    }
    // this.loading = true;
    // this.userUpdateModel.role = this.roles.filter(s=> s.value == this.userUpdateModel.role)[0].label;
    this.spinnerService.show();
    this.userService.updateUser(this.userUpdateModel).subscribe(
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
  
  // create Cancel
  createCancel() {
    this.submittedCreateUser = false;
    this.userCreateModel = new UsersModel();
    this.userUpdateModel = new UserUpdateModel();
    this.getUsers();
    this.userDetails = 'tableDatas';
    this.createUser.reset();
    this.updateUser.reset();
    this.isemailEnable = false;
    this.issearchBtn = false;
    this.isPhEnable = false;
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
  
  issearchBtn:boolean = true;
  searchEmail(){
    let a_token = localStorage.getItem('premium_app_auth_data');
    a_token = JSON.parse(a_token);
    let gpc_Env = utils.genesys_premium_env;
    let params = {
      email: this.userCreateModel.Username,
      access_token: a_token['accessToken'],
      apiUrl: localStorage.getItem(gpc_Env)
    }
    this.genesysUserService.searchEmailFromGenesys(params).subscribe(
      (data:any)=>{
        // console.log(data);
        this.userCreateModel = new UsersModel();
        this.userCreateModel.Username = data.email;
        this.userCreateModel.CustomerName = data.name;
        this.userCreateModel.phoneNumber = data.phoneNumber; 
        this.userCreateModel.datapartition = this.patitionList[0].value;
        this.issearchBtn = false;
        this.isemailEnable = true;
        this.isPhEnable = false;
      },
      (error)=>{
        console.log(error)
        this.commonMethods.addToastforlongtime(false, error.error.response);
      }
    )
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

  keyPressOption: boolean = false;
  async omit_special_char(event) {
    this.keyPressOption = true;
    var k;
    k = event.charCode;  
    if ((k > 32 && k < 45) || k == 47 || (k > 57 && k < 65) || (k > 90 && k < 95) || k == 96 || (k > 122 && k < 127)) {
      return await event.preventDefault();
    }
  }


  // RemoveSpecialCharacters(val) {
  //   if (val != null && val.length > 1 && !this.keyPressOption) {
  //     const res = val.replace(/[^a-zA-Z0-9--._-_ - ]/g, "");
  //     // setTimeout(() => {
  //       this.userCreateModel.CustomerName = res;
  //     // }, 50);
  //   }
  //   this.keyPressOption = false;
  // }
  onPaste(event) {
    if(event){
       const trimmedText = event.replace(/[`~!@#$%^&*()|+\=?;:%'",.<>\{\}\[\]\\\/]/gi, '');
       (<HTMLInputElement>document.getElementById('customernameid')).value = trimmedText;
       this.userCreateModel.CustomerName = trimmedText
    }
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
        // console.log(this.jsondata)
        this.jsondata.forEach(element => {
          if(element['Data partition'] == undefined){
            element['Data partition'] = 'All';
          }
        });
        // console.log(this.jsondata)
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
        console.log(data);
        this.spinnerService.show();
        this.genesysUserService.importUsers(data).subscribe(
          (data:any)=>{
            // console.log(data);
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
}
