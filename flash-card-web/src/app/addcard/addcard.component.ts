import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FlashCardApiService } from '../flash-card-api.service';
import { FlashCard } from '../Interface/FlashCard';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.component.html',
  styleUrls: ['./addcard.component.css']
})
export class AddcardComponent {

  card : FlashCard = {
    id: 0
  }

  addForm : FormGroup = this.fb.group({
    question : new FormControl('', [Validators.required]),
    answer : new FormControl('', [Validators.required])
  });

  constructor(private api : FlashCardApiService, private fb : FormBuilder, private router : Router) { }

  onSubmit(event : Event) {
    if(this.addForm.valid){
      this.card.question = this.addForm.value['question'];
      this.card.answer = this.addForm.value['answer'];
      //console.log(this.card);
      this.api.AddFlashCard(this.card).subscribe(data => {
        //console.log(data);
        this.router.navigate(['/table']);
      });
    }
    else {
      event.preventDefault();
      alert("Please Input Question and Answer!");
    }
  }

}