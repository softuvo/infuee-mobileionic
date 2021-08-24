import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController, NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { UtilityService } from '../services/utility.service';
import * as $ from 'jquery';
import { TwoFactorAuthenticationPage } from '../two-factor-authentication/two-factor-authentication.page';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  public updateProfileForm: FormGroup;
  public countryCodeList: any[] = [];
  public categoriesList: any[] = [];
  public GoogleAutocomplete: any;
  public autocompleteItems: any[] = [];
  public userObj: any;
  public userImage: any;
  public isPreloader: boolean = true;
  constructor(
    private navCtrl: NavController,
    public utility: UtilityService,
    private api: ApiService,
    private fb: FormBuilder,
    public zone: NgZone,
    private sanitizer: DomSanitizer,
    private modalController: ModalController
  ) {
    this.createForm();

    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.isPreloader = true;
    this.getCountries();
    this.getCategoriesData();
    this.getUpdateProfile();
  }

  getUpdateProfile() {
    this.api.getProfileInfo().subscribe((res: any) => {
      this.utility.checkToken(res);
      if (res.status == 'Success') {
        this.userObj = res.user;
        this.utility.saveToLocalStorage(
          'userObj',
          JSON.stringify(this.userObj)
        );

        if (this.userObj && this.userObj.image) {
          this.userImage = this.userObj.image;
        }
        this.updateProfileForm.patchValue({
          first_name: this.userObj.first_name || '',
          // last_name: this.userObj.last_name || '',
          // email: this.userObj.email || '',
          country_code: this.userObj.country_code,
          phone: this.userObj.phone || '',
          date_of_bith: this.userObj.date_of_bith || '',
          address: this.userObj.address || '',
          school: this.userObj.school || '',
          category: this.userObj.category || '',
        });
      }
      this.isPreloader = false;
    });
  }

  createForm() {
    this.updateProfileForm = this.fb.group({
      first_name: ['', [Validators.required]],
      // last_name: ['', [Validators.required]],
      // email: ['', [Validators.required, Validators.email]],
      country_code: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      date_of_bith: ['', [Validators.required]],
      address: ['', [Validators.required]],
      school: [''],
      category: [''],
    });
  }
  get f() {
    return this.updateProfileForm.controls;
  }

  goBack() {
    this.navCtrl.back();
  }

  updateSearchResults() {
    if (this.updateProfileForm.value.address == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions(
      { input: this.updateProfileForm.value.address },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      }
    );
  }

  selectSearchResult(item) {
    this.updateProfileForm.patchValue({
      address: item.description,
    });
    this.autocompleteItems = [];
  }

  outsideInput(event) {
    setTimeout(() => {
      this.autocompleteItems = [];
    }, 500);
  }

  getCountries() {
    this.api.getCountryCode().subscribe((res: any) => {
      this.countryCodeList = res.countries;
    });
  }

  getCategoriesData() {
    this.api.getCategories().subscribe((res) => {
      this.categoriesList = res.categories;
    });
  }

  uploadProfile(e) {
    this.utility.showLoader();
    var form = new FormData();
    form.append('file', e.target.files[0]);

    var settings = {
      url: this.api.baseUrl + 'updateProfileImage',
      method: 'POST',
      timeout: 0,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      processData: false,
      mimeType: 'multipart/form-data',
      contentType: false,
      data: form,
    };

    $.ajax(settings).done((response) => {
      this.utility.checkToken(JSON.parse(response));
      this.utility.hideLoader();
      this.utility.showToast(JSON.parse(response).message);
      if (JSON.parse(response).status == 'Success') {
        this.getUpdateProfile();
      }
    });
  }

  updateProfile() {
    if (!this.updateProfileForm.invalid) {
      let send;
      this.utility.showLoader();
      let form = this.updateProfileForm.value;
      send = {
        first_name: form.first_name,
        country_code: form.country_code,
        phone: form.phone,
        date_of_bith: form.date_of_bith.split(['T'])[0],
        address: form.address,
        school: form.school,
      };

      this.api.updateProfile(send).subscribe((res: any) => {
        this.utility.hideLoader();
        this.utility.checkToken(res);
        if (res.status == 'Success') {
          this.utility.showToast(res.message);
          this.getUpdateProfile();
        } else {
          this.utility.showToast(res.message, 'error');
        }
      });
    }
  }

  async openTwoFactorAuth() {
    const modal = await this.modalController.create({
      component: TwoFactorAuthenticationPage,
      cssClass: 'my-custom-class',
      componentProps: {
        data: this.countryCodeList,
      },
    });
    await modal.present();
    await modal.onDidDismiss().then((data) => {
      console.log('============', data);
      if (data && data.data && data.data == true) {
        this.userObj.is_two_fa = 1;
      }
    });
  }

  disableTwoFactorAuth() {
    let data: any = {
      title: 'Are you sure?',
      text: 'Do you want to disable Two-Factor Authentication ?',
      yes: true,
      cancel: true,
    };
    this.utility.presentPopover('confirm', data).then((data) => {
      console.log('============', data);
      if (data && data.data && data.data == true) {
        this.closeTwoFactorAuth();
      }
    });
  }

  closeTwoFactorAuth() {
    let obj: any = {};
    this.utility.showLoader();
    this.api.disableFA(obj).subscribe((res: any) => {
      this.utility.hideLoader();
      this.utility.checkToken(res);
      this.utility.showToast(res.message);
      if (res.success == true) {
        if (this.userObj && this.userObj.is_two_fa) {
          this.userObj.is_two_fa = 0;
        }
      }
    });
  }
}
