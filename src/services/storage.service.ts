import { StorageEnums } from '../utils';

export class StorageService {
  public static setToLocal(key: StorageEnums, value: any, expiry = 86400000) {
    const now = new Date();

    const cacheValue = {
      value,
      expiryTime: now.getTime() + expiry,
    };

    localStorage.setItem(key, JSON.stringify(cacheValue));
  }

  public static saveToSession(
    key: StorageEnums,
    value: any,
    expiry = 10800000,
  ) {
    const now = new Date();

    const sessionValue = {
      value,
      expiryTime: now.getTime() + expiry,
    };

    sessionStorage.setItem(key, JSON.stringify(sessionValue));
  }

  public static getFromLocal<ResponseType>(
    key: StorageEnums,
  ): ResponseType | null {
    const cacheData = localStorage.getItem(key);

    if (!cacheData) {
      return null;
    }

    const data: { value: any; expiryTime: number } = JSON.parse(cacheData);

    if (new Date().getTime() > data.expiryTime) {
      localStorage.removeItem(key);
      return null;
    } else {
      return data.value as ResponseType;
    }
  }

  public static removeFromLocal(key: StorageEnums | StorageEnums[]): void {
    Array.isArray(key) ?
      key.forEach((cache) => localStorage.removeItem(cache)) :
      localStorage.removeItem(key);
  }

  public static getFromSession<ResponseType>(
    key: StorageEnums,
  ): ResponseType | null {
    // works similar to the cache storage

    const cacheData = sessionStorage.getItem(key);

    if (!cacheData) {
      return null;
    }

    const data: { value: any; expiryTime: number } = JSON.parse(cacheData);

    if (new Date().getTime() > data.expiryTime) {
      sessionStorage.removeItem(key);
      return null;
    } else {
      return data.value as ResponseType;
    }
  }

  public static removeFromSession(key: StorageEnums | StorageEnums[]): void {
    Array.isArray(key) ?
      key.forEach((cache) => sessionStorage.removeItem(cache)) :
      sessionStorage.removeItem(key);
  }
}
