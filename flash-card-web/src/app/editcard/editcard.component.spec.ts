import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { FlashCardApiService } from '../flash-card-api.service';
import { EditcardComponent } from './editcard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlashCard } from '../Interface/FlashCard';

describe('EditcardComponent', () => {
  let component: EditcardComponent;
  let fixture: ComponentFixture<EditcardComponent>;
  //let flashCardApiServiceSpy: jasmine.SpyObj<FlashCardApiService>;
  const fakeCard = {id: 1, question: 'What is Angular?', answer: 'Angular is a JavaScript framework.'};
  const fakeActivatedRoute = {
    params: of({ id: 1 })
  };
  let apiServiceMock: jasmine.SpyObj<FlashCardApiService>;
  let routerMock: jasmine.SpyObj<Router>;
  let activatedRouteMock: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    //const spy = jasmine.createSpyObj('FlashCardApiService', ['GetFlashCardByID', 'UpdateFlashCard']);
    apiServiceMock = jasmine.createSpyObj('FlashCardApiService', ['GetFlashCardByID', 'UpdateFlashCard']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteMock = jasmine.createSpyObj('ActivatedRoute', ['params']);

    await TestBed.configureTestingModule({
      declarations: [ EditcardComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: FlashCardApiService, useValue: apiServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    })
    .compileComponents();

    //router = TestBed.inject(Router);
    apiServiceMock = TestBed.inject(FlashCardApiService) as jasmine.SpyObj<FlashCardApiService>;
    fixture = TestBed.createComponent(EditcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the card on init', () => {
    apiServiceMock.GetFlashCardByID.and.returnValue(of(fakeCard));
    component.ngOnInit();
    expect(component.card).toEqual(fakeCard);
    expect(component.QF).toEqual(fakeCard.question);
    expect(component.AF).toEqual(fakeCard.answer);
  });

  it('should update QF or AF when onKey is called', () => {
    // Arrange
    const event = { target: { value: 'What is Angular?' } };
    
    // Act
    component.onKey(event, 'question');
    
    // Assert
    expect(component.QF).toBe('What is Angular?');
    expect(component.AF).toBe('');
    
    // Arrange
    const event2 = { target: { value: 'A framework for building web apps.' } };
    
    // Act
    component.onKey(event2, 'answer');
    
    // Assert
    expect(component.QF).toBe('What is Angular?');
    expect(component.AF).toBe('A framework for building web apps.');
  });

  it('should update flashcard and navigate to /table when onSubmit is called', () => {
    const flashcard: FlashCard = { id: 1, question: 'old question', answer: 'old answer' };
    component.card = flashcard;
    component.QF = 'new question';
    component.AF = 'new answer';

    apiServiceMock.UpdateFlashCard.and.returnValue(of(flashcard));
    activatedRouteMock.params = of({ id: '1' });

    component.onSubmit(new Event('click'));

    expect(apiServiceMock.UpdateFlashCard).toHaveBeenCalledWith(flashcard);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/table']);
  });
});
