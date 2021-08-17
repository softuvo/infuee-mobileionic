import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-filters-page',
  templateUrl: './filters-page.component.html',
  styleUrls: ['./filters-page.component.scss'],
})
export class FiltersPageComponent implements OnInit {
  @Input() data: any;

  public range: any = {
    upper: 5000,
    lower: 0,
  };
  public val = true;
  public dualRange: any;
  public categoryList: any[] = [];
  public category: any;
  public high_range: any = 5000;
  public low_range: any = 0;
  public whenToUpdate = true;
  public updateRang = true;

  public filter: any = {
    influencers: {
      instagram: false,
      facebook: false,
      youtube: false,
      tikTok: false,
      twitter: false,
    },
    order: 1,
    category: [],
    priceRange: { lower: 0, upper: 0 },
    age: '',
  };

  constructor(
    private modalCtrl: ModalController,
    private api: ApiService,
    public utility: UtilityService
  ) {}

  ngOnInit() {
    this.getCategory();
    this.filter = this.data;
  }

  getCategory() {
    this.api.getCategories().subscribe((res: any) => {
      this.utility.checkToken(res);
      this.categoryList = res.categories;
    });
  }

  // filterList() {
  //   let obj = {
  //     order: this.filter,
  //     category: this.category,
  //     high_price: this.high_range,
  //     low_price: this.low_range,
  //   };
  //   data: this.filter,
  // }

  updateRange(value, type) {
    console.log('updateRange', value, type, this.whenToUpdate);
    if (value == null) return;
    if (this.whenToUpdate) {
      console.log('working');
      this.val = false;
      if (type == 'low') {
        this.range.lower = value;
      } else {
        this.range.upper = value;
      }
      setTimeout(() => {
        this.val = true;
      }, 1000);
    }
  }
  updateRange1(value, type) {
    console.log('updateRange', value, type, this.whenToUpdate);
    if (value == null) return;

    if (this.whenToUpdate) {
      console.log('working');
      this.val = false;
      if (type == 'low') {
        this.range.lower = value;
      } else {
        this.range.upper = value;
      }
      setTimeout(() => {
        this.val = true;
      }, 1000);
    }
  }
  slider(value) {
    let el = value.el;
    this.filter.priceRange = el.value;
    // this.low_range = el.value.lower;
    // this.high_range = el.value.upper;
  }

  dismiss() {
    console.log(this.filter);
    this.modalCtrl.dismiss({
      dismissed: true,
      data: this.filter,
    });
  }

  radioGroupChange(event) {
    this.filter.order = event.detail.value;
  }

  ngAfterViewInit() {
    
  }
}
