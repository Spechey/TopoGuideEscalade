import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnMapLayoutComponent } from './onMap-layout.component';

describe('onMapLayoutComponent', () => {
  let component: OnMapLayoutComponent;
  let fixture: ComponentFixture<OnMapLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnMapLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnMapLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
