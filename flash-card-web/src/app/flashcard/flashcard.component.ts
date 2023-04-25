import { Component, OnInit} from '@angular/core';
import { FlashCard } from './Interface/FlashCard';
import { FlashCardApiService } from '../flash-card-api.service';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent implements OnInit {

  FlashCardList : Array<FlashCard> = [];

  constructor(private api : FlashCardApiService) { }

  ngOnInit() : void {
    this.api.GetAllFlashCards().subscribe(data => {
      console.log(data);
      this.FlashCardList = data;
      console.log(this.FlashCardList);
    });
  }

  getCardbyID(id : number) {
    this.api.GetFlashCardByID(id).subscribe(data => console.log(data));
  }
}
