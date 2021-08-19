import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {
  public email: any;
  public otp1: any;
  public otp2: any;
  public otp3: any;
  public otp4: any;
  public isSubmit: boolean = false;
  constructor(
    private utility: UtilityService,
    private api: ApiService,
    private navCtrl: NavController
  ) {
    if (
      this.utility.getData('forgetEmail') &&
      this.utility.getData('forgetEmail').email
    ) {
      this.email = this.utility.getData('forgetEmail').email;
    }
    console.log(this.email);
  }

  ngOnInit() {}

  resendOtp() {
    this.utility.showLoader();
    const obj = {
      email: this.email,
    };

    this.api.resendOtp(obj).subscribe((res: any) => {
      this.utility.hideLoader();
      if (res.status.toLowerCase() == 'success')
        this.utility.showToast(res.message);
      else {
        this.utility.showToast(res.message, 'error');
      }
    });
  }
  submit() {
    this.isSubmit = true;

    if (
      this.isValid(this.otp1) &&
      this.isValid(this.otp2) &&
      this.isValid(this.otp3) &&
      this.isValid(this.otp4)
    ) {
      this.utility.showLoader();
      const obj = {
        email: this.email,
        otp: this.otp1 + this.otp2 + this.otp3 + this.otp4,
      };
      this.api.verifyWithOtp(obj).subscribe((res: any) => {
        this.utility.hideLoader();
        this.utility.checkToken(res);
        if (res.status.toLowerCase() == 'success') {
          this.utility.saveToLocalStorage('token', res.token);
          this.navCtrl.navigateRoot('create-new-password');
        } else {
          this.utility.showToast(res.message, 'error');
        }
      });
    }
  }

  isValid(d: any) {
    if (d && d != undefined && d != null && d != '') {
      return true;
    } else {
      return false;
    }
  }
}
