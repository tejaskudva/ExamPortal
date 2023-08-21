import { Component } from '@angular/core';
import { SignupserviceService } from 'src/app/service/signupservice.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  userData={
    username:"",
    firstName:"",
    lastName:"",
    phone:"",
    email:"",
    password:""
  }

  clearUserData(){
    this.userData.firstName = "",
    this.userData.lastName = "",
    this.userData.username = "",
    this.userData.phone = "",
    this.userData.email = "",
    this.userData.password = "";
  }

  constructor(private register: SignupserviceService, private router: Router) { }

  doSignupForm(){
    console.log(this.userData)

    if(this.userData.firstName == '' || this.userData.lastName == '' || this.userData.username == '' || this.userData.phone == '' || this.userData.email == '' || this.userData.password == ''){
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields!',
        text: 'All fields are mandatory'
      })
      return
    }

    this.register.registerUser(this.userData).subscribe(
      response=>{
        this.router.navigate(['/login'])
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User successfully registered!!'
        })
        this.clearUserData();
      },
      error=>{
        console.log(error)
        if(error.status == 412){
          Swal.fire({
            icon: 'warning',
            title: 'Validation failure',
            text: 'The username already exists'
          })

        } else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was an error in registering the user'
          })
        }
        
      }
    )

  }

}
