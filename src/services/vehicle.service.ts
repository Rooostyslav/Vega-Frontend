import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VEGA_API_URL } from 'src/app/app-injections-tokens';
import { QueryResult } from 'src/models/queryResult';
import { SaveVehicle } from 'src/models/saveVehicle';
import { Vehicle } from 'src/models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private baseAPiUrl = this.apiUrl + '/api/vehicles';

  constructor(private http: HttpClient,
    @Inject(VEGA_API_URL) private apiUrl: string) { }

  getVehicle(id): Observable<Vehicle> {
    return this.http.get<Vehicle>(this.baseAPiUrl + '/' + id);
  }

  getVehicles(filter): Observable<QueryResult> {
    return this.http.get<QueryResult>(this.baseAPiUrl + '?' + this.filterToQueryString(filter));
  }

  filterToQueryString(filter): string {
    var keyValueStrings = [];
    for (var property in filter) {
      var value = filter[property];
      if (value) {
        keyValueStrings.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
      }
    }
    return keyValueStrings.join('&');
  }

  createVehicle(vehicle: SaveVehicle) {
    return this.http.post(this.baseAPiUrl, vehicle);
  }

  updateVehicle(vehicle: SaveVehicle) {
    return this.http.put(this.baseAPiUrl + '/' + vehicle.id, vehicle);
  }

  deleteVehicle(id) {
    return this.http.delete(this.baseAPiUrl + '/' + id);
  }
}
