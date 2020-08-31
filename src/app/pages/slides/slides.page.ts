import { Component, OnInit } from '@angular/core';
import { SqliteServiceService } from 'src/app/shared/sqlite-service.service';

import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx'
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx'
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {

  constructor(protected database:SqliteServiceService, private fullScreen:AndroidFullScreen, private orientation:ScreenOrientation, private plt:Platform) { 
    plt.ready()
    .then(() => {
      orientation.unlock()
      orientation.lock(orientation.ORIENTATIONS.LANDSCAPE)
    })
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.fullScreen.immersiveMode().catch(e => console.log(e))
  }

  ionViewWillLeave(){
    this.orientation.unlock()
    this.fullScreen.showSystemUI().catch(e => console.log(e))
  }
}
