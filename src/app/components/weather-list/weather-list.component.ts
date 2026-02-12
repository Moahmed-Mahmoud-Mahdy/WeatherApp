import { fileURLToPath } from 'node:url';
import { Router } from '@angular/router';
import { routes } from './../../app.routes';
import { Component } from '@angular/core';
import { query } from 'express';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './weather-list.component.html',
  styleUrl: './weather-list.component.css'
})
export class WeatherListComponent {
  searchText: string = '';

  weatherList : any[] = [
    { city: "New York", temperature: 18 },
    { city: "Cairo", temperature: 34 },
    { city: "Tokyo", temperature: 25}
  ];  

  filteredWeatherList: any[] = [];
  SortBy: string = '';
  SortByAscending: boolean = false;


  
  constructor(private router: Router) {
    this.filteredWeatherList = this.weatherList;
  }
 navigateToWeather(temperature: number) 
 {
      this.router.navigate(['/weather'], {queryParams: {temperature}});
 }


filterWeatherList() {

  if (!this.searchText) {
this.filteredWeatherList = this.weatherList;

}
else {
  this.filteredWeatherList = this.weatherList.filter(cityWeather => cityWeather.city.toLowerCase().includes(this.searchText.toLowerCase()));
}

}


SortWeatherList(proparty: string)
{
  this.SortBy = proparty;
  this.SortByAscending = !this.SortByAscending;
  this.filteredWeatherList.sort((a, b) => { 
    const avalue = a[proparty];
    const bvalue = b[proparty];

    if(avalue < bvalue) {
      return this.SortByAscending ? -1 : 1;
    }else if(avalue > bvalue) {
      return this.SortByAscending ? 1 : -1;
    }else{
      return 0;
    }

  });
}


}