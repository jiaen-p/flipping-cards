import { Component, OnInit } from '@angular/core';
import { SqliteServiceService } from 'src/app/shared/sqlite-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-set',
  templateUrl: './view-set.page.html',
  styleUrls: ['./view-set.page.scss'],
})
export class ViewSetPage implements OnInit {

  constructor(protected database:SqliteServiceService, private router:Router) { }

  ngOnInit() {
  }

  public startCards(index:number = 0){
    this.router.navigate(['/slides'], {queryParams:{startAt:index}})
  }

}
