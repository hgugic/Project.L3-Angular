import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleMake } from '../_models/vehicle-make';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';
import { VehicleMakeBase } from '../_models/vehicle-make-base';

@Injectable({
  providedIn: 'root'
})
export class VehicleMakeService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) {}

getMaker(id): Observable<VehicleMake> {
  return this.http.get<VehicleMake>(this.baseUrl + 'vehicleMake/' + id);
}

getMakers(page?, itemsPerPage?, makeParams?): Observable<PaginatedResult<VehicleMake[]>> {
  const paginatedResult: PaginatedResult<VehicleMake[]> = new PaginatedResult<VehicleMake[]>();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  if (makeParams != null)  {
    params = params.append('search', makeParams.search);
    params = params.append('sortBy', makeParams.sortBy);
  }

  return this.http.get<VehicleMake[]>(this.baseUrl + 'vehicleMake', { observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
}

getMakersList(): Observable<VehicleMakeBase[]> {
  return this.http.get<VehicleMakeBase[]>(this.baseUrl + 'vehicleMake/all');
}

createMaker(maker: VehicleMake) {
  return this.http.post(this.baseUrl + 'vehicleMake/create', maker);
}

updateMaker(id: string, maker: VehicleMake) {
  return this.http.put(this.baseUrl + 'vehicleMake/' + id, maker);
}

deleteMaker(makerId: string) {
  return this.http.delete(this.baseUrl + 'vehicleMake/' + makerId);
}

}
