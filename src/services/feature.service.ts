import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VEGA_API_URL } from 'src/app/app-injections-tokens';
import { Feature } from 'src/models/feature';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  private baseApiUrl = this.apiUrl + '/api/features/'

  constructor(private http: HttpClient,
    @Inject(VEGA_API_URL) private apiUrl: string) { }

  getFeatures(): Observable<Feature[]> {
    return this.http.get<Feature[]>(this.baseApiUrl);
  }
}
