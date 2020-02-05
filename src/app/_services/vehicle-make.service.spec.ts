/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VehicleMakeService } from './vehicle-make.service';

describe('Service: VehicleMake', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleMakeService]
    });
  });

  it('should ...', inject([VehicleMakeService], (service: VehicleMakeService) => {
    expect(service).toBeTruthy();
  }));
});
