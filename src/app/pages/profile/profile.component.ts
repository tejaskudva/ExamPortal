import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ExcelService } from 'src/app/service/excel.service';
import { LoginserviceService } from 'src/app/service/loginservice.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent {

  imageUrl: string
  safeUrl: SafeResourceUrl;
  res:{
    content: string
  }

  user = null
  constructor(private login: LoginserviceService, private domSanitizer: DomSanitizer, private _appservice: ExcelService){}

  ngOnInit(): void {

    this.user = this.login.getUser()

    this.login.getUserProfile(this.user.id).subscribe(
      (data:any)=>{
        this.res = data
        this.imageUrl = 'data:image/png;base64,' + this.res.content;
      },
      error=>{
        console.log(error)
      }
    )

  }

    //Call this method in the image source, it will sanitize it.
    transform(){
      return this.domSanitizer.bypassSecurityTrustResourceUrl(this.imageUrl);
  }

}
