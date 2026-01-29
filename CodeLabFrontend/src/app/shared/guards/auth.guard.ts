import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { LoginService } from '../../login/login.service';

export const authGuard: CanActivateChildFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const user = loginService.currentUser;

  if (!user) {
    loginService.logout();
    return false;
  }

  if (user.admin) {
    return true;
  }

  const data = route.data as { modulo: number };

  const hasPermission = user.modulos.includes(data.modulo);

  if (!hasPermission) {
    router.navigate(['/acesso-negado']);
    return false;
  }

  return true;
};
