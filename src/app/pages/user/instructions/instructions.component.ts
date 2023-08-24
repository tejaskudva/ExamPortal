import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent {

  qid: string
  quiz;

  constructor(private route: ActivatedRoute, private quizservice: QuizService){}

  ngOnInit(): void{
    this.qid = this.route.snapshot.params['qid']
    console.log('QID: ' + this.qid)

    this.getQuiz()
  }

  getQuiz(){
    this.quizservice.getQuizById(this.qid).subscribe(
      (data:any)=>{
        this.quiz=data
      },
      error=>{
        console.log(error)
      }
    )
  }

}
