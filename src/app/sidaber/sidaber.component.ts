import { Component, OnInit, ElementRef, Renderer2, ViewChild ,Input,Output,EventEmitter} from '@angular/core';
import { TreesService } from '../services/trees.service';
import { Service } from '../models/service';
import { Trees } from '../models/trees';
import { AppComponent } from '../app.component';
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
  config: any;
  Service: Service;
  interval: any;
  @Output() onOpen: EventEmitter<any> = new EventEmitter();
  @ViewChild('viewTree') viewTree: ElementRef;
  
  constructor(
    private TreesService: TreesService,
    private app: AppComponent
  ) {
  }
  ngOnInit() {
    this.interval = setInterval(() => {
      if (this.app.config != undefined) {
        this.TreesService.gets(this.app.config.BASE['get_trees']).subscribe(data => {
          this.Service = data;
          if (this.Service.status) {
            this.trees = this.Service.response;
            this.Create_Tree(this.trees, 0);
            this.BindHtml = this.UL;
          }
        });
        clearInterval(this.interval);
      }
    }, 10);
    this.BindEvent();
  }
  private UL: string = "";
  private Create_Tree($datas: [Trees], $pid = 0) {
    var stringClass = $pid == 0 ? 'ul-root' : 'ul-node';
    this.UL += '<ul class="' + stringClass + '">';
    $datas.forEach((element, key) => {
      if (element.pid == $pid) {
        $datas.slice(key, 1);
        this.UL += `<li class="li-node ` + element.extension + `"><i class="icon-node"></i> <a class="a-node" data-id="` + element.id + `" href="javascript:;">` + element.name + `</a>`;
        this.Create_Tree($datas, element.id);
        this.UL += '</li>';
      }
    });
    this.UL += '</ul>';
  }

  BindEvent() {
    $(document).on("click",".li-node .a-node",$event =>{
      this.onOpen.emit(["dfgfdg","dfgfd","dfghdgf"]);
    });
  }
}
