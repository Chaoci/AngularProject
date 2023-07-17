import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { Router } from '@angular/router';


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  loaclId: string;
  registered?: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //儲存user 可以觀察現在使用者
  //可以使用BehaviorSubject來處理需要另外的行為
  user = new BehaviorSubject<User>(null);
  //只需要讓dataService那邊知道這邊接受的token就足夠了
  // token:string=null;
  private tokenExpirationTimer: any;


  constructor(private http: HttpClient, private router:Router) { }
  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.API_key}`, {
      email: email,
      password: password,
      returnSecureToken: true,
    }).pipe(
      catchError(this.handleError), 
      tap(resData => {
      this.handleAuthentication(resData.email, resData.loaclId, resData.idToken, +resData.expiresIn)
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.API_key}`, {
      email: email,
      password: password,
      returnSecureToken: true,
    }).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(resData.email, resData.loaclId, resData.idToken, +resData.expiresIn)
      }));
  }
  
  

  //自動登入
  autoLogin(){
    const userData:{
      email:string;
      id: string;
      _token:string;
      _tokenExpirationDate: string;
    }= JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }
    const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));

    if (loadedUser.token){
      this.user.next(loadedUser);
      //登入時給的時間 減去 現在時間 就是剩餘登入時間 然後logout
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime()-new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    //順便清除原本儲存的local帳號資訊
    localStorage.removeItem('userData');
    //防止連續兩次登出(自動登出)
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  //在有處理登入的地方都要處理自動登出
  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(()=>{
      this.logout();
    },expirationDuration)
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationData = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, token, expirationData);
    //讓subject的user發出新的資料
    this.user.next(user);
    this.autoLogout(expiresIn*1000);
    //使用localStorage和JSON來處理紀錄
    localStorage.setItem('userData',JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occured!";
    //如果response的error沒有error的key那就直接回傳未知錯誤
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email exists already!(此信箱已存在)";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "Can't find the Mail! (找不到此信箱)";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "The Password not correct or not exist(密碼不正確或不存在)";
        break;
    }
    return throwError(errorMessage);
  }
}
