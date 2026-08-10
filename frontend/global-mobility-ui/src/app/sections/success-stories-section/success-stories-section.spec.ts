import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessStoriesSection } from './success-stories-section';

describe('SuccessStoriesSection', () => {
  let component: SuccessStoriesSection;
  let fixture: ComponentFixture<SuccessStoriesSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessStoriesSection],
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessStoriesSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
