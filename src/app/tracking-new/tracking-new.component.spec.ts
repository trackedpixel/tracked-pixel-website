import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingNewComponent } from './tracking-new.component';

describe('TrackingNewComponent', () => {
  let component: TrackingNewComponent;
  let fixture: ComponentFixture<TrackingNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
