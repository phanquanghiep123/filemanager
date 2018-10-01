import { Component, OnInit, ElementRef, ViewChild, Renderer2, Input, Output, EventEmitter } from '@angular/core';
import { TreesService } from '../services/trees.service';
import { MediaService } from '../services/media.service';
import { Service } from '../models/service';
import { AppComponent } from '../app.component';
import { Media } from '../models/media';
declare var $: any;
@Component({
  selector: 'app-sidaber',
  templateUrl: './sidaber.component.html'
})
export class SidaberComponent implements OnInit {
  @Input() file: any;
  @Output() loadingContent = new EventEmitter();
  @ViewChild('viewTree') viewTree: ElementRef;
  @Input() breadcrumbs: Media[];
  jsTree: any;
  medias: Media[];
  config: any;
  Service: Service;
  interval: any;
  UL: string = "";
  trees: Media[];
  breadcrumbsNew: Media[] = [];
  TUL: any = this.Renderer.createElement("ul");
  constructor(
    private TreesService: TreesService,
    private app: AppComponent,
    private Renderer: Renderer2,
    private MediaService: MediaService,
    private ElementRef: ElementRef
  ) {
  }
  ngOnInit() {
    this.interval = setInterval(() => {
      if (this.app.config != undefined) {
        this.TreesService.gets(this.app.config.BASE['get_trees'], 0).subscribe(data => {
          this.Service = data;
          if (this.Service.status) {
            this.app.Trees = this.Service.response;
            this.medias = this.Service.response;
            if (this.medias != null) {
              this.app.CurrentFiles = this.medias;
            }
            this.TUL = this.Create_Tree2(this.app.Trees, 0);
            var root = new Media();
            root.id = 0;
            root.name = "Root";
            root.pid = -1;
            root.extension = "root";
            var li = this.Renderer.createElement('li');
            this.Renderer.addClass(li, "li-node");
            this.Renderer.addClass(li, 'li-node-0');
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
              $event.stopPropagation();
              $event.preventDefault();
              this.NodeClick(root, $event);
              return false
            });
            this.Renderer.listen(a, "contextmenu", $event => {
              $event.stopPropagation();
              $event.preventDefault();
              this.MenuContext(root, $event);
              return false;
            })
            this.Renderer.addClass(li, "li-node");
            this.Renderer.addClass(li, 'root');
            this.Renderer.addClass(li, 'hidden');
            this.Renderer.addClass(li, root.extension);
            this.Renderer.appendChild(li, a);
            this.Renderer.appendChild(this.TUL, li);
            this.Renderer.appendChild(this.viewTree.nativeElement, this.TUL);
            this.app.is_loading = false;
          }
        });
        clearInterval(this.interval);
      }
    }, 10);
  }
  public Create_Tree2($datas: Media[], $pid = 0) {
    var stringClass = $pid == 0 ? 'ul-root' : 'ul-node';
    var ul = this.Renderer.createElement("ul");
    this.Renderer.addClass(ul, stringClass);
    this.Renderer.addClass(ul, "ul-node-" + $pid);
    if ($datas != null && $datas.length > 0) {
      $datas.forEach((element, key) => {
        if (element.pid == $pid) {
          $datas.slice(key, 1);
          var li = this.Renderer.createElement('li');
          this.Renderer.addClass(li, 'li-node');
          this.Renderer.addClass(li, 'li-node-' + element.id);
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
            $event.stopPropagation();
            $event.preventDefault();
            return false;
          });
          this.Renderer.listen(a, "contextmenu", $event => {
            $event.stopPropagation();
            $event.preventDefault();
            this.MenuContext(element, $event);
            return false;
          })
          this.Renderer.addClass(li, "li-node");
          this.Renderer.addClass(li, element.extension);
          this.Renderer.appendChild(li, a);
          this.Renderer.appendChild(li, this.Create_Tree2($datas, element.id));
          if ($(li).find("ul").length == 0) {
            var ul2 = this.Renderer.createElement("ul");
            this.Renderer.addClass(ul2, "ul-node");
            this.Renderer.addClass(ul2, "ul-node-" + element.id);
            this.Renderer.appendChild(li, ul2);
          }
          this.Renderer.appendChild(ul, li);
        }
      });
    }
    return ul;
  }
  public createNode($nodeP: Media, $nodeC: Media) {
    var li = this.Renderer.createElement('li');
    this.Renderer.addClass(li, "li-node");
    this.Renderer.addClass(li, "li-node-" + $nodeC.id);
    var a = this.Renderer.createElement('a');
    this.Renderer.addClass(a, 'a-node');
    this.Renderer.addClass(a, 'a-node-' + $nodeC.id);
    this.Renderer.setAttribute(a, 'href', 'javascript:;');
    this.Renderer.setAttribute(a, 'data-node', JSON.stringify($nodeC));
    this.Renderer.setAttribute(a, 'data-id', $nodeC.id.toString());
    var text = this.Renderer.createText($nodeC.name);
    this.Renderer.appendChild(a, text);
    this.Renderer.listen(a, "click", $event => {
      $event.stopPropagation();
      $event.preventDefault();
      this.NodeClick($nodeC, $event);
      return false;
    });
    this.Renderer.listen(a, "contextmenu", $event => {
      $event.stopPropagation();
      $event.preventDefault();
      this.MenuContext($nodeC, $event);
      return false;
    })
    this.Renderer.addClass(li, "li-node");
    this.Renderer.addClass(li, $nodeC.extension);
    this.Renderer.appendChild(li, a);
    var ul = this.Renderer.createElement("ul");
    this.Renderer.addClass(ul, "ul-node");
    this.Renderer.addClass(ul, "ul-node-" + $nodeC.id);
    this.Renderer.appendChild(li, ul);
    var RootP = document.getElementsByClassName("ul-node-" + $nodeP.id);
    this.Renderer.appendChild(RootP[0], li);
    this.OpenNode($nodeP);
  }
  NodeClick($element: any, event) {
    if ($element.extension == "folder" || $element.extension == "root") {
      this.app.CurrentFiles = [];
      this.loadingContent.emit(true);
      this.app.checkall = false;
      var url_get_folder = this.app.config.BASE['get_folder'];
      var className = (event.target.parentElement.className);
      var indexOfClass1 = className.split(" ").indexOf('on-loading');
      var indexOfClass2 = className.split(" ").indexOf('open');
      this.MediaService.getFolder(url_get_folder, $element.id).subscribe(data => {
        this.Service = data;
        this.medias = this.Service.response;
        this.app.CurrentFiles = [];
        if (this.medias != null) {
          this.app.CurrentFiles = this.medias;
        }
        if (indexOfClass1 == -1) {
          try {
            event.target.parentElement.querySelector("ul.ul-node").remove();
          } catch (e) {

          }
          var newTrees: Media[] = this.Service.response;
          this.TUL = this.Create_Tree2(newTrees, $element.id);
          this.Renderer.appendChild(event.target.parentElement, this.TUL);
          if (this.Service.response != null) {
            newTrees.forEach((element) => {
              this.app.Trees.push(element);
            })  
          }
          event.target.parentElement.classList.add("on-loading");
          event.target.parentElement.classList.add("open");
        } else {
          if (indexOfClass2 == -1) {
            event.target.parentElement.classList.add("open");
          } else {
            event.target.parentElement.classList.remove("open");
          }
        }
        this.loadingContent.emit(false);
      });
      this.GetPathURL(event.target);
      var count = this.breadcrumbsNew.length - 1;
      this.app.breadcrumbs = [];
      for (var i = count; i >= 0; i--) {
        this.app.breadcrumbs.push(this.breadcrumbsNew[i]);
      }
      this.breadcrumbsNew = [];
      this.app.CurrentFolder = $element;

    } else {
      this.app.file = $element;
      if (this.app.config.EXT['image'].indexOf(this.app.file.extension) !== -1)
        $("#myModalEditImage").modal();
      else if (this.app.config.EXT['text'].indexOf(this.app.file.extension) !== -1) {
        $.ajax(
          {
            url: this.app.file.public_path,
            success: function (data) {
              $("#myModalEditFileText").find("#content").val(data);
              $("#myModalEditFileText").modal();
            }
          }
        )
      }
      else
        $("#myModalEditFile").modal();
    }

  }
  GetPathURL(node) {
    try {
      var data = node.getAttribute('data-node');
      data = JSON.parse(data);
      if (data.extension == "folder" || data.extension == "root") {
        this.breadcrumbsNew.push(data);
      }
      if (data.pid != '-1') {
        var a = document.getElementsByClassName("a-node-" + data.pid)[0];
        this.GetPathURL(a);
      }
    } catch (e) {
      console.log(e);
    }
  }
  MenuContext($element: any, $event) {
    this.app.CurrentFolder = $element;
    this.app.file = $element;
    var left = ($event.x);
    var top = ($event.y);
    this.app.file = $element;
    $(".fix-menu-right").css({
      left: left + "px",
      top: top + "px"
    }).addClass("open");
    this.GetPathURL($event.target);
    var count = this.breadcrumbsNew.length - 1;
    this.app.breadcrumbs = [];
    for (var i = count; i >= 0; i--) {
      this.app.breadcrumbs.push(this.breadcrumbsNew[i]);
    }
    this.breadcrumbsNew = [];
  }
  removeFile($file: any) {
    $(".li-node.li-node-" + $file.id).remove();
  }
  OpenNode ($node : Media){
    if($(".li-node.li-node-" + $node.id).hasClass("on-loading")){
      $(".li-node.li-node-" + $node.id).addClass("open");
    }else{
      let a = <HTMLElement>document.querySelector(".a-node.a-node-"+$node.id);
      a.click();
    }
  }
}
