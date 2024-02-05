import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AsideComponent } from './aside/aside.component';
import { BodyComponent } from './body/body.component';
import { APP_CONFIG, APP_SERVICE_CONF } from './appConfig/appconfig.serve';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NavComponent,
    AsideComponent,
    BodyComponent,
    CommonModule,
  ],
  providers: [
    {
      provide: APP_SERVICE_CONF,
      useValue: APP_CONFIG,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
