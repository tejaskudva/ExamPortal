import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';

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

  public id: string

  constructor(private questionservice: QuestionService, private route: ActivatedRoute){}

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id')
    this.question.quiz.qid=Number(this.id)
  }

  addQuestion(){
    this.questionservice.addQuestion(this.question).subscribe(
      (data: any)=>{
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Question added successfully!!'
        })
      },
      error=>{
        console.log(error)

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Some error in adding Question'
        })
      }
    )
  }

}
