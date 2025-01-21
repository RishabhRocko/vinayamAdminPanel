import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { encryptData } from 'src/app/helper/cryptoEncryption';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private http:HttpClient) { }

    allStudentsScore(sendData:any)
    {
      let url = environment.url + 'scoreLanding';
      let encData:string = encryptData(sendData);
      return this.http.post<any>(url,encData);
    }
    deleteScoreData(sendData:any)
    {
      let url = environment.url + 'deleteScoreData';
      let encData:string = encryptData(sendData);
      return this.http.post<any>(url,encData);
    }
    getEditScoreData(sendData:any)
    {
      let url = environment.url + 'getEditScoreData';
      let encData:string = encryptData(sendData);
      return this.http.post<any>(url,encData);
    }
    saveEditScoreData(sendData:any)
    {
      let url = environment.url + 'saveEditScoreData';
      let encData:string = encryptData(sendData);
      return this.http.post<any>(url,encData);
    }
    saveAddScoreData(sendData:any)
    {
      let url = environment.url + 'saveAddScoreData';
      let encData:string = encryptData(sendData);
      return this.http.post<any>(url,encData);
    }
    scoreSearch(sendData:any)
    {
      let url = environment.url + 'scoreSearch';
      let encData:string = encryptData(sendData);
      return this.http.post<any>(url,encData);
    }
}
