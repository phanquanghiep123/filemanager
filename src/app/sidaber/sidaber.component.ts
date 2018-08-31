import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Config } from "../models/config";
import { TreesService } from '../services/trees.service';
import { Service } from '../models/service';
import { Trees } from '../models/trees';
@Component({
  selector: 'app-sidaber',
  templateUrl: './sidaber.component.html',
  styleUrls: ['./sidaber.component.css']
})

export class SidaberComponent implements OnInit {
  jsTree: any;
  BindHtml: SafeHtml;
  trees: Trees;
  config: any;
  Service: Service;
  @ViewChild('viewTree') viewTree: ElementRef;
  constructor(
    private Config: Config,
    private Rd: Renderer2,
    private TreesService: TreesService
  ) {

  }
  ngOnInit() {
    setTimeout(() => {
      this.config = this.Config.getConfig();
      this.TreesService.gets(this.config.BASE['get_trees']).subscribe(data => {
        this.Service = data;
        if (this.Service.status) {
          console.log(this.Service);
        }
      });
    })

  }
  private CreateItem() {
    var a = this.Rd.createElement('a');
    const text = this.Rd.createText('Click here to add li');
    var li = this.Rd.createElement('li');
    var ul = this.Rd.createElement('ul');
    var div = this.Rd.createElement('div');
    this.Rd.listen(a, "click", this.BindEvent);
    this.Rd.appendChild(a, text);
    this.Rd.appendChild(li, a);
    this.Rd.appendChild(ul, li);
    this.Rd.appendChild(div, ul);
    this.Rd.appendChild(this.viewTree.nativeElement, div);
    console.log(this.viewTree);
  }
  BindEvent() {
    alert("dfgdgdf");
  }
}
