import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovFiltersComponent } from './mov-filters.component';

describe('MovFiltersComponent', () => {
  let component: MovFiltersComponent;
  let fixture: ComponentFixture<MovFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovFiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
