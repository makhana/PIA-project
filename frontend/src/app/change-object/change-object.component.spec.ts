import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeObjectComponent } from './change-object.component';

describe('ChangeObjectComponent', () => {
  let component: ChangeObjectComponent;
  let fixture: ComponentFixture<ChangeObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeObjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
