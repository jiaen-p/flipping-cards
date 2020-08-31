import { Component, OnInit, ViewChild } from '@angular/core';
import { Sets } from 'src/app/models/sets';
import { ActivatedRoute, Router } from '@angular/router';
import { SqliteServiceService } from 'src/app/shared/sqlite-service.service';
import { IonInput } from '@ionic/angular';
import { title } from 'process';

@Component({
  selector: 'app-edit-set',
  templateUrl: './edit-set.page.html',
  styleUrls: ['./edit-set.page.scss'],
})
export class EditSetPage implements OnInit {
  public set: Sets = null
  public labels: string[] = []
  @ViewChild('autofocus', { static: false }) input:IonInput;

  constructor(private route:ActivatedRoute, public database:SqliteServiceService, private router:Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.set = JSON.parse(params['set'])
      this.labels = this.set.labels.split(',')
    })
  }

  public ionViewWillEnter(){
    setTimeout(() => {
      this.input.setFocus()
    }, 100);
  }

  public addCards(){
    this.router.navigate(['/create-card'], {queryParams: {set_id: this.set.sets_id}} )
  }

  public editSet(){
    this.set.labels = this.labels.toString()
    this.set.title = this.set.title.trim()
    this.database.updateSet(this.set)
    .then(() => {
      this.router.navigate(['/'])
    })
  }
}
