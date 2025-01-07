import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './admin/logout/pageNotFound/pageNotFound.component';
import { SigninComponent } from './admin/logout/signin/signin.component';
import { SignupComponent } from './admin/logout/signup/signup.component';
import { ForgotPasswordComponent } from './admin/logout/forgotPassword/forgotPassword.component';
import { DashWrapperComponent } from './admin/login/wrapper/dashboard/dashboard.component';
import { ImageComponent } from './admin/login/wrapper/image/image.component';
import { VideoComponent } from './admin/login/wrapper/video/video.component';
import { UsersComponent } from './admin/login/wrapper/users/users.component';
import { AuthGuard } from './helper/auth.guard';
import { WebComponent } from './web/web.component';
import { CourseComponent } from './admin/login/wrapper/course/course.component';
import { FeeComponent } from './admin/login/wrapper/fee/fee.component';
import { TestComponent } from './admin/login/wrapper/test/test.component';
import { ScoreComponent } from './admin/login/wrapper/score/score.component';
const routes: Routes = [
  {path :'',component:WebComponent},
  {path :'admin',component:SigninComponent},
  {path :'admin/signup',component:SignupComponent,canActivate: [AuthGuard]},
  {path :'admin/forgotpassword',component:ForgotPasswordComponent},
  {path :'admin/dashboard',component:DashWrapperComponent,canActivate: [AuthGuard]},
  {path :'admin/image',component:ImageComponent,canActivate: [AuthGuard]},
  {path :'admin/video',component:VideoComponent,canActivate: [AuthGuard]},
  {path :'admin/student',component:UsersComponent,canActivate: [AuthGuard]},
  {path :'admin/course',component:CourseComponent,canActivate: [AuthGuard]},
  {path :'admin/fee',component:FeeComponent,canActivate: [AuthGuard]},
  {path :'admin/test',component:TestComponent,canActivate: [AuthGuard]},
  {path :'admin/score',component:ScoreComponent,canActivate: [AuthGuard]},
  {path :'**',component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  DashWrapperComponent,
  SigninComponent,
  SignupComponent,
  ForgotPasswordComponent,
  UsersComponent,
  PageNotFoundComponent,
  CourseComponent,
  ImageComponent,
  VideoComponent,
  WebComponent,
  FeeComponent,
  TestComponent,
  ScoreComponent];

