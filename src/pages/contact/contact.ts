import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SpeechProvider } from '../../providers/speech/speech';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit{

  constructor(public navCtrl: NavController, private speechProvider: SpeechProvider) {

  }

  sum: string[];
  answer: string;
  correct: any;
  MESSAGE: string;
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
    this.speechProvider.answerQuestion().subscribe(answers => {
      this.MESSAGE = "PROCESSING";
      if (answers.length > 1) {
        for (let answer of answers) {
          if (answer == this.answer) {
            this.correct = true;
          }
        }
      } else {
        if (answers[0] == this.answer) {
          this.correct = true;
        }
      }
    });
    
    
    
  }

  ngOnInit():void{
    this.sum = this.generateSum(1);
    this.answer = this.generateAnswer(this.sum, 0);

  }

}
