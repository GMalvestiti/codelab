import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackActionComponent } from './back-action.component';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

describe('BackActionComponent', () => {
  let component: BackActionComponent;
  let fixture: ComponentFixture<BackActionComponent>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [MatIconModule, BackActionComponent],
      providers: [
        {
          provide: Location,
          useValue: {
            back: jest.fn(),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackActionComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call location.back when back method is called', () => {
    component.back();
    expect(location.back).toHaveBeenCalled();
  });
});
