import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-us-section',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    RouterLink
],
  templateUrl: './contact-us-section.html',
  styleUrl: './contact-us-section.scss',
})
export class ContactUsSection {}
