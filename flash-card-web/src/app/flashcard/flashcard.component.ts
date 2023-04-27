import { Component, OnInit} from '@angular/core';
import { FlashCard } from '../Interface/FlashCard';
import { FlashCardApiService } from '../flash-card-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent implements OnInit {

  FlashCardList : Array<FlashCard> = [];

  constructor(private api : FlashCardApiService, private router : Router) { }

  ngOnInit() : void {
    this.router.navigateByUrl('');
    this.api.GetAllFlashCards().subscribe(data => {
      //console.log(data);
      this.FlashCardList = data;
      //console.log(this.FlashCardList);
    });
  }
  
}
