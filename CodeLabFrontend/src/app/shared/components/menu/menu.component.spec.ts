import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MenuComponent } from './menu.component';
import { LoginService } from '../../../login/login.service';
import { IMenuPermissao } from '../../interfaces/menu-permissao.interface';
import { menuPermissao } from '../../constants/menu-permissao';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let mockRouter: any;
  let mockLoginService: any;

  beforeEach(async () => {
    mockRouter = {
      navigateByUrl: jest.fn(),
    };

    mockLoginService = {
      currentUser: {
        admin: false,
        modulos: ['modulo1', 'modulo2'],
      },
      logout: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [MatIconModule, CommonModule, MenuComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: LoginService, useValue: mockLoginService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter menu items based on user permissions', () => {
    component.ngOnInit();
    expect(component.menuItems).toEqual(
      menuPermissao.filter((menuItem) =>
        mockLoginService.currentUser.modulos.includes(menuItem.modulo)
      )
    );
  });

  it('should logout if no user is found', () => {
    mockLoginService.currentUser = null;
    component.ngOnInit();
    expect(mockLoginService.logout).toHaveBeenCalled();
  });

  it('should navigate to the correct path', () => {
    const path = '/some-path';
    component.handleNavigation(path);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(path);
  });
});
