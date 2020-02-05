import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleModel } from '../_models/vehicle-model';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleModelService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) {}

getModel(id): Observable<VehicleModel> {
  return this.http.get<VehicleModel>(this.baseUrl + 'vehicleModel/' + id);
}

getModels(page?, itemsPerPage?, modelParams?): Observable<PaginatedResult<VehicleModel[]>> {
  const paginatedResult: PaginatedResult<VehicleModel[]> = new PaginatedResult<VehicleModel[]>();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  if (modelParams != null)  {
    params = params.append('search', modelParams.search);
    params = params.append('makeId', modelParams.makeId);
    params = params.append('sortBy', modelParams.sortBy);
  }

  return this.http.get<VehicleModel[]>(this.baseUrl + 'vehicleModel', { observe: 'response', params})
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

createModel(model: VehicleModel) {
  return this.http.post(this.baseUrl + 'vehicleModel/create', model);
}

updateModel(id: string, model: VehicleModel) {
  return this.http.put(this.baseUrl + 'vehicleModel/' + id, model);
}

deleteModel(id: string) {
  return this.http.delete(this.baseUrl + 'vehicleModel/' + id);
}

}
