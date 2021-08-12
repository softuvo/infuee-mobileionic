import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'forgotpassword',
    loadChildren: () =>
      import('./forgotpassword/forgotpassword.module').then(
        (m) => m.ForgotpasswordPageModule
      ),
  },
  {
    path: 'verification',
    loadChildren: () =>
      import('./verification/verification.module').then(
        (m) => m.VerificationPageModule
      ),
  },
  {
    path: 'create-new-password',
    loadChildren: () =>
      import('./create-new-password/create-new-password.module').then(
        (m) => m.CreateNewPasswordPageModule
      ),
  },
  {
    path: 'browse-influencers',
    loadChildren: () =>
      import('./browse-influencers/browse-influencers.module').then(
        (m) => m.BrowseInfluencersPageModule
      ),
  },
  {
    path: 'influencers-profile',
    loadChildren: () =>
      import('./influencers-profile/influencers-profile.module').then(
        (m) => m.InfluencersProfilePageModule
      ),
  },
  {
    path: 'campaign',
    loadChildren: () =>
      import('./campaign/campaign.module').then((m) => m.CampaignPageModule),
  },
  {
    path: 'campaign-discripation',
    loadChildren: () =>
      import('./campaign-discripation/campaign-discripation.module').then(
        (m) => m.CampaignDiscripationPageModule
      ),
  },
  {
    path: 'create-job',
    loadChildren: () =>
      import('./create-job/create-job.module').then(
        (m) => m.CreateJobPageModule
      ),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
