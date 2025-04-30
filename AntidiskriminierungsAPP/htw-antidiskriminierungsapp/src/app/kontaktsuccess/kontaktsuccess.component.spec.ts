import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KontaktsuccessComponent } from './kontaktsuccess.component';

describe('KontaktsuccessComponent', () => {
  let component: KontaktsuccessComponent;
  let fixture: ComponentFixture<KontaktsuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KontaktsuccessComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(KontaktsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
