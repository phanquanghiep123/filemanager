import { Component, OnInit, Input } from '@angular/core';
import { Media } from '../../models/media';
import { AppComponent  } from '../../app.component';
declare var $: any;
@Component({
  selector: 'app-menu-right',
  templateUrl: './menu-right.component.html',
  styleUrls: ['./menu-right.component.css']
})
export class MenuRightComponent implements OnInit {
  @Input() file: Media;
  constructor(
   private app : AppComponent
  ) { }

  ngOnInit() {
    $("body").click(()=>{
      $(".fix-menu-right").removeClass("open");
    });
  }
  MenuView() {
    $("#myModalViewFile").modal();
    $(".fix-menu-right").removeClass("open");
    return false;
  }
  MenuEdit() {
    if(this.file.is_image)
        $("#myModalEditImage").modal();
    else if(this.app.config.EXT['text'].indexOf(this.app.file.extension) !== -1){
        $.ajax(
            {
                url : this.app.file.public_path,
                success : function(data){
                    $("#myModalEditFileText").find("#content").val(data);
                    $("#myModalEditFileText").modal(); 
                }
            }
        )
    }
    else
        $("#myModalEditFile").modal();
  }
  MenuDelete() {
    $("#myModalRemoveFile").modal();
    $(".fix-menu-right").removeClass("open");
    return false;
  }
  MenuAddFolder(){
    this.app.folder = new Media();
    $("#myModalAddFolder").modal();
    $(".fix-menu-right").removeClass("open");
    return false;
  }
  MenuUploadsFile(){
    $("#myModalUpload").modal();
    $(".fix-menu-right").removeClass("open");
    return false;
  }
}
