import { Component } from '@angular/core';
import { ImageUploadService } from 'src/app/service/image-upload.service';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {

  selectedFile: ImageSnippet;

  constructor(private imageService: ImageUploadService){}

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    console.log(imageInput.files[0].name)
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      let base64 = this.selectedFile.src
      base64 = base64.substr(22, base64.length-1)

      let user = localStorage.getItem('user')
      let jsonUser = JSON.parse(user)

      let imageReq = {
        value : base64,
        name: imageInput.files[0].name,
        userId: jsonUser.id
      }

      this.selectedFile.pending = true;
      this.imageService.uploadImage(imageReq).subscribe(
        (res) => {
          this.onSuccess();
        },
        (err) => {
          this.onError();
        })
    });

    reader.readAsDataURL(file);
  }

}
