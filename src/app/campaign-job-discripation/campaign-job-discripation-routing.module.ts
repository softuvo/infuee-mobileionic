import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignJobDiscripationPage } from './campaign-job-discripation.page';

const routes: Routes = [
  {
    path: '',
    component: CampaignJobDiscripationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignJobDiscripationPageRoutingModule {}
