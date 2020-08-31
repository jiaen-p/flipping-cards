import { Component, OnInit } from '@angular/core';
import { SqliteServiceService } from 'src/app/shared/sqlite-service.service';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {

  constructor(protected database:SqliteServiceService) { }

  ngOnInit() {
  }

}
