import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { UtilityService } from '../services/utility.service';

import { Validators } from '@angular/forms';

@Component({
  selector: 'app-two-factor-authentication',
  templateUrl: './two-factor-authentication.page.html',
  styleUrls: ['./two-factor-authentication.page.scss'],
})
export class TwoFactorAuthenticationPage implements OnInit {
  @Input() data: any;
  public countryCodeList: any[] = [];
  public otpStatus: boolean = false;
  public country_code: any;
  public mobile_number: any;
  public password: any;
  public userData: any;
  public otp: any;
  public isRequestOtp: boolean = false;
  constructor(
    private modalctrl: ModalController,
    private api: ApiService,
    public utility: UtilityService,
    public navParams: NavParams
  ) {}

  ngOnInit() {
    this.getCountryCode();
    this.userData = this.utility.loadUserInfo('userObj');
    this.isRequestOtp = false;
  }

  back() {
    this.modalctrl.dismiss();
  }

  setData() {
    this.country_code = this.userData.country_code;
    this.mobile_number = this.userData.phone;
    this.password = null;
  }

  getCountryCode() {
    this.utility.showLoader();
    this.api.getCountryCode().subscribe((res: any) => {
      this.utility.hideLoader();
      this.utility.checkToken(res);
      this.countryCodeList = res.countries;
      this.setData();
    });
  }

  requestOtp() {
    this.isRequestOtp = true;
    if (
      this.utility.isValidString(this.country_code) &&
      this.utility.isValidString(this.mobile_number) &&
      this.utility.isValidString(this.password)
    ) {
      this.utility.showLoader();
      const obj = {
        country_code: this.country_code,
        mobile_number: this.mobile_number,
        password: this.password,
      };
      this.api.requestOtp(obj).subscribe((res: any) => {
        this.utility.hideLoader();
        this.utility.checkToken(res);
        this.utility.showToast(res.message);
        if (res.success == true) {
          this.otpStatus = true;
        }
      });
    }
  }

  enable() {
    const data = {
      otp: this.otp,
    };
    this.api.sendOtp(data).subscribe((res: any) => {
      this.utility.hideLoader();
      this.utility.checkToken(res);
      this.utility.showToast(res.message);
      this.modalctrl.dismiss(true);
    });
  }
}
