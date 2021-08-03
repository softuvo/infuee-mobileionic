import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfluencersProfilePage } from './influencers-profile.page';

const routes: Routes = [
  {
    path: '',
    component: InfluencersProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfluencersProfilePageRoutingModule {}
