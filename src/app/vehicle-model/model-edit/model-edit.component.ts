import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { VehicleModelService } from 'src/app/_services/vehicle-model.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { VehicleModel } from 'src/app/_models/vehicle-model';
import { NgForm } from '@angular/forms';
import { VehicleMakeService } from 'src/app/_services/vehicle-make.service';
import { VehicleMakeBase } from 'src/app/_models/vehicle-make-base';

@Component({
  selector: 'app-model-edit',
  templateUrl: './model-edit.component.html',
  styleUrls: ['./model-edit.component.css']
})
export class ModelEditComponent implements OnInit {

  @ViewChild('editForm', {static: true}) editForm: NgForm;
model: VehicleModel;
makers: VehicleMakeBase[];
bsConfig: Partial<BsDatepickerConfig>;
@HostListener('window:beforeunload', ['$event'])
unloadNotification($event: any) {
  if (this.editForm.dirty) {
    $event.returnValue = true;
  }
}

  constructor(private modelService: VehicleModelService,
              private makerService: VehicleMakeService,
              private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {


    this.route.data.subscribe(data => {
      this.model = data['model'];
    });

    this.loadMakers();
  }

  updateModel() {
    this.modelService.updateModel(this.model.id, this.model).subscribe(next => {
      this.alertify.success('Model updated successfully');
      this.editForm.reset(this.model);
    }, error => {
      this.alertify.error(error);
    });
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
