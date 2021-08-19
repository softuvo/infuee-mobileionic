import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, MenuController } from '@ionic/angular';

import { BrowseInfluencersPageRoutingModule } from './browse-influencers-routing.module';

import { BrowseInfluencersPage } from './browse-influencers.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrowseInfluencersPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [BrowseInfluencersPage],
})
export class BrowseInfluencersPageModule {}
