import { Component, OnInit, ElementRef, ViewChild, Renderer2, Output, EventEmitter } from '@angular/core';
import { TreesService } from '../services/trees.service';
import { Service } from '../models/service';
import { Trees } from '../models/trees';
import { AppComponent } from '../app.component';
import { MainComponent } from '../main/main.component';
import { Media } from '../models/media';
declare var $: any;
@Component({
  selector: 'app-sidaber',
  templateUrl: './sidaber.component.html',
  styleUrls: ['./sidaber.component.css']
})
export class SidaberComponent implements OnInit {
  jsTree: any;
  BindHtml: string;
  trees: [Trees];
  medias: [Media];
  config: any;
  Service: Service;
  interval: any;
  UL: string = "";
  TUL: any = this.Renderer.createElement("ul");
  @Output() onOpen: EventEmitter<any> = new EventEmitter();
  @ViewChild('viewTree') viewTree: ElementRef;

  constructor(
    private TreesService: TreesService,
    private app: AppComponent,
    private MainComponent: MainComponent,
    private Renderer: Renderer2,
    private ElementRef: ElementRef
  ) {
  }
  ngOnInit() {
    this.interval = setInterval(() => {
      if (this.app.config != undefined) {
        this.TreesService.gets(this.app.config.BASE['get_trees']).subscribe(data => {
          this.Service = data;
          if (this.Service.status) {
            this.trees = this.Service.response;
            this.medias = this.Service.response;
            this.MainComponent.Content.LisTFile = this.medias;
            this.TUL = this.Create_Tree2(this.trees, 0);
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
    $datas.forEach((element, key) => {
      if (element.pid == $pid) {
        $datas.slice(key, 1);
        var li = this.Renderer.createElement('li');
        var a = this.Renderer.createElement('a');
        this.Renderer.addClass(a, 'a-node');
        this.Renderer.setAttribute(a, 'href', 'javascript:;');
        var text = this.Renderer.createText(element.name);
        this.Renderer.appendChild(a, text);
        this.Renderer.listen(a, "click", $event => {
          this.NodeClick(element);
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

    return ul;
  }
  NodeClick(element) {
    // this.MainComponent.child.LisTFile = this.trees;
  }

}
