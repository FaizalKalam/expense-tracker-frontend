import { Injectable } from '@angular/core';
import { RegisterUser } from '../interface/register-user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  private apiUrl="http://localhost:3000/api/auth";
  //private apiUrl = "http://192.168.43.237:3000/api/auth"; 


  regUser(userData:RegisterUser):Observable<any>{
    console.log("Received data",userData);
    return this.http.post<any>(`${this.apiUrl}/register`,userData);
  }

  logUser(logData:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/login`,logData);
  }

  getDashboard(): Observable<any> {
    return this.http.get<{ message: string; user: { name: string; email: string; _id:string } }>(`${this.apiUrl}/dashboard`);
  }

  editUser(userId: string, userData: { name: string; email: string }):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/update-user`,userData);
  }
  
}
