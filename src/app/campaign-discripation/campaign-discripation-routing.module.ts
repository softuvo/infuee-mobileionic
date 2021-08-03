import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignDiscripationPage } from './campaign-discripation.page';

const routes: Routes = [
  {
    path: '',
    component: CampaignDiscripationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignDiscripationPageRoutingModule {}
