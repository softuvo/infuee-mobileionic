import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ConfirmedValidator } from '../services/confirm-validators';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.page.html',
  styleUrls: ['./create-new-password.page.scss'],
})
export class CreateNewPasswordPage implements OnInit {
  eyeIcon = 'eye-off';
  inputType = 'password';
  eyeIconConfirm = 'eye-off';
  inputTypeConfirm = 'password';
  newPasswordForm: FormGroup;
  constructor(
    public utility: UtilityService,
    private api: ApiService,
    private fb: FormBuilder,
    public zone: NgZone
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.newPasswordForm = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
            ),
          ],
        ],
        confirm_password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
            ),
          ],
        ],
      },
      { validator: ConfirmedValidator('password', 'confirm_password') }
    );
  }

  submit() {
    if (this.newPasswordForm.valid) {
      this.utility.showLoader();
      const obj = {
        password: this.newPasswordForm.value.password,
      };

      this.api.createNewPswd(obj).subscribe((res: any) => {
        this.utility.hideLoader();
        if (res.status == 'Success') {
          localStorage.clear();
          this.utility.showToast(res.message);
          this.utility.navigate('/login');
        }
        if (res.code === 404) {
          this.utility.showAlert('Error', res.message);
        }
      });
    }
  }

  get f() {
    return this.newPasswordForm.controls;
  }

  showHide() {
    this.inputType = this.inputType == 'text' ? 'password' : 'text';
    this.eyeIcon = this.eyeIcon == 'eye' ? 'eye-off' : 'eye';
  }

  showHideConfirm() {
    this.inputTypeConfirm =
      this.inputTypeConfirm == 'text' ? 'password' : 'text';
    this.eyeIconConfirm = this.eyeIconConfirm == 'eye' ? 'eye-off' : 'eye';
  }
}
