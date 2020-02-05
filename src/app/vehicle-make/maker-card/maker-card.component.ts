import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VehicleMake } from 'src/app/_models/vehicle-make';
import { VehicleMakeService } from 'src/app/_services/vehicle-make.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-maker-card',
  templateUrl: './maker-card.component.html',
  styleUrls: ['./maker-card.component.css']
})
export class MakerCardComponent implements OnInit {
  @Input() maker: VehicleMake;
  @Output() deletedMaker = new EventEmitter();

  constructor(private makerService: VehicleMakeService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  deleteMaker(id: string) {
    this.alertify.confirm('Are you sure you want to delete this maker', () => {
      this.makerService.deleteMaker(id).subscribe(() => {
        this.alertify.success('Maker has been deleted');
        this.deletedMaker.emit({ id: this.maker.id });
      }, error => this.alertify.error('Failed to delete the maker'));
    });
  }


}
