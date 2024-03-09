import { Component , OnInit} from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotpassService } from './forgotpass.service';
import { ToastrService } from 'ngx-toastr';
import { decryptData } from 'src/app/helper/cryptoEncryption';
@Component({
  selector: 'logout-forgot',
  templateUrl: './forgotPassword.component.html',
})
export class ForgotPasswordComponent {
  getOtpVar:any;
  submitOtpVar:any;
  otpSend:any;
  constructor(private ForgotpassService:ForgotpassService,private router: Router,private toastr: ToastrService){}
  ngOnInit(): void {
    this.otpSend = 0;
  }
  getOtpForm = new FormGroup({
    email: new FormControl( '',[Validators.required,Validators.pattern(/^([\w\-\.\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)] ),
  });
  submitOtpForm = new FormGroup({
    otp: new FormControl( '',[Validators.required,Validators.pattern(/^[0-9]*$/)] ),
    email: new FormControl( '',[Validators.required,Validators.pattern(/^([\w\-\.\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)] ),
    newpass: new FormControl( '',[Validators.required,Validators.pattern(/^[A-Za-z0-9][a-zA-Z0-9 .&,@$()?_#-\/\+[\]*]*$/)] ),
    confpass: new FormControl( '',[Validators.required,Validators.pattern(/^[A-Za-z0-9][a-zA-Z0-9 .&,@$()?_#-\/\+[\]*]*$/)] ),
  });

  onGetOtp()
  {
    this.getOtpVar = {getOtpForm:this.getOtpForm.value};
    this.ForgotpassService.getOtpForgot(this.getOtpVar).subscribe((res: any) => {
      let response = decryptData(res);
      if(response.status == true)
      {
        this.otpSend = 1;
        this.toastr.success(response.message ? response.message : 'Success', 'Success', {
          positionClass: 'successMessageClass'
      });
      }else{
        this.otpSend = 0;
        this.toastr.error(response.message ? response.message : 'Error', 'Error', {
          positionClass: 'errorMessageClass'
      });
      }
    });
  }

  onSubmitOtp()
  {
    if(this.submitOtpForm.value.newpass == this.submitOtpForm.value.confpass)
    {
      this.submitOtpVar = {submitOtpForm:this.submitOtpForm.value};
      this.ForgotpassService.submitOtpForgot(this.submitOtpVar).subscribe((res: any) => {
        let response = decryptData(res);
        if(response.status == true)
        {
          this.router.navigate(['/admin']);
          this.toastr.success(response.message ? response.message : 'Success', 'Success', {
            positionClass: 'successMessageClass'
        });
        }else{
          this.toastr.error(response.message ? response.message : 'Error', 'Error', {
            positionClass: 'errorMessageClass'
        });
        }
      });
    }else{
      this.toastr.error('Password And Confirm Password Must Be Same!', 'Error', {
        positionClass: 'errorMessageClass'
    });
    }
  }
}
