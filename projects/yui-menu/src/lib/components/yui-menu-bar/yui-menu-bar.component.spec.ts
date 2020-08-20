import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YuiMenuBarComponent } from './yui-menu-bar.component';

describe('YuiMenuBarComponent', () => {
  let component: YuiMenuBarComponent;
  let fixture: ComponentFixture<YuiMenuBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YuiMenuBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YuiMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
