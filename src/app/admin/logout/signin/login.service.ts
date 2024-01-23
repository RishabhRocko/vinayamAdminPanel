import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { encryptData } from '../../../helper/cryptoEncryption';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  authUser(loginData:any)
  {
    let url = environment.url + 'adminLogin';
    let encData:string = encryptData(loginData);
    return this.http.post<any>(url,encData);
  }
}
