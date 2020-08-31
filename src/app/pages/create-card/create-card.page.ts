import { Component, OnInit } from '@angular/core';
import { SqliteServiceService } from 'src/app/shared/sqlite-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'src/app/models/card';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.page.html',
  styleUrls: ['./create-card.page.scss'],
})
export class CreateCardPage implements OnInit {
  public cards: Card[] = []
  public sideA:string = null
  public sideB:string = null
  public set_id:number = null
  public edit: boolean = false
  constructor(protected database:SqliteServiceService, private route:ActivatedRoute, public alertController:AlertController, private router:Router) { 
    
  }
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.set_id = +params['set_id']
      this.edit = params['edit'] ? true : false
      this.getSet()
    })
  }
  public addCard(){
    console.log("click")
    if(this.sideA){
      this.database.insertCard(this.sideA, this.sideB, this.set_id)
      .then((r) => {
        this.sideA = null
        this.sideB = null
        console.log("added to db", JSON.stringify(r))
      })
      .then(() => {
        this.getSet()
      })
    }
  }

  private getSet(){
    this.database.getSet(this.set_id)
    this.database.getSets()
  }

  // delete a card
  private deleteCard(card:Card){
    this.database.deleteCard(card)
  }


  async presentDoneAlert(){
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Done?',
      message: 'Have finished adding all the cards?',
      buttons:[
        {
          text: 'No',
          role: 'cancel', 
          cssClass: 'secondary'
        }, {
          text: 'Yes',
          handler: ()=> {
            this.router.navigate(['/'])
          }
        }
      ]
    })

    await alert.present()
  }


  async presentAlertConfirm(card:Card) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete',
      message: `Are you sure you want to delete '${card.sideA.length < 10 ? card.sideA : card.sideA.slice(0,10).trim() + "..."}' card?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
          
        }, {
          text: 'Yes',
          handler: () => {
            this.deleteCard(card)
          }
        }
      ]
    });

    await alert.present();
  }
}
