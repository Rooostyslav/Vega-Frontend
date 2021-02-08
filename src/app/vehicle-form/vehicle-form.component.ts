import * as _ from 'underscore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/models/contact';
import { Feature } from 'src/models/feature';
import { Make } from 'src/models/make';
import { Model } from 'src/models/model';
import { ContactService } from 'src/services/contact.service';
import { FeatureService } from 'src/services/feature.service';
import { MakeService } from 'src/services/make.service';
import { VehicleService } from 'src/services/vehicle.service';
import { SaveVehicle } from 'src/models/saveVehicle';
import { Vehicle } from 'src/models/vehicle';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  makes: Make[];
  models: Model[];
  features: Feature[];
  contacts: Contact[];
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contactId: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private makeService: MakeService,
    private featureService: FeatureService,
    private contactService: ContactService,
    private vehicleService: VehicleService,
    private toastyService: ToastyService) {
      route.params.subscribe(p => {
        this.vehicle.id = +p['id'];
      });
    }

  ngOnInit(): void {
    this.makeService.getMakes()
    .subscribe(makes => this.makes = makes);

    this.featureService.getFeatures()
      .subscribe(features => this.features = features);

    this.contactService.getContacts()
      .subscribe(contacts => this.contacts = contacts);

    if (this.vehicle.id) {
      this.vehicleService.getVehicle(this.vehicle.id)
      .subscribe(vehicle => {
        this.setVehicle(vehicle);
        this.populateModels();
      }, error => {
        if (error.status == 404) {
          this.router.navigate(['vehicles/new']);
        }
      });
    }
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.made.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contactId = v.contact.id
    this.vehicle.features = _.pluck(v.features, 'id');
  }

  onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }

  private populateModels() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }

  onFeatureToggle(featureId, $event) {
    if ($event.target.checked)
    {
      this.vehicle.features.push(featureId);
    }
    else
    {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  onSubmit() {
    if (this.vehicle.id) {
      this.vehicleService.updateVehicle(this.vehicle)
        .subscribe(res => {
          this.toastyService.success({
            title: 'Success',
            msg: 'The vehicle was sucessfully updated.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });

          this.router.navigate(['/vehicles/new']);
        });
    }
    else if (confirm("Create new Vehicle?")) {
      this.vehicleService.createVehicle(this.vehicle)
        .subscribe(res => {
          this.toastyService.success({
            title: 'Success',
            msg: 'The vehicle was sucessfully created.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });

          this.router.navigate(['/vehicles/new']);
        });
    }

  }

  onDelete() {
    if (confirm("Delete vehicle with id = " + this.vehicle.id + " ?")) {
      this.vehicleService.deleteVehicle(this.vehicle.id)
        .subscribe(res => {
          this.toastyService.success({
            title: 'Success',
            msg: 'The vehicle was sucessfully deleted.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });

          this.router.navigate(['/vehicles/new']);
        });
    }
  }

}
