import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { encryptData } from 'src/app/helper/cryptoEncryption';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  constructor(private http:HttpClient) { }

  allStudentsFees(sendData:any)
  {
    let url = environment.url + 'feesLanding';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  deleteFeesData(sendData:any)
  {
    let url = environment.url + 'deleteFeesData';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  getEditFeesData(sendData:any)
  {
    let url = environment.url + 'getEditFeesData';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  saveEditFeesData(sendData:any)
  {
    let url = environment.url + 'saveEditFeesData';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  saveAddFeesData(sendData:any)
  {
    let url = environment.url + 'saveAddFeesData';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  feesSearch(sendData:any)
  {
    let url = environment.url + 'feesSearch';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
}
