import { TestBed } from '@angular/core/testing';

import { WebStorageService, EStorageTarget } from './storage.service';

let storageService: WebStorageService;
const testKey = 'my_test_key';
const testItem = 'my_test_item';

describe('WebStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebStorageService],
    });

    storageService = TestBed.get(WebStorageService);

    // mock LocalStorage
    let store: { [key: string]: any } = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
  });

  it('should create the service', () => {
    expect(storageService).toBeTruthy();
  });

  describe('testLocalStorage', testLocalStorage);
  describe('testMemoryStorage', testMemoryStorage);
});

function testLocalStorage() {
  it('should set an item into the LocalStorage', () => {
    storageService.setItem(testKey, testItem, {
      target: EStorageTarget.LocalStorage,
    });
    expect(localStorage.getItem(testKey)).toEqual(testItem);
  });

  it('should get an item from the LocalStorage', () => {
    localStorage.setItem(testKey, testItem);
    expect(
      storageService.getItem(testKey, { target: EStorageTarget.LocalStorage }),
    ).toEqual(testItem);
  });

  it('should remove an item from the LocalStorage', () => {
    localStorage.setItem(testKey, testItem);
    storageService.removeItem(testKey, { target: EStorageTarget.LocalStorage });
    expect(localStorage.getItem(testKey)).toBeNull();
  });
}

function testMemoryStorage() {
  it('should set an item into the memory storage', () => {
    storageService.setItem(testKey, testItem, {
      target: EStorageTarget.Memory,
    });
    expect((storageService as any).memoryStorage[testKey]).toEqual(testItem);
  });

  it('should get an item into the memory storage', () => {
    (storageService as any).memoryStorage[testKey] = testItem;
    const item = storageService.getItem(testKey, {
      target: EStorageTarget.Memory,
    });
    expect(item).toEqual(testItem);
  });

  it('should remove an item from the memory storage', () => {
    (storageService as any).memoryStorage[testKey] = testItem;
    storageService.removeItem(testKey, { target: EStorageTarget.Memory });
    expect((storageService as any).memoryStorage[testKey]).toBeUndefined();
  });
}
