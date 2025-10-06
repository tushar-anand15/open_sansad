export default function localStorageAvailable() {
  try {
    const key = '__test__';
    window.localStorage.setItem(key, key);
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}
