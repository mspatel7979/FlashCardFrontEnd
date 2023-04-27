import { Component, OnInit } from '@angular/core';
import { FlashCardApiService } from '../flash-card-api.service';
import { FlashCard } from '../Interface/FlashCard';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-editcard',
  templateUrl: './editcard.component.html',
  styleUrls: ['./editcard.component.css']
})
export class EditcardComponent implements OnInit{

  card : any = {};
  QF : string = "";
  AF : string = "";

  constructor(private api : FlashCardApiService, private router : Router, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      //console.log(`${id}`);
      let cardId  = +`${id}`;
      //console.log(cardId);
      //console.log(typeof cardId);
      this.api.GetFlashCardByID(cardId).subscribe(data => {
        //console.log(data);
        this.card = data;
        this.QF = this.card.question;
        this.AF = this.card.answer;
      });
    });
  }

  onKey(event: any, field: string) {
    const inputValue = event.target.value;
    if (field === 'question') {
      this.QF = inputValue;
    } else if (field === 'answer') {
      this.AF = inputValue;
    }
  }

  onSubmit(event : Event) {
    this.card.question = this.QF;
    this.card.answer = this.AF;
    //console.log(this.card);
    let flashcard : FlashCard = this.card;
    //console.log(flashcard);
    this.api.UpdateFlashCard(flashcard).subscribe(data => {
      //console.log(data);
      this.router.navigate(['/table']);
    });
  }

}
