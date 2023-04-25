import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlashCard } from './flashcard/Interface/FlashCard';

@Injectable({
  providedIn: 'root'
})
export class FlashCardApiService {

  apiRoot : string = 'https://meetflashcardback.azurewebsites.net/';

  constructor(private http : HttpClient) { }

  // Get All Flash Cards
  GetAllFlashCards() : Observable<Array<FlashCard>>{
    return this.http.get(this.apiRoot + 'FlashCard/All') as Observable<Array<FlashCard>>;
  }

  // Get Flash Card By ID
  GetFlashCardByID(cardID : number) : Observable<FlashCard>{
    return this.http.get(this.apiRoot + 'FlashCard/' + cardID) as Observable<FlashCard>;
  }
}
