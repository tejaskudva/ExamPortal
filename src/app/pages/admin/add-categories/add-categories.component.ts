import { Component } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent {

  category={
    title:'',
    description:''
  }

  constructor(private categoryservice: CategoryService){}

  addCategory(){
    this.categoryservice.addCategory(this.category).subscribe(

      (data: any)=>{
        console.log(data)

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Category added successfully!!'
        })
      },

      error=>{
        console.log(error)

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Some error in adding category'
        })
      }
    )
  }

}
