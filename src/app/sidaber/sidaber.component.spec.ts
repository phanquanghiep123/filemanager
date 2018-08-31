import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidaberComponent } from './sidaber.component';

describe('SidaberComponent', () => {
  let component: SidaberComponent;
  let fixture: ComponentFixture<SidaberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidaberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidaberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
