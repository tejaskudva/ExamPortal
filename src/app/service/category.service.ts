import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) {}

  private getCategoriesUrl:string="http://localhost:8080/category/getCategory";
  private addCategoryUrl:string="http://localhost:8080/category/add";

  getCategories(){
    return this.http.get(`${this.getCategoriesUrl}`)
  }

  setCategories(categories){
    localStorage.setItem('categories', JSON.stringify(categories))
  }

  addCategory(category: any){
    return this.http.post(`${this.addCategoryUrl}`, category)
  }
}
