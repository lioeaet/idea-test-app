export function pluralize(count: number, words: string[]): string {
  const cases = [2, 0, 1, 1, 1, 2];
  const absCount = Math.abs(count);
  return (
    count +
    " " +
    words[
      absCount % 100 > 4 && absCount % 100 < 20
        ? 2
        : cases[Math.min(absCount % 10, 5)]
    ]
  );
}
