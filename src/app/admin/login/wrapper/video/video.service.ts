import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { encryptData } from 'src/app/helper/cryptoEncryption';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http:HttpClient) { }
  allVideoData(sendData:any)
  {
    let url = environment.url + 'allVideoData';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  deleteVideoData(sendData:any)
  {
    let url = environment.url + 'deleteVideo';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  getEditVideoData(sendData:any)
  {
    let url = environment.url + 'getEditVideo';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  saveEditVideoData(sendData:any)
  {
    let url = environment.url + 'saveEditVideo';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
}
