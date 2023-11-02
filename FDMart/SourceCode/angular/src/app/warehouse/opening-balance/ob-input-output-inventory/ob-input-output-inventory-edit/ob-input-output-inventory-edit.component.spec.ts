import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObInputOutputInventoryEditComponent } from './ob-input-output-inventory-edit.component';

describe('ObInputOutputInventoryEditComponent', () => {
  let component: ObInputOutputInventoryEditComponent;
  let fixture: ComponentFixture<ObInputOutputInventoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObInputOutputInventoryEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObInputOutputInventoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
