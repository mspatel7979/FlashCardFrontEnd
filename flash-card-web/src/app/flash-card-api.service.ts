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

  // Add Flash Card
  AddFlashCard(card : FlashCard) : Observable<FlashCard>{
    return this.http.post(this.apiRoot + 'FlashCard/Add', card) as Observable<FlashCard>;
  }

  // Update Flash Card
  UpdateFlashCard(card : FlashCard) : Observable<FlashCard>{
    return this.http.put(this.apiRoot + 'FlashCard/Update', card) as Observable<FlashCard>;
  }

  // Delete Flash Card
  DeleteFlashCard(card : FlashCard) : Observable<FlashCard>{
    const headers = { 'content-type': 'application/json'};
    return this.http.delete(this.apiRoot + 'FlashCard/Delete', {body: card, headers: headers}) as Observable<FlashCard>;
  }
}
