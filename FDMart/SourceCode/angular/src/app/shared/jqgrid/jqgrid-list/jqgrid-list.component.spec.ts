import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JqgridListComponent } from './jqgrid-list.component';

describe('JqgridListComponent', () => {
  let component: JqgridListComponent;
  let fixture: ComponentFixture<JqgridListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JqgridListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JqgridListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
