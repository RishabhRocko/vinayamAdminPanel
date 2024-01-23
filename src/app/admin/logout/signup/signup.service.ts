import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { encryptData } from 'src/app/helper/cryptoEncryption';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }
  addAdmin(adminData:any)
  {
    let url = environment.url + 'addAdmin';
    let encData:string = encryptData(adminData);
    return this.http.post<any>(url,encData);
  }
}
