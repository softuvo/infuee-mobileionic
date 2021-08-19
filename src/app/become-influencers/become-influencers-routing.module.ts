import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BecomeInfluencersPage } from './become-influencers.page';

const routes: Routes = [
  {
    path: '',
    component: BecomeInfluencersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BecomeInfluencersPageRoutingModule {}
