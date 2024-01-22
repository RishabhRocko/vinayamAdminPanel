import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  authUser(loginData:any)
  {
    let url = environment.url + 'adminLogin';
    return this.http.post<any>(url,loginData);
  }
}
