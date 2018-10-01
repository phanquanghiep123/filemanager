import { Component, OnInit,ViewChild,Output,EventEmitter} from '@angular/core';
import { CropperComponent } from '../cropper/cropper.component';
import { AppComponent } from '../app.component';
import { Media } from '../models/media';
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
  folder : Media;
  oldFile : Media;
  onsave : boolean = false;
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
    
    $(".content-box .modal").on('hidden.bs.modal', () => {

      if(!this.onsave){
        console.log($(".content-box .modal").find("from"));
      }
    });
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
        $("#myModalRemoveFile").modal("hide");
      }
    });
  }
  RemoveFiles(){ 
    this.app.MySeclect.forEach(value => {
      this.app.CurrentFiles.forEach((value1, key) => {
        if (value1.id == value.id) {
          this.folderService.remove(this.app.config.BASE["delete_file"],value.id).subscribe(data => {
            if(data.status){
              this.removeNode.emit(value);
            }
          });
          return false;
        }
      });
    });
    $("#myModalRemoveFiles").modal("hide");
  }
  removeFile($file : Media){
    $(".main-item.main-item-"+$file.id).remove();
  }

  EditFile () {
    console.log(this.app.file);
    this.onsave = true;
    return false;
  }
}
