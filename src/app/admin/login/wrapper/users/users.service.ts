import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { encryptData } from 'src/app/helper/cryptoEncryption';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  allAdminStudents(sendData:any)
  {
    let url = environment.url + 'adminStudents';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  deleteStudentData(sendData:any)
  {
    let url = environment.url + 'adminStudentDelete';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  getEditStudentData(sendData:any)
  {
    let url = environment.url + 'getEditStudent';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  saveEditStudentData(sendData:any)
  {
    let url = environment.url + 'saveEditStudent';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  saveAddStudentData(sendData:any)
  {
    let url = environment.url + 'saveAddStudent';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  studentSearch(sendData:any)
  {
    let url = environment.url + 'studentSearch';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
}
