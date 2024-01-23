import { Component  , OnInit} from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from './signup.service';
import { ToastrService } from 'ngx-toastr';
import { decryptData } from 'src/app/helper/cryptoEncryption';
@Component({
  selector: 'logout-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  user:any;
  constructor(private SignupService:SignupService,private router: Router,private toastr: ToastrService){}
  ngOnInit(): void {
  }

  adminForm = new FormGroup({
    userName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)] ),
    adminRole: new FormControl( '',[Validators.required,Validators.pattern(/^[0-9]*$/)] ),
    emailId: new FormControl( '',[Validators.required,Validators.pattern(/^([\w\-\.\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)] ),
    password: new FormControl( '',[Validators.required,Validators.pattern(/^[A-Za-z0-9][a-zA-Z0-9 .&,@$()?_#-\/\+[\]*]*$/)] ),
  });

  onSubmitAdmin()
  {
    if(localStorage.getItem('token')){
      this.user = this.adminForm.value;
      this.SignupService.addAdmin(this.user).subscribe((res: any) => {
        let response = decryptData(res);
        if(response.status == true)
        {
          this.router.navigate(['/admin', 'dashboard']);
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
      this.toastr.error('Unauthorized', 'Error', {
        positionClass: 'errorMessageClass'
    });
    }
  }

  reloadBack(){
    window.history.back();
  }
}
