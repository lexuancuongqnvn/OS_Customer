import { ComponentFixture, TestBed } from '@angular/core/testing';

import { I45DamagedToolsEquipmentEditComponent } from './i45-damaged-tools-equipment-edit.component';

describe('I45DamagedToolsEquipmentEditComponent', () => {
  let component: I45DamagedToolsEquipmentEditComponent;
  let fixture: ComponentFixture<I45DamagedToolsEquipmentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ I45DamagedToolsEquipmentEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(I45DamagedToolsEquipmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
