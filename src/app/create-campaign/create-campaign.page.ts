import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.page.html',
  styleUrls: ['./create-campaign.page.scss'],
})
export class CreateCampaignPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  goBack() {
    this.navCtrl.back();
  }
}
