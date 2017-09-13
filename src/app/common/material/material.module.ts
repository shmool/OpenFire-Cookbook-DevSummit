import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdCardModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdProgressSpinnerModule,
  MdSidenavModule,
  MdSlideToggleModule,
  MdToolbarModule
} from '@angular/material';

const mdModules = [
  MdButtonModule,
  MdIconModule,
  MdToolbarModule,
  MdCardModule,
  MdInputModule,
  MdSlideToggleModule,
  MdMenuModule,
  MdProgressSpinnerModule,
  MdListModule,
  MdSidenavModule
];

@NgModule({
  imports: [
    ...mdModules
  ],
  exports: [
    ...mdModules
  ],
  declarations: []
})
export class MaterialModule {
}
