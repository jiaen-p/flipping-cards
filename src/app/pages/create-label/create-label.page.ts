import { Component, OnInit, ViewChild } from '@angular/core';
import { SqliteServiceService } from 'src/app/shared/sqlite-service.service';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-create-label',
  templateUrl: './create-label.page.html',
  styleUrls: ['./create-label.page.scss'],
})
export class CreateLabelPage implements OnInit {
  public label:string = ''

  @ViewChild('autofocus', { static: false }) input:IonInput;

  constructor(protected database:SqliteServiceService) { }
  
  ngOnInit() {
    this.getLabels()
  }

  public addLabel(){
    let newLabel = this.label.trim().split(',')
    
    newLabel.forEach(label => {
      console.log("add to array:",!this.database.labels.includes(label.trim()))
      if(!this.database.labels.includes(label.trim())){
        this.database.labels.push(label.trim())
      }
    })
    this.database.updateLabels().then(r => {
      this.getLabels()
      this.label = null
      // this.input.setFocus()
    })

  }

  private getLabels(){
    this.database.getLabels()
  }

  public ionViewWillEnter(){
    setTimeout(() => {
      this.input.setFocus()
    }, 100);
  }

  public deleteLabel(label:string){
    let ind = this.database.labels.indexOf(label.trim())
    // find and update all sets that has that label
    this.database.updateSetAfterDeleteLabel(label.trim())
    .then(() => {

      // update db
      this.database.labels.splice(ind,1)
      this.database.updateLabels().then(r => {
        this.getLabels()
      })
    })
  }

  private ionViewWillLeave(){
    this.getLabels()
  }
}
