import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { encryptData } from 'src/app/helper/cryptoEncryption';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http:HttpClient) { }

  allCourseData(sendData:any)
  {
    let url = environment.url + 'courseLanding';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  courseSearch(sendData:any)
  {
    let url = environment.url + 'courseSearch';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  saveAddCourseData(sendData:any)
  {
    let url = environment.url + 'saveAddCourseData';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  getEditCourseData(sendData:any)
  {
    let url = environment.url + 'getEditCourseData';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  saveEditCourseData(sendData:any)
  {
    let url = environment.url + 'saveEditCourseData';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
  deleteCourseData(sendData:any)
  {
    let url = environment.url + 'deleteCourseData';
    let encData:string = encryptData(sendData);
    return this.http.post<any>(url,encData);
  }
}
