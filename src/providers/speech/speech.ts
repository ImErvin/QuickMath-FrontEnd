import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

/*
  Generated class for the SpeechProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpeechProvider {

  constructor(public http: HttpClient, private sr: SpeechRecognition) {

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
    const permission = this.sr.hasPermission();

    return permission;
  }

  answerQuestion(question: string): boolean {

    this.sr.startListening({ showPopup: false }).subscribe(answers => {
      if (answers.length > 1) {
        for (let answer of answers) {
          if (answer == question) {
            return true;
          }
        }

        return false;
      } else {
        if (answers[0] == question) {
          return true;
        } else {
          return false;
        }
      }
    });

    return false;
  }
}
