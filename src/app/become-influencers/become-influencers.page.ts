import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-become-influencers',
  templateUrl: './become-influencers.page.html',
  styleUrls: ['./become-influencers.page.scss'],
})
export class BecomeInfluencersPage implements OnInit {
  categoryList: any[] = [];
  category: any;
  islicked: boolean = false;
  constructor(
    private menu: MenuController,
    private navCtrl: NavController,
    private api: ApiService,
    public utility: UtilityService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getCategory();
  }

  getCategory() {
    this.api.getCategories().subscribe((res: any) => {
      console.log('getCategories ===>', res);
      this.categoryList = res.categories;
    });
  }

  openMenu() {
    this.menu.toggle();
  }

  goBack() {
    this.navCtrl.back();
  }
}
