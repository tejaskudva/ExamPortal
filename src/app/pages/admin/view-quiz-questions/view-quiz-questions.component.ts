import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent {

  questions = [{
    questionId: 0,
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    quiz:{}
  }]

  constructor(private route: ActivatedRoute, private questionservice: QuestionService){}

  public quizId: string
  public quizTitle: string

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('id')
    this.quizTitle = this.route.snapshot.paramMap.get('title')

    this.getQuestionByQuiz(this.quizId)
  }

  getQuestionByQuiz(qid: string){
    this.questionservice.getQuestionsByQuiz(qid).subscribe(
      (data: any)=>{
        this.questions = data
        console.log(this.questions)
      },
      error=>{
        console.log(error)
      }
    )
  }

}
