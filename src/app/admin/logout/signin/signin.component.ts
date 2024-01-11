import { Component , OnInit} from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'logout-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit{
  closeResult:String = '';
  adata:any = [];
  cdata:any = [];
  constructor(private router: Router){}
  ngOnInit(): void {
  }
  Signin = new FormGroup({
    email: new FormControl( '',[Validators.required] ),
    password: new FormControl( '',[Validators.required] ),
  });

  onSubmitSignin()
  {
    let email:any = this.Signin.value['email'];
    let password:any = this.Signin.value['password'];
    console.log(email);
    console.log(password);
    // this.router.navigate(['/admin', 'dashboard']);
 }
}
