import { Component, OnInit } from '@angular/core';
import { FlashCard } from '../flashcard/Interface/FlashCard';
import { FlashCardApiService } from '../flash-card-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{

  FlashCardList : Array<FlashCard> = [];

  constructor(private api : FlashCardApiService, private router : Router) { }

  ngOnInit() : void {
    this.api.GetAllFlashCards().subscribe(data => {
      console.log(data);
      this.FlashCardList = data;
      console.log(this.FlashCardList);
    });
  }

  onDelete(id : number) : void {
    this.api.GetFlashCardByID(id).subscribe(data => {
      console.log(data);
      let card : FlashCard = data;
      this.api.DeleteFlashCard(card).subscribe((res : any) => {
        console.log(res);
        this.router.navigate(['']);
      });
    });
  }
  
}
