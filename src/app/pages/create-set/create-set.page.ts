import { Component, OnInit, ViewChild } from '@angular/core';
import { SqliteServiceService } from 'src/app/shared/sqlite-service.service';
import { IonInput, ToastController } from '@ionic/angular';
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

  constructor(protected database:SqliteServiceService, private router:Router, public toast:ToastController) { 
  }
  
  ngOnInit() {
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
    if(this.setTitle!=null && this.setTitle.trim().length > 0){
      this.database.createNewSet(this.setTitle.trim(), this.labels).then(v => {
        insertId = v['insertId']
        // console.log(insertId)
        this.router.navigate(['/create-card'], {queryParams: {set_id: insertId}} )
      })
    } else {
      this.presentToast()
    }
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Set title is needed',
      duration: 2000
    });
    toast.present();
  }
}
