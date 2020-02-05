import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VehicleMake } from '../_models/vehicle-make';
import { VehicleMakeService } from '../_services/vehicle-make.service';
import { VehicleMakeBase } from '../_models/vehicle-make-base';

@Injectable()
export class ModelCreateResolver implements Resolve<VehicleMakeBase[]> {

    constructor(private userService: VehicleMakeService, private router: Router, private alertify: AlertifyService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<VehicleMakeBase[]> {
        return this.userService.getMakersList().pipe(
            catchError(error => {
                this.alertify.error('Problem retriving data');
                this.router.navigate(['/vehicleMake']);
                return of(null);
            })
        );
    }
}
