import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingSpecComponent } from './mapping-spec.component';

describe('MappingSpecComponent', () => {
  let component: MappingSpecComponent;
  let fixture: ComponentFixture<MappingSpecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingSpecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
