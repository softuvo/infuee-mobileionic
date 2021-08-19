import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BecomeInfluencersPageRoutingModule } from './become-influencers-routing.module';

import { BecomeInfluencersPage } from './become-influencers.page';
import { ComponentsModule } from '../components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BecomeInfluencersPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  declarations: [BecomeInfluencersPage],
})
export class BecomeInfluencersPageModule {}
