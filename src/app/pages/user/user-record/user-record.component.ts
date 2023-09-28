import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/service/excel.service';
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

export class json_Data {
  testId: number;
  marks: number;
  attempted: number;
  quiz: number
  date: string;

  constructor(testId: number,
    marks: number,
    attempted: number,
    quiz: number,
    date: string){

      this.testId = testId
      this.marks = marks
      this.attempted = attempted
      this.quiz = quiz
      this.date = date
  }
}

let ELEMENT_DATA: test_record[] = [];
let JSON_DATA: json_Data[] = [];
let user: string

@Component({
  selector: 'app-user-record',
  templateUrl: './user-record.component.html',
  styleUrls: ['./user-record.component.css']
})

export class UserRecordComponent implements OnInit {

  constructor(private _tests: TestrecordserviceService, private _appservice: ExcelService){}

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

  download() {

    for(let i=0; i<ELEMENT_DATA.length; i++){
      let json = new json_Data(ELEMENT_DATA[i].testId, ELEMENT_DATA[i].marks, ELEMENT_DATA[i].attempted,
        ELEMENT_DATA[i].quiz.qid, ELEMENT_DATA[i].date)
      JSON_DATA.push(json)
    }
    let user = localStorage.getItem('user')
    let jsonUser = JSON.parse(user)

    this._appservice.downloadFile(JSON_DATA, jsonUser.username + '_record');
}

}