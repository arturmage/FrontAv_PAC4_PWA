import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BookListItem } from '../../core/open-library.models';
import { OpenLibraryService } from '../../core/open-library.service';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
})
export class BookCardComponent {
  @Input({ required: true }) book!: BookListItem;
  @Output() selected = new EventEmitter<string>();

  constructor(private ol: OpenLibraryService) {}

  coverUrl(): string | null {
    if (!this.book.coverId) return null;
    return this.ol.coverUrlById(this.book.coverId, 'M');
  }
}
