import { TestBed } from '@angular/core/testing';

import { PrefectchRoomsService } from './prefectch-rooms.service';

describe('PrefectchRoomsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrefectchRoomsService = TestBed.get(PrefectchRoomsService);
    expect(service).toBeTruthy();
  });
});
