import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadNewComponent } from './read-new.component';

describe('ReadNewComponent', () => {
  let component: ReadNewComponent;
  let fixture: ComponentFixture<ReadNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
