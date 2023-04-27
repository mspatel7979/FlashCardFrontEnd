import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlashcardComponent } from './flashcard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlashCard } from '../Interface/FlashCard';
import { FlashCardApiService } from '../flash-card-api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('FlashcardComponent', () => {
  let component: FlashcardComponent;
  let fixture: ComponentFixture<FlashcardComponent>;
  let apiService : FlashCardApiService;
  let router : any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcardComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    apiService = TestBed.inject(FlashCardApiService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(FlashcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all flash cards on init', () => {
    const mockFlashCards: FlashCard[] = [
      { id: 1, question: 'Question 1', answer: 'Answer 1' },
      { id: 2, question: 'Question 2', answer: 'Answer 2' },
      { id: 3, question: 'Question 3', answer: 'Answer 3' }
    ];
    spyOn(apiService, 'GetAllFlashCards').and.returnValue(of(mockFlashCards));
    component.ngOnInit();
    expect(component.FlashCardList).toEqual(mockFlashCards);
  });
});
