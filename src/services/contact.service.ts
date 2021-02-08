import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VEGA_API_URL } from 'src/app/app-injections-tokens';
import { Contact } from 'src/models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private baseApiUrl = this.apiUrl + '/api/contacts/';

  constructor(private http: HttpClient,
    @Inject(VEGA_API_URL) private apiUrl: string) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.baseApiUrl);
  }
}
