import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { EligibilityService } from '../../services/eligibility.service';

@Component({
  selector: 'app-eligibility-form-section',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './eligibility-form-section.html',
  styleUrl: './eligibility-form-section.scss',
})
export class EligibilityFormSection {

  eligibilityForm: FormGroup;

  selectedResume: File | null = null;

  constructor(private fb: FormBuilder,
    private eligibilityService: EligibilityService
  ) {

    this.eligibilityForm = this.fb.group({

      fullName: ['', Validators.required],

      age: ['', [
        Validators.required,
        Validators.min(18),
        Validators.max(65)
      ]],

      countryPreference: ['', Validators.required],

      highestEducation: ['', Validators.required],

      occupation: ['', Validators.required],

      workExperience: ['', Validators.required],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      phone: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]],

      ieltsScore: ['']

    });

  }

  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0)
      return;

    const file = input.files[0];

    const allowedExtensions = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedExtensions.includes(file.type)) {

      alert('Only PDF, DOC and DOCX files are allowed.');

      input.value = '';

      return;

    }

    if (file.size > 5 * 1024 * 1024) {

      alert('Maximum file size is 5 MB.');

      input.value = '';

      return;

    }

    this.selectedResume = file;

  }

  onSubmit(): void {

    if (this.eligibilityForm.invalid) {

      this.eligibilityForm.markAllAsTouched();

      return;
    }

    const formData = this.eligibilityForm.value;

    this.eligibilityService.submitEligibility(formData).subscribe({

      next: (response) => {

        console.log('Eligibility submitted successfully');

        console.log(response);

        alert('Your eligibility form has been submitted successfully.');

        this.eligibilityForm.reset();

        this.selectedResume = null;
      },

      error: (error) => {

        console.error('Error submitting eligibility form:', error);

        alert('Something went wrong while submitting the form.');

      }

    });
  }

}
