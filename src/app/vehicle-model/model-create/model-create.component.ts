import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { VehicleModelService } from 'src/app/_services/vehicle-model.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { VehicleModel } from 'src/app/_models/vehicle-model';
import { VehicleMakeService } from 'src/app/_services/vehicle-make.service';
import { VehicleMake } from 'src/app/_models/vehicle-make';
import { VehicleMakeBase } from 'src/app/_models/vehicle-make-base';

@Component({
  selector: 'app-model-create',
  templateUrl: './model-create.component.html',
  styleUrls: ['./model-create.component.css']
})
export class ModelCreateComponent implements OnInit {
  @Output() cancelForm = new EventEmitter();
  model: VehicleModel;
  makers: VehicleMakeBase[];
  modelForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private modelService: VehicleModelService,
              private makerService: VehicleMakeService,
              private alertify: AlertifyService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.makers = data['makers'];
    });




    this.bsConfig = {
      containerClass: 'theme-red'
    },
    this.createModelForm();
  }

  createModelForm() { // validacija upisa
    this.modelForm = this.fb.group({
       name: ['', Validators.required],
       abrv: ['', Validators.required],
       year: [null, Validators.required],
       type: ['', Validators.required],
       engine: ['', Validators.required],
       description: ['', Validators.required],
       makeId: ['', Validators.required],
    });
  }

  createModel() {
    if (this.modelForm.valid) {
      this.model = Object.assign({}, this.modelForm.value);
      this.modelService.createModel(this.model).subscribe(() => {
        this.alertify.success('Vehicle model is created');
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  loadMakers() {
    this.makerService.getMakersList()
    .subscribe((res: VehicleMakeBase[]) => {
      this.makers = res;
      console.log(this.makers.length + ' makers');
   }, error => {
      this.alertify.error(error);
   }
  );
 }

}
