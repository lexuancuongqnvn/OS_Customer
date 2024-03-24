import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObInputOutputInventoryViewComponent } from './ob-input-output-inventory-view.component';

describe('ObInputOutputInventoryViewComponent', () => {
  let component: ObInputOutputInventoryViewComponent;
  let fixture: ComponentFixture<ObInputOutputInventoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObInputOutputInventoryViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObInputOutputInventoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
