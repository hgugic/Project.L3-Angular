import { Component, OnInit } from '@angular/core';
import { VehicleModelService } from 'src/app/_services/vehicle-model.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { VehicleModel } from 'src/app/_models/vehicle-model';
import { Pagination, PaginatedResult } from 'src/app/_models/Pagination';
import { VehicleMakeService } from 'src/app/_services/vehicle-make.service';
import { VehicleMakeBase } from 'src/app/_models/vehicle-make-base';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css']
})
export class ModelListComponent implements OnInit {

  models: VehicleModel[];
  modelParams: any = {};
  pagination: Pagination;
  sortList = [{value: 'asc', display: 'Ascending'}, {value: 'dsc', display: 'Descending'}];
  makers: VehicleMakeBase[];

  constructor(private modelService: VehicleModelService,
              private makerService: VehicleMakeService,
              private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.models = data['models'].result;
      this.pagination = data['models'].pagination;
    });

    this.modelParams.search = '';
    this.modelParams.sortBy = '';
    this.modelParams.makeId = '';


    this.loadMakers();

  }

  deletedModel(id: string) {
    this.models.splice(this.models.findIndex(p => p.id === id), 1);
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadModels();
  }

resetFilters() {

  this.modelParams.search = '';
  this.modelParams.sortBy = '';
  this.modelParams.makeId = '';
  this.loadModels();
}


   loadModels() {
     this.modelService.getModels(this.pagination.currentPage,
                               this.pagination.itemsPerPage,
                               this.modelParams)
     .subscribe((res: PaginatedResult<VehicleModel[]>) => {
       this.models = res.result;
       this.pagination = res.pagination;
    }, error => {
       this.alertify.error(error);
    }
   );
  }

  loadMakers() {
    return this.makerService.getMakersList()
    .subscribe((res: VehicleMakeBase[]) => {
      this.makers = res;
   }, error => {
      this.alertify.error(error);
   }
  );
 }

}
