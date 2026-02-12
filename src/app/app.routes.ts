import { Routes } from '@angular/router';
import { WeatherListComponent } from './components/weather-list/weather-list.component';
import { WeatherComponent } from './components/weather/weather.component';

export const routes: Routes = [
    {path: '', redirectTo: 'weather', pathMatch: 'full' },
    {path: 'weather',component:WeatherComponent , title : 'Weather' },
    {path: 'weather-List',component:WeatherListComponent , title : 'Weather List' },
];
