import { Component } from '@angular/core';
import { AboutUsSection } from "../../sections/about-us-section/about-us-section";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AboutUsSection],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {}
