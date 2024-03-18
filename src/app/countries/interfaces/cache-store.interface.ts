import { Country } from "./country.interface"
import { Region } from "./region.type"

export interface CacheStore {
  byCapital: SearchCountry;
  byCountry: SearchCountry;
  byRegion: RegionCountries;
}

export interface SearchCountry {
  busqueda: string;
  countries: Country[];
}

export interface RegionCountries {
  region: Region;
  countries: Country[]
}
