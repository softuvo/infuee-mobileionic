import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ConfirmedValidator } from '../services/confirm-validators';
import { UtilityService } from '../services/utility.service';
import * as $ from "jquery";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.page.html',
  styleUrls: ['./create-job.page.scss'],
})
export class CreateJobPage implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  public jobForm: FormGroup;
  public isSubmit: boolean = false;
  public countingArray: any = [];
  public minimum_followers: any = [];
  public categoryList: any[] = [];
  public plateformList: any[] = [];
  public GoogleAutocomplete: any;
  public autocompleteItems: any[];
  public file: any;
  public img_new: any;
  constructor(
    public utility: UtilityService,
    private api: ApiService,
    private fb: FormBuilder,
    public zone: NgZone,
    private navCtrl: NavController,
  ) {
    this.createForm();
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
  }

  ionViewWillEnter() {
    this.getSocialPlateForm();
    this.getCategory()
    this.isSubmit = false;
  }

  ngOnInit() {}

  createForm() {
    this.countingArray = [];
    for (let i = 1; i <= 59; i++) {
      this.countingArray.push(i);
    }
    this.jobForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      platforms: ['', [Validators.required]],
      category: ['', [Validators.required]],
      influencers: ['', [Validators.required]],
      minutes: ['', [Validators.required]],
      seconds: ['', [Validators.required]],
      price: ['', [Validators.required]],
      promo_days: [''],
      location: [''],
      min_age: [''],
      max_age: [''],
      // minimum_followers: [''],
      image: [''],
    });
  }
  get f() {
    return this.jobForm.controls;
  }

  cancelForm() {
    this.utility.showLoader();
    setTimeout(() => {
      this.jobForm.reset();
      this.minimum_followers = [];
      this.img_new = '';
      this.file = undefined;
      this.utility.hideLoader();
    }, 200);
   
  }

  uploadPhoto(fileChangeEvent) {
    const photo = fileChangeEvent.target.files[0];
    console.log("==============",photo);
    // let formData = new FormData();
    // formData.append("photo", photo, photo.name);
  }
  submitForm() {
    this.isSubmit = true;
   if (this.jobForm.valid) {
      this.utility.showLoader();
      var form = new FormData();
      form.append("title", this.jobForm.value.title);
      form.append("description", this.jobForm.value.description);
      form.append("platforms", this.jobForm.value.platforms);
      form.append("category", this.jobForm.value.category);
      form.append("influencers", this.jobForm.value.influencers);
      form.append("minutes", this.jobForm.value.minutes);
      form.append("seconds", this.jobForm.value.seconds);
      form.append("price", this.jobForm.value.price);
      form.append("promo_days", this.jobForm.value.promo_days);
      form.append("location", this.jobForm.value.location);
      form.append("min_age", this.jobForm.value.min_age);
      form.append("max_age", this.jobForm.value.max_age);
      form.append("minimum_followers", this.minimum_followers);

      if(this.file && this.file.name && this.file.name != undefined) {
       form.append("image", this.file);
      }
  
      var settings = {
        url: this.api.baseUrl+'add-job',
        method: "POST",
        timeout: 0,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        data: form,
      };
  
      $.ajax(settings).done((response) => {
        this.utility.checkToken(JSON.parse(response));
        this.utility.hideLoader();
         if (JSON.parse(response).status == 'Success') {
          this.utility.showToast(JSON.parse(response).message);
        }
        if (JSON.parse(response).code === 404) {
          this.utility.showAlert('Error', JSON.parse(response).status);
        }
      });
    }
      


  }


  getCategory() {
    this.api.getCategories().subscribe((res: any) => {
      this.utility.checkToken(res);
      this.categoryList = res.categories;
    });
  }

  getSocialPlateForm() {
    this.api.getSocialPlateForm().subscribe((res: any) => {
      this.utility.checkToken(res);
      this.plateformList = res.socialPlatform;
    });
  }

  updateSearchResults() {
    if (this.jobForm.value.location == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions(
      { input: this.jobForm.value.location },
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
    this.jobForm.patchValue({
      location: item.description
    });
    this.autocompleteItems = [];
  }

  outsideInput(e) {
    setTimeout(() => {
      this.autocompleteItems = [];
    }, 500);
  }

  onFileChange(fileChangeEvent) {
    this.file = fileChangeEvent.target.files[0];
    console.log(this.file);
    let reader = new FileReader();
      reader.onload = ($event:any) => {
        this.img_new = $event.target.result;
      }
      reader.readAsDataURL(fileChangeEvent.target.files[0]);
  }

  goBack() {
    this.navCtrl.back();
  }

  

  
}
