import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  public forgetForm: FormGroup;
  constructor(
    public utility: UtilityService,
    private api: ApiService,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.forgetForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
          ),
        ],
      ],
    });
  }
  get f() {
    return this.forgetForm.controls;
  }

  forgetPassword() {
    if (this.utility.formValidation(this.forgetForm)) {
      this.utility.showLoader();
      this.api.forgetPassword(this.forgetForm.value).subscribe((res) => {
        this.utility.hideLoader();
        if (res.status == 'Success') {
          this.utility.showToast(res.message);
          this.utility.setData('forgetEmail', this.forgetForm.value);
          this.router.navigate(['/verification']);
        }
        if (res.code == '404') this.utility.showAlert('Error', res.message);
      });
    }
  }
}
