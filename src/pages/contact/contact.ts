import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SpeechProvider } from '../../providers/speech/speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit{

  constructor(public navCtrl: NavController, private speechProvider: SpeechProvider, private speechRecognition: SpeechRecognition) {

  }

  sum: string[];
  answer: string;
  correct: boolean;
  answered: boolean;
  score: number;
  generateSum(difficultyLevel: number): string[]{
    let sum: string[] = ["",""];
    for(var i = 0; i < 2; i++){
      for(var j = 0; j < difficultyLevel; j++){
        sum[i] += (Math.floor(Math.random() * Math.floor(9)+1)).toString();
      }
    }

    return sum;
  }


  sortHighestToLowest(sum: string[]): string[]{
    sum = sum.sort();

    return sum.reverse();
  }

  generateAnswer(sum: string[], method: number): string{
    switch(method){
      case 0:
        return (parseInt(sum[0]) + parseInt(sum[1])).toString();
      case 1:
        sum = this.sortHighestToLowest(sum);
        return (parseInt(sum[0]) - parseInt(sum[1])).toString();
      case 2:
        return (parseInt(sum[0]) * parseInt(sum[1])).toString();
      case 3:
        sum = this.sortHighestToLowest(sum);
        return (parseInt(sum[0]) / parseInt(sum[1])).toString();

    } 
   
  }

  answerQuestion(){
    var correct = false;
    this.correct = false;
    this.answered = true;
    this.speechRecognition.startListening().subscribe(answers => {
      if (answers.length > 1) {
        for (let answer of answers) {
          if (answer == this.answer) {
            correct = true;
          }
        }
      } else {
        if (answers[0] == this.answer) {
          correct = true;
        }
      }

      if(correct){
        this.correct = true;
        this.score++;
      }else{
        this.correct = false;
      }

      this.nextQuestion();
    });
  }

  nextQuestion(): void{
    this.sum = this.generateSum(1);
    this.answer = this.generateAnswer(this.sum, 0);
    this.answered = true;
  }

  ngOnInit():void{
    this.sum = this.generateSum(1);
    this.answer = this.generateAnswer(this.sum, 0);
    this.score = 0;
  }

}
