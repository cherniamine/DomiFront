import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDomiComponent } from './update-domi.component';

describe('UpdateDomiComponent', () => {
  let component: UpdateDomiComponent;
  let fixture: ComponentFixture<UpdateDomiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDomiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDomiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
