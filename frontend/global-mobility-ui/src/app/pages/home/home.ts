import { Component } from '@angular/core';

import { HeroSection } from '../../sections/hero-section/hero-section';
import { SuccessStoriesSection } from '../../sections/success-stories-section/success-stories-section';
import { EligibilityFormSection } from "../../sections/eligibility-form-section/eligibility-form-section";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSection,
    SuccessStoriesSection,
    EligibilityFormSection
],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}