import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppComponent } from '../app.component';
declare var $: any;
declare var Dropzone: any;
@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit {
  @Output() addItemContent = new EventEmitter;
  myDropzone: any;
  constructor(private app: AppComponent) { }
  ngOnInit() {
    Dropzone.autoDiscover = false;
    Dropzone.options = {
      init: function () {
        this.on("addedfile", function (file) { alert("Added file."); });
      },
      paramName: "file", // The name that will be used to transfer the file
      maxFilesize: 2, // MB
      headers: {
        'Content-Type': 'multipart/form-data',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
      },
      previewTemplate: `<div class="dz-preview dz-file-preview acs">
      <div class="dz-details">
        <div class="dz-filename"><span data-dz-name></span></div>
        <div class="dz-size" data-dz-size></div>
        <img data-dz-thumbnail/>
      </div>
      <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
      <div class="dz-success-mark"><span>✔</span></div>
      <div class="dz-error-mark"><span>✘</span></div>
      <div class="dz-error-message"><span data-dz-errormessage></span></div>
    </div>`,
      accept: function (file, done) {
        if (file.name == "justinbieber.jpg") {
          done("Naha, you don't.");
        }
        else { done(); }
      }
    };
    setTimeout(() => {
      var UploadUrl = this.app.config['BASE']['uploads'];
      this.myDropzone = new Dropzone("div#dropzone", { url: UploadUrl });
      this.myDropzone.on("addedfile", (file) => {
        console.log(this.app.CurrentFolder);
        return false;
      });
      this.myDropzone.on("removedfile", (file) => {
        /* Maybe display some more file information on your page */
      });
      this.myDropzone.on("sending", (file, xhr, formData) => {
        formData.append("folder", this.app.CurrentFolder.id);
        var extensions = "";
        $.each(this.app.config.EXT,(key,value) => {
          if(key == 0)
            extensions += value; 
          else
            extensions += "," + value; 
        });
        extensions = extensions.replace(",,",",");
        formData.append("extensions", extensions);
      });
      this.myDropzone.on("success", (data) => {
       console.log(data.xhr.response);
      });
    }, 1000);
    $("#myModalUpload").on('hidden.bs.modal',() => {
      this.myDropzone.removeAllFiles(true);
    });
  }

}
