import { Component, OnInit, Input } from '@angular/core';
import { Media } from '../../models/media';
import { Trees } from '../../models/Trees';
import { AppComponent  } from '../../app.component';
declare var $: any;
@Component({
  selector: 'app-menu-right',
  templateUrl: './menu-right.component.html',
  styleUrls: ['./menu-right.component.css']
})
export class MenuRightComponent implements OnInit {
  @Input() file: any;
  constructor(
   private app : AppComponent
  ) { }

  ngOnInit() {

  }
  MenuView() {
    let a = <HTMLElement>document.querySelector("#main-items-container .detail-item #file-" + this.file.id + ".view-" + this.file.id);
    a.click();
    $(".fix-menu-right").removeClass("open");
    return false;
  }
  MenuEdit() {
    let a = <HTMLElement>document.querySelector("#main-items-container .detail-item #file-" + this.file.id + ".edit-" + this.file.id);
    a.click();
    $(".fix-menu-right").removeClass("open");
    return false;
  }
  MenuDelete() {
    let a = <HTMLElement>document.querySelector("#main-items-container .detail-item #file-" + this.file.id + ".delete-" + this.file.id);
    a.click();
    $(".fix-menu-right").removeClass("open");
    return false;
  }
  MenuAddFolder(){
    let a = <HTMLElement>document.querySelector("#header-page .navbar-default li a.new-folder");
    a.click();
    $(".fix-menu-right").removeClass("open");
    return false;
  }
  MenuUploadsFile(){
    let a = <HTMLElement>document.querySelector("#header-page .navbar-default li a.new-file");
    a.click();
    $(".fix-menu-right").removeClass("open");
    return false;
  }
}
