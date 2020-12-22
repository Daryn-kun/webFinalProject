import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SliderComponent} from './slider/slider.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from './navbar/navbar.component';
import {BannerComponent} from './banner/banner.component';
import {HomeComponent} from './home/home.component';
import {MylistComponent} from './mylist/mylist.component';
import {RestapiService} from './service/restapi.service';
import {AuthModule} from './auth/auth.module';
import {RouterModule} from '@angular/router';
import {NaturalPipe} from './custompipe/natural.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    NavbarComponent,
    BannerComponent,
    HomeComponent,
    MylistComponent,
    NaturalPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    SlickCarouselModule,
    HttpClientModule,
    AuthModule,
    RouterModule
  ],
  providers: [RestapiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
