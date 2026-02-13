import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { CountriesService } from '../../services/countries.service';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css'],
  providers: [
    WeatherService,
    CountriesService,
    // importProvidersFrom(provideHttpClient())
  ]
})
export class WeatherListComponent implements OnInit {
  searchText: string = '';
  weatherList: any[] = [];
  filteredWeatherList: any[] = [];
  SortBy: string = '';
  SortByAscending: boolean = false;

  constructor(
    private router: Router,
    private weatherService: WeatherService,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.countriesService.getAllCountries().subscribe((countries: any) => {
      countries.forEach((country: any, index: number) => {
        if (country.latlng?.length === 2 && index < 200) { // أول 50 دولة لتخفيف الحمل
          const [lat, lon] = country.latlng;
          const name = country.name.common;

          this.weatherService.getWeather(lat, lon).subscribe({
            next: (data) => {
              this.weatherList.push({ city: name, ...data.current_weather });
              this.filteredWeatherList = [...this.weatherList];
            },
            error: (err) => console.error(err)
          });
        }
      });
    });
  }

  filterWeatherList() {
    if (!this.searchText) {
      this.filteredWeatherList = [...this.weatherList];
    } else {
      this.filteredWeatherList = this.weatherList.filter(item =>
        item.city.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  SortWeatherList(property: string) {
    this.SortBy = property;
    this.SortByAscending = !this.SortByAscending;
    this.filteredWeatherList.sort((a, b) => {
      const avalue = a[property];
      const bvalue = b[property];
      if (avalue < bvalue) return this.SortByAscending ? -1 : 1;
      if (avalue > bvalue) return this.SortByAscending ? 1 : -1;
      return 0;
    });
  }

  navigateToWeather(temperature: number) {
    this.router.navigate(['/weather'], { queryParams: { temperature } });
  }
}
