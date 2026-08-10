import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferedServicesSection } from './offered-services-section';

describe('OfferedServicesSection', () => {
  let component: OfferedServicesSection;
  let fixture: ComponentFixture<OfferedServicesSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferedServicesSection],
    }).compileComponents();

    fixture = TestBed.createComponent(OfferedServicesSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
