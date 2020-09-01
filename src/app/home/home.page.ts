import { Component } from '@angular/core';
import { SqliteServiceService } from '../shared/sqlite-service.service';
import { Card } from '../models/card';
import { Sets } from '../models/sets';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  public allCards:Card[] = []
  public setTitle:string = null

  public sets: Sets[] = []

  public labelSelect:string[] = []
  constructor(public database: SqliteServiceService, private router:Router, public alert:AlertController) {

  }


  public getCards(){
    this.database.getCards()
    .then(v => {
      this.allCards = <Card[]>v
    })
    .catch(e => {
      null
    })
  }
  public dropTable(){
    this.database.deleteTable()
  }

  public deleteSet(set:Sets){
    this.database.deleteSet(set.sets_id)
  }

  public editSet(set){
    this.router.navigate(['/edit-set'],{queryParams:{set: JSON.stringify(set)}})
  }

  public viewSet(set_id:number){
    this.database.getSet(set_id).then(() => {
      this.router.navigate(['/view-set'], {queryParams: {set_id: set_id}})
    })
  }

  public async deleteAlert(set:Sets){
    const alert = await this.alert.create({
      header: 'Delete Set',
      subHeader: 'Are you sure?',
      message: 'You will lose all your cards assiotiated with this set',
      buttons:[
        {
          text: 'No',
          role: 'cancel'
        },{
          text: 'Yes',
          role: 'delete',
          handler: () => {
            this.deleteSet(set)
          }
        }
        
      ]
    })
    await alert.present()
  }
}
