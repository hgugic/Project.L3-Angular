/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MakerCardComponent } from './maker-card.component';

describe('MakerCardComponent', () => {
  let component: MakerCardComponent;
  let fixture: ComponentFixture<MakerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
