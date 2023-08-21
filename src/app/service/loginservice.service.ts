import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  public loginStatusSubject = new Subject<boolean>()

  private tokenUrl:string="http://localhost:8080/auth/login";
  private currrentUserUrl:string="http://localhost:8080/auth/currentUser";

  constructor(private http:HttpClient) {}

    generateToken(loginData:any){
      return this.http.post(`${this.tokenUrl}`, loginData)
    }

    currentUser(){
      return this.http.get(`${this.currrentUserUrl}`)
    }

    //login user: set token in local storage
    public loginUser(token:any){
      console.log('loginUser:' + token)

      localStorage.setItem('token', token)
      
      return true
    }

    //isLogin: is user logged in or not
    public isLoggedIn(){
      let tokenStr = localStorage.getItem('token')
      if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
        return false
      }
      return true
    }

    //logout: removing token from localStorage
    public logout(){
      localStorage.clear()
      return true
    }

    //getToken: retrieving from localStorage
    public getToken(){
      return localStorage.getItem('token')
    }

    //set User details
    public setUser(user:any){
      localStorage.setItem('user', JSON.stringify(user))
    }

    //getUser details
    public getUser(){
      let userStr = localStorage.getItem('user')
      if(userStr != null){
        return JSON.parse(userStr)

      } else{
        this.logout()
        return null
      }
    }

    //get user role
    public getUserRole(){
      let user = this.getUser()
      return user.authorities[0].authority
    }

}
