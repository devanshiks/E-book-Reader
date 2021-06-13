import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUri: string = "http://localhost:3000";
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private _router: Router) { }
  
  register(body: any) {
    return this.http.post('http://127.0.0.1:3000/api/register', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }); 
  }

  login(body: any) {
    return this.http.post('http://127.0.0.1:3000/api/login', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }); 
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }
  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }
  getToken(){
    return localStorage.getItem('token')
  }

  getallBook(){
    return this.http.get(this.baseUri + "/api/getallbooks", { headers: this.headers });
  }

  book:any
  setBook(book){
    this.book=book
  }

  getBook(){
    return this.book
  }
}
