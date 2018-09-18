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
  medias: Media[];
  config: any;
  Service: Service;
  interval: any;
  UL: string = "";
  trees: Trees[];
  breadcrumbsNew : Trees[] = [];
  TUL: any = this.Renderer.createElement("ul");
  @ViewChild('viewTree') viewTree: ElementRef;
  @Input() breadcrumbs: Trees[];
  constructor(
    private TreesService: TreesService,
    private app: AppComponent,
    private MainComponent: MainComponent,
    private Renderer: Renderer2,
    private MediaService: MediaService,
  ) {
  }
  ngOnInit() {
    this.interval = setInterval(() => {
      if (this.app.config != undefined) {
        this.TreesService.gets(this.app.config.BASE['get_trees']).subscribe(data => {
          this.Service = data;
          if (this.Service.status) {
            this.app.Trees = this.Service.response;
            this.medias = this.Service.response;
            this.app.CurrentFiles = this.medias;
            this.TUL = this.Create_Tree2(this.app.Trees, 0);
            var root = new Trees();
            root.id = 0;
            root.name = "Root";
            root.pid = -1;
            root.extension="root";
            var li = this.Renderer.createElement('li');
            this.Renderer.addClass(li, "li-node");
            this.Renderer.addClass(li, "none");
            var a = this.Renderer.createElement('a');
            this.Renderer.addClass(a, 'a-node');
            this.Renderer.addClass(a, 'a-node-0');
            this.Renderer.setAttribute(a, 'href', 'javascript:;');
            this.Renderer.setAttribute(a, 'data-node', JSON.stringify(root));
            this.Renderer.setAttribute(a, 'data-id', "0");
            var text = this.Renderer.createText("Root");
            this.Renderer.appendChild(a, text);
            this.Renderer.listen(a, "click", $event => {
              this.NodeClick(root, $event);
            });
            this.Renderer.addClass(li, "li-node");
            this.Renderer.addClass(li, 'root');
            this.Renderer.addClass(li, 'hidden');
            this.Renderer.addClass(li, root.extension); 
            this.Renderer.appendChild(li, a);
            this.Renderer.appendChild(this.TUL,li);
            this.Renderer.appendChild(this.viewTree.nativeElement, this.TUL);
          }
        });
        clearInterval(this.interval);
      }

    }, 10);
  }
  private Create_Tree2($datas: Trees[], $pid = 0) {
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
          this.Renderer.addClass(a, 'a-node-' + element.id);
          this.Renderer.setAttribute(a, 'href', 'javascript:;');
          this.Renderer.setAttribute(a, 'data-node', JSON.stringify(element));
          this.Renderer.setAttribute(a, 'data-id', "" + element.id);
          this.Renderer.setAttribute(a, 'title', element.name);
          var text = this.Renderer.createText(element.name);
          this.Renderer.appendChild(a, text);
          this.Renderer.listen(a, "click", $event => {
            this.NodeClick(element, $event);
          })
          this.Renderer.addClass(li, "li-node");
          this.Renderer.addClass(li, element.extension);
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
      this.app.checkall = false;
      var url_get_folder = this.app.config.BASE['get_folder'];
      url_get_folder = url_get_folder.replace("{id}", $element.id);
      var className = (event.target.parentElement.className);
      var indexOfClass1 = className.split(" ").indexOf('on-loading');
      var indexOfClass2 = className.split(" ").indexOf('open');
      this.MediaService.getFolder(url_get_folder).subscribe(data => {
        this.Service = data;
        this.medias = this.Service.response;
        this.app.CurrentFiles = this.medias; 
        if (indexOfClass1 == -1) {
          try {
            event.target.parentElement.querySelector("ul.ul-node").remove();
          } catch (e) {

          }
          var newTrees: Trees[] = this.Service.response;
          this.app.Trees = this.app.Trees.concat(newTrees);
          this.TUL = this.Create_Tree2(newTrees, $element.id);
          this.Renderer.appendChild(event.target.parentElement, this.TUL);
          event.target.parentElement.classList.add("on-loading");
          event.target.parentElement.classList.add("open");
        } else {
          if (indexOfClass2 == -1) {
            event.target.parentElement.classList.add("open");
          } else {
            event.target.parentElement.classList.remove("open");
          }
        }
      });
      this.GetPathURL(event.target);
      var count = this.breadcrumbsNew.length - 1;
      this.app.breadcrumbs = [];
      for(var i = count ; i >= 0 ; i--){
        this.app.breadcrumbs.push(this.breadcrumbsNew[i]);
      }
      this.breadcrumbsNew = [];
      this.app.CurrentFolder = $element;

    }
    return false;
  }
  
  GetPathURL(node) {
    try {
      var data = node.getAttribute('data-node');
      data = JSON.parse(data);
      this.breadcrumbsNew.push(data);
      if(data.pid != '-1'){
        var a = document.getElementsByClassName("a-node-" + data.pid)[0];
        this.GetPathURL(a);
      }
      
    } catch (e) {
      console.log(e);
    }
    
  }
}
