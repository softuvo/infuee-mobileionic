import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrowseInfluencersPage } from './browse-influencers.page';

const routes: Routes = [
  {
    path: '',
    component: BrowseInfluencersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrowseInfluencersPageRoutingModule {}
