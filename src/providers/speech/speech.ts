import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

/*
  Generated class for the SpeechProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpeechProvider {

  constructor(private sr: SpeechRecognition) {

  }

  async isSpeechSupported(): Promise<boolean> {
    const isAvailable = await this.sr.isRecognitionAvailable();

    return isAvailable;
  }

  async getPermission(): Promise<void> {
    try {
      const permission = await this.sr.requestPermission();

      return permission;
    } catch (e) {
      console.log(e);
    }
  }

  async hasPermission(): Promise<boolean> {
    const permission = await this.sr.hasPermission();

    return permission;
  }

  answerQuestion(): Observable<any> {
    return this.sr.startListening({ showPopup: false });
  }
}
