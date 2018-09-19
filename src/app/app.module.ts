import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { Config } from './models/config';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './/app-routing.module';
import { MainComponent } from './main/main.component';
import { SidaberComponent } from './sidaber/sidaber.component';
import { ContentComponent } from './content/content.component';
import { UploadsComponent } from './uploads/uploads.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ItemComponent } from './files/item/item.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import {Input } from '@angular/core';
import { CropperComponent } from './cropper/cropper.component';
import { LoadingComponent } from './loading/loading.component';
import { ViewComponent } from './files/view/view.component';
import { MenuRightComponent } from './files/menu-right/menu-right.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    SidaberComponent,
    ContentComponent,
    UploadsComponent,
    SafeHtmlPipe,
    ItemComponent,
    BreadcrumbComponent,
    CropperComponent,
    LoadingComponent,
    ViewComponent,
    MenuRightComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    
  ],
  providers: [
    Config,
    HttpClient,
    SidaberComponent ,
    MainComponent,
    UploadsComponent,
    HeaderComponent,
    ContentComponent,
    BreadcrumbComponent,
    Input
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
