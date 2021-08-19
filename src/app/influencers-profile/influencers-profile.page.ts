import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-influencers-profile',
  templateUrl: './influencers-profile.page.html',
  styleUrls: ['./influencers-profile.page.scss'],
})
export class InfluencersProfilePage implements OnInit {
  constructor(private menu: MenuController, private navCtrl: NavController) {}

  ngOnInit() {}

  // openFirst() {
  //   this.menu.enable(true, 'first');
  //   this.menu.open('first');
  // }

  goBack() {
    console.log('goBack');
    this.navCtrl.back();
  }

  openMenu() {
    this.menu.toggle();
  }
}
