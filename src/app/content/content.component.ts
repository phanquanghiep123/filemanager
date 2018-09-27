import { Component, OnInit, Injectable,ViewChild,Input,Output,EventEmitter} from '@angular/core';
import { CropperComponent } from '../cropper/cropper.component';
import { AppComponent } from '../app.component';
import { Media } from '../models/media';
import { Folder } from '../models/folder';
import { FolderService } from '../services/folder.service';
declare var $: any;
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html'
})
export class ContentComponent implements OnInit {
  Column: number = 8;
  myDropzone : any;
  WidthIem = 100 / this.Column + "%";
  public_path : string = "";
  is_loading : boolean = false;
  folder : Folder;
  @ViewChild(CropperComponent) Cropper : CropperComponent;
  @Output () addFolder = new EventEmitter();
  @Output () removeNode = new EventEmitter();
  constructor(
    private app : AppComponent,
    private folderService : FolderService
  ) { 
    
  }
  OnchangeFile ($file : Media){
    this.app.file = $file; 
    
  }
  addItemContent ($file) {
    this.app.CurrentFiles.join($file);
  }
  cropperData (){
    this.Cropper.cropperDataFile();
    return false;
  }
  ngOnInit() {
    var width = window.innerWidth;
    var height = window.innerHeight
    if (width <= 420) {
      this.Column = 1;
    } else if (width > 420 && width <= 768) {
      this.Column = 3;
    }
    else if (width > 768 && width <= 1024) {
      this.Column = 5;
    }
    else if (width > 1024 && width <= 1366) {
      this.Column = 6;
    }
    else{
      this.Column = 8;
    }
    this.WidthIem = 100 / this.Column + "%";
    window.onresize = (event) => {
      width = window.innerWidth;
      height = window.innerHeight
      if (width <= 420) {
        this.Column = 1;
      } else if (width > 420 && width <= 768) {
        this.Column = 3;
      }
      else if (width > 768 && width <= 1024) {
        this.Column = 5;
      }
      else if (width > 1024 && width <= 1366) {
        this.Column = 6;
      }
      else{
        this.Column = 8;
      }
      this.WidthIem = 100 / this.Column + "%";
    }
    setTimeout(() => {
      this.public_path = this.app.config.BASE['public_path'];
    },1000);
  }
  AddNewFolder () {
    this.app.folder.pid = this.app.CurrentFolder.id;
    this.folderService.add(this.app.config.BASE["add_folder"],this.app.folder).subscribe((data) => {
      if(data.status){
        this.addFolder.emit( data.response );
        this.app.CurrentFiles.push(data.response);
        $("#myModalAddFolder").modal("hide");
      }else{
        alert(data.message);
      }
    });
  }
  RemoveFile(){
    this.folderService.remove(this.app.config.BASE["delete_file"],this.app.file.id).subscribe(data => {
      if(data.status){
        this.removeNode.emit(this.app.file);
        if(this.app.file.id == this.app.folder.id){
          let a = <HTMLElement>document.querySelector(".a-node.a-node-"+this.app.file.pid);
          a.click();
        }
        $("#myModalRemoveFile").modal("hide");
      }
    })
  }
  removeFile($file : any){
    $(".main-item.main-item-"+$file.id).remove();
  }
}
