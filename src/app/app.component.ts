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
import { Router } from '@angular/router';
import {
  InAppBrowser,
  InAppBrowserOptions,
} from '@ionic-native/in-app-browser/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public selectedIndex = 0;
  public userPage = [
    {
      title: 'Become Influencer',
      url: 'become-influencer',
    },
  ];

  public influencerPage = [
    {
      title: 'Browse Jobs',
      url: '',
    },
  ];
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;
  public appPages: any[] = [];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public userType: any;
  public userToken: any;
  public path: any;
  public ProfileData: any;
  public dummyImg = 'assets/images/profile.png';

  options: InAppBrowserOptions = {
    location: 'no', //Or 'no'
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'no', //Android only ,shows browser zoom controls
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only
    closebuttoncaption: 'X', //iOS only
    disallowoverscroll: 'no', //iOS only
    toolbar: 'yes', //iOS only
    enableViewportScale: 'no', //iOS only
    allowInlineMediaPlayback: 'no', //iOS only
    presentationstyle: 'pagesheet', //iOS only
    fullscreen: 'yes', //Windows only
  };
  constructor(
    private menu: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public utility: UtilityService,
    private api: ApiService,
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    public router: Router,
    private iab: InAppBrowser,
    private spinnerDialog: SpinnerDialog
  ) {
    this.userType = this.utility.getfromLocalStorage('type');
    this.userToken = this.utility.getfromLocalStorage('token');
    this.initializeApp();
    this.setMenu();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.utility.isIos()) {
        this.statusBar.styleDefault();
      } else {
        this.statusBar.styleLightContent();
      }
      this.splashScreen.hide();
    });
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

  ionViewWillEnter() {}

  setMenu() {
    this.checkUserLogIn();
    this.utility.sideMenuHandler.subscribe((res: any) => {
      if (res == 'login') {
        this.userType = this.utility.getfromLocalStorage('type');
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

  checkUserLogIn() {
    if (this.userToken && this.userToken != undefined) {
      this.api.getProfileInfo().subscribe((res: any) => {
        this.utility.checkToken(res);

        if (res.status == 'Success') {
          this.utility.saveToLocalStorage(
            'userObj',
            JSON.stringify(this.ProfileData)
          );
          this.navCtrl.navigateRoot('/browse-influencers');
          this.utility.menuHandler.next('login');
        } else {
          this.navCtrl.navigateRoot('/login');
        }
      });
    } else {
      this.navCtrl.navigateRoot('/login');
    }
  }

  getProfileData() {
    // this.utility.showLoader();
    this.api.getProfileInfo().subscribe((res: any) => {
      console.log('getProfileInfo ===>', res);
      // this.utility.hideLoader();
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
      this.utility.clearData();
      // this.utility.navigate("/login");
      this.navCtrl.navigateRoot('/login');
    });
  }

  session() {
    return this.utility.getfromLocalStorage('userObj') || false;
  }

  goPage(u: any) {
    if (u && u != '' && u != undefined) {
      if (u == 'become-influencer') {
        this.goBecomeInfluencers();
      } else {
        this.router.navigate([u]);
      }
      this.menu.toggle();
    }
  }

  goBecomeInfluencers() {
    if (
      this.utility.getfromLocalStorage('email') &&
      this.utility.getfromLocalStorage('email') != undefined
    ) {
      const url =
        this.api.webUrl +
        'become-influencer/' +
        this.utility.getfromLocalStorage('email');
      let target = '_blank';
      const browser = this.iab.create(url, target, this.options);

      browser.on('loadstart').subscribe(
        (eve) => {
          console.log('========== loadstart');
          this.spinnerDialog.show(null, null, true);
        },
        (err) => {
          console.log('========== loadstart err');
          this.spinnerDialog.hide();
        }
      );

      browser.on('loadstop').subscribe(
        () => {
          console.log('========== loadsstop ');
          this.spinnerDialog.hide();
        },
        (err) => {
          console.log('========== loadstop err');
          this.spinnerDialog.hide();
        }
      );

      browser.on('loaderror').subscribe(
        () => {
          console.log('========== loaderror');
          this.spinnerDialog.hide();
        },
        (err) => {
          console.log('========== loaderror err');
          this.spinnerDialog.hide();
        }
      );

      browser.on('exit').subscribe(
        () => {
          console.log('========== exit');
          this.spinnerDialog.hide();
        },
        (err) => {
          console.log('========== exit err');
          this.spinnerDialog.hide();
        }
      );
    }
  }

  getFooterEvent(evt) {
    this.utility.menuHandler.next(this.router.url);
  }
}
