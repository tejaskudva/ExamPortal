import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent {

  public id: string

  quiz = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: -1,
    active: false,
    category: {
      cid: 0,
    },
  }

  categories = []

  constructor(private quizservice: QuizService, private categoryservice: CategoryService, private route: ActivatedRoute){}

  ngOnInit(): void {

    this.categories = JSON.parse(localStorage.getItem('categories') || '[]')
    console.log(this.categories)

    this.id = this.route.snapshot.paramMap.get('qid')

    this.getQuizById(this.id)

  }

  getQuizById(qid: any){
    this.quizservice.getQuizById(qid).subscribe(
      (data: any)=>{
        this.quiz = data
      },
      error=>{
        console.log(error)
      }
    )
  }

  updateQuiz(){

    if(this.quiz.title.trim() == '' || this.quiz.maxMarks.trim() == '' || this.quiz.numberOfQuestions == -1 || this.quiz.category.cid == 0){
      Swal.fire({
        icon: 'warning',
        title: 'Missing fields',
        text: 'All fields are mandatory!!'
      })
      return
    }

    this.quizservice.updateQuiz(this.quiz).subscribe(

      (data: any)=>{
        console.log(data)

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Quiz updated successfully!!'
        })
      },

      error=>{
        console.log(error)

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Some error in updated Quiz'
        })
      }
    )
  }

}
