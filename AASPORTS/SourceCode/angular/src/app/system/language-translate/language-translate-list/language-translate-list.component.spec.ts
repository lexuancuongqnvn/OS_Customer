import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageTranslateListComponent } from './language-translate-list.component';

describe('LanguageTranslateListComponent', () => {
  let component: LanguageTranslateListComponent;
  let fixture: ComponentFixture<LanguageTranslateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageTranslateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageTranslateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
