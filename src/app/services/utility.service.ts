import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import {
  LoadingController,
  AlertController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  headerData = {
    title: '',
    moreOption: null,
  };
  public formButton = false;
  public data = [];
  public username = '';
  public profileUrl;
  loader;
  isLoading = false;

  menuHandler = new BehaviorSubject('');
  sideMenuHandler = this.menuHandler.asObservable();
  // bsModalRef: BsModalRef;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public toastController: ToastController,
    private platform: Platform
  ) {}
  async presentLoading() {
    this.loader = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await this.loader.present();
    console.log('Loading dismissed!');
  }

  log(message: string) {
    console.log(message);
  }

  navigate(page) {
    return this.router.navigateByUrl(page);
  }
  navigateWithParam(page, action, step) {
    this.router.navigate([page], {
      queryParams: {
        action: action,
        step: step,
      },
    });
  }
  navigateAfterSec(page) {
    setTimeout(() => {
      this.router.navigateByUrl(page);
    }, 2000);
  }
  saveToLocalStorage(key, value) {
    return localStorage.setItem(key, value);
  }

  getfromLocalStorage(key) {
    return localStorage.getItem(key);
  }

  loadUserInfo(key) {
    return JSON.parse(this.getfromLocalStorage(key));
  }

  getToken(key) {
    return this.loadUserInfo(key).Token;
  }
  getRole() {
    return this.loadUserInfo('userObj').user_role;
  }

  getName() {
    var user = this.loadUserInfo('userObj');
    return user.first_name + ' ' + user.last_name;
  }

  isAdmin() {
    return (
      this.loadUserInfo('userObj').user_role.toLowerCase() == 'super admin'
    );
  }
  isLender() {
    return this.loadUserInfo('userObj').user_role.toLowerCase() == 'lender';
  }

  isSubLender() {
    return this.loadUserInfo('userObj').user_role.toLowerCase() == 'sub lender';
  }

  isSubAdmin() {
    return this.loadUserInfo('userObj').user_role.toLowerCase() == 'admin';
  }

  isLenderActive() {
    return this.loadUserInfo('userObj').is_verified;
  }

  isBorrower() {
    return this.loadUserInfo('userObj')
      .user_role.toLowerCase()
      .includes('borrower');
  }
  isUserLoggedIn() {
    var user = this.getfromLocalStorage('userObj');
    console.log(user);
    if (user == null || user == undefined) return false;
    else return true;
  }
  async showLoader() {
    this.isLoading = true;
    return await this.loadingController.create({}).then((a) => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
  async hideLoader() {
    // this.loader.dismiss();
    console.log('hideLoader ===>');
    this.isLoading = false;
    return await this.loadingController
      .dismiss()
      .then(() => console.log('dismissed'));
  }

  async showAlert(type, msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: type,
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async emailAlert(msg) {
    // this.toaster.success(
    //   '<span data-notify="icon"  class="nc-icon nc-email-85" ></span><span data-notify="message"><b>Message</b> - ' +
    //     msg +
    //     '</span>',
    //   '',
    //   {
    //     timeOut: 50000,
    //     enableHtml: true,
    //     closeButton: true,
    //     toastClass: 'alert alert-success alert-with-icon',
    //     positionClass: 'toast-' + 'top' + '-' + 'right',
    //   }
    // );
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Email Sent !',
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

  getCookie(name) {
    // var cookieValue = null;
    // if (document.cookie && document.cookie !== "") {
    //   var cookies = document.cookie.split(";");
    //   for (var i = 0; i < cookies.length; i++) {
    //     var cookie = cookies[i].trim();
    //     // Does this cookie string begin with the name we want?
    //     if (cookie.substring(0, name.length + 1) === name + "=") {
    //       cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
    //       break;
    //     }
    //   }
    // }
    let cookieValue = this.getfromLocalStorage('token');
    return cookieValue;
  }

  setCookie(cname, cvalue, exdays) {
    // var d = new Date();
    // d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    // var expires = "expires=" + d.toUTCString();
    // document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

    this.saveToLocalStorage(cname, cvalue);
  }

  getQueryParam() {
    return this.activeRoute.queryParams;
  }
  isHomepage() {
    return window.location.pathname == '/';
  }

  urlPath(value) {
    return window.location.pathname.includes(value);
  }

  enableButton() {
    this.formButton = false;
  }

  disableButton() {
    this.formButton = true;
  }

  sessionCheck() {
    let userObj = this.loadUserInfo('userObj');
    console.log(userObj);
    if (userObj != null) {
      window.localStorage.setItem('logged_in', 'false');

      this.showAlert(
        'error',
        'You hadn’t logged out earlier, so the session is being ended.'
      );
      localStorage.clear();
    }
  }

  storageChange(event) {
    console.log('storage event is working');
    console.log(event, event.key);
    if (event.key == null) {
      window.location.href = window.location.origin;
    }
  }

  goBack() {
    window.history.back();
  }

  updateParams(number) {
    this.router.navigate([], {
      queryParams: {
        action: 'new',
        step: number,
      },
    });
  }

  formatDate(date) {
    return moment(date).format('L');
  }
  getDay(date) {
    return moment(date).format('dddd');
  }
  populateHeaderData(title, moreOption) {
    this.headerData.title = title;
    this.headerData.moreOption = moreOption;
  }
  getOnesignalId() {
    console.log('get one signal ID');
    // The promptForPushNotificationsWithUserResponse function will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 6)
    window['plugins'].OneSignal.promptForPushNotificationsWithUserResponse(
      function (accepted) {
        console.log('User accepted notifications: ' + accepted);
      }
    );
  }

  isIos() {
    return this.platform.is('ios');
  }

  setData(id, data) {
    this.data[id] = data;
    console.log(this.data);
  }

  getData(id) {
    return this.data[id];
  }

  // async downloadFile(url, filename) {
  //   this.showLoader();
  //   let blob = await fetch(url).then((r) => r.blob());
  //   console.log(blob, "blob");
  //   let directory = "";
  //   if (this.isIos()) {
  //     directory = this.file.documentsDirectory;
  //   } else {
  //     directory = this.file.externalRootDirectory + "Download/";
  //   }
  //   let fileName = filename;
  //   console.log(directory, filename, blob);
  //   this.file
  //     .writeFile(directory, fileName, blob, { replace: true })
  //     .then((success) => {
  //       this.hideLoader();
  //       console.log(success);
  //       let nativeUrl = success["nativeURL"];

  //       if (this.isIos()) {
  //         this.fileOpener
  //           .open(nativeUrl, blob.type)
  //           .then((res) => {
  //             console.log(res);
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //             this.hideLoader();
  //           });
  //       } else {
  //         this.showAlert(
  //           "Message",
  //           "Exported successfully in download folder."
  //         );
  //       }
  //     });
  // }

  getYears() {
    let years = [];
    let currentYear = new Date().getFullYear();
    for (let i = 1960; i <= currentYear; i++) {
      years.push(i);
    }
    return years;
  }

  async showToast(msg, type?) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      cssClass: type == 'error' ? 'toasts-css-error' : 'toasts-css',
      animated: true,
      duration: 2000,
    });
    toast.present();
  }
  navigateOutside(link) {
    window.location.href = link;
  }

  checkAvailability(data) {
    return data ? data : '';
  }

  checkToken(res) {
    if (res.code == 301) {
      console.log('Token is expired');
      this.showToast(res.message);
      localStorage.clear();
      return this.router.navigateByUrl('/login');
    }
  }
  getUsername() {
    return this.loadUserInfo('userObj').username;
  }

  getUserType() {
    return localStorage.getItem('type');
  }

  getDummyImage() {
    return 'assets/image/profile.png';
  }
  formValidation(form) {
    console.log(form);
    let controls = form.controls;

    for (let c in controls) {
      console.log(c);
      if (controls[c].errors) {
        let error = Object.keys(controls[c].errors);
        error = error.includes('pattern') ? ['not valid'] : error;
        console.log(error);
        let msg =
          (c.includes('_') ? c.split('_').join(' ') : c) + ' is ' + error;
        msg = msg.charAt(0).toUpperCase() + msg.slice(1);
        this.showAlert('Error', msg);
        return false;
      } else {
      }
    }
    return true;
  }
  checkError(res) {
    return res.status == 'Fail';
  }

  isValidString(d) {
    if (d == undefined || d == null || d == '') {
      return false;
    } else {
      return true;
    }
  }
}
