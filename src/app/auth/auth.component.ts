import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: []
})
export class AuthComponent implements OnInit {

  isLoginMode = true;

  constructor() { }

  ngOnInit(): void {
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
    form.reset();
  }

}
