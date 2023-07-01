import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAdminAgencyComponent } from './show-admin-agency.component';

describe('ShowAdminAgencyComponent', () => {
  let component: ShowAdminAgencyComponent;
  let fixture: ComponentFixture<ShowAdminAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAdminAgencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAdminAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
