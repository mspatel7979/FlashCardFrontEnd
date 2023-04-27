import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlashcardComponent } from './flashcard/flashcard.component';
import { TableComponent } from './table/table.component';
import { AddcardComponent } from './addcard/addcard.component';
import { EditcardComponent } from './editcard/editcard.component';

const routes: Routes = [
  { path: '', component: FlashcardComponent },
  { path: 'table', component: TableComponent },
  { path: 'add', component: AddcardComponent },
  { path: 'edit/:id', component: EditcardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
