import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageTranslateEditComponent } from './language-translate-edit.component';

describe('LanguageTranslateEditComponent', () => {
  let component: LanguageTranslateEditComponent;
  let fixture: ComponentFixture<LanguageTranslateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageTranslateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageTranslateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
