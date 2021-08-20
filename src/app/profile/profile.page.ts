import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public userObj: any;
  public isPreloader: boolean = true;
  constructor(
    private menu: MenuController,
    private navCtrl: NavController,
    public utility: UtilityService,
    private api: ApiService
  ) {}

  ionViewWillEnter() {
    // this.userObj = JSON.parse(this.utility.getfromLocalStorage('userObj'));
    this.getAccountData();
  }

  ngOnInit() {}

  openMenu() {
    this.menu.toggle();
  }
  goBack() {
    this.navCtrl.back();
  }

  getAccountData() {
    this.isPreloader = true;
    this.api.getProfileInfo().subscribe((res: any) => {
      this.userObj = res;
      this.isPreloader = false;
    });
  }
}
