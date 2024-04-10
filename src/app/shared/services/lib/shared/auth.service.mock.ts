import { BehaviorSubject } from 'rxjs';

export class MockAuthService {
  private token = new BehaviorSubject<string>('');

  constructor() {}

  public get token$() {
    return this.token.asObservable();
  }
}
