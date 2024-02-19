import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedgisterComponent } from './redgister.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [RedgisterComponent],
  imports: [CommonModule, HttpClientModule, BrowserModule],
  exports: [RedgisterComponent],
})
export class RedgisterModule {}
