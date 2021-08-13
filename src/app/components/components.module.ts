import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterNavComponent } from './footer-nav/footer-nav.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [FooterNavComponent],
  imports: [CommonModule, IonicModule.forRoot()],
  exports: [FooterNavComponent],
  entryComponents: [FooterNavComponent],
})
export class ComponentsModule {}
