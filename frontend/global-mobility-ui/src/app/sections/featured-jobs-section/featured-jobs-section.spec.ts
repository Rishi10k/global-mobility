import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedJobsSection } from './featured-jobs-section';

describe('FeaturedJobsSection', () => {
  let component: FeaturedJobsSection;
  let fixture: ComponentFixture<FeaturedJobsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedJobsSection],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedJobsSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
