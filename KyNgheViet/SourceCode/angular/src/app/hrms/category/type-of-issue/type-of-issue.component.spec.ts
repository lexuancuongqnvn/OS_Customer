import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfIssueComponent } from './type-of-issue.component';

describe('TypeOfIssueComponent', () => {
  let component: TypeOfIssueComponent;
  let fixture: ComponentFixture<TypeOfIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeOfIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
