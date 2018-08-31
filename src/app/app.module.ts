import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Config } from './models/config';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { provideRoutes} from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './/app-routing.module';
import { MainComponent } from './main/main.component';
import { SidaberComponent } from './sidaber/sidaber.component';
import { ContentComponent } from './content/content.component';
import { UploadsComponent } from './uploads/uploads.component';
import { StructHTML } from './struct-html';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    SidaberComponent,
    ContentComponent,
    UploadsComponent,
    StructHTML
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
    
  ],
  providers: [Config,HttpClient,SidaberComponent ,ContentComponent,StructHTML],
  bootstrap: [AppComponent]
})
export class AppModule { }
