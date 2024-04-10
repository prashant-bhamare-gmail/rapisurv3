import { AuthService } from '../shared/auth.service';

export abstract class BaseStoreService {
  constructor(private authService: AuthService) {
    // no need to clean up subscription
    this.authService.token$.subscribe(token => {
      if (!token) {
        this.cleanup();
      }
    });
  }
  abstract cleanup(): void;
}
