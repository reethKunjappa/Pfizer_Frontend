import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityChecklistComponent } from './quality-checklist.component';

describe('QualityChecklistComponent', () => {
  let component: QualityChecklistComponent;
  let fixture: ComponentFixture<QualityChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
