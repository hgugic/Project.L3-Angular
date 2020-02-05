/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MakeListComponent } from './make-list.component';

describe('MakeListComponent', () => {
  let component: MakeListComponent;
  let fixture: ComponentFixture<MakeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
