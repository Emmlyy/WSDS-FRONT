import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIndicatorModalComponent } from './create-indicator-modal.component';

describe('CreateIndicatorModalComponent', () => {
  let component: CreateIndicatorModalComponent;
  let fixture: ComponentFixture<CreateIndicatorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateIndicatorModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateIndicatorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
