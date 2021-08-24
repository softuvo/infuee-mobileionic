import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TwoFactorAuthenticationPageRoutingModule } from './two-factor-authentication-routing.module';

import { TwoFactorAuthenticationPage } from './two-factor-authentication.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TwoFactorAuthenticationPageRoutingModule
  ],
  declarations: [TwoFactorAuthenticationPage]
})
export class TwoFactorAuthenticationPageModule {}
