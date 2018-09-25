import { Component } from '@angular/core';
import { Config } from './models/config';
import { Trees } from './models/trees';
import { Media } from './models/media';
import { Folder } from './models/folder';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
 
  title = 'filemanager';
  folder : Folder;
  is_loading : boolean = true;
  file : Media;
  config: Config;
  interval : any;
  breadcrumbs : Trees[] = [];
  Trees: Trees[] = [];
  CurrentFolder : Trees;
  CurrentFiles : Media[] = [];
  MySeclect    : Media[] = [];
  ListChoose = [];
  actions = [
    { name: "back folder", "icon": "mdi-subdirectory-arrow-left",class : "on-allow back" },
    { name: "new folder", "icon": "mdi-folder-plus" ,class : "on-allow new-folder" },   
    { name: "new file", "icon": "mdi-file-plus" ,class : "on-allow new-file"},
    { name: "all folder", "icon": "mdi-clipboard-check-outline" ,class : "on-allow" },
    { name: "copy file", "icon": "mdi-content-copy", class : "off-allow" },
    { name: "cut file", "icon": "mdi-content-cut" ,class : "off-allow" },
    { name: "paste file", "icon": "mdi-content-paste" ,class : "onoff-allow" },
    { name: "delete file", "icon": "mdi-delete" ,class : "off-allow"},
  ];
  action = {};
  checkall = false;
  constructor(
    public Config: Config
  ) {
    this.interval = setInterval (() => {
      this.config = this.Config.getConfig();
      var string = '';
      string += `
      .folder > .a-node:before,.folder .icon-file:before{
        content: "\\f24b";
      }
      .a-node:before,.icon-file:before{
        content: "\\f214";
      }
      .li-node{
        list-style:none;
      }
      `; 
      this.config.EXT;
      for(var i in this.config.EXT){
        var stringClass = this.config.EXT[i].join(" > .a-node:before,.");
        var stringClassFile = this.config.EXT[i].join(" .icon-file:before,.");
        var breadcrumbClass = "li.breadcrumb-item > " + this.config.EXT[i].join(":before,.");
        
        stringClass = " ." +stringClass+ " > .a-node:before {";
        stringClassFile = " ." +stringClassFile+ " .icon-file:before {";
        breadcrumbClass = " ." +breadcrumbClass+ ":before {";
        if(i == "image"){
          stringClass+='content: "\\F24F";';
          stringClassFile+='content: "\\F24F";';
          breadcrumbClass +='content: "\\F24F";';
        }else if(i == "audio"){
          stringClass+='content: "\\f223";';
          stringClassFile+='content: "\\f223";';
          breadcrumbClass +='content: "\\f223";';
        }
        else if(i == "file"){
          stringClass+='content: "\\f214";';
          stringClassFile+='content: "\\f214";';
          breadcrumbClass +='content: "\\f214";';
        }else if(i == "video"){
          stringClass+='content: "\\f22b";';
          stringClassFile+='content: "\\f22b";';
          breadcrumbClass +='content: "\\f22b";';
        }
        else if(i == "text"){
          stringClass+='content: "\\f22e";';
          stringClassFile+='content: "\\f22e";';
          breadcrumbClass +='content: "\\f22e";';
        }
        else if(i == "doc"){
          stringClass+='content: "\\f22c";';
          stringClassFile+='content: "\\f22c";';
          breadcrumbClass +='content: "\\f22c";';
        }
        stringClass += "}";
        stringClassFile += "}";
        breadcrumbClass += "}";
        string +=stringClass;
        string +=stringClassFile;
        
      }
      var blob = new Blob([string], { type: 'text/css' });
      var gtm = document.createElement('link');
      gtm.href = window.URL.createObjectURL(blob);
      gtm.rel = "stylesheet";
      var s = document.getElementsByTagName('link')[0];
      s.parentNode.insertBefore(gtm, s);
      clearInterval(this.interval);
    },10);
    var root = new Trees();
    root.id = 0;
    root.name = "Root";
    root.pid = -1;
    root.extension="root";
    this.breadcrumbs.push(root);
    this.CurrentFolder = root;
    
  }
   
}
