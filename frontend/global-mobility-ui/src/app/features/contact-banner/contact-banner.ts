import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contact-banner',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './contact-banner.html',
  styleUrl: './contact-banner.scss'
})
export class ContactBanner {

}