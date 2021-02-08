import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Make } from 'src/models/make';
import { VEGA_API_URL } from 'src/app/app-injections-tokens';

@Injectable({
  providedIn: 'root'
})
export class MakeService {

  private baseApiUrl = this.apiUrl + '/api/makes/';

  constructor(private http: HttpClient,
    @Inject(VEGA_API_URL) private apiUrl: string) { }

  getMakes(): Observable<Make[]> {
    return this.http.get<Make[]>(this.baseApiUrl);
  }
}
