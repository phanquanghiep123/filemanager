import { Component, OnInit, ElementRef, ViewChild, Renderer2, Input } from '@angular/core';
import { TreesService } from '../services/trees.service';
import { MediaService } from '../services/media.service';
import { Service } from '../models/service';
import { Trees } from '../models/trees';
import { AppComponent } from '../app.component';
import { MainComponent } from '../main/main.component';
import { Media } from '../models/media';
declare var $: any;
@Component({
  selector: 'app-sidaber',
  templateUrl: './sidaber.component.html'
})
export class SidaberComponent implements OnInit {
  jsTree: any;
  medias: [Media];
  config: any;
  Service: Service;
  interval: any;
  UL: string = "";
  trees : [Trees]
  TUL: any = this.Renderer.createElement("ul");
  @ViewChild('viewTree') viewTree: ElementRef;
  @Input() breadcrumbs : Trees[];
  constructor(
    private TreesService: TreesService,
    private app: AppComponent,
    private MainComponent: MainComponent,
    private Renderer: Renderer2,
    private MediaService: MediaService,
  ) {
  }
  ngOnInit() {
    var n = new Trees();
    n.id=6;
    n.name = "sadfassa";
    this.breadcrumbs.push(n);
    this.interval = setInterval(() => {
      if (this.app.config != undefined) {
        this.TreesService.gets(this.app.config.BASE['get_trees']).subscribe(data => {
          this.Service = data;
          if (this.Service.status) {
            this.app.Trees = this.Service.response;
            this.medias = this.Service.response;
            this.MainComponent.Content.LisTFile = this.medias;
            this.TUL = this.Create_Tree2(this.app.Trees, 0);
            this.Renderer.appendChild(this.viewTree.nativeElement, this.TUL);
          }
        });
        clearInterval(this.interval);
      }
      
    }, 10);
  }
  private Create_Tree2($datas: [Trees], $pid = 0) {
    var stringClass = $pid == 0 ? 'ul-root' : 'ul-node';
    var ul = this.Renderer.createElement("ul");
    this.Renderer.addClass(ul, stringClass);
    if ($datas != null && $datas.length > 0) {
      $datas.forEach((element, key) => {
        if (element.pid == $pid) {
          $datas.slice(key, 1);
          var li = this.Renderer.createElement('li');
          var a = this.Renderer.createElement('a');
          this.Renderer.addClass(a, 'a-node');
          this.Renderer.addClass(a, 'a-node-' + element.id);
          this.Renderer.setAttribute(a, 'href', 'javascript:;');
          this.Renderer.setAttribute(a, 'data-id', "" + element.id);
          var text = this.Renderer.createText(element.name);
          this.Renderer.appendChild(a, text);
          this.Renderer.listen(a, "click", $event => {
            this.NodeClick(element, $event);
          })
          this.Renderer.addClass(li, "li-node");
          this.Renderer.addClass(li, element.extension);
          var i = this.Renderer.createElement('i');
          this.Renderer.addClass(i, "icon-node");
          this.Renderer.appendChild(li, i);
          this.Renderer.appendChild(li, a);
          this.Renderer.appendChild(li, this.Create_Tree2($datas, element.id));
          this.Renderer.appendChild(ul, li);
        }
      });
    }
    return ul;
  }
  NodeClick($element: Trees, event) {
    if ($element.extension == "folder") {
      var url_get_folder = this.app.config.BASE['get_folder'];
      url_get_folder = url_get_folder.replace("{id}", $element.id);
      this.MediaService.getFolder(url_get_folder).subscribe(data => {
        var className = (event.target.parentElement.className);
        var indexOfClass = className.split(" ").indexOf('open');
        try {
          event.target.parentElement.querySelector("ul.ul-node").remove();
        } catch (e) {
        }
        if (indexOfClass == -1) {
          this.Service = data;
          this.medias = this.Service.response;
          this.MainComponent.Content.LisTFile = this.medias;
          this.trees = this.Service.response;
          this.TUL = this.Create_Tree2(this.trees, $element.id);
          this.Renderer.appendChild(event.target.parentElement, this.TUL);
          event.target.parentElement.classList.add("open");
        } else {
          event.target.parentElement.classList.remove("open");
        }
      });
    }
    return false;
  }

}
