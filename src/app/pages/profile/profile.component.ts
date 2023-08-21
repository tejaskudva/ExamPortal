import { Component } from '@angular/core';
import { LoginserviceService } from 'src/app/service/loginservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user = null
  constructor(private login: LoginserviceService){}

  ngOnInit(): void {

    this.user = this.login.getUser()

  }

}
