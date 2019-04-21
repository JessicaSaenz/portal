import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailvalidationComponent } from './emailvalidation.component';

describe('EmailvalidationComponent', () => {
  let component: EmailvalidationComponent;
  let fixture: ComponentFixture<EmailvalidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailvalidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailvalidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
