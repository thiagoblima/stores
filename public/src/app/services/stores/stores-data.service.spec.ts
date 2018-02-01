import { TestBed, inject } from '@angular/core/testing';
import { StoresTypeService } from './stores-data.service';

describe('StoresTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoresTypeService]
    });
  });

  it('should ...', inject([StoresTypeService], (service: StoresTypeService) => {
    expect(service).toBeTruthy();
  }));
});
