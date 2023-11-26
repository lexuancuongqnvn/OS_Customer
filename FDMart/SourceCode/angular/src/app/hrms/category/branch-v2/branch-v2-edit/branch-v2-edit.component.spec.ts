import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchV2EditComponent } from './branch-v2-edit.component';

describe('BranchV2EditComponent', () => {
  let component: BranchV2EditComponent;
  let fixture: ComponentFixture<BranchV2EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchV2EditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchV2EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
