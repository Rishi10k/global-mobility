import { Component } from '@angular/core';
import { OfferedServicesSection } from "../../sections/offered-services-section/offered-services-section";

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [OfferedServicesSection],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {}
