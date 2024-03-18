import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map, delay, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { busqueda: '', countries: [] },
    byCountry: { busqueda: '', countries: [] },
    byRegion: { region: '', countries: [] }
  };

  constructor(private http: HttpClient) {
    this.loadToLocalStorage();
  }

  private getHttpCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(error => of([])),
        delay(1000)
      );;
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {

    const url = `${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }

  searchCapital(capital: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${capital}`;
    return this.getHttpCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = { busqueda: capital, countries: countries }),
        tap(() => this.saveToLocalStorage()),
      );
  }

  searchCountry(pais: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${pais}`;
    return this.getHttpCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountry = { busqueda: pais, countries: countries }),
        tap(() => this.saveToLocalStorage()),

      );
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getHttpCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = { countries: countries, region: region }),
        tap(() => this.saveToLocalStorage()),
      );
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
  }
  private loadToLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

}
