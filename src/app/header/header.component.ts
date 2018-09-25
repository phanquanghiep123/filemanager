import { Component, OnInit, Input } from '@angular/core';
import { Trees } from '../models/trees';
import { AppComponent } from '../app.component';
import { Folder } from '../models/folder';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() breadcrumbs: Trees[];
  @Input() file: any;
  constructor(
    private app: AppComponent
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
      this.app.folder = new Folder();
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
      this.app.MySeclect.forEach(value => {
        this.app.CurrentFiles.push(value);
      });
      if (this.app.action['name'] == "cut file") {
        this.app.MySeclect = [];
      }
    }
    else if ($action.name == "delete file") {
      if ($action.name == this.app.action['name']) {
        this.app.MySeclect.forEach(value => {
          this.app.CurrentFiles.forEach((value1, key) => {
            if (value1.id == value.id) {
              this.app.CurrentFiles.splice(key, 1);
              return false;
            }
          });
        });
        this.app.MySeclect = [];
        $("#myModalRemoveFiles").modal("hide");
      }
      else {
        $("#myModalRemoveFiles").modal();
      }

    }
    this.app.action = $action;
  }
}
