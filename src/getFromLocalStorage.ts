export function getFromLocalStorage<T>(key: string): T | null {
  if (typeof window === "undefined") {
    return null;
  }
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
}
