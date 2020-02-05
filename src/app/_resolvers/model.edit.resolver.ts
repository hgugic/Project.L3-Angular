import { Injectable } from '@angular/core';

import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VehicleModel } from '../_models/vehicle-model';
import { VehicleModelService } from '../_services/vehicle-model.service';


@Injectable()
export class ModelEditResolver implements Resolve<VehicleModel> {


    constructor(private modelService: VehicleModelService,
                private router: Router,
                private alertify: AlertifyService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<VehicleModel> {
        return this.modelService.getModel(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retriving your data');
                this.router.navigate(['/vehicleModel']);
                return of(null);
            })
        );
    }
}
