import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousreparationEditDialogComponent } from './sousreparation-edit-dialog.component';

describe('SousreparationEditDialogComponent', () => {
  let component: SousreparationEditDialogComponent;
  let fixture: ComponentFixture<SousreparationEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SousreparationEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SousreparationEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
