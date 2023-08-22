import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent {

  question = {
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    questionId: 0
  }

  questions = []

  public id: string

  constructor(private questionservice: QuestionService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {

    this.questions = JSON.parse(localStorage.getItem('questions') || '[]')

    this.id = this.route.snapshot.paramMap.get('id')

    for(let ques of this.questions){
      if(ques.questionId == this.id){
        this.question.content=ques.content
        this.question.option1=ques.option1
        this.question.option2=ques.option2
        this.question.option3=ques.option3
        this.question.option4=ques.option4
        this.question.answer=ques.answer
        this.question.questionId=Number(this.id)
      }
    }
  }

  updateQuestion(){
    this.questionservice.updateQuestion(this.question).subscribe(
      (data: any)=>{
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Question updated successfully!!'
        })
      },
      error=>{
        console.log(error)

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Some error in updating question'
        })
      }
    )
    this.router.navigate(['/admin/view-quiz'])
  }

}
