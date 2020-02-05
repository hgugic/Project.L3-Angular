import { Component, OnInit, Input } from '@angular/core';
import { VehicleMake } from 'src/app/_models/vehicle-make';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-make-details',
  templateUrl: './make-details.component.html',
  styleUrls: ['./make-details.component.css']
})
export class MakeDetailsComponent implements OnInit {
  maker: VehicleMake;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.maker = data['maker'];
    });
  }

}
