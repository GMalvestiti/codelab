import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LoginService } from '../../../login/login.service';
import { menuPermissao } from '../../constants/menu-permissao';
import { IMenuPermissao } from '../../interfaces/menu-permissao.interface';

@Component({
  selector: 'cl-menu',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  constructor(
    private readonly _router: Router,
    private readonly _loginService: LoginService,
  ) {}

  menuItems: IMenuPermissao[] = [];

  ngOnInit(): void {
    this.handleMenuPermissao();
  }

  private handleMenuPermissao() {
    const user = this._loginService.currentUser;

    if (!user) {
      return this._loginService.logout();
    }

    this.menuItems = menuPermissao.filter((menuItem) => {
      return user?.admin || user?.modulos.includes(menuItem.modulo);
    });
  }

  handleNavigation(path: string): void {
    this._router.navigateByUrl(path);
  }
}
