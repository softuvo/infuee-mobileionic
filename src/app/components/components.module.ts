import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterNavComponent } from './footer-nav/footer-nav.component';
import { IonicModule } from '@ionic/angular';
import { NoDataComponent } from './no-data/no-data.component';
import { FiltersPageComponent } from './filters-page/filters-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreloaderComponent } from './preloader/preloader.component';

@NgModule({
  declarations: [FooterNavComponent, NoDataComponent, FiltersPageComponent,PreloaderComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [FooterNavComponent, NoDataComponent, FiltersPageComponent,PreloaderComponent],
  entryComponents: [FooterNavComponent, NoDataComponent, FiltersPageComponent,PreloaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ComponentsModule {}
