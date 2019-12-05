export function randomize(initialValue) {
  const factor = Math.random() >= 0.5 ? 1 : -1;
  return initialValue * (1 + factor * 0.1 * Math.random())
}
