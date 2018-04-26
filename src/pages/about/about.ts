import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { User } from '../../model/user';
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit{

  constructor(private cameraPreview: CameraPreview, public navCtrl: NavController, private authProvider: AuthProvider) {

  }

  picture: String;
  username: String;
  message: String;
  user: User;
  
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

    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });
  }

  resetPicture(): void{
    this.picture = null;
  }

  takePicture(): void{
    this.message = null;

    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1280,
      height: 1280,
      quality: 85
    }

    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
      this.picture = null;
    });
  }

  login(): void{
    if(this.username == null){
      this.message = "Enter a username";
    }else{
      this.authProvider.loginUser(this.username, this.picture)
      .subscribe((JSONResponse: User) => {
        this.user = JSONResponse;
        setTimeout(() => {
          this.navCtrl.push(ContactPage);
        }, 50);
      }, (message: any) => {
        this.message = message;
      })
    }
  }

  register(): void{
    if(this.username == null){
      this.message = "Enter a username";
    }else{
      this.authProvider.registerUser(this.username, this.picture)
      .subscribe((JSONResponse: User) => {
        this.user = JSONResponse;
        this.message ='Logging out user from JSON response' + this.user;
      }, (message: any) => {
        this.message = message;
      });
    }
  }

  ngOnInit(): void{
    this.startCamera();
  }

}
