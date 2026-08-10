import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EligibilityFormSection } from './eligibility-form-section';

describe('EligibilityFormSection', () => {
  let component: EligibilityFormSection;
  let fixture: ComponentFixture<EligibilityFormSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EligibilityFormSection],
    }).compileComponents();

    fixture = TestBed.createComponent(EligibilityFormSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
