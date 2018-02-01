import { TestBed, inject } from '@angular/core/testing';
import { StoresService } from './stores.service';

describe('StoresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoresService]
    });
  });

  it('should ...', inject([StoresService], (service: StoresService) => {
    expect(service).toBeTruthy();
  }));
});