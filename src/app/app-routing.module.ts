import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './admin/logout/pageNotFound/pageNotFound.component';
import { SigninComponent } from './admin/logout/signin/signin.component';
import { SignupComponent } from './admin/logout/signup/signup.component';
import { ForgotPasswordComponent } from './admin/logout/forgotPassword/forgotPassword.component';
import { DashWrapperComponent } from './admin/login/wrapper/dashboard/dashboard.component';
import { UsersComponent } from './admin/login/wrapper/users/users.component';
import { AuthGuard } from './helper/auth.guard';
const routes: Routes = [
  {path :'',redirectTo:'admin',pathMatch:'full'},
  {path :'admin',component:SigninComponent},
  {path :'admin/signup',component:SignupComponent},
  {path :'admin/forgotpassword',component:ForgotPasswordComponent},
  {path :'admin/dashboard',component:DashWrapperComponent,canActivate: [AuthGuard]},
  {path :'admin/profile',component:UsersComponent,canActivate: [AuthGuard]},
  {path :'**',component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DashWrapperComponent,SigninComponent,SignupComponent,ForgotPasswordComponent,UsersComponent,PageNotFoundComponent];

