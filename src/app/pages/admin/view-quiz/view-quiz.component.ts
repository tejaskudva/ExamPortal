import { Component } from '@angular/core';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css']
})
export class ViewQuizComponent {

  quizzes = [
    {
      title: '',
      description: '',
      maxMarks: '',
      numberOfQuestions: 0,
      active: false,
      qid: 0,
      category:
      {
        title: '',
        description: '',
        cid: 0
      },
    }
  ]

  constructor(private quizservice: QuizService) { }

  ngOnInit(): void {

    this.getQuizzes()

  }

  getQuizzes() {
    this.quizservice.getQuizzes().subscribe(

      (quizList: any) => {
        this.quizservice.setQuizzes(quizList)
        this.quizzes = quizList
      },

      error => {
        console.log(error)
      }
    )
  }

  deleteQuiz(qId){
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.quizservice.deleteQuiz(qId).subscribe(

          (data: any) => {
            this.quizzes = this.quizzes.filter((quiz) => quiz.qid != qId)
            Swal.fire('Success', 'Quiz deleted', 'success')
          },
    
          error => {
            console.log('ERROR IN DELETION: ', error)
          }
        )
      }
    })

    
  }

}
