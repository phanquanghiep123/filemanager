import { Component } from '@angular/core';
import { Config } from './models/config';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'filemanager';
  config: Config;
  interval : any;
  constructor(public Config: Config) {
    this.interval = setInterval (() => {
      this.config = this.Config.getConfig();
      var string = '';
      string += `
      .folder > .icon-node:before{
        content: "\\f24b";
      }
      .icon-node:before{
        content: "\\f214";
      }
      .li-node{
        list-style:none;
      }
      `; 
      this.config.EXT;
      for(var i in this.config.EXT){
        var stringClass = this.config.EXT[i].join(" > .icon-node:before,.");
        stringClass = " ." +stringClass+ " > .icon-node:before {";
        if(i == "image"){
          stringClass+='content: "\\F24F";';
        }else if(i == "audio"){
          stringClass+='content: "\\f223";';
        }
        else if(i == "file"){
          stringClass+='content: "\\f214";';
        }else if(i == "video"){
          stringClass+='content: "\\f22b";';
        }
        stringClass += "}";
        string +=stringClass;
      }
      var blob = new Blob([string], { type: 'text/css' });
      var gtm = document.createElement('link');
      gtm.href = window.URL.createObjectURL(blob);
      gtm.rel = "stylesheet";
      var s = document.getElementsByTagName('link')[0];
      s.parentNode.insertBefore(gtm, s);
      clearInterval(this.interval);
    },10)
  }
}
