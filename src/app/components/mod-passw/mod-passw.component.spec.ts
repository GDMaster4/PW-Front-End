import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModPasswComponent } from './mod-passw.component';

describe('ModPasswComponent', () => {
  let component: ModPasswComponent;
  let fixture: ComponentFixture<ModPasswComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModPasswComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModPasswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
