import { Component } from '@angular/core';
import { CountriesSection } from "../../sections/countries-section/countries-section";

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CountriesSection],
  templateUrl: './countries.html',
  styleUrl: './countries.scss',
})
export class Countries {}
