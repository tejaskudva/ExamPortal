import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-user-quiz',
  templateUrl: './user-quiz.component.html',
  styleUrls: ['./user-quiz.component.css']
})
export class UserQuizComponent {

  public quizCount: Boolean

  quizzes=[]
  id: string

  constructor(private quizservice: QuizService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.id = params.get('cid');

      this.getQuizzes()

      if(this.quizzes == null || this.quizzes.length == 0){
        this.quizCount = true
      } else{
        this.quizCount = false
      }

    });
  }

  getQuizzes() {
    
    this.quizservice.getQuizByCategory(this.id).subscribe(

      (quizList: any) => {
        this.quizzes = null
        this.quizzes = quizList
        console.log(quizList)
      },

      error => {
        console.log(error)
      }
    )
  }

}
