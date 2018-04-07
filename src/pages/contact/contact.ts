import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SpeechRecognition } from '@ionic-native/speech-recognition';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit{

  constructor(public navCtrl: NavController, private sr: SpeechRecognition) {

  }

  generatedNumbers: number[];
  isavail: boolean;
  message: any;

  generateGame(): void{
    
  }

  async isSpeechSupported(): Promise<boolean>{
    const isAvailable = await this.sr.isRecognitionAvailable();
    console.log(isAvailable);
    return isAvailable;
  }

  ngOnInit():void{
    this.message = this.isSpeechSupported();
    this.isSpeechSupported().then((bool)=>this.isavail = bool).catch((woops)=>console.log(woops));
  }

}
