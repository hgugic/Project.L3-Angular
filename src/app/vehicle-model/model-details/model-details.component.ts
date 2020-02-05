import { Component, OnInit } from '@angular/core';
import { VehicleModelService } from 'src/app/_services/vehicle-model.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { VehicleModel } from 'src/app/_models/vehicle-model';

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css']
})
export class ModelDetailsComponent implements OnInit {
model: VehicleModel;

  constructor(private modelService: VehicleModelService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.model = data['model'];
    });
  }

}
