import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  qid: string
  questions=[]
  isSubmit=true
  attempted:Number
  score: Number

  constructor(private locationstrategy: LocationStrategy, private route: ActivatedRoute, private _questionservice: QuestionService){}

  ngOnInit(): void {
    this.preventBackButton()
    this.qid = this.route.snapshot.params['qid']
    this.loadQuestions()
  }

  loadQuestions() {
    this._questionservice.getQuestionsByQuizForTest(this.qid).subscribe(
      (data: any)=>{
        this.questions = data
      },
      error=>{
        console.log(error)
        alert('Error while fetching questions!')
      }
    )
  }

  preventBackButton(){
    history.pushState(null, null, location.href)
    this.locationstrategy.onPopState(()=>{
      history.pushState(null, null, location.href)
    })
  }

  submitQuiz(){

    Swal.fire({
      title: 'Submit Quiz',
      text: "Are you sure you wish to submit the quiz?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit quiz!'

    }).then((result) => {

      if(result.isConfirmed){

        this._questionservice.submitQuestions(this.questions).subscribe(
          (data: Number)=>{
            console.log(data)
            this.score = data
          },
          error=>{
            console.log(error)
            alert('Error in submitting quiz')
          }
        )

        this.isSubmit=false

        //check attempted questions
        let unattemptCount = 0
        for(let q of this.questions){
          if(q.choice == null){
            unattemptCount++
          }
        }

        this.attempted = this.questions.length - unattemptCount
      }
    })
  }

}
