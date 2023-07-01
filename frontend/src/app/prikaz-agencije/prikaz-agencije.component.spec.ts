import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazAgencijeComponent } from './prikaz-agencije.component';

describe('PrikazAgencijeComponent', () => {
  let component: PrikazAgencijeComponent;
  let fixture: ComponentFixture<PrikazAgencijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrikazAgencijeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrikazAgencijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
