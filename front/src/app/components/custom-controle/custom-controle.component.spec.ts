import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomControleComponent } from './custom-controle.component';

describe('CustomControleComponent', () => {
  let component: CustomControleComponent;
  let fixture: ComponentFixture<CustomControleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomControleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomControleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
