import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';

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

  constructor(private route: ActivatedRoute, private questionservice: QuestionService, private router: Router){}

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
        this.questionservice.setQuestions(this.questions)
      },
      error=>{
        console.log(error)
      }
    )
  }

  deleteQuestion(id: Number){
    this.questionservice.deleteQuestion(id).subscribe(
      (data: any)=>{
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Question deleted successfully!!'
        })
      },
      error=>{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error in deleting question'
        })
      }
    )


    this.router.navigate(['/admin/view-questions/'+this.quizId+'/'+this.quizTitle])
  }
}
