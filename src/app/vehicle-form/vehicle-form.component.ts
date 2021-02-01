import { Component, OnInit } from '@angular/core';
import { Feature } from 'src/models/feature';
import { Make } from 'src/models/make';
import { Model } from 'src/models/model';
import { FeatureService } from 'src/services/feature.service';
import { MakeService } from 'src/services/make.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  makes: Array<Make>;
  models: Array<Model>;
  features: Array<Feature>;
  vehicle: any = {};

  constructor(
    private makeService: MakeService,
    private featureService: FeatureService) {}

  ngOnInit(): void {
    this.makeService.getMakes().subscribe(
      res => this.makes = res);

    this.featureService.getFeatures().subscribe(
      res => this.features = res);
  }

  onMakeChange() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }

}
