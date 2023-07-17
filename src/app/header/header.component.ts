import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from './../data-storage.service';
import { Component,EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  collapsed:boolean = true;
  private userSub: Subscription;
  isAuthenticated= false;
  
  // @Output() featureSelected = new EventEmitter<string>();
  constructor(private dataStorageService:DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user=>{
      //第一個!是讓user變為boolean 第二個!為當前boolean的反值
      this.isAuthenticated = !!user;
    });
  }
  // onSelect(feature:string){
  //   this.featureSelected.emit(feature);
  // }
  onSaveData(){
    this.dataStorageService.stroeRecipes();
  }
  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }
}
