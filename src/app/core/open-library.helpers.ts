export const OPEN_LIBRARY_BASE_URL = 'https://openlibrary.org';
export const OPEN_LIBRARY_COVERS_BASE_URL = 'https://covers.openlibrary.org';

export function extractWorkId(key: string): string {
    return key.replace('/works/', '').trim();
}

export function coverUrlById(
        coverId: number,
        size: 'S' | 'M' | 'L' = 'M'
): string {
    return `${OPEN_LIBRARY_COVERS_BASE_URL}/b/id/${coverId}-${size}.jpg`;
}
