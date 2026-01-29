import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddActionComponent } from './add-action.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

describe('AddActionComponent', () => {
  let component: AddActionComponent;
  let fixture: ComponentFixture<AddActionComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [MatIconModule, AddActionComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddActionComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to ../cadastro when add method is called', () => {
    component.add();
    expect(router.navigate).toHaveBeenCalledWith(['../cadastro'], { relativeTo: activatedRoute });
  });
});
