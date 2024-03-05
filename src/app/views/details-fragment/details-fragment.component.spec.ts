import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFragmentComponent } from './details-fragment.component';

describe('DetailsFragmentComponent', () => {
  let component: DetailsFragmentComponent;
  let fixture: ComponentFixture<DetailsFragmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsFragmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
