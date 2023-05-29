import { TestBed } from '@angular/core/testing';

import { PrefectchUsersService } from './prefectch-users.service';

describe('PrefectchUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrefectchUsersService = TestBed.get(PrefectchUsersService);
    expect(service).toBeTruthy();
  });
});
