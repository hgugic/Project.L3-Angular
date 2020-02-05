import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VehicleModelService } from 'src/app/_services/vehicle-model.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { VehicleModel } from 'src/app/_models/vehicle-model';

@Component({
  selector: 'app-model-card',
  templateUrl: './model-card.component.html',
  styleUrls: ['./model-card.component.css']
})
export class ModelCardComponent implements OnInit {
  @Input() model: VehicleModel;
  @Output() deletedModel = new EventEmitter();
  constructor(private modelService: VehicleModelService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  deleteModel(id: string) {
    this.alertify.confirm('Are you sure you want to delete this model', () => {
      this.modelService.deleteModel(id).subscribe(() => {
        this.alertify.success('Model has been deleted');
        this.deletedModel.emit({ id: this.model.id });
      }, error => this.alertify.error('Failed to delete the model'));
    });
  }

}
