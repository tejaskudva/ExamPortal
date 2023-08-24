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
  private getQuestionByQuizForTest:string="http://localhost:8080/question/quiz/";
  private updateQuestionUrl:string="http://localhost:8080/question/updateQuestion";
  private deleteQuestionUrl:string="http://localhost:8080/question/deleteQuestion/";
  private submitQuestionsUrl:string="http://localhost:8080/question/submitQuestions";

  getQuestions(){
    return this.http.get(`${this.getQuestionUrl}`)
  }

  setQuestions(questions){
    localStorage.removeItem('questions')
    localStorage.setItem('questions', JSON.stringify(questions))
  }

  addQuestion(question: any){
    return this.http.post(`${this.addQuestionUrl}`, question)
  }

  updateQuestion(question: any){
    return this.http.put(`${this.updateQuestionUrl}`, question)
  }

  getQuestionsByQuiz(qId: any){
    return this.http.get(`${this.getQuestionByQuiz}` + qId)
  }

  getQuestionsByQuizForTest(qId: any){
    return this.http.get(`${this.getQuestionByQuizForTest}` + qId)
  }

  deleteQuestion(id: Number){
    return this.http.delete(`${this.deleteQuestionUrl}${id}`)
  }

  submitQuestions(questions: any){
    return this.http.post(`${this.submitQuestionsUrl}`, questions)
  }
}
