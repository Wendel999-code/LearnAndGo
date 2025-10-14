export function generateReferenceId(prefix = "LAG"): string {
  const randomPart = Math.floor(10000000 + Math.random() * 90000000);
  return `${prefix}-${randomPart}`;
}