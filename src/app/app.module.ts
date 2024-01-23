import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './admin/logout/forgotPassword/forgotPassword.component';
import { PageNotFoundComponent } from './admin/logout/pageNotFound/pageNotFound.component';
import { SigninComponent } from './admin/logout/signin/signin.component';
import { SignupComponent } from './admin/logout/signup/signup.component';
import { FooterComponent } from './admin/login/footer/footer.component';
import { SidebarComponent } from './admin/login/sidebar/sidebar.component';
import { NavbarComponent } from './admin/login/navbar/navbar.component';
import { UsersComponent } from './admin/login/wrapper/users/users.component';
import { DashWrapperComponent } from './admin/login/wrapper/dashboard/dashboard.component';
import { AppRoutingModule , routingComponents } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule , ToastContainerDirective } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    ForgotPasswordComponent,
    PageNotFoundComponent,
    SigninComponent,
    SignupComponent,
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    DashWrapperComponent,
    UsersComponent,
    routingComponents,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 3000}),
    ToastContainerDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
