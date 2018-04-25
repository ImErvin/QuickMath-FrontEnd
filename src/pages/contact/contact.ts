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
  scores: number[];
  end: boolean;
  start: boolean;
  startMenu: boolean;
  cardBg: string[];
  time: number;
  difficulty: number;
  difficultySelected: boolean[];
  interval: any;
  timeout: any;
  gameMode: number;
  speed: number;
  responsefromcamera: any;
  picture: string;

 

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
      case 1:
        return (parseInt(sum[0]) + parseInt(sum[1])).toString();
      case 2:
        sum = this.sortHighestToLowest(sum);
        return (parseInt(sum[0]) - parseInt(sum[1])).toString();
      case 3:
        return (parseInt(sum[0]) * parseInt(sum[1])).toString();
      case 4:
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
        if(this.score >= 0 && this.score <= 3){
          this.speed = 1;
        }else if(this.score >= 4 && this.score <= 6){
          this.speed = 2;
        }else{
          this.speed = 3;
        }
      }else{
        this.correct = false;
      }

      this.nextQuestion();
    });
  }

  nextQuestion(): void{
    this.sum = this.generateSum(this.difficulty);
    this.cardBg = this.generateSum(1);
    this.answer = this.generateAnswer(this.sum, this.gameMode);
    this.answered = true;
  }

  endGame(): void{
    this.start = true;
    this.end = true;
    clearInterval(this.interval);
    clearTimeout(this.timeout);
  }

  startGame(): void{
    this.sum = this.generateSum(this.difficulty);
    this.cardBg = this.generateSum(1);
    this.answer = this.generateAnswer(this.sum, this.gameMode);
    this.speed = 1;
    this.start = false;
    this.end = false;
    this.startMenu = false;
    this.score = 0;
    this.startTime();
  }

  startTime(): void{
    this.resetTime();
    this.interval = setInterval(() => { this.decrementTime() }, 1000);
    this.timeout = setTimeout(() => { this.endGame() }, 60000);
  }

  decrementTime(): void{
    if(this.time != 0){
      this.time -= 1;
    }else{
      clearInterval(this.interval);
    }
  }

  resetTime(): void{
    this.time = 60;
  }

  setDifficulty(level): void{
    this.difficulty = level;
  }

  setGameMode(mode): void{
    this.gameMode = mode;
  }

  backButton(): void{
    this.start = true;
    this.end = false;
    this.startMenu = true;
    this.resetTime();
  }

  ngOnInit():void{
    console.log(window.screen.height);
    this.difficulty = 1;
    this.gameMode = 1;
    this.scores = [10,10,10];
    this.difficultySelected = [true,false,false];
    this.backButton();
  }

}
