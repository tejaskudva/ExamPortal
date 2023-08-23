import { Component } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent {

  quiz = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: false,
    category: {
      cid: 0,
    },
  }

  categories = []

  constructor(private quizservice: QuizService, private categoryservice: CategoryService){}

  ngOnInit(): void {

    this.categories = JSON.parse(localStorage.getItem('categories') || '[]')

    if(this.categories.length == 0){
      this.getCategories()
    }

    console.log(this.categories)

  }

  addQuiz(){

    if(this.quiz.title.trim() == '' || this.quiz.maxMarks.trim() == '' || this.quiz.numberOfQuestions.trim() == '' || this.quiz.category.cid == 0){
      Swal.fire({
        icon: 'warning',
        title: 'Missing fields',
        text: 'All fields are mandatory!!'
      })
      return
    }

    this.quizservice.addQuiz(this.quiz).subscribe(

      (data: any)=>{
        console.log(data)

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Quiz added successfully!!'
        })
      },

      error=>{
        console.log(error)

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Some error in adding Quiz'
        })
      }
    )
  }

  getCategories(){
    this.categoryservice.getCategories().subscribe(
      (data: any)=>{
        this.categories = data
        this.categoryservice.setCategories(data)
      },
      error=>{
        console.log(error)
      }
    )
  }

}
