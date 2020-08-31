import { Component, OnInit, ViewChild } from '@angular/core';
import { SqliteServiceService } from 'src/app/shared/sqlite-service.service';
import { IonInput } from '@ionic/angular';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-create-set',
  templateUrl: './create-set.page.html',
  styleUrls: ['./create-set.page.scss'],
})
export class CreateSetPage implements OnInit {
  public setTitle = null
  public labels:string[] = []

  @ViewChild('autofocus', { static: false }) input:IonInput;

  constructor(protected database:SqliteServiceService, private router:Router) { 
  }
  
  ngOnInit() {
  }

  public createSet(){
    if(this.setTitle.length != 0){
      this.database.createNewSet(this.setTitle, this.labels)
    }
  }
  
  public showLabels(){
    console.log(this.labels)
  }

  public ionViewWillEnter(){
    setTimeout(() => {
      this.input.setFocus()
    }, 100);
  }

  public createCards(){
    let insertId:number = null
    if(this.setTitle != null){
      this.database.createNewSet(this.setTitle.trim(), this.labels).then(v => {
        insertId = v['insertId']
        // console.log(insertId)
        this.router.navigate(['/create-card'], {queryParams: {set_id: insertId}} )
      })
    }
  }
}
