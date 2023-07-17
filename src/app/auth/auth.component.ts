import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: []
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string =null;
  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // this.authService.user.pipe(take(1)).subscribe(user => {
    //   if (user) {
    //     // 如果用戶已登入，自動跳轉到其他頁面
    //     console.log('登入了啊!')
    //     this.router.navigate(['/recipes']);
    //   }
    // });
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    //以防錯誤
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>

    this.isLoading = true;

    if (this.isLoginMode){
      authObs = this.authService.login(email,password);
    }else{
      authObs = this.authService.signup(email,password);
    };
    
    //都做一樣的事情 前面靠著Observable來直接放進同個變數 較容易閱讀
    authObs.subscribe(responseData =>{
      console.log(responseData);
      this.isLoading = false;
      //如果放在上面，isLoginMode中 會被AuthGuard干擾
      this.router.navigate(['recipes']);
    }, errorMessage =>{
      console.log(errorMessage);
      this.error = errorMessage;
      this.isLoading = false;
    });

    form.reset();
  }

}
