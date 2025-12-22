import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  BookListItem,
  OpenLibrarySearchResponse,
  OpenLibraryWork,
} from './open-library.models';
import {
  OPEN_LIBRARY_BASE_URL,
  coverUrlById,
  extractWorkId,
} from './open-library.helpers';

@Injectable({ providedIn: 'root' })
export class OpenLibraryService {
  constructor(private http: HttpClient) {}

  /**
   * Home list (search)
   */
  searchBooks(query: string, page = 1, limit = 20): Observable<BookListItem[]> {
    const fields = [
      'key',
      'title',
      'author_name',
      'first_publish_year',
      'cover_i',
      'edition_count',
    ].join(',');

    const url =
      `${OPEN_LIBRARY_BASE_URL}/search.json` +
      `?q=${encodeURIComponent(query)}` +
      `&page=${page}` +
      `&limit=${limit}` +
      `&fields=${encodeURIComponent(fields)}`;

    return this.http.get<OpenLibrarySearchResponse>(url).pipe(
      map((res) =>
        (res.docs ?? []).map((d) => ({
          workId: extractWorkId(d.key),
          title: d.title,
          author: d.author_name?.[0] ?? 'Unknown',
          year: d.first_publish_year,
          coverId: d.cover_i,
          editionCount: d.edition_count,
        }))
      )
    );
  }

  /**
   * Detail by workId (ex: OL45883W)
   */
  getWork(workId: string): Observable<OpenLibraryWork> {
    return this.http.get<OpenLibraryWork>(
      `${OPEN_LIBRARY_BASE_URL}/works/${workId}.json`
    );
  }

  /**
   * Covers helper (image)
   */
  coverUrlById(coverId: number, size: 'S' | 'M' | 'L' = 'M'): string {
    return coverUrlById(coverId, size);
  }
}
