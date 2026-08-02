import { Component } from '@angular/core';

import { Hero } from '../hero/hero';
import { Destinations } from '../destinations/destinations';
import { FeaturedJobs } from '../featured-jobs/featured-jobs';
import { Services } from '../services/services';
import { Testimonials } from '../testimonials/testimonials';
import { ContactBanner } from '../contact-banner/contact-banner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Hero,
    Destinations,
    FeaturedJobs,
    Services,
    Testimonials,
    ContactBanner
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}