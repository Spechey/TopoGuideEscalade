import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopoElementComponent } from './topo-element.component';

describe('TopoElementComponent', () => {
  let component: TopoElementComponent;
  let fixture: ComponentFixture<TopoElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopoElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopoElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
