import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfluencersProfilePageRoutingModule } from './influencers-profile-routing.module';

import { InfluencersProfilePage } from './influencers-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfluencersProfilePageRoutingModule
  ],
  declarations: [InfluencersProfilePage]
})
export class InfluencersProfilePageModule {}
