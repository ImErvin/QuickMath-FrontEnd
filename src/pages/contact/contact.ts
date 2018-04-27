import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SpeechProvider } from '../../providers/speech/speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

import { ScoresProvider } from '../../providers/scores/scores';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit{

  constructor(public navCtrl: NavController, private speechProvider: SpeechProvider, private speechRecognition: SpeechRecognition, private scoresProvider: ScoresProvider) {
    
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
  message: any;
  permission: boolean;
  permissionMessage: string;

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
        switch(this.difficulty){
          case 1:
          this.score++;
          if(this.score >= 0 && this.score <= 3){
            this.speed = 1;
          }else if(this.score >= 4 && this.score <= 6){
            this.speed = 2;
          }else{
            this.speed = 3;
          }
          break;
          case 2:
          this.score += 2;
          if(this.score >= 0 && this.score <= 6){
            this.speed = 1;
          }else if(this.score >= 6 && this.score <= 8){
            this.speed = 2;
          }else{
            this.speed = 3;
          }
          break;
          case 3:
          this.score += 4;
          if(this.score >= 0 && this.score <= 12){
            this.speed = 1;
          }else if(this.score >= 12 && this.score <= 16){
            this.speed = 2;
          }else{
            this.speed = 3;
          }
          break;
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
    this.setScores();
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

  permissionHandler(): void{

    this.speechProvider.isSpeechSupported().then((supported) =>{
      if(supported){
        this.speechProvider.hasPermission().then((permission) => {
          if(!permission){
            this.permissionMessage = "No permission granted."
            this.speechProvider.getPermission();
            this.permission = false;
          }else{
            this.permission = true;
          }
        });
      }else{
        this.permission = false;
        this.permissionMessage = "Not supported sorry.";
      }
    })

    
  }

  backButton(): void{
    this.start = true;
    this.end = false;
    this.startMenu = true;
    this.resetTime();
  }

  getScores(): void{
    const user = JSON.parse(localStorage.getItem("user"));

    this.scores[0] = parseInt(user.additionScore);
    this.scores[1] = parseInt(user.subtractionScore);
    this.scores[2] = parseInt(user.multiplicationScore);
  }

  setScores(): void{
    const user = JSON.parse(localStorage.getItem("user"));

    switch(this.gameMode){
      case 1:
        if(this.scores[0] < this.score){
          this.scoresProvider.updateAddition(user.username, this.score);
          this.scores[0] = this.score;
        }
        break;
      case 2:
        if(this.scores[1] < this.score){
          this.scoresProvider.updateSubtraction(user.username, this.score);
          this.scores[1] = this.score;
        }
        break;
      case 3:
        if(this.scores[2] < this.score){
          this.scoresProvider.updateMultiplication(user.username, this.score);
          this.scores[2] = this.score;
        }
        break;
    }
  }

  ngOnInit():void{
    this.permissionHandler();
    this.scores = [-1,-1,-1];
    this.difficulty = 1;
    this.gameMode = 1;
    this.difficultySelected = [true,false,false];
    this.backButton();
    this.getScores();
  }

}
