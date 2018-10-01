import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Media } from '../../models/media';
import { Service } from '../../models/service';
import { AppComponent } from '../../app.component';
declare var $: any;
@Component({
    selector: 'app-file',
    templateUrl: './item.component.html',
})
export class ItemComponent implements OnInit {
    @Input() file: Media;
    @Output() changFile: EventEmitter<any> = new EventEmitter();
    ImageExe: any = null;
    medias: Media[] = [];
    Service: Service;
    breadcrumbsNew = [];
    constructor(
        private app: AppComponent,
    ) {

    }
    ngOnInit() {
        this.file.select = false;
        this.file.is_cut = false;
        this.ImageExe = (this.app.config.EXT['image']);
        this.ImageExe.indexOf(this.file.extension) > -1 ? this.file.is_image = true : this.file.is_image = false;
        this.file.thumb = this.app.config.BASE['public_path'] + this.file.thumb;
        this.file.public_path = this.app.config.BASE['public_path'] + this.file.path;

    }
    ViewFile() {
        if (this.file.extension == "folder") {
            let a = <HTMLElement>document.querySelector(".a-node.a-node-" + this.file.id);
            a.click();
            return false;
        }
        return false;
    }
    ViewDetail() {
        this.changFile.emit(this.file);
        $("#myModalViewFile").modal();
    }
    GetPathURL(node) {
        try {
          var data = node.getAttribute('data-node');
          data = JSON.parse(data);
          this.breadcrumbsNew.push(data);
          if (data.pid != '-1') {
            var a = document.getElementsByClassName("a-node-" + data.pid)[0];
            this.GetPathURL(a);
          }
        } catch (e) {
          console.log(e);
        }
      }
    EditFile () {
        this.changFile.emit(this.file);
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
    OnChooseFile() {
        this.file.select = !this.file.select;
        if (this.file.select)
            this.app.MySeclect.push(this.file);
        else {
            this.app.MySeclect.forEach((value, key) => {
              if ( value.id == this.file.id){
                this.app.MySeclect.splice(key, 1);
                this.file.is_cut = false;
                this.file.select = false;
                value.is_cut = false;
                value.select = false;
                return false;
              }    
            });
        }
    }
    DeleteFile (){
        this.changFile.emit(this.file);
        $("#myModalRemoveFile").modal();
    }
}
