import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public eyeIcon = 'eye-off';
  public inputType = 'password';
  public loginForm: FormGroup;
  constructor(
    public utility: UtilityService,
    private api: ApiService,
    private fb: FormBuilder,
    public toastController: ToastController,
    private navCtrl: NavController,
    private router: Router
  ) {
    this.createForm();
  }
  ngOnInit() {}

  showHide() {
    this.inputType = this.inputType == 'text' ? 'password' : 'text';
    this.eyeIcon = this.eyeIcon == 'eye' ? 'eye-off' : 'eye';
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
          ),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    if (this.utility.formValidation(this.loginForm)) {
      this.utility.showLoader();

      console.log('this.loginForm ==>', this.loginForm.value);
      this.api.login(this.loginForm.value).subscribe((res: any) => {
        console.log('login response ===>', res);
        if (res && res.length == 0) {
          this.utility.hideLoader();
          this.utility.showAlert('Error', 'Something went wrong !!');
        } else {
          if (res.status.toLowerCase() == 'success') {
            this.utility.hideLoader();
            if (res.is_two_fa == 1) {
              this.utility.saveToLocalStorage(
                'email',
                this.loginForm.value.email
              );
              this.router.navigate(['verification', { isLogin: 1 }]);
              return;
            }
            this.presentToastWithOptions(res.message);
            this.utility.saveToLocalStorage('token', res.token);
            this.utility.saveToLocalStorage('type', res.type);
            this.utility.menuHandler.next('login');
            this.navCtrl.navigateRoot('browse-influencers');
          } else if (res.code == '404') {
            this.utility.hideLoader();
            this.utility.showAlert('Error', res.message);
          }
        }
      });
    }
  }

  async presentToastWithOptions(msg) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      cssClass: 'toasts-css',
      animated: true,
      duration: 2000,
    });
    toast.present();
  }
}
