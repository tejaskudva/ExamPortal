import { Component, OnInit } from '@angular/core';
import { TestrecordserviceService } from 'src/app/service/testrecordservice.service';

export interface test_record {
  testId: number;
  marks: number;
  attempted: number;
  quiz: {
    qid: number;
  }
  date: string;
}

let ELEMENT_DATA: test_record[] = [];

@Component({
  selector: 'app-user-record',
  templateUrl: './user-record.component.html',
  styleUrls: ['./user-record.component.css']
})

export class UserRecordComponent implements OnInit {

  constructor(private _tests: TestrecordserviceService){}

  ngOnInit(): void {

    let user = localStorage.getItem('user')
    let jsonUser = JSON.parse(user)
    
    this._tests.getTestsByUser(Number(jsonUser.id)).subscribe(
      (data:any)=>{
        ELEMENT_DATA = data
        console.log(ELEMENT_DATA)
        this.dataSource = ELEMENT_DATA;
      },
      error=>{
        console.log(error)
      }
    )

  }

  displayedColumns: string[] = ['testId', 'quiz', 'marks', 'attempted', 'date'];
  dataSource = ELEMENT_DATA;

}