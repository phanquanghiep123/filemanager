import { Component, OnInit, Input } from '@angular/core';
import { Media } from '../models/media';
declare var $: any;
declare var Cropper: any;
@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.css']
})
export class CropperComponent implements OnInit {
  @Input() file: Media;
  cropper;
  constructor() {

  }
  
  ngOnInit() {
    
    var is_round = 0;
    var $modal = $('#myModalViewFile');
    var actions = $('#actions');
    var image = document.getElementById('cropper-image');
    var dataHeight = $('#dataHeight');
    var dataWidth = $('#dataWidth');
    var options = {
      aspectRatio: false,
      preview: '.img-preview',
      ready: function (e) {
        console.log(e.type);
      },
      cropstart: function (e) {
        console.log(e.type, e.detail.action);
      },
      cropmove: function (e) {
        console.log(e.type, e.detail.action);
      },
      cropend: function (e) {
        console.log(e.type, e.detail.action);
      },
      crop: function (e) {
        var data = e.detail;
        dataHeight.val(Math.round(data.height));
        dataWidth.val (Math.round(data.width));
       
      },
      zoom: function (e) {
        console.log(e.type, e.detail.ratio);
      },
     
      
    };
    $modal.on('shown.bs.modal', () => {
      var img = new Image();
      img.onload =  () => {
        this.cropper = new Cropper(image, options);
        this.cropper.round = function () {
          $(".cropper-container").addClass("round");
          $(".img-preview").addClass("round");
          this.setAspectRatio (1);
          is_round = 1;
        }
        this.cropper.square = function () {
          $(".cropper-container").removeClass("round");
          $(".img-preview").removeClass("round");
          this.setAspectRatio(1);
          is_round = 0;
        }
        this.cropper.auto = function () {
          $(".cropper-container").removeClass("round");
          $(".img-preview").removeClass("round");
          this.setAspectRatio(false);
          is_round = 0;
        }
        this.cropper.setAspectRatio21 = function () {
          $(".cropper-container").removeClass("round");
          $(".img-preview").removeClass("round");
          this.setAspectRatio(2/1);
          is_round = 0;
        }
        this.cropper.getRoundedCanvas = function(sourceCanvas) {
          var canvas = document.createElement('canvas');
          var context = canvas.getContext('2d');
          var width = sourceCanvas.width;
          var height = sourceCanvas.height;
          canvas.width = width;
          canvas.height = height;
          context.imageSmoothingEnabled = true;
          context.drawImage(sourceCanvas, 0, 0, width, height);
          context.globalCompositeOperation = 'destination-in';
          context.beginPath();
          context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
          context.fill();
          return canvas;
        }
        this.cropper.getCanvasC = function(){
          var croppedCanvas = this.getCroppedCanvas();
          if(is_round == 1){
            croppedCanvas = this.getRoundedCanvas(croppedCanvas);
          }
          return croppedCanvas;
        }
      }
      img.src = 'http://weddingguu.com' + this.file.path;
    }).on('hidden.bs.modal', () => {
      this.cropper.destroy();
      this.cropper = null;
    });
    var _this = this;
    actions.find("button").click(function () {
      var option = $(this).attr("data-option");
      var method = $(this).attr("data-method");
      var second_option = $(this).attr("data-second-option");
      if(option == null)
      _this.cropper[method]();
      else if (second_option != null)
      _this.cropper[method](option, second_option);
      else
      _this.cropper[method](option);
    });
  }
  cropperDataFile($event) {
      console.log(this.cropper);
  }

}
