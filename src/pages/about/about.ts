import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit{

  constructor(private cameraPreview: CameraPreview, public navCtrl: NavController) {

  }

  picture: string;
  
  startCamera(): void{
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: 'front',
      tapPhoto: true,
      previewDrag: false,
      toBack: true,
      alpha: 1
    };



        // start camera
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });
  }

  takePicture(): void{
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1280,
      height: 1280,
      quality: 85
    }

    // take a picture
    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
      //this.cameraPreview.stopCamera();
    }, (err) => {
      console.log(err);
      this.picture = null;
    });
  }

  ngOnInit(): void{
    this.startCamera();
  }

}
