import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetincontactComponent } from './getincontact.component';

describe('GetincontactComponent', () => {
  let component: GetincontactComponent;
  let fixture: ComponentFixture<GetincontactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetincontactComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GetincontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
