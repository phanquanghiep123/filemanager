import { Component, OnInit, Input } from '@angular/core';
import { Trees } from '../models/trees';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  actions = [];
  @Input() breadcrumbs: Trees[];
  constructor() {
    this.actions = [
      { name: "back folder", "icon": "mdi-subdirectory-arrow-left" },
      { name: "next folder", "icon": "mdi-subdirectory-arrow-right" },
      { name: "new folder", "icon": "mdi-folder-plus" },
      { name: "new file", "icon": "mdi-file-plus" },
      { name: "copy file", "icon": "mdi-content-copy" },
      { name: "cut file", "icon": "mdi-content-cut" },
      { name: "delete file", "icon": "mdi-delete" },
    ]
  }
  ngOnInit() {
  }

  Actions_FNC($action) {
    if ($action.name == "new folder") {
      $("#myModalAddFolder").modal();
    }else if($action.name == 'new file'){
      $("#myModalUpload").modal();
    }
  }
}
