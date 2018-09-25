import { Component, OnInit, Input } from '@angular/core';
import { Media } from '../../models/media';
declare var $: any;
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @Input() file: any;
  is_loading: boolean = false;
  constructor() { }
  ngOnInit() {
    var $modal = $('#myModalViewFile');
    $modal.on('shown.bs.modal', () => {
      this.is_loading = true;
      var newImg = new Image;
      newImg.onload = ((img) => {
        this.is_loading = false;
      });
      newImg.src = this.file.public_path;
    })

  }

}
