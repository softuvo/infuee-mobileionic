import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampaignJobDiscripationPageRoutingModule } from './campaign-job-discripation-routing.module';

import { CampaignJobDiscripationPage } from './campaign-job-discripation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampaignJobDiscripationPageRoutingModule
  ],
  declarations: [CampaignJobDiscripationPage]
})
export class CampaignJobDiscripationPageModule {}
