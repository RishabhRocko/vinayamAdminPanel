import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { encryptData } from 'src/app/helper/cryptoEncryption';
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }
  allImageData(sendData:any)
  {
    let url = environment.url + 'allImageData';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  deleteImageData(sendData:any)
  {
    let url = environment.url + 'deleteImage';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  getEditImageData(sendData:any)
  {
    let url = environment.url + 'getEditImage';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  saveEditImageData(sendData:any)
  {
    let url = environment.url + 'saveEditImage';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
}
