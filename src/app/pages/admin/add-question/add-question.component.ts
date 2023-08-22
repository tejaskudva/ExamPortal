import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {

  question = {
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    quiz: {
      qid: 0
    }
  }

  quizzes = []
  public id: string

  constructor(private questionservice: QuestionService, private route: ActivatedRoute){}

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id')
    this.quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]')

    for(let quiz of this.quizzes){
      if(quiz.qid == this.id){
        this.question.quiz.qid = quiz.qid
      }
    }
  }

  addQuestion(){
    this.questionservice.addQuestion(this.question).subscribe(
      (data: any)=>{
        console.log(data)
      },
      error=>{
        console.log(error)
      }
    )
  }

}
