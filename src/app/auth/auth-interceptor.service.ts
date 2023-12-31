import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take,exhaustMap  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  //用來確認token是否有效!!

  constructor(private authService: AuthService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler){
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user=>{
        if(!user){
          return next.handle(req);
        }else{
          const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)})
          return next.handle(modifiedReq);
        }
      })
    );
  }

}
