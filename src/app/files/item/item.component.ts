import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Media } from '../../models/media';
import { Service } from '../../models/service';
import { AppComponent } from '../../app.component';
import { MediaService } from '../../services/media.service';
import { MainComponent } from '../../main/main.component';
declare var $: any;
@Component({
    selector: 'app-file',
    templateUrl: './item.component.html',
})
export class ItemComponent implements OnInit {
    @Input() file: Media;
    @Output() changFile: EventEmitter<any> = new EventEmitter();
    ImageExe: any = null;
    medias: [Media];
    Service: Service;
    constructor(
        private app: AppComponent,
        private MediaService: MediaService,
        private MainComponent: MainComponent
    ) {

    }
    ngOnInit() {
        this.file.select = false;
        this.file.is_cut = false;
        this.ImageExe = (this.app.config.EXT['image']);
        this.file.public_path = this.app.config.BASE['public_path'] + this.file.thumb;
    }
    ViewFile() {
        if (this.file.extension == "folder") {
            let a = <HTMLElement>document.querySelector(".a-node.a-node-" + this.file.id);
            a.click();
            return false;
        }
        return false;
    }
    viewDetail() {
        this.changFile.emit(this.file);
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
