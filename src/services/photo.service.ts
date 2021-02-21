import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { VEGA_API_URL } from 'src/app/app-injections-tokens';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(
    private http: HttpClient,
    @Inject(VEGA_API_URL) private apiUrl: string) { }

  uploadPhoto(vehicleId, photo) {
    let formData = new FormData();
    formData.append('file', photo);
    return this.http.post(this.apiUrl + '/api/vehicles/' + vehicleId + '/photos', formData);
  }

  getPhoto(vehicleId: number) {
    return this.http.get(this.apiUrl + '/api/vehicles/' + vehicleId + '/photos', { responseType: 'blob' });
  }
}
