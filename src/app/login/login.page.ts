import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    // public utility: UtilityService,
    // private api: ApiService,
    private fb: FormBuilder,
    public toastController: ToastController,
    private navCtrl: NavController
  ) {}
  ngOnInit() {}
}
