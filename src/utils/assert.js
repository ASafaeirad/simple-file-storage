export function assert(condition, errorMsg = 'assertion failed') {
  if (!condition) throw new Error(errorMsg);
}
