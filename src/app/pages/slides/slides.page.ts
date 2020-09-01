import { Component, OnInit, ViewChild } from '@angular/core';
import { SqliteServiceService } from 'src/app/shared/sqlite-service.service';

import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx'
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx'
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})


export class SlidesPage implements OnInit {
  public flip:boolean = false
  public progress: number = 0
  constructor(protected database:SqliteServiceService, private fullScreen:AndroidFullScreen, private orientation:ScreenOrientation) { }
  
  @ViewChild(IonSlides) slides: IonSlides;
  ngOnInit() {
  }
  
  ionViewWillEnter(){
    this.orientation.unlock()
    this.orientation.lock(this.orientation.ORIENTATIONS.LANDSCAPE)
    this.fullScreen.immersiveMode().catch(e => console.log(e))
  }

  ionViewWillLeave(){
    this.orientation.unlock()
    this.fullScreen.showSystemUI().catch(e => console.log(e))
  }

  shuffleSet(){
    console.log("click")
    for(let i = this.database.viewSet.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = this.database.viewSet[i]
      this.database.viewSet[i] = this.database.viewSet[j]
      this.database.viewSet[j] = temp
    }
    this.slides.slideTo(0)
  }

  changeSlides(){
    this.flip = false
    this.slides.getActiveIndex()
    .then(i => {
      this.progress = i / (this.database.viewSet.length)
    })
  }

  startOver(){
    this.slides.slideTo(0)
  }
}
