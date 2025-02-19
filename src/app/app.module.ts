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
import { ImageComponent } from './admin/login/wrapper/image/image.component';
import { VideoComponent } from './admin/login/wrapper/video/video.component';
import { AppRoutingModule , routingComponents } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule , ToastContainerDirective } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule , NgxUiLoaderHttpModule  } from "ngx-ui-loader";
import { WebComponent } from './web/web.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CourseComponent } from './admin/login/wrapper/course/course.component';
import { FeeComponent } from './admin/login/wrapper/fee/fee.component';
import { TestComponent } from './admin/login/wrapper/test/test.component';
import { ScoreComponent } from './admin/login/wrapper/score/score.component';
import { OrderModule } from 'ngx-order-pipe';
import { SafePipe } from './safe.pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';
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
    ImageComponent,
    VideoComponent,
    UsersComponent,
    routingComponents,
    WebComponent,
    CourseComponent,
    FeeComponent,
    TestComponent,
    ScoreComponent,
    SafePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 3000}),
    ToastContainerDirective,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule ,
    NgxPaginationModule,
    OrderModule,
    PdfViewerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
