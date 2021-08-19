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
  {
    path: 'campaign-job-discripation',
    loadChildren: () =>
      import(
        './campaign-job-discripation/campaign-job-discripation.module'
      ).then((m) => m.CampaignJobDiscripationPageModule),
  },
  {
    path: 'create-campaign',
    loadChildren: () =>
      import('./create-campaign/create-campaign.module').then(
        (m) => m.CreateCampaignPageModule
      ),
  },
  {
    path: 'chat',
    loadChildren: () =>
      import('./chat/chat.module').then((m) => m.ChatPageModule),
  },
  {
    path: 'chat-message',
    loadChildren: () =>
      import('./chat-message/chat-message.module').then(
        (m) => m.ChatMessagePageModule
      ),
  },
  {
    path: 'notification',
    loadChildren: () =>
      import('./notification/notification.module').then(
        (m) => m.NotificationPageModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
  }, 
  {
    path: 'edit-profile',
    loadChildren: () =>
      import('./edit-profile/edit-profile.module').then((m) => m.EditProfilePageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
