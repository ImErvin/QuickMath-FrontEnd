import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule, JsonpModule } from '@angular/http';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';

import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { CameraPreview } from '@ionic-native/camera-preview';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SpeechProvider } from '../providers/speech/speech';
import { CameraProvider } from '../providers/camera/camera';
import { AuthProvider } from '../providers/auth/auth';
import { Http } from '@angular/http';
import { ScoresProvider } from '../providers/scores/scores';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SpeechRecognition,
    CameraPreview,
    SpeechProvider,
    Camera,
    CameraProvider,
    AuthProvider,
    ScoresProvider,
    ScoresProvider
  ]
})
export class AppModule {}
