import { Injectable, Inject } from '@angular/core';
import { SESSION_STORAGE, LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
export interface IStorageOptions {
  target: EStorageTarget;
}

export enum EStorageTarget {
  Memory = 'Memory',
  LocalStorage = 'LocalStorage',
  SessionStorage = 'SessionStorage',
}

@Injectable({
  providedIn: 'root',
})
export class WebStorageService {
  private memoryStorage: { [key: string]: any } = {};

  constructor(
    @Inject(LOCAL_STORAGE) public localStorage: StorageService,
    @Inject(SESSION_STORAGE) public sessionStorage: StorageService,
  ) {}

  setItem(key: string, item: any, options: IStorageOptions) {
    switch (options.target) {
      case EStorageTarget.LocalStorage:
        {
          try {
            this.localStorage.set(key, item);
          } catch (e) {
            console.error('LocalStorage error', e);
          }
        }
        break;
      case EStorageTarget.SessionStorage:
        {
          try {
            this.sessionStorage.set(key, item);
          } catch (e) {
            console.error('SessionStorage error', e);
          }
        }
        break;
      case EStorageTarget.Memory:
        {
          this.memoryStorage[key] = item;
        }
        break;
      default: {
        this.memoryStorage[key] = item;
      }
    }
  }

  getItem(key: string, options: IStorageOptions) {
    let item;
    switch (options.target) {
      case EStorageTarget.LocalStorage:
        {
          item = this.localStorage.get(key);
        }
        break;
      case EStorageTarget.SessionStorage:
        {
          item = this.sessionStorage.get(key);
        }
        break;
      case EStorageTarget.Memory:
        {
          item = this.memoryStorage[key];
        }
        break;
      default: {
        item = this.memoryStorage[key];
      }
    }
    return item;
  }

  removeItem(key: string, options: IStorageOptions) {
    switch (options.target) {
      case EStorageTarget.LocalStorage:
        {
          this.localStorage.remove(key);
        }
        break;
      case EStorageTarget.SessionStorage:
        {
          this.sessionStorage.remove(key);
        }
        break;
      case EStorageTarget.Memory:
        {
          delete this.memoryStorage[key];
        }
        break;
      default: {
        delete this.memoryStorage[key];
      }
    }
  }
}
