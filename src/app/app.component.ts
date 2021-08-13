import { Component, OnInit, Injector, ViewChild } from '@angular/core';

import {
  MenuController,
  Platform,
  NavController,
  IonRouterOutlet,
  AlertController,
} from '@ionic/angular';
import { UtilityService } from './services/utility.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public selectedIndex = 0;
  public userPage = [];

  public influencerPage = [];
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;
  public appPages: any[] = [];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  userType: any;
  userToken: any;
  path: any;
  ProfileData: any;
  dummyImg = 'assets/images/profile.png';
  constructor(
    private menu: MenuController,
    private platform: Platform,
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
    public utility: UtilityService,
    private api: ApiService,
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    this.userType = this.utility.getfromLocalStorage('type');
    this.userToken = this.utility.getfromLocalStorage('token');
    this.initializeApp();
    this.checkUserLogIn();
  }

  ngOnInit() {}

  initializeApp() {
    // this.platform.ready().then(() => {
    //   if (this.utility.isIos()) {
    //     this.statusBar.styleDefault();
    //   } else {
    //     this.statusBar.styleLightContent();
    //   }
    //   this.splashScreen.hide();
    // });
  }

  checkUserLogIn() {
    if (this.userToken && this.userToken != undefined) {
      this.api.getProfileInfo().subscribe((res: any) => {
        this.utility.checkToken(res);
        if (res.status == 'Success') {
          this.ProfileData = res.user;
          this.utility.saveToLocalStorage(
            'userObj',
            JSON.stringify(this.ProfileData)
          );
          this.navCtrl.navigateRoot('/influencers-profile');
        } else {
          this.navCtrl.navigateRoot('/login');
        }
      });
    } else {
      this.navCtrl.navigateRoot('/login');
    }
  }

  logout() {
    console.log('logout =========>');
    this.api.logout().subscribe((res: any) => {
      this.utility.checkToken(res);
      this.menuCtrl.toggle();
      this.utility.showToast(res.message);
      localStorage.clear();
      // this.utility.navigate("/login");
      this.navCtrl.navigateRoot('/login');
    });
  }

  session() {
    return this.utility.getfromLocalStorage('userObj') || false;
  }
}
