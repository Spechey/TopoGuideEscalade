import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopoImageComponent } from './topoImage.component';

describe('TopoImageComponent', () => {
  let component: TopoImageComponent;
  let fixture: ComponentFixture<TopoImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopoImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopoImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
