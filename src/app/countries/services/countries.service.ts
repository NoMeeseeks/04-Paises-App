import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(private http: HttpClient) { }

  searchCapital(valorBusqueda: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${valorBusqueda}`
    return this.http.get<Country[]>(url);
  }

}
