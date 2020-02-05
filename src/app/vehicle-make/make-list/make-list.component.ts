import { Component, OnInit } from '@angular/core';
import { VehicleMakeService } from 'src/app/_services/vehicle-make.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { VehicleMake } from 'src/app/_models/vehicle-make';
import { Pagination, PaginatedResult } from 'src/app/_models/Pagination';


@Component({
  selector: 'app-make-list',
  templateUrl: './make-list.component.html',
  styleUrls: ['./make-list.component.css']
})
export class MakeListComponent implements OnInit {

  makers: VehicleMake[];
  makeParams: any = {};
  pagination: Pagination;
  sortList = [{value: 'asc', display: 'Ascending'}, {value: 'dsc', display: 'Descending'}];

  constructor(private makerService: VehicleMakeService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.makers = data['makers'].result;
      this.pagination = data['makers'].pagination;
    });

    this.makeParams.search = '';
    this.makeParams.sortBy = '';

  }

  deletedMaker(id: string) {
    this.makers.splice(this.makers.findIndex(p => p.id === id), 1);
  }



  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMakers();
  }

resetFilters() {

  this.makeParams.search = '';
  this.makeParams.sortBy = '';
  this.loadMakers();
}


   loadMakers() {
     this.makerService.getMakers(this.pagination.currentPage,
                               this.pagination.itemsPerPage,
                               this.makeParams)
     .subscribe((res: PaginatedResult<VehicleMake[]>) => {
       this.makers = res.result;
       this.pagination = res.pagination;
    }, error => {
       this.alertify.error(error);
    }
   );
  }



}
