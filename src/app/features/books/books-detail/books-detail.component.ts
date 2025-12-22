import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { OpenLibraryService } from '../../../core/open-library.service';
import { OpenLibraryWork } from '../../../core/open-library.models';

@Component({
  selector: 'app-books-detail',
  standalone: true,
  imports: [MatButtonModule, MatExpansionModule, MatProgressSpinnerModule, JsonPipe],
  templateUrl: './books-detail.component.html',
  styleUrl: './books-detail.component.scss',
})
export class BooksDetailComponent implements OnInit {
  loading = false;
  showAll = false;

  workId!: string;
  work: OpenLibraryWork | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ol: OpenLibraryService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.workId = id;
    this.loading = true;

    this.ol.getWork(id).subscribe({
      next: (w) => {
        this.work = w;
        this.loading = false;
      },
      error: () => {
        this.work = null;
        this.loading = false;
      },
    });
  }

  back(): void {
    this.router.navigateByUrl('/books');
  }

  toggleAll(): void {
    this.showAll = !this.showAll;
  }

  coverUrl(): string | null {
    const coverId = this.work?.covers?.[0];
    return coverId ? this.ol.coverUrlById(coverId, 'L') : null;
  }

  descriptionText(): string {
    const d = this.work?.description;
    if (!d) return '---';
    if (typeof d === 'string') return d;
    return d.value ?? '---';
  }
}
