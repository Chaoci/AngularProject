import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//只需要用在這邊就好的介面
interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  loaclId: string 
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }
  signup(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAzoaHwzAzyJlCeh9Tu_WZw-BD0CvrEGXQ', {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    );
  }
}
