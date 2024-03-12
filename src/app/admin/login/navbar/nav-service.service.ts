import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { encryptData } from 'src/app/helper/cryptoEncryption';

@Injectable({
  providedIn: 'root'
})
export class NavServiceService {

  constructor(private http:HttpClient) { }
  navAdminData(sendData:any)
  {
    let url = environment.url + 'navAdminData';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
}
