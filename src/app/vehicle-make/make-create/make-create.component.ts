import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { VehicleMakeService } from 'src/app/_services/vehicle-make.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { VehicleMake } from 'src/app/_models/vehicle-make';

@Component({
  selector: 'app-make-create',
  templateUrl: './make-create.component.html',
  styleUrls: ['./make-create.component.css']
})
export class MakeCreateComponent implements OnInit {
  @Output() cancelForm = new EventEmitter();
  maker: VehicleMake;
  makeForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private makeService: VehicleMakeService,
              private alertify: AlertifyService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    },
    this.createMakeForm();
  }

  createMakeForm() { // validacija upisa
    this.makeForm = this.fb.group({
       name: ['', Validators.required],
       abrv: ['', Validators.required],
       founded: [null, Validators.required],
       city: ['', Validators.required],
       country: ['', Validators.required],
    });
  }

  createMake() {
    if (this.makeForm.valid) {
      this.maker = Object.assign({}, this.makeForm.value);
      this.makeService.createMaker(this.maker).subscribe(() => {
        this.alertify.success('Vehicle maker is created');
      }, error => {
        this.alertify.error(error);
      });
    }
  }


}
