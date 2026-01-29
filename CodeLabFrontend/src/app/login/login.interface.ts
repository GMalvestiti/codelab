export interface ILogin {
  email: string;
  senha: string;
}

export interface IUsuarioJWT {
  id: number;
  nome: string;
  email: string;
  admin: boolean;
  modulos: number[];
}
