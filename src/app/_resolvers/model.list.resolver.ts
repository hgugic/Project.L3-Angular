import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VehicleMake } from '../_models/vehicle-make';
import { VehicleModelService } from '../_services/vehicle-model.service';

@Injectable()
export class ModelListResolver implements Resolve<VehicleMake[]> {
    pageNumber = 1;
    pageSize = 6;

    constructor(private modelService: VehicleModelService, private router: Router, private alertify: AlertifyService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<VehicleMake[]> {
        return this.modelService.getModels(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retriving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
