import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactBanner } from './contact-banner';

describe('ContactBanner', () => {
  let component: ContactBanner;
  let fixture: ComponentFixture<ContactBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactBanner],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactBanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
