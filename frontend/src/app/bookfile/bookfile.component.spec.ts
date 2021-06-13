import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookfileComponent } from './bookfile.component';

describe('BookfileComponent', () => {
  let component: BookfileComponent;
  let fixture: ComponentFixture<BookfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
