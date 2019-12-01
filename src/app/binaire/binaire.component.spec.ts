import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaireComponent } from './binaire.component';

describe('BinaireComponent', () => {
  let component: BinaireComponent;
  let fixture: ComponentFixture<BinaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
