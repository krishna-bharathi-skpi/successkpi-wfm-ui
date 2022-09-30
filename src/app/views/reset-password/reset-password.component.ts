import { Component, OnInit } from '@angular/core';
import { ForgotModel } from './reset-password.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResetPasswordService } from './reset-password.service';
import { CommonMethods } from '../../common/common.components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  newPwd: string = "codePage";
  newPassword: string = null;
  public forgotModel: ForgotModel;
  emailForm: FormGroup;
  verifyForm: FormGroup;
  issubmit: boolean = false;
  loading: boolean = false;
  issubmitNew: boolean = false;
  loadingNew: boolean = false;


  constructor(private fb: FormBuilder, private forgotService: ResetPasswordService, private commonMethods: CommonMethods, private router: Router) {
    this.forgotModel = new ForgotModel();
  }

  ngOnInit() {
    this.forms();
  }

  forms() {
    this.emailForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });

    this.verifyForm = this.fb.group({
      code: [null, [Validators.required, Validators.minLength(6)]],
      newpassword: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  sendCode(forgotModel) {
    if (this.emailForm.invalid) {
      this.issubmit = true;
    } else {
      this.loading = true;
      this.forgotService.sendCode(forgotModel).subscribe((data: any) => {
        this.issubmit = false;
        this.commonMethods.addToastforlongtime(true, 'Request received: check your email for the verification code.')
        this.newPwd = 'newPasswordPage';
      },
        (error) => {
          this.loading = false;
          console.log(error);
          this.commonMethods.addToastforlongtime(false, error.error)
        })
    }
  }

  changePassword(forgotModel) {
    this.loading = false;
    if (this.verifyForm.invalid) {
      this.issubmitNew = true;
    } else {
      this.loadingNew = true;
      this.forgotService.changePassword(forgotModel).subscribe((data: any) => {
        this.issubmit = false;
        this.issubmitNew = false;
        // this.newPwd = 'codePage';
        this.commonMethods.addToastforlongtime(true, 'Password changed.')
        this.forgotModel = new ForgotModel();
        this.emailForm.reset();
        this.verifyForm.reset();
        setTimeout(function () {
          this.router.navigateByUrl("/login");
        }.bind(this), 3000);
      },
        (error) => {
          this.loadingNew = false;
          console.log(error);
          this.commonMethods.addToastforlongtime(false, error.error)

        })
    }

  }
}
