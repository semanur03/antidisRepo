import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextManagementComponent } from './text-management.component';

describe('TextManagementComponent', () => {
  let component: TextManagementComponent;
  let fixture: ComponentFixture<TextManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
