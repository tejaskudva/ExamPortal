import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestrecordserviceService {

  constructor(private http: HttpClient) { }

  private getTestUrl = "http://localhost:8080/test/"
  private getTestByUserUrl = "http://localhost:8080/test/"
  private addTestUrl = "http://localhost:8080/test/addRecord"

  getTests(){
    return this.http.get(`${this.getTestUrl}`)
  }

  getTestsByUser(id: number){
    return this.http.get(`${this.getTestByUserUrl}`+id)
  }

  addTests(test){
    return this.http.post(`${this.addTestUrl}`, test)
  }

}
