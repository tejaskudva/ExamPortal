import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) {}

  private getQuizUrl:string="http://localhost:8080/quiz/getQuiz";
  private getQuizByCategoryUrl:string="http://localhost:8080/quiz/category/";
  private addQuizUrl:string="http://localhost:8080/quiz/";
  private deleteQuizUrl:string="http://localhost:8080/quiz/deleteQuiz/";
  private getQuizByIdUrl:string="http://localhost:8080/quiz/getQuiz/";
  private updateQuizUrl:string="http://localhost:8080/quiz/updateQuiz";

  getQuizzes(){
    return this.http.get(`${this.getQuizUrl}`)
  }

  getQuizById(qId: any){
    return this.http.get(`${this.getQuizByIdUrl}${qId}`)
  }

  getQuizByCategory(cid: any){
    return this.http.get(`${this.getQuizByCategoryUrl}${cid}`)
  }

  setQuizzes(quizzes){
    localStorage.setItem('quizzes', JSON.stringify(quizzes))
  }

  addQuiz(quiz: any){
    return this.http.post(`${this.addQuizUrl}`, quiz)
  }

  updateQuiz(quiz: any){
    return this.http.put(`${this.updateQuizUrl}`, quiz)
  }

  deleteQuiz(qId: any){
    return this.http.delete(`${this.deleteQuizUrl}${qId}`)
  }
}
