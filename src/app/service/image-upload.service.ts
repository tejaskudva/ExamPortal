import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) {}


  public uploadImage(imageReq: any) {

    return this.http.post('http://localhost:8080/user/image-upload', imageReq);
  }
}
