import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionEditComponent } from './profession-edit.component';

describe('ProfessionEditComponent', () => {
  let component: ProfessionEditComponent;
  let fixture: ComponentFixture<ProfessionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
