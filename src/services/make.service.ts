import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Make } from 'src/models/make';

@Injectable({
  providedIn: 'root'
})
export class MakeService {

  constructor(private http: HttpClient) { }

  getMakes(): Observable<Make[]> {
    return this.http.get<Make[]>('http://localhost:50000/api/makes');
  }


}
