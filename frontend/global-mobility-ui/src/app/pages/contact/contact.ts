import { Component } from '@angular/core';
import { ContactUsSection } from "../../sections/contact-us-section/contact-us-section";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactUsSection],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {}
