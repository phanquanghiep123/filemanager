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
  is_loading: boolean = false;
  constructor() {

  }

  ngOnInit() {
    var is_round = 0;
    var $modal = $('#myModalEditImage');
    var actions = $('#actions');
    var image;
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
        dataWidth.val(Math.round(data.width));
      },
      zoom: function (e) {
        console.log(e.type, e.detail.ratio);
      },
    };
    $modal.on('shown.bs.modal', () => {
      image = document.getElementById('cropper-image');
      this.is_loading = true;
      var img = new Image();
      image.addEventListener('ready', () => {
        this.is_loading = false;
      });
      this.cropper = new Cropper(image, options);
      this.cropper.round = function () {
        $(".cropper-container").addClass("round");
        $(".img-preview").addClass("round");
        this.setAspectRatio(1);
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
        this.setAspectRatio(2 / 1);
        is_round = 0;
      }
      this.cropper.getRoundedCanvas = function (sourceCanvas) {
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
      this.cropper.getCanvasC = function () {
        var croppedCanvas = this.getCroppedCanvas();
        if (is_round == 1) {
          croppedCanvas = this.getRoundedCanvas(croppedCanvas);
        }
        return croppedCanvas;
      }
      img.src = this.file.public_path;
    }).on('hidden.bs.modal', () => {
      this.cropper.destroy();
      this.cropper = null;
    });
    var _seff = this;
    actions.find("button").click(function () {
      var option = $(this).attr("data-option");
      var method = $(this).attr("data-method");
      var second_option = $(this).attr("data-second-option");
      if (option == null)
        _seff.cropper[method]();
      else if (second_option != null)
        _seff.cropper[method](option, second_option);
      else
        _seff.cropper[method](option);
    });
    window.addEventListener('resize', (event) => {
      image = document.getElementById('cropper-image');
      if(this.cropper){
        this.cropper.destroy();
        this.cropper = null;
      }else{
        return true;
      }
      this.is_loading = true;
      var img = new Image();
      image.addEventListener('ready', () => {
        this.is_loading = false;
      });
      $("#myModalEditImage .cropper-container").removeClass("round");
      $("#myModalEditImage .img-preview").removeClass("round");
      this.cropper = new Cropper(image, options);
      this.cropper.round = function () {
        $("#myModalEditImage .cropper-container").addClass("round");
        $("#myModalEditImage .img-preview").addClass("round");
        this.setAspectRatio(1);
        is_round = 1;
      }
      this.cropper.square = function () {
        $("#myModalEditImage .cropper-container").removeClass("round");
        $("#myModalEditImage .img-preview").removeClass("round");
        this.setAspectRatio(1);
        is_round = 0;
      }
      this.cropper.auto = function () {
        $("#myModalEditImage .cropper-container").removeClass("round");
        $("#myModalEditImage .img-preview").removeClass("round");
        this.setAspectRatio(false);
        is_round = 0;
      }
      this.cropper.setAspectRatio21 = function () {
        $("#myModalEditImage .cropper-container").removeClass("round");
        $("#myModalEditImage .img-preview").removeClass("round");
        this.setAspectRatio(2 / 1);
        is_round = 0;
      }
      this.cropper.getRoundedCanvas = function (sourceCanvas) {
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
      this.cropper.getCanvasC = function () {
        var croppedCanvas = this.getCroppedCanvas();
        if (is_round == 1) {
          croppedCanvas = this.getRoundedCanvas(croppedCanvas);
        }
        return croppedCanvas;
      }
      img.src = this.file.public_path;
    });
  }
  cropperDataFile() {
    console.log(this.cropper);
  }

}
