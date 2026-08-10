import { Component } from '@angular/core';
import { FeaturedJobsSection } from "../../sections/featured-jobs-section/featured-jobs-section";

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [FeaturedJobsSection],
  templateUrl: './jobs.html',
  styleUrl: './jobs.scss',
})
export class Jobs {}
