import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { encryptData } from 'src/app/helper/cryptoEncryption';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }
  allAdminData(sendData:any)
  {
    let url = environment.url + 'dashboardLanding';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  deleteAdminData(sendData:any)
  {
    let url = environment.url + 'deleteAdmin';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  getEditAdminData(sendData:any)
  {
    let url = environment.url + 'getEditAdmin';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  saveEditAdminData(sendData:any)
  {
    let url = environment.url + 'saveEditAdmin';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
}
