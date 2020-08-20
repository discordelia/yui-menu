import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YuiMenuComponent } from './yui-menu.component';

describe('YuiMenuComponent', () => {
  let component: YuiMenuComponent;
  let fixture: ComponentFixture<YuiMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YuiMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YuiMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
