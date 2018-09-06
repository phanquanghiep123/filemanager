import { Component, OnInit, ElementRef, Renderer2 ,Input} from '@angular/core';

import { Trees } from '../models/trees';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  @Input () breadcrumbs: Trees[];
  constructor(
    private ElementRef: ElementRef,
    private Renderer: Renderer2
  ) {
  }
  ngOnInit() {
    var img = new Trees();
    img.id = 4;
    img.name ="Images";
    this.breadcrumbs.push(img);
  }
  ClickItem($item: Trees) {
    let a = <HTMLElement>document.querySelector(".a-node.a-node-"+$item.id);
    a.click();
    return false;
  }
}
