import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent {

  categories = []

  ngOnInit(): void {

    this.categories = JSON.parse(localStorage.getItem('categories') || '[]')

    if(this.categories.length == 0){
      this.getCategories()
    }

  }

  constructor(private categoryservice: CategoryService, private router: Router) {}

  getCategories(){
    this.categoryservice.getCategories().subscribe(

      (categoriesList: any)=>{
        this.categoryservice.setCategories(categoriesList)
        this.categories = categoriesList
      },

      error=>{
        console.log(error)
      }
    )
  }
}
