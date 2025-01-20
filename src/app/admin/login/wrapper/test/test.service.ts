import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { encryptData } from 'src/app/helper/cryptoEncryption';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http:HttpClient) { }

  allTestData(sendData:any)
  {
    let url = environment.url + 'testLanding';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  testSearch(sendData:any)
  {
    let url = environment.url + 'testSearch';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  saveAddTestData(sendData:any)
  {
    let url = environment.url + 'saveAddTestData';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  getEditTestData(sendData:any)
  {
    let url = environment.url + 'getEditTestData';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  saveEditTestData(sendData:any)
  {
    let url = environment.url + 'saveEditTestData';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  deleteTestData(sendData:any)
  {
    let url = environment.url + 'deleteTestData';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
}
