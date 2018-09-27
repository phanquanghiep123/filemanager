import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ContentComponent } from '../content/content.component';
import { SidaberComponent } from '../sidaber/sidaber.component';
import { Trees } from '../models/trees';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild (ContentComponent) Content: ContentComponent;
  @ViewChild (SidaberComponent) Sidaber: SidaberComponent;
  file : any;
  breadcrumbs : Trees[];
  constructor(
    private app : AppComponent
  ) {
  }
  ngOnInit() {
    this.file = this.app.file;
    this.breadcrumbs = this.app.breadcrumbs;
  }
  loadingContent ($on = true){
    this.Content.is_loading = $on;
  }
  addFolder ($folder : any) {
    this.Sidaber.createNode(this.app.CurrentFolder,$folder);
  }
  removeNode($file){
    this.Sidaber.removeFile($file);
    this.Content.removeFile($file);
  }
}
