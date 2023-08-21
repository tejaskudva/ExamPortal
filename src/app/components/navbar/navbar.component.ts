import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from 'src/app/service/loginservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLoggedIn=false
  public user=null

  constructor(public login: LoginserviceService) { }

  ngOnInit(){
    this.isLoggedIn = this.login.isLoggedIn()
    this.user = this.login.getUser()
    this.login.loginStatusSubject.asObservable().subscribe(date=>{
      this.isLoggedIn = this.login.isLoggedIn()
      this.user = this.login.getUser()
    })
  }

  public logout(){
    this.login.logout()
    this.isLoggedIn = false
    this.user = null
    this.login.loginStatusSubject.next(false)
    window.location.reload()
  }

}
