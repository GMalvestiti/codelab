import { EMenuPermissao } from '../enums/menu-permissao.enum';
import { IMenuPermissao } from '../interfaces/menu-permissao.interface';

export const menuPermissao: IMenuPermissao[] = [
  {
    label: 'Home',
    icon: 'home',
    path: '/home',
    modulo: EMenuPermissao.HOME,
  },
  {
    label: 'Usuário',
    icon: 'person',
    path: '/usuario',
    modulo: EMenuPermissao.USUARIO,
  },
  {
    label: 'Produto',
    icon: 'shopping_cart',
    path: '/produto',
    modulo: EMenuPermissao.PRODUTO,
  },
  {
    label: 'Pessoa',
    icon: 'people',
    path: '/pessoa',
    modulo: EMenuPermissao.PESSOA,
  },
  {
    label: 'Venda',
    icon: 'shopping_bag',
    path: '/venda',
    modulo: EMenuPermissao.VENDA,
  },
  {
    label: 'Recebimento',
    icon: 'download',
    path: '/recebimento',
    modulo: EMenuPermissao.RECEBIMENTO,
  },
];
