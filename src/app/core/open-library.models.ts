export interface OpenLibrarySearchDoc {
    key: string;
    title: string;
    author_name?: string[];
    first_publish_year?: number;
    cover_i?: number;
    edition_count?: number;
}

export interface OpenLibrarySearchResponse {
    numFound: number;
    start: number;
    docs: OpenLibrarySearchDoc[];
}

export interface BookListItem {
    workId: string;
    title: string;
    author: string;
    year?: number;
    coverId?: number;
    editionCount?: number;
}

export interface OpenLibraryWork {
    title: string;
    description?: string | { value: string };
    covers?: number[];
    subjects?: string[];
    first_publish_date?: string;
    created?: { value: string };
    last_modified?: { value: string };
    [k: string]: any;
}
