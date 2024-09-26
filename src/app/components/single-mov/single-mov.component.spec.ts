import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMovComponent } from './single-mov.component';

describe('SingleMovComponent', () => {
  let component: SingleMovComponent;
  let fixture: ComponentFixture<SingleMovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleMovComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleMovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
