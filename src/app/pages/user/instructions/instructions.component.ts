import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent {

  qid: string
  quiz

  constructor(private route: ActivatedRoute, private quizservice: QuizService, private router: Router){}

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

  startQuiz(){
    Swal.fire({
      title: 'Starting Quiz',
      text: "Are you sure you wish to start the quiz?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, start quiz!'
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate(['/start-quiz/'+this.qid])
      }
    })
  }

}
