export class LRUCache {
  constructor(maxSize, ttlMs) {
    this.maxSize = maxSize;
    this.ttlMs = ttlMs;
    this.map = new Map(); // key -> { value, expireAt }
  }

  _isExpired(entry) {
    return entry.expireAt < Date.now();
  }

  get(key) {
    const entry = this.map.get(key);
    if (!entry) return null;

    if (this._isExpired(entry)) {
      this.map.delete(key);
      return null;
    }

    // Move to end (most recently used)
    this.map.delete(key);
    this.map.set(key, entry);
    return entry.value;
  }

  set(key, value) {
    const expireAt = Date.now() + this.ttlMs;

    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.maxSize) {
      // delete least recently used (first entry)
      const firstKey = this.map.keys().next().value;
      this.map.delete(firstKey);
    }

    this.map.set(key, { value, expireAt });
  }
}
