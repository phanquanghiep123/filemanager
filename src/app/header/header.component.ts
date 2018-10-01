import { Component, OnInit, Input } from '@angular/core';
import { Media } from '../models/media';
import { MediaService } from '../services/media.service';
import { AppComponent } from '../app.component';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() breadcrumbs: Media[];
  @Input() file: Media;
  constructor(
    private app: AppComponent,
    private mediaService : MediaService
  ) {

  }
  ngOnInit() {

  }
  Actions_FNC($action) {
    if ($action.name == "back folder") {
      var $back = this.breadcrumbs.length;
      if ($back > 1) {
        let a = <HTMLElement>document.querySelector(".a-node.a-node-" + this.breadcrumbs[($back - 2)].id);
        a.click();
      }
      return false;
    }
    if ($action.class == "off-allow" && this.app.MySeclect.length <= 0) return false;
    if ($action.name == "new folder") {
      this.app.folder = new Media();
      $("#myModalAddFolder").modal();
    } else if ($action.name == 'new file') {
      $("#myModalUpload").modal();
    } else if ($action.name == "copy file") {
      this.app.CurrentFiles.forEach(element => {
        if (element.select == true) {
          element.is_cut = false;
        }
      });
    } else if ($action.name == "cut file") {
      this.app.CurrentFiles.forEach(element => {
        if (element.select == true) {
          element.is_cut = true;
        } else {
          element.is_cut = false;
        }
      });
    }
    else if ($action.name == "all folder") {
      this.app.checkall = !this.app.checkall;
      this.app.CurrentFiles.forEach(element => {
        if (this.app.checkall == true) {
          element.select = true;
          this.app.MySeclect.push(element);
        } else {
          element.select = false;
          this.app.MySeclect.forEach((value, key) => {
            if (value.id == element.id) {
              this.app.MySeclect.splice(key, 1);
            }
          });
        }
      });
    }
    else if ($action.name == "paste file") {
      var ids = [];
      this.app.MySeclect.forEach(value => {
        ids.push(value.id);
      });
      this.mediaService.copy(this.app.config.BASE["paste_file"],ids,this.app.CurrentFolder.id).subscribe(data => {
        this.app.CurrentFiles.push(data.response);
      });
      if (this.app.action['name'] == "cut file") {
        this.app.MySeclect = [];
      }
    }
    else if ($action.name == "delete file") {
        $("#myModalRemoveFiles").modal();
    }
    this.app.action = $action;
  }
}
