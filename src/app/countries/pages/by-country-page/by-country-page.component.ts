import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {
  public countries: Country[] = [];

  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {

  }
  searchByCountry(value: string): void {
    this.isLoading = true;
    this.countriesService.searchCountry(value).subscribe(countries => {
      this.countries = countries
      this.isLoading = false;

    });
  }
}
