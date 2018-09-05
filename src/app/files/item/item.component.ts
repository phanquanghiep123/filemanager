import { Component, OnInit, Input } from '@angular/core';
import { Media } from '../../models/media';
import { Service } from '../../models/service';
import { AppComponent } from '../../app.component';
import { MediaService } from '../../services/media.service';
import { MainComponent } from '../../main/main.component';
@Component({
  selector: 'app-file',
  templateUrl: './item.component.html',
})
export class ItemComponent implements OnInit {
  @Input() file: Media;
  Config: any;
  ImageExe: any = null;
  medias: [Media];
  Service: Service;
  constructor(
    private app: AppComponent,
    private MediaService: MediaService,
    private MainComponent: MainComponent
  ) {

  }
  ngOnInit() {
    this.Config = this.app.config;
    this.ImageExe = (this.Config.EXT['image']);
  }
  ViewFile() {
    if (this.file.extension == "folder") {
      var url_get_folder = this.app.config.BASE['get_folder'];
      url_get_folder = url_get_folder.replace("{id}", this.file.id);
      this.MediaService.getFolder(url_get_folder).subscribe(data => {
        this.Service = data;
        this.medias = this.Service.response;
        this.MainComponent.Content.LisTFile = this.medias;
      });
    }
    return false;
  }
}
