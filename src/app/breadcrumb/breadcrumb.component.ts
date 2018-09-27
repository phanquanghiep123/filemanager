import { Component, OnInit, ElementRef, Renderer2 ,Input} from '@angular/core';

import { Media } from '../models/media';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  @Input () breadcrumbs: Media[];
  @Input () file: Media;
  constructor(
    private ElementRef: ElementRef,
    private Renderer: Renderer2
  ) {
  }
  ngOnInit() {
   
  }
  ClickItem($item: Media) {
    let a = <HTMLElement>document.querySelector(".a-node.a-node-"+$item.id);
    a.click();
    return false;
  }
}
