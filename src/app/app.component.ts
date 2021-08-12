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
    this.setMenu();
  }

  ngOnInit() {
    this.path = window.location.pathname.split('influencer/')[1];
    if (this.path !== undefined) {
      if (this.userType && this.userType == 'user') {
        this.appPages = this.userPage;
        this.selectedIndex = this.appPages.findIndex(
          (page) => page.title.toLowerCase() === this.path.toLowerCase()
        );
      } else if (this.userType && this.userType == 'influencer') {
        this.appPages = this.influencerPage;
        this.selectedIndex = this.appPages.findIndex(
          (page) => page.title.toLowerCase() === this.path.toLowerCase()
        );
      } else if (!this.userType) {
        this.utility.navigate('/login');
      }
    }
  }

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

  setMenu() {
    this.utility.sideMenuHandler.subscribe((res: any) => {
      if (res == 'login') {
        this.userType = this.utility.getfromLocalStorage('type');
        console.log('after login userType ==>', this.userType);
        if (this.userType == 'user') {
          this.appPages = this.userPage;
          this.getProfileData();
          this.ngOnInit();
        } else if (this.userType == 'influencer') {
          this.appPages = this.influencerPage;
          this.getProfileData();
          this.ngOnInit();
        }
      }
    });
  }

  getProfileData() {
    this.api.getProfileInfo().subscribe((res: any) => {
      console.log('getProfileInfo ===>', res);
      this.utility.checkToken(res);
      if (res.status == 'Success') {
        this.ProfileData = res.user;
        this.utility.saveToLocalStorage(
          'userObj',
          JSON.stringify(this.ProfileData)
        );
      }
    });
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
