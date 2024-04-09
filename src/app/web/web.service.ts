import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { encryptData } from 'src/app/helper/cryptoEncryption';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http:HttpClient) { }
  webInfo(sendData:any)
  {
    let url = environment.url + 'webInfo';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  saveNotification(sendData:any)
  {
    let url = environment.url + 'saveNotification';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
}
