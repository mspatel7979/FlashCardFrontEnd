import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddcardComponent } from './addcard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FlashCardApiService } from '../flash-card-api.service';
import { of } from 'rxjs';
import { FlashCard } from '../Interface/FlashCard';
import { Router } from '@angular/router';

describe('AddcardComponent', () => {
  let component: AddcardComponent;
  let fixture: ComponentFixture<AddcardComponent>;
  let apiServiceSpy: jasmine.SpyObj<FlashCardApiService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('FlashCardApiService', ['AddFlashCard']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ AddcardComponent ],
      imports : [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: FlashCardApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with 2 fields', () => {
    const form = component.addForm;
    expect(form.contains('question')).toBeTruthy();
    expect(form.contains('answer')).toBeTruthy();
  });

  it('should add new card when form is valid', () => {
    const flashcard: FlashCard = { id: 0, question: 'What is Angular?', answer: 'Angular is a framework for building web applications.' };
    const question = 'What is Angular?';
    const answer = 'Angular is a framework for building web applications.';
    const addForm = component.addForm;

    // Set form values
    addForm.controls['question'].setValue(question);
    addForm.controls['answer'].setValue(answer);

    apiServiceSpy.AddFlashCard.and.returnValue(of(flashcard));

    // Submit form
    // const submitBtn = fixture.nativeElement.querySelector('submit-btn[type="Submit"]');
    // submitBtn.click();
    const event = new SubmitEvent('Submit');
    component.onSubmit(event);

    // Check that API service was called with correct card data
    expect(apiServiceSpy.AddFlashCard).toHaveBeenCalledWith(flashcard);

    // Check that router navigated to table view
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/table']);
  });

  it('should not add new card when form is invalid', () => {
    const addForm = component.addForm;

    // Set form values to empty strings
    addForm.controls['question'].setValue('');
    addForm.controls['answer'].setValue('');

    spyOn(window, "alert").and.returnValue();
    // Submit form
    // const submitBtn = fixture.nativeElement.querySelector('button[type="submit"]');
    // submitBtn.click();
    const event = new SubmitEvent('Submit');
    component.onSubmit(event);

    // Check that API service was not called
    expect(apiServiceSpy.AddFlashCard).not.toHaveBeenCalled();

    // Check that alert was shown
    expect(window.alert).toHaveBeenCalledWith('Please Input Question and Answer!');
  });
});