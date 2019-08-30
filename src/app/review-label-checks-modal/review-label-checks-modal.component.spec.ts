import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewLabelChecksModalComponent } from './review-label-checks-modal.component';

describe('ReviewLabelChecksModalComponent', () => {
  let component: ReviewLabelChecksModalComponent;
  let fixture: ComponentFixture<ReviewLabelChecksModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewLabelChecksModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewLabelChecksModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
