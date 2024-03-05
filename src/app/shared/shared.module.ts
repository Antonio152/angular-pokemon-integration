import { CommonModule, NgStyle } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchBoxComponent } from './searchBox/searchBox.component';
import { SliderComponent } from './slider/slider.component';


@NgModule({
  declarations: [
    SearchBoxComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    NgStyle
  ],
  exports: [
    SearchBoxComponent,
    SliderComponent
  ],
})
export class SharedModule { }
