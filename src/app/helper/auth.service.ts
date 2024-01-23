import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn() {

    const token = localStorage.getItem('token');
    if(token && token != null)
    {
      return true;
    }else{
      return false;
    }

  }
}
