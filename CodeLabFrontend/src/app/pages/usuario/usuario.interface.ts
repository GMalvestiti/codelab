import { EMenuPermissao } from '../../shared/enums/menu-permissao.enum';

export interface IUsuario {
  id: number;
  nome: string;
  email: string;
  ativo: boolean;
  admin: boolean;
  permissao: IPermissao[];
}

export interface IPermissao {
  id: number;
  idUsuario: number;
  modulo: EMenuPermissao;
  label?: string;
  checked?: boolean;
}
