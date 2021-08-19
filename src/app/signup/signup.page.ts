import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ConfirmedValidator } from '../services/confirm-validators';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  eyeIcon = 'eye-off';
  inputType = 'password';
  eyeIconConfirm = 'eye-off';
  inputTypeConfirm = 'password';
  signupForm: FormGroup;
  GoogleAutocomplete: any;
  autocompleteItems: any[];

  constructor(
    public utility: UtilityService,
    private api: ApiService,
    private fb: FormBuilder,
    public zone: NgZone
  ) {
    this.createForm();
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
  }

  ngOnInit() {}

  showHide() {
    this.inputType = this.inputType == 'text' ? 'password' : 'text';
    this.eyeIcon = this.eyeIcon == 'eye' ? 'eye-off' : 'eye';
  }

  showHideConfirm() {
    this.inputTypeConfirm =
      this.inputTypeConfirm == 'text' ? 'password' : 'text';
    this.eyeIconConfirm = this.eyeIconConfirm == 'eye' ? 'eye-off' : 'eye';
  }

  createForm() {
    this.signupForm = this.fb.group(
      {
        first_name: ['', [Validators.required]],
        dob: ['', [Validators.required]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
            ),
          ],
        ],
        phone: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/),
          ],
        ],
        address: ['', [Validators.required]],
        school: [''],
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
  get f() {
    return this.signupForm.controls;
  }

  signUp() {
    if (this.signupForm.valid) {
      this.utility.showLoader();
      console.log('this.signupForm.value ===>', this.signupForm.value);
      const obj = {
        first_name: this.signupForm.value.first_name,
        last_name: this.signupForm.value.last_name,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        phone: this.signupForm.value.phone,
        dob: this.signupForm.value.dob.split(['T'])[0],
        // confirm_email: this.signupForm.value.confirm_email,
        country: this.signupForm.value.country,
        country_code: this.signupForm.value.country_code,
        city: this.signupForm.value.city,
        state: this.signupForm.value.state,
        school: this.signupForm.value.school
          ? this.signupForm.value.school
          : '',
        address: this.signupForm.value.address,
      };

      this.api.signUp(obj).subscribe((res: any) => {
        console.log('signUp ===>', res);
        this.utility.hideLoader();
        if (res.status == 'Success') {
          this.utility.showToast(res.message);
          this.utility.navigate('/login');
        }
        if (res.code === 404) {
          this.utility.showAlert('Error', res.status);
        }
      });
    } else {
      // this.utility.showToast("Form is invalid", "error");
      console.log(this.signupForm);
      let controls = this.signupForm.controls;
      for (let c in controls) {
        console.log(c);
        if (controls[c].errors) {
          let error = Object.keys(controls[c].errors);
          error = error.includes('pattern') ? ['not valid'] : error;
          console.log(error);
          let msg =
            (c.includes('_') ? c.split('_').join(' ') : c) + ' is ' + error;
          msg = msg.charAt(0).toUpperCase() + msg.slice(1);
          return this.utility.showAlert('Error', msg);
        } else {
        }
      }
    }
  }

  updateSearchResults() {
    if (this.signupForm.value.address == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions(
      { input: this.signupForm.value.address },
      (predictions, status) => {
        console.log('predictions ===>', predictions);
        console.log('status =====>', status);
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
    console.log('selectSearchResult ===>', item);
    this.signupForm.patchValue({
      address: item.description,
      country: item.terms[item.terms.length - 1].value,
      state: item.terms[item.terms.length - 2].value,
      city: item.terms[item.terms.length - 3].value
        ? item.terms[item.terms.length - 3].value
        : '',
    });
    console.log('this.signupForm.value=====>', this.signupForm.value);
    this.autocompleteItems = [];
  }

  outsideInput(e) {
    setTimeout(() => {
      this.autocompleteItems = [];
    }, 500);
  }
}
