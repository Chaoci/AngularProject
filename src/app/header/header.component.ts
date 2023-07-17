import { DataStorageService } from './../data-storage.service';
import { Component,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  collapsed:boolean = true;
  // @Output() featureSelected = new EventEmitter<string>();
  constructor(private dataStorageService:DataStorageService) { }
  // onSelect(feature:string){
  //   this.featureSelected.emit(feature);
  // }
  onSaveData(){
    this.dataStorageService.stroeRecipes();
  }
  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
