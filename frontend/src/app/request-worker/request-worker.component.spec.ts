import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestWorkerComponent } from './request-worker.component';

describe('RequestWorkerComponent', () => {
  let component: RequestWorkerComponent;
  let fixture: ComponentFixture<RequestWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestWorkerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
