import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsElementComponent } from './tools-element.component';

describe('ToolsElementComponent', () => {
  let component: ToolsElementComponent;
  let fixture: ComponentFixture<ToolsElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
