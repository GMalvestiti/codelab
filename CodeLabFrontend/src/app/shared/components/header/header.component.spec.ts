import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';
import { LoginService } from '../../../login/login.service';
import { MatIconModule } from '@angular/material/icon';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let loginService: jest.Mocked<LoginService>;

  beforeEach(async () => {
    const loginServiceMock = {
      logout: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [MatIconModule, HeaderComponent],
      providers: [{ provide: LoginService, useValue: loginServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService) as jest.Mocked<LoginService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout method of LoginService when logout is called', () => {
    component.logout();
    expect(loginService.logout).toHaveBeenCalled();
  });
});
