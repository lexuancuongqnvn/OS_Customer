import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputAddComponent } from './input-add.component';

describe('InputAddComponent', () => {
  let component: InputAddComponent;
  let fixture: ComponentFixture<InputAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputAddComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
