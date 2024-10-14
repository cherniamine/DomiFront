import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotdomiciliationComponent } from './depotdomiciliation.component';

describe('DepotdomiciliationComponent', () => {
  let component: DepotdomiciliationComponent;
  let fixture: ComponentFixture<DepotdomiciliationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepotdomiciliationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepotdomiciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
