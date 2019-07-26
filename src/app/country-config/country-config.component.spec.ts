import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryConfigComponent } from './country-config.component';

describe('CountryConfigComponent', () => {
  let component: CountryConfigComponent;
  let fixture: ComponentFixture<CountryConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
