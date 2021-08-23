import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-influencers-profile',
  templateUrl: './influencers-profile.page.html',
  styleUrls: ['./influencers-profile.page.scss'],
})
export class InfluencersProfilePage implements OnInit {
  public user: any;
  public allAccountData: any;
  public dummyImage = 'assets/image/profile.png';
  public category: any[] = [];
  public userType: any;
  public isProfilePreloader: boolean = true;
  constructor(
    private menu: MenuController,
    private navCtrl: NavController,
    private modalController: ModalController,
    private api: ApiService,
    public utility: UtilityService,
    private route: ActivatedRoute,
    private router: Router,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.user = this.route.snapshot.paramMap.get('username');
    this.getCategory();
    if (this.user && this.user != undefined) {
      this.getAccountData();
    }
  }

  goBack() {
    console.log('goBack');
    this.navCtrl.back();
  }

  openMenu() {
    this.menu.toggle();
  }

  getCategory() {
    this.api.getCategories().subscribe((res: any) => {
      this.utility.checkToken(res);
      this.category = res.categories;
    });
  }

  getAccountData() {
    this.isProfilePreloader = true;
    this.api.getMyAccountProfile(this.user).subscribe((res: any) => {
      console.log('getAccountData ==>', res);
      this.allAccountData = res;
      this.isProfilePreloader = false;
    });
  }

  async goToUsers() {
    console.log('go to users ==>');
    // const modal = await this.modalController.create({
    //   component: ReviewsPage,
    //   cssClass: 'my-custom-class',
    // });
    // return await modal.present();
  }

  add_To_Cart(id) {
    if (this.userType != 'user') return;
    this.api.addToCart(id).subscribe((res: any) => {
      console.log('addToCart ===>', res);
      this.utility.checkToken(res);
      this.utility.showToast(res.message);
    });
  }

  async managePlan() {
    console.log('go to users ==>');
    // const manageModal = await this.modalController.create({
    //   component: ManagePlansPage,
    //   cssClass: 'my-custom-class',
    // });
    // return await manageModal.present();
  }
}
