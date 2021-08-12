import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-influencers-profile',
  templateUrl: './influencers-profile.page.html',
  styleUrls: ['./influencers-profile.page.scss'],
})
export class InfluencersProfilePage implements OnInit {
  constructor(private menu: MenuController) {}

  ngOnInit() {}

  // openFirst() {
  //   this.menu.enable(true, 'first');
  //   this.menu.open('first');
  // }

  openMenu() {
    this.menu.toggle();
  }
}
