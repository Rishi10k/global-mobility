import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesSection } from './countries-section';

describe('CountriesSection', () => {
  let component: CountriesSection;
  let fixture: ComponentFixture<CountriesSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountriesSection],
    }).compileComponents();

    fixture = TestBed.createComponent(CountriesSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
