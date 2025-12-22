import { Routes } from '@angular/router';
import { BooksListComponent } from './features/books/books-list/books-list.component';
import { BooksDetailComponent } from './features/books/books-detail/books-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: 'books', pathMatch: 'full' },
    { path: 'books', component: BooksListComponent },
    { path: 'books/:id', component: BooksDetailComponent },
    { path: '**', redirectTo: 'books' },
];
