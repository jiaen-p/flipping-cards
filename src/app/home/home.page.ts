import { Component } from '@angular/core';
import { SqliteServiceService } from '../shared/sqlite-service.service';
import { Card } from '../models/card';
import { Sets } from '../models/sets';
import { Router } from '@angular/router';
import { AlertController, PopoverController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  public selectedTag:string[] = []
  public allCards:Card[] = []
  public searchTerm: string = ''

  constructor(public database: SqliteServiceService, private router:Router, public alert:AlertController, public popover:PopoverController, private plt:Platform) {
    
  }
  
  public cancelTag(){
    this.selectedTag = []
  }

  public filterByTag(){
    this.database.getSets().then(() => {
      let filtered = []
      this.database.sets.forEach(set => {
        if(this.selectedTag.every(tag => set.labels.split(',').includes(tag))){
          filtered.push(set)
        }
      })
      this.database.sets = filtered
    }) 
  }
  
  
  public filterByTitle(){
    if(this.searchTerm.length == 0){
      this.database.getSets()
    }
    this.database.sets = this.database.sets.filter((set) => {
      return set.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    })
  }

  ionViewWillEnter(){
    this.plt.ready()
    .then(() => {
      this.database.getSets()
    })
    
  }

  ionViewDidLeave(){
    this.searchTerm = ''
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

  // alert
  public async deleteAlert(set:Sets){
    const alert = await this.alert.create({
      header: 'Delete Set',
      subHeader: 'Are you sure?',
      message: 'You will <strong>lose all</strong> your cards associated with this set',
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
