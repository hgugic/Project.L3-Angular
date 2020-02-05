import { Injectable } from '@angular/core';

import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VehicleMake } from '../_models/vehicle-make';
import { VehicleMakeService } from '../_services/vehicle-make.service';


@Injectable()
export class MakeEditResolver implements Resolve<VehicleMake> {


    constructor(private makeService: VehicleMakeService,
                private router: Router,
                private alertify: AlertifyService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<VehicleMake> {
        return this.makeService.getMaker(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retriving your data');
                this.router.navigate(['/vehicleMake']);
                return of(null);
            })
        );
    }
}
