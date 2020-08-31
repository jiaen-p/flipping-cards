import { Component, OnInit } from '@angular/core';
import { SqliteServiceService } from 'src/app/shared/sqlite-service.service';

@Component({
  selector: 'app-view-set',
  templateUrl: './view-set.page.html',
  styleUrls: ['./view-set.page.scss'],
})
export class ViewSetPage implements OnInit {

  constructor(protected database:SqliteServiceService) { }

  ngOnInit() {
  }

  public startCards(){
    
  }
}
