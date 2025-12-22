import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { OpenLibraryService } from '../../../core/open-library.service';
import { BookListItem } from '../../../core/open-library.models';
import { BookCardComponent } from '../../../shared/book-card/book-card.component';
import { BookGridComponent } from '../../../shared/book-grid/book-grid.component';

type ViewMode = 'cards' | 'table';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    BookCardComponent,
    BookGridComponent,
  ],
  animations: [
    trigger('listIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(8px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss',
})
export class BooksListComponent implements OnInit {
  loading = false;
  books: BookListItem[] = [];

  viewMode: ViewMode = 'cards';
  query = 'angular';

  constructor(private ol: OpenLibraryService, private router: Router) {}

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    this.loading = true;

    this.ol.searchBooks(this.query, 1, 24).subscribe({
      next: (books) => {
        this.books = books;
        this.loading = false;
      },
      error: () => {
        this.books = [];
        this.loading = false;
      },
    });
  }

  openDetail(workId: string): void {
    this.router.navigateByUrl(`/books/${workId}`);
  }
}
