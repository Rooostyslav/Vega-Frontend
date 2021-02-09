import { Component, OnInit, ViewChild } from '@angular/core';
import { title } from 'process';
import { Make } from 'src/models/make';
import { Model } from 'src/models/model';
import { Vehicle } from 'src/models/vehicle';
import { MakeService } from 'src/services/make.service';
import { VehicleService } from 'src/services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE = 3;

  vehicles: Vehicle[];
  makes: Make[];
  models: Model[];
  totalPages: number;
  filter: any = {
    isSortAscending: true,
    pageSize: this.PAGE_SIZE,
    page: 1
  };
  columns = [
    { title: '#', key:  'Id', isSortable: true },
    { title: 'Made', key: 'made', isSortable: true },
    { title: 'Model', key: 'Model', isSortable: true },
    { title: 'Contact Name', key: 'contacnName', isSortable: true },
    { title: 'View', key: '', isSortable: false }
  ];

  constructor(
    private vehicleService: VehicleService,
    private makeService: MakeService) { }

  ngOnInit(): void {
    this.populateVehicles();

    this.makeService.getMakes()
      .subscribe(makes => this.makes = makes);
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.filter)
      .subscribe(result => {
        this.vehicles = result.items;
        this.totalPages = Math.ceil(result.totalItems / this.filter.pageSize);
      });
  }

  onFilterChange() {
    this.populateVehicles();

    var selectedMake = this.makes ? this.makes.find(m => m.id == this.filter.makeId) : undefined;
    this.models = selectedMake ? selectedMake.models : [];
    delete this.filter.modelId;
  }

  sortBy(columnName: string) {
    if (this.filter.sortBy === columnName) {
      this.filter.isSortAscending = !this.filter.isSortAscending;
    } else {
      this.filter.sortBy = columnName;
      this.filter.isSortAscending = !this.filter.isSortAscending;
    }
    this.populateVehicles();
  }

  resetFilter() {
    this.filter = {
      isSortAscending: true,
      pageSize: this.PAGE_SIZE,
      page: 1
    };
    this.populateVehicles();
  }

  onChangedPage(page: number) {
    this.filter.page = page;
    this.populateVehicles();
  }

  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }
}
