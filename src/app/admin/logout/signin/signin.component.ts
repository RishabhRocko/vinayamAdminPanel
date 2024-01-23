import { Component , OnInit} from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';
import { decryptData } from '../../../helper/cryptoEncryption';
@Component({
  selector: 'logout-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit{
  user: any;
  constructor(private userService:LoginService,private router: Router,private toastr: ToastrService){}
  ngOnInit(): void {
    localStorage.removeItem("token");
  }
  Signin = new FormGroup({
    userName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)] ),
    password: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)] ),
  });

  onSubmitSignin()
  {
    this.user = this.Signin.value;
    this.userService.authUser(this.user).subscribe((res: any) => {
      let response = decryptData(res);
      console.log(response)
      if(response.status == true)
      {
        localStorage.setItem('token',response.data ? response.data.adminRole : 0);
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
 }
}
