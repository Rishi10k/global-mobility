import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-offered-services-section',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './offered-services-section.html',
  styleUrl: './offered-services-section.scss',
})
export class OfferedServicesSection {}
