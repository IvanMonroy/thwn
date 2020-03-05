/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WorksPathComponent } from './works-path.component';

describe('WorksPathComponent', () => {
  let component: WorksPathComponent;
  let fixture: ComponentFixture<WorksPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
