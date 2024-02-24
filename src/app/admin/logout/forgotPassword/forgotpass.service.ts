import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { encryptData } from 'src/app/helper/cryptoEncryption';

@Injectable({
  providedIn: 'root'
})
export class ForgotpassService {

  constructor(private http:HttpClient) { }
  getOtpForgot(loginData:any)
  {
    let url = environment.url + 'getOtpForgot';
    let encData:string = encryptData(loginData);
    return this.http.post<any>(url,encData);
  }
  submitOtpForgot(loginData:any)
  {
    let url = environment.url + 'submitOtpForgot';
    let encData:string = encryptData(loginData);
    return this.http.post<any>(url,encData);
  }
}
