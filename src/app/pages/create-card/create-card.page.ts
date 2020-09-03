import { Component, OnInit, ViewChild } from '@angular/core';
import { SqliteServiceService } from 'src/app/shared/sqlite-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'src/app/models/card';
import { AlertController, IonContent, IonTextarea } from '@ionic/angular';

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
  public card_id:number = null
  public buttonText:string = 'add'
  @ViewChild('autofocus', { static: false }) input:IonTextarea;
  @ViewChild(IonContent) content:IonContent;
  constructor(protected database:SqliteServiceService, private route:ActivatedRoute, public alertController:AlertController, private router:Router) { 
    
  }
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.set_id = +params['set_id']
      this.edit = params['edit'] ? true : false
      this.getSet()
      setTimeout(() => {
        this.input.setFocus()
      }, 150);
    })
  }
  public addCard(){
    if(this.sideA && this.card_id == null){
      // adding a new card
      this.database.insertCard(this.sideA, this.sideB, this.set_id)
      .then((r) => {
        this.sideA = null
        this.sideB = null
      })
      .then(() => {
        this.getSet()
      })
      .then(() => {
        this.content.scrollToBottom().then(() => {this.input.setFocus()}).catch(e => console.log(e))
      })
    } else { 
      // modify a existing card
      let c = new Card
      c = {
        card_id:this.card_id,
        sideA: this.sideA,
        sideB: this.sideB,
        sets_id: this.set_id
      }
      this.database.updateCard(c)
      .then(() => {
        this.sideA = null
        this.sideB = null
        this.card_id = null
        this.getSet()
      })
    }
    this.buttonText = 'add'
  }


  public editCard(card:Card){
    this.sideA = card.sideA;
    this.sideB = card.sideB;
    this.card_id = card.card_id;
    this.buttonText = 'save changes'
    this.input.setFocus()
    
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
