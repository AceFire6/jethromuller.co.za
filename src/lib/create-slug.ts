// Adapted from https://equk.co.uk/2023/02/02/generating-slug-from-title-in-astro/
import { GENERATE_SLUG_FROM_TITLE } from '../config';

export function createSlug(title: string, staticSlug: string): string {
    if (!GENERATE_SLUG_FROM_TITLE) {
        return staticSlug;
    }

    return (
        title
            // remove leading & trailing whitespace
            .trim()
            // output lowercase
            .toLowerCase()
            // replace spaces
            .replaceAll(/\s+/g, '-')
            // remove special characters
            .replaceAll(/[^\w-]/g, '')
            // remove leading & trailing separators
            .replaceAll(/^-+|-+$/g, '')
    );
}
