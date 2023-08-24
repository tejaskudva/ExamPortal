import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData={
    username:'',
    password:''
  }

  constructor(private login: LoginserviceService, private router: Router){ }

  doLoginForm(){
    console.log('Login works!')

    if(this.loginData.username.trim()=='' || this.loginData.password.trim()==''){
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields!',
        text: 'All fields are mandatory'
      })
      return
    }

    this.login.generateToken(this.loginData).subscribe(
      (data: any)=>{
        console.log(data)
        
        console.log('111' + data.jwtToken)
        //log-in now
        this.login.loginUser(data.jwtToken)

        console.log('222')

        //getting current user
        this.login.currentUser().subscribe(
          (user:any) =>{
            
            this.login.setUser(user)

            if(this.login.getUserRole() == "ADMIN"){
              //GO TO ADMIN USER DASHBOARD
              this.login.loginStatusSubject.next(true)

              //window.location.navigate = '/admin'
              this.router.navigate(['/admin'])

            } else if(this.login.getUserRole() == "NORMAL"){
              //GO TO NORMAL USER DASHBOARD
              this.login.loginStatusSubject.next(true)
              
              //window.location.href = '/user-dashboard'
              this.router.navigate(['/user'])

            } else{
              this.login.logout()
            }
          },
          error=>{
            console.log('Error in getting current user' + error)
          }
        )

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User successfully logged in!!'
        })
      },
      error=>{
        console.log(error)        
        if(error.status == 401){
          Swal.fire({
            icon: 'warning',
            title: 'Invalid Credentials',
            text: 'Either your username or password is incorrect'
          })

        } else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was an error in logging in with the user'
          })
        }
        
      }
    )

  }

}
