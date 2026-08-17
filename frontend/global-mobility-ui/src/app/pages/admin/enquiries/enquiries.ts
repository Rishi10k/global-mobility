import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { EligibilityService } from '../../../services/eligibility.service';

export interface Enquiry {

  id: number;

  fullName: string;

  age: number;

  countryPreference: string;

  highestEducation: string;

  occupation: string;

  workExperience: number;

  email: string;

  phone: string;

  ieltsScore?: string;

  resumeUrl?: string;

  status: string;

  createdOn: string;
}


@Component({
  selector: 'app-enquiries',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],

  templateUrl: './enquiries.html',

  styleUrl: './enquiries.scss'
})
export class Enquiries implements OnInit {


  // ==========================================
  // FILTER VALUES
  // ==========================================

  name: string = '';

  phone: string = '';

  email: string = '';

  status: string = '';


  // ==========================================
  // ENQUIRIES
  // ==========================================

  enquiries: Enquiry[] = [];


  constructor(
    private eligibilityService: EligibilityService
  ) {}


  // ==========================================
  // PAGE LOAD
  // ==========================================

  ngOnInit(): void {

    this.loadEnquiries();

  }


  // ==========================================
  // LOAD ENQUIRIES
  // ==========================================

  loadEnquiries(): void {

    this.eligibilityService
      .getEnquiries(
        this.name,
        this.phone,
        this.email,
        this.status
      )
      .subscribe({

        next: (response) => {

          this.enquiries = response;

        },

        error: (error) => {

          console.error(
            'Error loading enquiries:',
            error
          );

        }

      });

  }


  // ==========================================
  // SEARCH
  // ==========================================

  search(): void {

    this.loadEnquiries();

  }


  // ==========================================
  // RESET FILTERS
  // ==========================================

  resetFilters(): void {

    this.name = '';

    this.phone = '';

    this.email = '';

    this.status = '';

    this.loadEnquiries();

  }


  // ==========================================
  // UPDATE STATUS
  // ==========================================

  updateStatus(
    enquiry: Enquiry,
    newStatus: string
  ): void {

    this.eligibilityService
      .updateStatus(
        enquiry.id,
        newStatus
      )
      .subscribe({

        next: () => {

          // Update the row immediately
          enquiry.status = newStatus;

          console.log(
            'Status updated successfully'
          );

        },

        error: (error) => {

          console.error(
            'Error updating status:',
            error
          );

        }

      });

  }


  // ==========================================
  // EXPORT EXCEL
  // ==========================================

  exportToExcel(): void {

    this.eligibilityService
      .exportEnquiries(
        this.name,
        this.phone,
        this.email,
        this.status
      )
      .subscribe({

        next: (file: Blob) => {

          const url =
            window.URL.createObjectURL(file);

          const link =
            document.createElement('a');

          link.href = url;

          link.download =
            'Eligibility-Enquiries.xlsx';

          link.click();

          window.URL.revokeObjectURL(url);

        },

        error: (error) => {

          console.error(
            'Error exporting enquiries:',
            error
          );

        }

      });

  }

}