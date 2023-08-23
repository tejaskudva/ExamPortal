import { Component } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';


@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent {

  categories=[]

  constructor(private categoryservice: CategoryService){}

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories(){
    this.categoryservice.getCategories().subscribe(
      (data: any)=>{
        this.categories=data
      },
      error=>{
        console.log(error)
      }
    )
  }

}
