import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonInfiniteScroll,
  MenuController,
  ModalController,
} from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { UtilityService } from '../services/utility.service';
import { FiltersPageComponent } from '../components/filters-page/filters-page.component';
@Component({
  selector: 'app-browse-influencers',
  templateUrl: './browse-influencers.page.html',
  styleUrls: ['./browse-influencers.page.scss'],
})
export class BrowseInfluencersPage implements OnInit {
  public temp: Array<object> = [];
  public pageNumber = 1;
  public influencersList: any[] = [];
  public category: any[] = [];
  public recordCount = 0;
  public perpage = 12;
  public loadStatus: boolean = false;
  public isOpenFilter: boolean = false;
  public isPreloader: boolean = true;
  public searchKeyword: any;
  public filter: any = {
    influencers: {
      instagram: false,
      facebook: false,
      youtube: false,
      tikTok: false,
      twitter: false,
    },
    order: '',
    category: [],
    priceRange: { lower: 0, upper: 0 },
    age: '',
  };
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(
    private menu: MenuController,
    private api: ApiService,
    public utility: UtilityService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.isPreloader = true;
    this.getCategories();
  }

  ionViewWillEnter() {}

  getCategories() {
    this.api.getCategories().subscribe((res: any) => {
      
      this.utility.checkToken(res);
      this.category = res.categories;
      if (res.status == 'Success') {
        this.getInfluencerData();
      } else {
        this.isPreloader = false;
      }
    });
  }

  getInfluencerData() {
    this.pageNumber = 1;
    this.loadStatus = false;
    let d: any = {
      page: this.pageNumber,
    };
    this.api.getInfluencers(d).subscribe((res: any) => {
      this.utility.checkToken(res);
      this.setData(res);
    });
  }

  setData(res) {
    let link = res.image_link;
    res.list.data.forEach((element) => {
      element['imageLink'] = link + '/' + element.image;
      element['category_type'] = this.category.find((item) => {
        return item.id == element.category;
      });
    });
    this.influencersList = [];
    this.recordCount = 0;
    if (res && res.list && res.list.data) {
      this.influencersList = res.list.data;
      this.recordCount = this.influencersList.length;
    }
    this.isPreloader = false;
  }

  loadMore(event) {
    setTimeout(() => {
      let d: any = {
        page: (this.pageNumber += 1),
      };
      if (this.utility.isValidString(this.searchKeyword)) {
        d.search = this.searchKeyword;
      }
      d.filter = this.filter;
      this.api.getInfluencers(d).subscribe((res: any) => {
        this.utility.checkToken(res);
        let link = res.image_link;
        res.list.data.forEach((element) => {
          element['imageLink'] = link + '/' + element.image;
          element['category_type'] = this.category.find((item) => {
            return item.id == element.category;
          });
        });
        this.influencersList = this.influencersList.concat(res.list.data);
        this.recordCount = 0;
        if(res && res.list && res.list.data) {
          this.recordCount = res.list.data.length;
        }
        
        event.target.complete();

        if (!res.list.data.length) {
          this.loadStatus = true;
          event.target.disabled = true;
          return;
        }
      });
    }, 500);
  }

  handleSearch(e) {
    this.getSearchData(e.target.value);
  }

  getSearchData(data?: any) {
    this.pageNumber = 1;
    this.loadStatus = false;
    let d: any = {
      page: this.pageNumber,
    };
    if (this.utility.isValidString(data)) {
      this.searchKeyword = data;
      d.search = data;
    }

    d.filter = this.filter;

    // this.utility.showLoader();
    this.isPreloader = true;
    this.api.getInfluencers(d).subscribe(
      (res: any) => {
        this.setData(res);
        // this.utility.hideLoader();
        this.isPreloader = false;
      },
      (err) => {
        // this.utility.hideLoader();
        this.isPreloader = false;
      }
    );
  }

  openProfilePgae(user) {
    this.utility.navigate(`influencers-profile?username=${user}`);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: FiltersPageComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        data: this.filter,
      },
    });
    modal.onDidDismiss().then((data) => {
      this.filter = data.data.data;
      this.getSearchData();
    });
    return await modal.present();
  }

  updateFilter(val: any) {
    const value = val.toString().toLowerCase().trim();
    const count = 5;
    // const keys = Object.keys(this.temp[0]);
    const keys = [
      'price',
      'username',
      'category_type.name',
      'lender_name',
      'followers',
    ];
    this.influencersList = this.temp.filter((item) => {
      for (let i = 0; i < count; i++) {
        if (
          (item[keys[i]] &&
            item[keys[i]].toString().toLowerCase().indexOf(value) !== -1) ||
          !value
        ) {
          return true;
        }
      }
    });
  }

  filterData(data) {
    console.log(data);
    let param = this.generateParam(data);
    this.api.getFilteredInfluencers(param).subscribe((res: any) => {
      console.log('getInfluencers ===>', res);
      this.utility.checkToken(res);
      //this.setData(res);
      if (!res.list.data.length) {
        this.loadStatus = true;
        return;
      }
    });
  }
  generateParam(data) {
    let param = '?page=' + 1;
    if (data.low_price != '') {
      param += '&low_price=' + data.low_price;
    }
    if (data.high_price != '') {
      param += '&high_price=' + data.high_price;
    }

    if (data.category != '') {
      param += '&category=' + data.category;
    }
    if (data.order != '') {
      param += '&order=' + data.order;
    }
    return param;
  }

  openMenu() {
    this.menu.toggle();
  }

  toggleFilter() {
    this.isOpenFilter = this.isOpenFilter == true ? false : true;
  }
}
