import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeldeformularComponent } from './meldeformular.component';

describe('MeldeformularComponent', () => {
  let component: MeldeformularComponent;
  let fixture: ComponentFixture<MeldeformularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeldeformularComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MeldeformularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
