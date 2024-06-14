import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DureeTrajetComponent } from './duree-trajet.component';

describe('DureeTrajetComponent', () => {
  let component: DureeTrajetComponent;
  let fixture: ComponentFixture<DureeTrajetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DureeTrajetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DureeTrajetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
