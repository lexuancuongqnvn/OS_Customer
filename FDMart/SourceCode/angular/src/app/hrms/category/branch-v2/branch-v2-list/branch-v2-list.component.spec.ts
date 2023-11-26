import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchV2ListComponent } from './branch-v2-list.component';

describe('BranchV2ListComponent', () => {
  let component: BranchV2ListComponent;
  let fixture: ComponentFixture<BranchV2ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchV2ListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchV2ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
