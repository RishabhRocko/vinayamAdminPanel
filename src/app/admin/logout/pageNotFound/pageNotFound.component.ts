import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'logout-notFound',
  templateUrl: './pageNotFound.component.html',
})
export class PageNotFoundComponent {
  constructor(private router: Router){}
  onSignin()
  {
    this.router.navigate(['/admin']);
  }

  onSignup()
  {
    this.router.navigate(['/admin', 'signup']);
  }

  onForgotPassword()
  {
    this.router.navigate(['/admin', 'forgotpassword']);
  }
}
