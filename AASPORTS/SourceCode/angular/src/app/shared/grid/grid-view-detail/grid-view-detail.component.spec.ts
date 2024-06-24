import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridViewDetailComponent } from './grid-view-detail.component';

describe('GridViewDetailComponent', () => {
  let component: GridViewDetailComponent;
  let fixture: ComponentFixture<GridViewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridViewDetailComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
