import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) {}

  private getQuestionUrl:string="http://localhost:8080/question/getQuestion";
  private addQuestionUrl:string="http://localhost:8080/question/add";
  private getQuestionByQuiz:string="http://localhost:8080/question/quiz/";

  getQuestions(){
    return this.http.get(`${this.getQuestionUrl}`)
  }

  setQuestions(questions){
    localStorage.setItem('questions', questions)
  }

  addQuestion(question: any){
    return this.http.post(`${this.addQuestionUrl}`, question)
  }

  getQuestionsByQuiz(qId: any){
    return this.http.get(`${this.getQuestionByQuiz}` + qId)
  }
}
