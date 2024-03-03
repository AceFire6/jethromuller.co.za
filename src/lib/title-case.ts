export function titleCase(word: string): string {
    if (word.length === 0) {
        return word;
    }

    // @ts-expect-error: TS2532 because it doesn't know the word is long enough
    return `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;
}
