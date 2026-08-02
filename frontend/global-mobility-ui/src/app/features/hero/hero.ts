import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {

}