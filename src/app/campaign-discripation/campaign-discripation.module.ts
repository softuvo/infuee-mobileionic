import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampaignDiscripationPageRoutingModule } from './campaign-discripation-routing.module';

import { CampaignDiscripationPage } from './campaign-discripation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampaignDiscripationPageRoutingModule
  ],
  declarations: [CampaignDiscripationPage]
})
export class CampaignDiscripationPageModule {}
