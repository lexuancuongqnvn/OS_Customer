import { ComponentFixture, TestBed } from '@angular/core/testing';

import { I45DamagedToolsEquipmentListComponent } from './i45-damaged-tools-equipment-list.component';

describe('I45DamagedToolsEquipmentListComponent', () => {
  let component: I45DamagedToolsEquipmentListComponent;
  let fixture: ComponentFixture<I45DamagedToolsEquipmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ I45DamagedToolsEquipmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(I45DamagedToolsEquipmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
