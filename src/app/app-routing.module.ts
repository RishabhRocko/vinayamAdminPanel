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
  {path :'',loadComponent: () =>
    import('./web/web.component').then(mod => mod.WebComponent)},
  {path :'admin',loadComponent: () =>
    import('./admin/logout/signin/signin.component').then(mod => mod.SigninComponent)},
  {path :'admin/signup',loadComponent: () =>
    import('./admin/logout/signup/signup.component').then(mod => mod.SignupComponent),canActivate: [AuthGuard]},
  {path :'admin/forgotpassword',loadComponent: () =>
    import('./admin/logout/forgotPassword/forgotPassword.component').then(mod => mod.ForgotPasswordComponent)},
  {path :'admin/dashboard',loadComponent: () =>
    import('./admin/login/wrapper/dashboard/dashboard.component').then(mod => mod.DashWrapperComponent),canActivate: [AuthGuard]},
  {path :'admin/image',loadComponent: () =>
    import('./admin/login/wrapper/image/image.component').then(mod => mod.ImageComponent),canActivate: [AuthGuard]},
  {path :'admin/video',loadComponent: () =>
    import('./admin/login/wrapper/video/video.component').then(mod => mod.VideoComponent),canActivate: [AuthGuard]},
  {path :'admin/student',loadComponent: () =>
    import('./admin/login/wrapper/users/users.component').then(mod => mod.UsersComponent),canActivate: [AuthGuard]},
  {path :'admin/course',loadComponent: () =>
    import('./admin/login/wrapper/course/course.component').then(mod => mod.CourseComponent),canActivate: [AuthGuard]},
  {path :'admin/fee',loadComponent: () =>
    import('./admin/login/wrapper/fee/fee.component').then(mod => mod.FeeComponent),canActivate: [AuthGuard]},
  {path :'admin/test',loadComponent: () =>
    import('./admin/login/wrapper/test/test.component').then(mod => mod.TestComponent),canActivate: [AuthGuard]},
  {path :'admin/score',loadComponent: () =>
    import('./admin/login/wrapper/score/score.component').then(mod => mod.ScoreComponent),canActivate: [AuthGuard]},
  {path :'**',loadComponent: () =>
    import('./admin/logout/pageNotFound/pageNotFound.component').then(mod => mod.PageNotFoundComponent)},
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

