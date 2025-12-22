import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BookListItem } from '../../core/open-library.models';
import { OpenLibraryService } from '../../core/open-library.service';

@Component({
  selector: 'app-book-grid',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './book-grid.component.html',
  styleUrl: './book-grid.component.scss',
})
export class BookGridComponent {
  @Input({ required: true }) books: BookListItem[] = [];
  @Output() selected = new EventEmitter<string>();

  displayedColumns = ['cover', 'title', 'author', 'year'];

  constructor(public ol: OpenLibraryService) {}
}
