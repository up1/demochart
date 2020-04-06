import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLatestComponent } from './update-latest.component';

describe('UpdateLatestComponent', () => {
  let component: UpdateLatestComponent;
  let fixture: ComponentFixture<UpdateLatestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLatestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
