import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeldesuccessComponent } from './meldesuccess.component';

describe('MeldesuccessComponent', () => {
  let component: MeldesuccessComponent;
  let fixture: ComponentFixture<MeldesuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeldesuccessComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MeldesuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
