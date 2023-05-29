import { TestBed } from '@angular/core/testing';

import { AuthRouteGuardService } from './auth-route-guard.service';

describe('AuthRouteGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthRouteGuardService = TestBed.get(AuthRouteGuardService);
    expect(service).toBeTruthy();
  });
});
