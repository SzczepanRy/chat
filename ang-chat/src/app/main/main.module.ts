import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { AsideComponent } from './aside/aside.component';
import { BodyComponent } from './body/body.component';
import { MainComponent } from './main.component';
import { APP_CONFIG, APP_SERVICE_CONF } from '../appConfig/appconfig.serve';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    NavComponent,
    AsideComponent,
    BodyComponent,
    HttpClientModule,
    BrowserModule,
  ],
  providers: [
    {
      provide: APP_SERVICE_CONF,
      useValue: APP_CONFIG,
    },
  ],
  exports: [MainComponent],
})
export class MainModule {}
