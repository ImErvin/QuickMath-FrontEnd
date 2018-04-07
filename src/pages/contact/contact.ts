import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SpeechProvider } from '../../providers/speech/speech';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit{

  constructor(public navCtrl: NavController) {

  }

  //sum: string[];

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

  ngOnInit():void{
    var sum: string[] = this.generateSum(3);
    var answer: string;
    for(var i = 0; i < 4; i++){
      var answer = this.generateAnswer(sum, i);
      console.log(sum + " = " + answer);
    }
    
    
  }

}
