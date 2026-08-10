import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-success-stories-section',
  
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './success-stories-section.html',
  styleUrl: './success-stories-section.scss',
})
export class SuccessStoriesSection {}
