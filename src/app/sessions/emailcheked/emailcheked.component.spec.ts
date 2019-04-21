import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailchekedComponent } from './emailcheked.component';

describe('EmailchekedComponent', () => {
  let component: EmailchekedComponent;
  let fixture: ComponentFixture<EmailchekedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailchekedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailchekedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
