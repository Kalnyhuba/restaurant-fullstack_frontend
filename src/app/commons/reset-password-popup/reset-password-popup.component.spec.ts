import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordPopupComponent } from './reset-password-popup.component';

describe('ResetPasswordPopupComponent', () => {
  let component: ResetPasswordPopupComponent;
  let fixture: ComponentFixture<ResetPasswordPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
