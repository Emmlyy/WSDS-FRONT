import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedNewsSearchComponentComponent } from './saved-news-search-component.component';

describe('SavedNewsSearchComponentComponent', () => {
  let component: SavedNewsSearchComponentComponent;
  let fixture: ComponentFixture<SavedNewsSearchComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavedNewsSearchComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavedNewsSearchComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
