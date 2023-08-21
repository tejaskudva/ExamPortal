import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupserviceService {

  private baseUrl:string="http://localhost:8080/user/";

  constructor(private http:HttpClient) { }

  registerUser(userData:any){
    return this.http.post(`${this.baseUrl}`, userData)
  }
}