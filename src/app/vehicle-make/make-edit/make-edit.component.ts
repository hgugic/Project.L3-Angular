import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import { VehicleMakeService } from 'src/app/_services/vehicle-make.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { VehicleMake } from 'src/app/_models/vehicle-make';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-make-edit',
  templateUrl: './make-edit.component.html',
  styleUrls: ['./make-edit.component.css']
})
export class MakeEditComponent implements OnInit {
  @ViewChild('editForm', {static: true}) editForm: NgForm;
maker: VehicleMake;
bsConfig: Partial<BsDatepickerConfig>;
@HostListener('window:beforeunload', ['$event'])
unloadNotification($event: any) {
  if (this.editForm.dirty) {
    $event.returnValue = true;
  }
}

  constructor(private makeService: VehicleMakeService,
              private alertify: AlertifyService,
              private fb: FormBuilder,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.maker = data['maker'];
    });
  }

  updateMaker() {
    this.makeService.updateMaker(this.maker.id, this.maker).subscribe(next => {
      this.alertify.success('Maker updated successfully');
      this.editForm.reset(this.maker);
    }, error => {
      this.alertify.error(error);
    });
  }

}
