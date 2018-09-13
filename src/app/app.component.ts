import { Component } from '@angular/core';
import { Config } from './models/config';
import { Trees } from './models/trees';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'filemanager';
  config: Config;
  interval : any;
  breadcrumbs : Trees[] = [];
  Trees: Trees[] = [];
  CurrentFolder : Trees;
  constructor(public Config: Config) {
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
        stringClass = " ." +stringClass+ " > .a-node:before {";
        stringClassFile = " ." +stringClassFile+ " .icon-file:before {";
        if(i == "image"){
          stringClass+='content: "\\F24F";';
          stringClassFile+='content: "\\F24F";';
          
        }else if(i == "audio"){
          stringClass+='content: "\\f223";';
          stringClassFile+='content: "\\f223";';
        }
        else if(i == "file"){
          stringClass+='content: "\\f214";';
          stringClassFile+='content: "\\f214";';
        }else if(i == "video"){
          stringClass+='content: "\\f22b";';
          stringClassFile+='content: "\\f22b";';
        }
        stringClass += "}";
        stringClassFile += "}";
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
