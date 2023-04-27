import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FlashCardApiService } from './flash-card-api.service';
import { FlashCard } from './Interface/FlashCard';
import { Observable } from 'rxjs';


describe('FlashCardApiService', () => {
  let service: FlashCardApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule]
    });
    service = TestBed.inject(FlashCardApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all flash cards', () => {
    const mockCards: FlashCard[] = [
      { id: 1, question: 'What is Angular?', answer: 'Angular is a framework for building web applications.' },
      { id: 2, question: 'What is TypeScript?', answer: 'TypeScript is a superset of JavaScript.' }
    ];
    service.GetAllFlashCards().subscribe((cards: FlashCard[]) => {
      expect(cards.length).toBe(2);
      expect(cards).toEqual(mockCards);
    });
    const req = httpMock.expectOne(`${service.apiRoot}FlashCard/All`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCards);
  });

  it('should retrieve a flash card by ID', () => {
    const mockCard: FlashCard = { id: 1, question: 'What is Angular?', answer: 'Angular is a framework for building web applications.' };
    service.GetFlashCardByID(mockCard.id).subscribe((card: FlashCard) => {
      expect(card).toEqual(mockCard);
    });
    const req = httpMock.expectOne(`${service.apiRoot}FlashCard/${mockCard.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCard);
  });

  it('should add a flash card', () => {
    const mockCard: FlashCard = { id: 3, question: 'What is HTML?', answer: 'HTML is a markup language.' };
    service.AddFlashCard(mockCard).subscribe((card: FlashCard) => {
      expect(card).toEqual(mockCard);
    });
    const req = httpMock.expectOne(`${service.apiRoot}FlashCard/Add`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCard);
    req.flush(mockCard);
  });

  it('should update a flash card', () => {
    const mockCard: FlashCard = { id: 1, question: 'What is Angular?', answer: 'Angular is a framework for building web applications.' };
    service.UpdateFlashCard(mockCard).subscribe((card: FlashCard) => {
      expect(card).toEqual(mockCard);
    });
    const req = httpMock.expectOne(`${service.apiRoot}FlashCard/Update`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockCard);
    req.flush(mockCard);
  });

  it('should delete a flash card', () => {
    const mockCard: FlashCard = { id: 1, question: 'What is Angular?', answer: 'Angular is a framework for building web applications.' };
    service.DeleteFlashCard(mockCard).subscribe((card: FlashCard) => {
      expect(card).toEqual(mockCard);
    });
    const req = httpMock.expectOne(`${service.apiRoot}FlashCard/Delete`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.body).toEqual(mockCard);
    req.flush(mockCard);
  });
});
