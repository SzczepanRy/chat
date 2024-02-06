import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './main/nav/nav.component';
import { AsideComponent } from './main/aside/aside.component';
import { BodyComponent } from './main/body/body.component';
import { APP_CONFIG, APP_SERVICE_CONF } from './appConfig/appconfig.serve';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { MainModule } from './main/main.module';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // HttpClientModule,
    // BrowserModule,
    AppRoutingModule,
    MainModule,
    LoginModule,
    // NavComponent,
    // AsideComponent,
    // BodyComponent,
    CommonModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
